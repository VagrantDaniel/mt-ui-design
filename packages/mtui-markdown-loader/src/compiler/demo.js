const core = require('@babel/core')
const template = require('@babel/template').default
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const types = require('@babel/types')
const getMeta = require('../getMeta')
const babel = require('../parser/babel')
const marked = require('../parser/marked')
const { dangerouslySetInnerHTMLToJsx } = require('../jsx')
const { jsxIdentifier } = require('@babel/types')
const linkSvg = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-width="4">
<path d="M14.1006 25.4142L9.15084 30.3639C6.8077 32.7071 6.8077 36.5061 9.15084 38.8492C11.494 41.1924 15.293 41.1924 17.6361 38.8492L26.1214 30.3639C28.4646 28.0208 28.4645 24.2218 26.1214 21.8786M33.8996 22.5858L38.8493 17.636C41.1925 15.2929 41.1925 11.4939 38.8493 9.15072C36.5062 6.80758 32.7072 6.80758 30.364 9.15072L21.8788 17.636C19.5356 19.9792 19.5356 23.7781 21.8788 26.1213" stroke-linecap="butt"></path>
</svg>`

function demoToAst(context, options, lang = 'zh-EN') {
    const babelConfig = options.babelConfig || {}

    const metadata = getMeta(context, options, lang)

    const demoList = []

    metadata.forEach((meta, index) => {
        const { title, description } = meta.attributes;
        const markedBodyAddHeader = `<h2 class="demo-title"><a href="#${title}">${linkSvg}</a>${title}</h2>${description && marked.default(description)}`
        const descriptionOriginAst = babel(dangerouslySetInnerHTMLToJsx(markedBodyAddHeader))
        const codeOrigin = dangerouslySetInnerHTMLToJsx(marked.default(`\`\`\`js\n${meta.jsCode}\n\`\`\``))
        const codeOriginAst = babel(codeOrigin)

        let codePreviewBlockAst
        let descriptionAst

        traverse(descriptionOriginAst, {
            JSXElement: (_path) => {
                descriptionAst = _path.node;
                _path.stop();
            },
        })
        traverse(codeOriginAst, {
            JSXElement: (_path) => {
                codePreviewBlockAst = _path.node;
                _path.stop();
            },
        })

        const ast = babel(meta.jsCode)
        traverse(ast, {
            ExportDefaultDeclaration(_path) {
                const declaration = _path.node.declaration
                const identifierName = declaration.name
                const returnElement = types.jsxElement(
                    types.jsxOpeningElement(jsxIdentifier(identifierName), []),
                    types.jsxClosingElement(types.jsxIdentifier(identifierName)), []
                )
                const demoElement = returnElement
                const demoCellElement = types.jsxElement(
                    types.jsxOpeningElement(types.jsxIdentifier('CellDemo'), []), 
                    types.jsxClosingElement(types.jsxIdentifier('CellDemo')), [demoElement]
                )
                const children = [codePreviewBlockAst]
                const codeCellElement = types.jsxElement(
                    types.jsxOpeningElement(types.jsxIdentifier('CodeCell'), []), 
                    types.jsxClosingElement(types.jsxIdentifier('CodeCell')), children
                )
                // 展开全部代码按钮
                const cellDescriptionProps = []
                if (index === 0) {
                    cellDescriptionProps.push(types.jsxAttribute(types.jsxIdentifier('isFirst')))
                }
                const descriptionCellElement = types.jsxElement(
                    types.jsxOpeningElement(types.jsxIdentifier('CellDescription'), cellDescriptionProps),
                    types.jsxClosingElement(types.jsxIdentifier('CellDescription')), [descriptionAst]
                )
                const codeBlockElement = types.jsxElement(
                    types.jsxOpeningElement(types.jsxIdentifier('CodeBlockWrapper'), [
                        types.jsxAttribute(types.jsxIdentifier("id"), types.stringLiteral(title)),
                    ]), 
                    types.jsxClosingElement(types.jsxIdentifier('CodeBlockWrapper')), [
                        descriptionCellElement,
                        demoCellElement,
                        codeCellElement
                    ]
                )
                const app = types.variableDeclaration('const', 
                    [types.variableDeclarator(types.identifier('__export'), codeBlockElement)]
                )
                _path.insertAfter(app)
                _path.remove()
            }
        })
        const { code } = core.transformFromAstSync(ast, null, babelConfig)
        const buildRequire = template(`
        const NAME = React.memo(() => {
            AST
            return __export;
        })
        `);

        const finalAst = buildRequire({
            NAME: `Demo${index}`,
            AST: code,
        })
        const finalCode = generator(finalAst).code
        demoList.push(finalCode)
    })

    const buildRequire = template(`
        CODE
        class Component extends React.Component {
            render() {
                return React.createElement('span', { className: 'mtui-components-wrapper', style: this.props.style }, 
                ${demoList
                    .map((_, index) => `React.createElement(Demo${index}, { key: ${index} })`)
                    .join(',')
                });
            }
        }
    `);

    return buildRequire({
        CODE: demoList.join('\n'),
    });
}

module.exports = demoToAst
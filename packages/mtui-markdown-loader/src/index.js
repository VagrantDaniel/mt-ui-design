const path = require('path')
const loaderUtils = require('loader-utils')
const traverse = require('@babel/traverse').default
const { default: generate } = require('@babel/generator')
const types = require('@babel/types')
const parseMarkdownAttributes = require('./utils/parseMarkdownAttributes').default
const { htmlToJsx } = require('./jsx')
const marked = require('./parser/marked')
const demoToAst = require('./compiler/demo')
const babel = require('./parser/babel')

function loaderForComponentDoc(ast, markdownAst, markdownClassAttribute, markdownClassAttributeApiContainer) {
        
    const commonImports = babel(`
        import CodeBlockWrapper from '${path.resolve(__dirname,'templates/CodeBlockWrapper')}'
        import CodeCell from '${path.resolve(__dirname,'templates/CodeCell')}'
        import CellDemo from '${path.resolve(__dirname,'templates/CellDemo')}'
        import CellDescription from '${path.resolve(__dirname,'templates/CellDescription')}'
    `).program.body;

    traverse(markdownAst, {
        JSXElement: (_path) => {
            const { value: valueOfFirstChild } = _path.node.children[0] || { value: '' }
            const { name: nameOfOpeningElement } = _path.node.openingElement.name
            if (nameOfOpeningElement === 'p' && valueOfFirstChild === '%%Content%%') {
                // 防止 markdown 样式影响组件样式，所以只给 markdown 内容添加 markdown-body 的类名
                const prevs = _path.getAllPrevSiblings()
                const nexts = _path.getAllNextSiblings()

                const prevSpan = types.jsxElement(
                    types.jsxOpeningElement(types.jsxIdentifier('span'), [markdownClassAttribute]), 
                    types.jsxClosingElement(types.jsxIdentifier('span')),
                    prevs.map(prev => prev.node)
                )
                const nextSpan = types.jsxElement(
                    types.jsxOpeningElement(types.jsxIdentifier('span'), [markdownClassAttributeApiContainer,]), 
                    types.jsxClosingElement(types.jsxIdentifier('span')), 
                    nexts.map((next) => next.node)
                )

                prevs.forEach((prev) => {
                    prev.remove()
                })
                nexts.forEach((next) => {
                    next.remove()
                })
                _path.insertBefore([prevSpan])
                _path.insertAfter([nextSpan])

                const componentJsx = `
                    <div>
                        <Component />
                    </div>
                `
                const element = babel(componentJsx).program.body[0]
                _path.replaceWith(element)
                _path.stop() 
            }
        }
    })

    traverse(markdownAst, {
        FunctionDeclaration: (_path) => {
            _path.insertBefore(commonImports)
            _path.insertBefore(ast)
            _path.stop()
        }
    })

    const finalCode = generate(markdownAst).code
    return finalCode
}

function MarkdownLoader(rawContent) {
    const loaderOptions = loaderUtils.getOptions(this) || {}
    const { headerHtml, markdown: markdownContent, title, description, } = parseMarkdownAttributes(rawContent)

    const ast = demoToAst(this.context, loaderOptions, 'zh-CN')

    const content = htmlToJsx(`${headerHtml}${marked.default(markdownContent)}`, title, description)
    const markdownAst = babel(content)

    const markdownClassAttribute = types.jsxAttribute(
        types.jsxIdentifier('className'), types.stringLiteral('markdown-body')
    )
    const markdownClassAttributeApiContainer = types.jsxAttribute(
        types.jsxIdentifier('className'), types.stringLiteral('markdown-body api-container')
    )
    return loaderForComponentDoc.call(this, ast, markdownAst, markdownClassAttribute, markdownClassAttributeApiContainer)
}

module.exports = MarkdownLoader
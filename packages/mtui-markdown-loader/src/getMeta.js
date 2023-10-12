const front_matter = require('front-matter')
const fs_extra = require('fs-extra')
const path = require('path')
const prettier = require('prettier')
const { isObject } = require('./utils/is')
const marked = require('./parser/marked')
const getDescriptionFromMdLexer = require('./utils/getDescriptionFromMdLexer').default

const codeRegex = /^(([ \t]*`{3,4})([^\n]*)([\s\S]+?)(^[ \t]*\2))/gm
const availableJs = ['js', 'jsx', 'javascript', 'ts', 'tsx', 'typescript']
const availableCss = ['css', 'css:silent', 'less']
const availableLangs = availableJs.concat(availableCss)

function getMatches(input) {
    let matches;
    const output = {};
    while ((matches = codeRegex.exec(input))) {
        const lang = matches[3];
        const code = matches[4];
        if (availableLangs.indexOf(lang) > -1) {
            const l = availableJs.indexOf(lang) > -1 ? 'js' : 'css';
            output[l] = {
                lang,
                code,
                origin: matches[0],
            };
        }
    }
    return output;
}

const transformTs2Js = (code) => {
    if (!code)
        return '';
    const body = require('@babel/core').transform(code, {
        plugins: [['@babel/plugin-transform-typescript', { isTSX: true }]],
    }).code;
    return prettier.format(body);
}

const getMetaFromMd = (source, lang) => {
    const fmSource = front_matter(source)
    const { attributes, body } = fmSource
    const matches = getMatches(body)
    const metaTitle = attributes.title
    attributes.title = isObject(metaTitle) ? metaTitle[lang] : metaTitle;
    let originDescription

    if (matches.js) {
        originDescription = body.replace(matches.js.origin, '');
    } else {
        originDescription = body;
    }

    // i18n
    const lexerDescription = marked.default.lexer(originDescription)
    attributes.description = getDescriptionFromMdLexer(lexerDescription, lang) || originDescription
    const isTsx = ['ts', 'tsx', 'typescript'].indexOf(matches.js.lang) > -1;
    const ret = {
        attributes,
        jsCode: isTsx ? transformTs2Js(matches.js.code) : matches.js.code,
        tsCode: isTsx ? matches.js.code && matches.js.code.trim() : null,
    }

    return ret
}

function getMeta(context, options, lang) {
    const demoDir = options.demoDir || 'demo'
    const files = fs_extra.readdirSync(path.resolve(context || '', demoDir))
    const metadata = files.map((file) => {
        const source = fs_extra.readFileSync(path.resolve(context || '', demoDir, file), 'utf8')
        if (/\.md$/.test(file)) {
            return getMetaFromMd(source, lang);
        }
    })

    metadata.sort((a, b) => a.attributes.order - b.attributes.order)
    return metadata
}

module.exports = getMeta
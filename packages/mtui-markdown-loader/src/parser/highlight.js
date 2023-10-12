const fs = require('fs')
const path = require('path')
const prismjs = require('prismjs')

prismjs.hooks.add('wrap', function (env) {
    if (env.type === 'comment') {
        delete env.attributes.spellcheck
    }
})

const prismjsDir = 'prismjs/components/'
const loadLanguages = require(prismjsDir)
const prismComponents = path.dirname(require.resolve(prismjsDir))
const components = fs
    .readdirSync(prismComponents)
    .map((component) => component.replace(/(\.min)?\.js$/, ''))
const uniqComponents = new Set(components)
uniqComponents.delete('index')
uniqComponents.delete('prism-core')
loadLanguages([...uniqComponents].map((c) => c.replace('prism-', '')))
function highlight(code, lang) {
    const language = prismjs.languages[lang] || prismjs.languages.autoit;
    return prismjs.highlight(code, language);
}
exports.default = highlight
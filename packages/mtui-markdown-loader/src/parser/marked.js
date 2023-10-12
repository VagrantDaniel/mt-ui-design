const marked = require('marked')
const highlight = require('./highlight').default

const renderer = new marked.Renderer()
renderer.code = function(code, infostring) {
    const lang = (infostring || '').match(/\S*/)[0];

    if (this.options.highlight) {
        const out = this.options.highlight(code, lang);
        if (out != null && out !== code) {
            code = out;
        }
    }

    return `<pre class="code_block"><code class="${this.options.langPrefix}${escape(lang)}">${code}</code></pre>\n`
}

marked.setOptions({
    gfm: true,
    breaks: true,
    renderer,
    xhtml: true,
    highlight(code, lang) {
        if (lang === 'js' || lang === 'javascript') {
            lang = 'jsx';
        }
        return highlight(code, lang).replace(/^\n/, '').replace(/\n/g, '<br />');
    },
})
const walkTokens = (token) => {
    if (token.type === 'table') {
        // delete empty row
        token.cells = token.cells.filter((c) => c[0]);
        token.tokens.cells = token.tokens.cells.filter((c) => c[0][0]);
        // token.cells.sort((a, b) => a[0].localeCompare(b[0]));
        // token.tokens.cells.sort((a, b) => a[0][0].text.localeCompare(b[0][0].text));
    }
}
marked.use({ walkTokens })

exports.default = marked
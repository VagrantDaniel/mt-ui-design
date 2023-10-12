const front_matter = require('front-matter')
const marked = require('../parser/marked').default

function generateHeaderHtml(header) {
    return header
        ? `<div className="nav-intro">${marked(header.replace(/(\/) (.*)/, '<span className="separator">$1</span><strong>$2</strong>'))}</div>`
        : '';
}

function trimHeaderDefinedInMarkdownContent(markdown) {
    var _a, _b, _c;
    const header = ((_a = /^(([ \t]*`{5})([^\n]*)([\s\S]+?)(^[ \t]*\2))/m.exec(markdown)) === null || _a === void 0 ? void 0 : _a[4]) || '';
    const title = ((_b = /# (.*)/.exec(header)) === null || _b === void 0 ? void 0 : _b[1]) || '';
    return {
        headerHtml: generateHeaderHtml(header),
        title,
        description: ((_c = /# .*\n*(.*)/.exec(header)) === null || _c === void 0 ? void 0 : _c[1]) || '',
        markdown: markdown.replace(`\`\`\`\`\`${header}\`\`\`\`\``, ''),
    };
}

function parseMarkdownAttributes(originalMarkdown) {
    const { body: markdownBody, attributes } = front_matter(originalMarkdown);
    const trimResult = trimHeaderDefinedInMarkdownContent(markdownBody);
    /**
     * Get markdown header from content like below
     * `````
     * Group
     * # Title
     * Some description...
     * `````
     */
    if (trimResult.headerHtml) {
        return Object.assign(Object.assign({}, trimResult), { attributes });
    }
    /**
     * Get markdown header from front matter like below
     * ---
     * group: Group
     * title: Title
     * description: Some description...
     * ---
     */
    const { title = '', description = '', group = '' } = attributes;
    return {
        title,
        description,
        attributes,
        markdown: trimResult.markdown,
        headerHtml: title || description || group
            ? generateHeaderHtml([group, title.replace(/^([^#])/, '# $1'), description].join('\n'))
            : '',
    };
}
exports.default = parseMarkdownAttributes;
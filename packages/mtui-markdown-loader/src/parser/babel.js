const parser = require('@babel/parser');

function parse(codeBlock) {
  return parser.parse(codeBlock, {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    plugins: [
      'jsx',
      'classProperties'
    ]
  });
}

module.exports = parse;

const moo = require('moo');
const fs = require('mz/fs');
 
let lexer = moo.compile({
  WS:      /[ \t]+/, // White space
  comment: /\/\/.*?$/,  // Comments
  number:  /0|[1-9][0-9]*/, // Numbers
  string:  /"(?:\\["\\]|[^\n"\\])*"/, // Strings
  lparen:  '(', // Left bracket
  rparen:  ')', // Right bracket 
  lbrace:  '{',
  rbrace:  '}',
  identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
  fatarrow: '=>',
  assign: '=',
  NL: { match: /[\r\n]+/, lineBreaks: true }, // New line
});

module.exports = lexer;

async function main() {
  const code = (await fs.readFile("example.small")).toString();
  lexer.reset(code);
  while (true) {
    const token = lexer.next();
    if (!token) {
      break;
    }
    console.log(token);
  }

}
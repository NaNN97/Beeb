const moo = require('moo');
const fs = require('mz/fs');
 
let lexer = moo.compile({
  WS:      /[ \t]+/, // White space
  comment: /\/\/.*?$/,  // Comments
  float: {
    match: /(?:^\+|\-?)(?:[1-9]\d{0,4}|0|)\.\d/,
    lineBreaks: true,
    value: (x) => parseFloat(x),
  }, // Floats - they have to be above number otherwise it will not work properly
  number:  /0|[1-9][0-9]*/, // Numbers
  boolean: ["true", "false"], // Booleans
  string:  /"(?:\\["\\]|[^\n"\\])*"/, // Strings
  lparen:  '(', // Left bracket
  rparen:  ')', // Right bracket 
  lbrace:  '{', // Left curly bracket
  rbrace:  '}', // Right curly bracket
  identifier: /[a-zA-Z][a-zA-Z_0-9]*/,
  fatarrow: '=>',
  assign: '=',
  NL: { match: /[\r\n]+/, lineBreaks: true }, // New line
});

module.exports = lexer;

async function main() {
  const code = (await fs.readFile("example.beeb")).toString();
  lexer.reset(code);
  while (true) {
    const token = lexer.next();
    if (!token) {
      break;
    }
    console.log(token);
  }

}
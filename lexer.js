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
  newLine: { match: /\r?\n/, lineBreaks: true }, // New line
});

// try {
//   // read contents of the file
//   const data = fs.readFileSync('example.beeb', 'UTF-8');

//   // split the contents by new line
//   const lines = data.split(/\r?\n/);

//   // print all lines
//   lines.forEach((line) => {
//       console.log(line);
//   });
// } catch (err) {
//   console.error(err);
// }

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

main().catch(err => console.log(err.stack));
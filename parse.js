const nearley = require("nearley");
const grammar = require("./beeb.js");
const fs = require("mz/fs");

async function main() {

  const filename = process.argv[2];
  if (!filename) {
    console.log("Please provide a .beeb file.");
    return;
  }

  const code = (await fs.readFile(filename)).toString();
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  parser.feed(code);
  if (parser.results.length > 1) {
    console.log("Error: ambigous grammar detected");
    // for (let i = 0; i < parser.results.length; i++) {
    //   const ast = parser.results[i];
    //   const outputFilename = filename.replace(".beeb", "-" + i + ".ast");
    //   await fs.writeFile(outputFilename, JSON.stringify(ast, null, "  "));
    //   console.log(`Wrote ${outputFilename}.`);
    // }
  } else if (parser.results.length == 1) {
    const ast = parser.results[0];
    const outputFilename = filename.replace(".beeb", ".ast");
    await fs.writeFile(outputFilename, JSON.stringify(ast, null, "  "));
    console.log(`Wrote ${outputFilename}.`);
  } else {
    console.log("Error: no parse found.");
  }
}

main().catch(err => console.log(err.stack));
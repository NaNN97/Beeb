const fs = require("mz/fs");

async function main () {
    const filename = process.argv[2];
    if (!filename) {
        console.log("Please provide a .ast file.");
        return;
    }

    const astJson = (await fs.readFile(filename)).toString();
    const statements = JSON.parse(astJson);
    const jsCode = generateJsForStatements(statements);
    const outputFilename = filename.replace(".ast", ".js");
    await fs.writeFile(outputFilename, jsCode);
    console.log(`Wrote ${outputFilename}.`);
}

function generateJsForStatements(statements) {
    const lines = [];
    for (let statement of statements) {
        const line = generateJsForStatement(statement);
    }

    return lines.join("\n");
}

function generateJsForStatement(statement) {
    
}

main().catch(err => console.log(err.stack));
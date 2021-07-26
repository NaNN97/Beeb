const fs = require("mz/fs");

async function main() {
    const filename = process.argv[2];
    if (!filename) {
        console.log("Please provide a .small file.");
        return;
    }

    
}

main().catch(err => console.log(err.stack));
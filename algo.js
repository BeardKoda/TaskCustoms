const fs = require('fs');
const readline = require('readline');

async function processAlgoByLine() {
    // Make sure we got a filename on the command line.
    if (process.argv.length < 3) {
        console.log('Usage: node ' + process.argv[1] + ' FILENAME');
        process.exit(1);
    }
    // create readStream of the file by line
    const fileStream = fs.createReadStream(process.argv[2]);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let groups = [];
    groupId = 0;

    for await (const line of rl) {
        if(line.length==0){
            groups[groupId] = removeDuplicateCharacters(groups[groupId]);
            groupId++;
        }
        if(line.length > 0){
            if(groups[groupId]){
                groups[groupId] += line;
            } else {
                groups[groupId] = line;
            }
        }
    }

    const sumVal = sumArray(groups);
    console.log('the sum of this count is =', sumVal);

}

const removeDuplicateCharacters = (string) => {
    return string.split('').filter((item, pos, self) => { return self.indexOf(item) == pos;}).join('');
}

const sumArray = (array) => {
    return array.reduce((a, b) => {
        return a + b.length;
    }, 0);
}

processAlgoByLine();

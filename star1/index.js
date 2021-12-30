const fs = require('fs');
var lineReader = require('readline').createInterface({
    input: fs.createReadStream('./input.txt'),
});

let sumIncrements = 0;
let prevValue = null;
let lineNumber = 0;
lineReader.on('line', (data) => {
    const val = parseInt(data);
    if (prevValue != null) {
        console.log(val - prevValue)
    }
    if (prevValue != null && val > prevValue) {
        // console.log(prevValue, data);
        sumIncrements++;
    }
    lineNumber++;
    prevValue = val
    console.log('line:number:', lineNumber, 'Sum:', sumIncrements)
});


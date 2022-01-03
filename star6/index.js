const fs = require('fs');
const lineReader = require('readline').createInterface({
    input: fs.createReadStream('./input.txt'),
});

lineReader.on('line', onLine);
lineReader.on('close', onClose);

const map = [];
const lines = [];

class BitCounter {
    constructor() {
        this.zero = 0;
        this.one = 0;
    }

    get gamma() {
        return this.zero >= this.one ? 0 : 1;
    }

    get epsilon() {
        return this.zero <= this.one ? 0 : 1;
    }
}

function onLine(line) {
    lines.push(line)
    for (let i = 0; i < line.length; i++) {
        if (!map[i]) {
            map[i] = new BitCounter();
        }

        if (line.charAt(i) == 0) map[i].zero++;
        if (line.charAt(i) == 1) map[i].one++;
    }
}

function onClose() {
    let ogrFilteredLines = lines;
    let co2srFilteredLines = lines;
    for (let i = 0; i < map.length; i++) {
        if (ogrFilteredLines.length > 1) {
            ogrFilteredLines = ogrFilteredLines.filter(line => line[i] == map[i].gamma)
        }

        if (co2srFilteredLines.length > 1) {
            if (co2srFilteredLines.length === 2) {
                console.log(co2srFilteredLines);
                console.log(parseInt(co2srFilteredLines[0],2));
                console.log(parseInt(co2srFilteredLines[1],2));
            }
            co2srFilteredLines = co2srFilteredLines.filter(line => line[i] == map[i].epsilon)
        }
    }

    console.log(parseInt(ogrFilteredLines, 2));
    //console.log(co2srFilteredLines);
}

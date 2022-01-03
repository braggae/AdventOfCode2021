const fs = require('fs');
const lineReader = require('readline').createInterface({
    input: fs.createReadStream('./input.txt'),
});

lineReader.on('line', onLine);
lineReader.on('close', onClose);

const map = [];
class Counter {
    constructor() {
        this.zero = 0;
        this.one = 0;
    }

    get gamma() {
        return this.zero > this.one ? 0 : 1;
    }

    get epsilon() {
        return this.zero < this.one ? 0 : 1;
    }
}

function onLine(line) {
    for (let i = 0; i < line.length; i++) {
        if (!map[i]) {
            map[i] = new Counter();
        }

        if (line.charAt(i) == 0) map[i].zero++;
        if (line.charAt(i) == 1) map[i].one++;
    }
}

function onClose() {
    let epsilonBinaryRate = '';
    let gammaBinaryRate = '';

    for (let i = 0; i < map.length; i++) {
        epsilonBinaryRate += map[i].epsilon;
        gammaBinaryRate += map[i].gamma;
    }

    console.log(parseInt(epsilonBinaryRate,2) * parseInt(gammaBinaryRate,2));
}

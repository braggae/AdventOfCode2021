const fs = require('fs');
var lineReader = require('readline').createInterface({
    input: fs.createReadStream('./input.txt'),
});

lineReader.on('line', (line) => {
    if (isForward(line)) {
        instructions.goForward(parseReading(line))
    }

    if (isDown(line)) {
        instructions.goDown(parseReading(line))
    }

    if (isUp(line)) {
        instructions.goUp(parseReading(line))
    }
});

lineReader.on('close', () => console.log(instructions.multipliedPosition) )

function isForward(line) {
    return line.startsWith('forward')
}
function isDown(line) {
    return line.startsWith('down')
}
function isUp(line) {
    return line.startsWith('up')
}
function parseReading(line) {
    return parseInt(line.charAt(line.length - 1))
}

class Instructions {
    horizontal = 0;
    depth = 0;
    aim = 0;

    goForward(length) {
        this.horizontal += length;
        this.depth += this.aim * length;
    }

    goDown(depth) {
        this.aim += depth;
    }

    goUp(depth) {
        this.aim -= depth;
    }

    get multipliedPosition() {
        return this.horizontal * this.depth;
    }
}

const instructions = new Instructions();


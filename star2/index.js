const fs = require('fs');
var lineReader = require('readline').createInterface({
    input: fs.createReadStream('./input.txt'),
});

const measurements = [];
lineReader.on('line', (line) => {
    measurements.push(parseInt(line));
});

lineReader.on('close', () => countThreeMeasurement(measurements, 3))

function countThreeMeasurement(measurements, windowSize) {
    let sumIncrements = 0;
    let prevValue = null;
    const totalMeasurements = measurements.length;

    for (let i = 0; i < totalMeasurements - windowSize + 1; i++) {
        let currentWindowSum = 0;
        for (let j = 0; j < windowSize; j++) {
            currentWindowSum = currentWindowSum + measurements[i + j];
        }

        console.log('current window sum', currentWindowSum);
        if (prevValue === null) {
            prevValue = currentWindowSum;
            continue;
        }

        if (currentWindowSum > prevValue) {
            sumIncrements++;
        }
        prevValue = currentWindowSum;
    }

    console.log('increments', sumIncrements);
}

const fs = require('fs');
const logFile = 'historico.txt';

function logOperation(operation) {
    fs.appendFileSync(logFile, `${operation}\n`, 'utf8');
}

module.exports = {
    logOperation
};
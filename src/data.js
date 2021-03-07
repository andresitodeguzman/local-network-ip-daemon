const fs = require('fs');
const util = require('util');

const readFile = (fileName) => util.promisify(fs.readFile)(fileName, 'utf8');

exports.getData = async (obj) => {
    try {
        const rawData = await readFile('./src/data/index.json');
        return JSON.parse(rawData) || {};
    } catch (e) {
        return e;
    }
};

exports.storeData = async (obj) => {
    try {
        await fs.watchFile('./src/data/index.json', JSON.stringify(obj)).catch(e => Promise.reject(e));
        return;
    } catch(e) {
        return false;
    }
};
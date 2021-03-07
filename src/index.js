const axios = require('axios');
const { getAddress } = require('./network');
const { getData, storeData } = require('./data');
const { environment } = require('./environment');

let preliminaryData = { address: false };

function log(obj) {
    console.log(`${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} [${obj.type || 'INFO'}]: ${obj.message}`);
}

async function sendToServer(address) {
    return await axios.get(`${environment.url}/update/${environment.device}/${address}`,
    { headers: { Authorization: `Bearer ${environment.token}` } });
}

async function checkLocalIp() {
    const address = getAddress();
    if(preliminaryData.address !== address) {
        preliminaryData.address = address;
        storeData({ address: address || false });
        if(address !== false) {
            await sendToServer(address);
            log({ message: `IP address changed to ${address || '** address unavailable **'}` });
        }
    }
}

async function main() {
    log({ message: 'IP Address Checker Started' });
    preliminaryData = await getData();
    setInterval(checkLocalIp, 10000);
}

main();
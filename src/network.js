const os = require('os');

exports.getAddress = () => {
    const networkInterfaces = os.networkInterfaces() || {};
    if(!networkInterfaces['Wi-Fi']) return false;
    const ip = networkInterfaces['Wi-Fi'].find(elem => elem.family === 'IPv4').address || false;
    return ip;
};

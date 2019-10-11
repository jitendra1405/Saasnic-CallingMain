const config = require('../config.json');
const server = require('./lib/server');

config.PORT = process.env.PORT || config.PORT;


const url = window.location.search;
url = url.replace("?varName=", ''); // remove the ?
console.log('lllllllllllll',url);
    const abc = url;
   console.log('kkkkkkkkkkkkkk',abc);


server.run(config);

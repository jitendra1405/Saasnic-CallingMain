/*const config = require('../config.json');
const server = require('./lib/server');

config.PORT = process.env.PORT || config.PORT;





server.run(config);*/
const config = require('../config.json');
const server = require('./lib/users');

config.PORT = process.env.PORT || config.PORT;

server.run(config);

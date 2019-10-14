/* eslint-disable no-await-in-loop */
const haiku = require('./haiku');
const users = {};
const express = require('express');
var abcd = [] ;

const app = express();
const server = createServer(app);
app.use('/', express.static(`${process.cwd()}/../client`));
const bodyParser = require("body-parser");
//const express = require("express");
//const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});
app.post('/login', (req, res) => {
  const c = req.body.c;
  abcd = c;

});





// Random ID until the ID is not in use
async function randomID() {
  
  console.log('i am in server.js');
  
  let id = abcd;
  while (id in users) {
    await Promise.delay(5);
    id = haiku();
  }
  return id;
}

exports.create = async (socket) => {
  const id = await randomID();
  users[id] = socket;
  return id;
};

exports.get = id => users[id];

exports.remove = id => delete users[id];

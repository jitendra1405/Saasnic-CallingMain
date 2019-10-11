/* eslint-disable no-await-in-loop */
const haiku = require('./haiku');

const users = {};

 
  


// Random ID until the ID is not in use
async function randomID() {
  
  console.log('i am in server.js');
  const url = window.location.search;
url = url.replace("?varName=", ''); // remove the ?
console.log('lllllllllllll',url);
    const abc = url;
   console.log('kkkkkkkkkkkkkk',abc);  
  let id = haiku();
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

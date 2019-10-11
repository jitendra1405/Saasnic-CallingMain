/* eslint-disable no-await-in-loop */
const haiku = require('./haiku');
const app = express();
const users = {};
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

 app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.post('/login', (req, res) => {
  const c = req.body.c;
  
  
  console.log('username is the ',c);
 

});
  


// Random ID until the ID is not in use
async function randomID() {
  
  console.log('i am in server.js');
  
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

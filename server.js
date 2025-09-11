const { createServer } = require('node:http');
const hostname = '127.0.0.1';
const port = 3000;
const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  if (req.url === "/") {
    res.write('hellows worldos!\n');
    res.end('finito');
  // this is an example route.
  } else if(req.url === "/name") {
    //this is how we write to the response without ending the stream
    res.write('custom stuff\n');
    res.end('donezo'); 
  } else {
    //  404 case
    res.writeHead(404, {
      "content-type": "text/html",
      "my-header": "missing route"
    });
    res.write("<h1>404 - Page Not Found</h1>");
    res.end('sucka!!!'); 
  }

  //console.log() goes to command line as console.
  console.log('log stuff'); 
  
});

const { Sequelize, DataTypes } = require('sequelize')
const { DATABASE_NAME,
    DATABASE_USERNAME,
    DATABASE_PASSWORD } = require('./config')

// Create an instance of sequelize
const sequelize =
    new Sequelize(DATABASE_NAME,
        DATABASE_USERNAME,
        DATABASE_PASSWORD, {
        host: 'localhost',
        dialect: 'mysql'
    })

// Validate and connect to the database
sequelize
    .authenticate()
    .then(() => console.log('Successfully connected to the database!'))
    .catch((error) => console.log('Failed to connect the database:', error))

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
const http = require('http');

var express = require('express');

const hostname = '0.0.0.0';
const port = 3000;

// client setup
var app = express();

app.use('/', express.static('static'));

app.listen(port);

console.log("Running client side on port: " + port);

// server setup
var s_port = 3001;

var server = express();

// main server function
server.get('/:request', function (req, res) {
  var request = req.params.request;
  res.send('From server: we got your request for "' + request  + '"');
})

// function to get info object
// Returns and info object
// {
// 	'title' : 'text',
// 	'body'	: 'body-text'
// }
function get_info_object(concept){

}

// function to get sound object
// Returns some kind of sound object
// ???
function get_voice_object(info_object){

}

server.listen(s_port);
console.log("Running server side on port: " + s_port);

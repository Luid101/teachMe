const http = require('http');

var express = require('express');

var cors = require('cors');

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

server.use(cors({origin: 'http://159.203.10.86:3000'}));

// main server function
server.get('/:request', function (req, res) {
  
  var request = req.params.request;
  
  get_info_object(request, res);

})

// function to get info object
// Returns and info object
// {
// 	'title' : 'text',
// 	'body'	: 'body-text'
// }
function get_info_object(concept, res){
  
  // get wikipedia
  var wikipedia = require("node-wikipedia");

  wikipedia.page.data(concept, { content : true }, function(response){
    // show data
    return_data(response, res);
  });

}

// get text of html

// function to render output to screen
function return_data(data, res){

  console.log(data);
  
  var content = {
    "title":"N/A",
    "body" : "N/A"
  }

  try{
    content = {
      "title" : data["title"],
      "body" : data["text"]["*"]
    }
  }catch(err){
    var content = {
      "title":"Sorry we couldn't find it",
      "body" : "N/A"
    }
  }

  res.send(content);
}

server.listen(s_port);
console.log("Running server side on port: " + s_port);

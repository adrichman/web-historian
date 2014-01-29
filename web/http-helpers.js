var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, type) {
  res.writeHead(200, {'Content-Type': type});
  res.end(asset);
};

exports.route = function(req, res){
  if (req.url === '/' || req.url === '/index.html'){
    var html = fs.readFileSync('public/index.html', 'utf8');
    var type = 'text/html';
  } 
  if (req.url === '/styles.css'){
    var html = fs.readFileSync('public/styles.css', 'utf8');
    var type = 'text/css';
  } 
  if (req.url === '/app.js'){
    var html = fs.readFileSync('public/app.js', 'utf8');
    var type = 'text/javascript';
  } 
  if (req.url === '/jquery.min.js'){
    var html = fs.readFileSync('bower_components/jquery/jquery.min.js', 'utf8');
    var type = 'text/javascript';
  } 
  this.serveAssets(res, html, type);
}
// As you progress, keep thinking about what helper functions you can put here!


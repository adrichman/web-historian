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

exports.serveAssets = function(res, code, asset, type) {
  res.writeHead(code, type);
  res.end(asset);
};

exports.route = function(req, res, type){
  var self = this;
  if (req.url === '/' || req.url === '/index.html'){
    fs.readFile(__dirname + '/public/index.html', 'utf8', function(err,html){
      type = {'Content-Type': 'text/html'};
      self.serveAssets(res, 200, html, type);
    });
  } else
  if (req.url === '/styles.css'){
    fs.readFile('public/styles.css', 'utf8', function(err,html){
      type = {'Content-Type': 'text/css'};
      self.serveAssets(res, 200, html, type);
    });
  } else 
  if (req.url === '/app.js'){
    fs.readFile('public/app.js', 'utf8', function(err,html){
      type = {'Content-Type': 'text/javascript'};
      self.serveAssets(res, 200, html, type);  
    });
  } else
  if (req.url === '/jquery.min.js'){
    fs.readFile('bower_components/jquery/jquery.min.js', 'utf8', function(err,html){
      type = {'Content-Type': 'text/javascript'};
      self.serveAssets(res, 200, html, type);    
    });
  } else
  if (req.url.match(/\/www/)){
    var site = req.url;
    console.log("THIS IS THE SITE I WANT TO MATCH: " + site);
    fs.readFile(archive.paths['archivedSites'] + "/" + site , 'utf8', function(err,html){
      type = {'Content-Type': 'text/html'};
      self.serveAssets(res, 200, html, type);    
    });
  } else {
    this.serveAssets(res, 404);
  }

  
}
// As you progress, keep thinking about what helper functions you can put here!


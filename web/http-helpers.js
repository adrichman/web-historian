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
  if (req.url === '/bootstrap-basic.css'){
    fs.readFile('public/bootstrap-basic.css', 'utf8', function(err,html){
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
    var site = req.url.substring(1);
    archive.isUrlInList(site, function(containsUrl, list, url){ 
      if (containsUrl === true){
        archive.isURLArchived(url, function(bool){
          if (bool){
            fs.readFile(archive.paths.archivedSites + "/" + url , 'utf8', function(err,html){
              type = {'Content-Type': 'text/html'};
              self.serveAssets(res, 302, html, type);
            })
          } else {
            console.log(bool);
            fs.readFile(__dirname + '/public/loading.html', 'utf8', function(err,html){
              type = {'Content-Type': 'text/html'};
              self.serveAssets(res, 200, html, type);
            });
          }
        });
      } else {
        archive.addUrlToList(site);
        fs.readFile(__dirname + '/public/loading.html', 'utf8', function(err,html){
          type = {'Content-Type': 'text/html'};
          self.serveAssets(res, 200, html, type);
        });
      }
    });
  } else {
    this.serveAssets(res, 404);
  }

  
}
// As you progress, keep thinking about what helper functions you can put here!


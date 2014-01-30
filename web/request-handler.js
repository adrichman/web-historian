var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelper = require("./http-helpers");
// require more modules/folders here!

exports.handleRequest = function (req, res, corsHeaders) {
  if (req.method === "OPTIONS"){
    corsHeaders['Content-Type'] = "text/plain";
    res.writeHead(200, corsHeaders);
    res.end(JSON.stringify(res));
  } 
  else if(req.method === 'GET'){
    httpHelper.route(req, res);
  } 
  else if (req.method === 'POST'){
    console.log('ITS TRYING TO POST, MAN!!')
    var siteToArchive = "";
    req.on('data', function (data) {
      siteToArchive += data;
    });
    req.on('end', function() {
      fs.appendFile(archive.paths['list'], siteToArchive.substring(4) + "\n", 'utf8', function(){
        console.log("Sites.txt updated with: " + siteToArchive);
        httpHelper.serveAssets(res,302);
      });
    });
  }  
  else {
    res.end(404);
  }
  // res.end(archive.paths.list);
};


var http  = require('http')
var fs    = require('fs');
var path  = require('path');
var _     = require('underscore');
var mysql = require('mysql');

var connection = mysql.createConnection({
  socketPath     : '/var/mysql/mysql.sock',
  user     : 'root',
  password : 'localhost',
  database : 'hr_web_historian'
});

connection.query('SELECT * from sites', function(err, rows) {
  console.log(rows);
  console.log(err);
});
connection.end(function(err) {
  // The connection is terminated now
});


exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  for(var type in pathsObj) {
    // Check that the type is valid
    if (exports.paths[type] && pathsObj.hasOwnProperty(type)) {
      exports.paths[type] = pathsObj[type];
    }
  }
};

exports.listArray = {
  'list' : []
}
// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(list, cb){
  var self = this;
  fs.readFile(list, 'utf8', function(err, fileList){
    self.listArray.list = fileList.split('\n');
    cb(self.listArray.list);
  });
};

exports.isUrlInList = function(url, cb){
  var self = this;
 
  return self.readListOfUrls(self.paths.list, function(arg){
    var containsUrl = _.contains(arg, url);
    cb(containsUrl, arg, url);
  });
};

exports.addUrlToList = function(url){
  var self = this;
  fs.appendFile(self.paths.list, '\n' + url, function(){
    self.readListOfUrls(self.paths.list,function(returnList){
      self.isUrlInList(url, function(){
        self.isURLArchived(url);
      });
    });
  });
};

exports.isURLArchived = function(url, cb){
  var self = this;
  self.found = false;
  var urlFile = self.paths.archivedSites + "/" + url;
  fs.readFile(urlFile, 'utf8', function(err, data){
    if (err){
      console.log('COULDNT FIND THAT FILE! ' + err);
      self.found = false;
      self.downloadUrls(url, urlFile);
    } else { 
      self.found = true;
      if(cb) {
        cb(self.found);
      }
    }
  });
};

exports.downloadUrls = function(url, urlFile){
  var self = this;
  var data = "";
  http.get("http://" + url, function(res) {
    res.on('data', function(resData){
      data += resData;
      fs.writeFile(urlFile, data, 'utf8', function(err){
        if (err){
          console.log('I DIDNT WRITE');
        }
      });

    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
};
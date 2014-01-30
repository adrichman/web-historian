var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/* You will need to reuse the same paths many times over in the course of this sprint.
  Consider calling this function in `request-handler.js` and passing in the necessary
  directories/files. This way, if you move any files, you'll only need to change your
  code in one place! Feel free to customize it in any way you wish.
*/

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
    console.log("READING LIST OF URLS: " + self.listArray.list);
    cb(self.listArray.list);
  });
};

exports.isUrlInList = function(url, cb){
  var self = this;
  console.log("CHECKING FOR URL IN LIST");
  console.log("url: " + url);
 
  return self.readListOfUrls(self.paths.list, function(arg){
    console.log("list: " + arg);
    var containsUrl = _.contains(arg, url);
    console.log("IS IN LIST: " + containsUrl);
    cb(containsUrl, arg, url);
  });
  // console.log('readList: ' + readList);
  // return readList;
};

exports.addUrlToList = function(){
};

exports.isURLArchived = function(){
};

exports.downloadUrls = function(){
};


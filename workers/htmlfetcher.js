// eventually, you'll have some code here that uses the code in `archive-helpers.js` 
// to actually download the urls you want to download.
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');

archive.readListOfUrls(archive.paths.list, function(listArray){
  console.log(listArray);
  _.each(listArray, function(item, index){
    return archive.isURLArchived(item, function(bool){
      return bool;
    });
  });
});
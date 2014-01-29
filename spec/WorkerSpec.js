var stubs = require("./stubs/stubs");
var archive = require("../helpers/archive-helpers");
var fs = require("fs");
var path = require('path');

archive.initialize({
  list : path.join(__dirname, "/testdata/sites.txt")
});

describe("html fetcher helpers", function(){

  it("should have a 'readListOfUrls' function", function(){
    var urlArray = ["example1.com", "example2.com"];
    var resultArray;

    fs.writeFileSync(archive.paths.list, urlArray.join("\n"));

    runs(function(){
      archive.readListOfUrls(archive.paths.list, function(urls){
        resultArray = urls;
      });
    });

    waits(100);

    runs(function() {
      expect(resultArray).toEqual(urlArray);
    });
  });

  it("should have a 'downloadUrls' function", function(){
    expect(typeof archive.downloadUrls).toBe('function');
  });

});

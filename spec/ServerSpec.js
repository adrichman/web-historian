var handler = require("../web/request-handler");
var stubs = require("./stubs/stubs");
var fs = require('fs');
var archive = require("../helpers/archive-helpers");
var path = require('path');
var res;

archive.initialize({
  list : path.join(__dirname, "/testdata/sites.txt")
});

beforeEach(function(){
  res = new stubs.Response();
});

describe("Node Server Request Listener Function", function() {

  it("Should answer GET requests for /", function() {
    var req = new stubs.Request("/", "GET");

    handler.handleRequest(req, res);

    waitsFor(function() {
      return res._ended;
    });

    runs(function(){
      expect(res._responseCode).toEqual(200);
      expect(res._data).toMatch(/<input/); // the resulting html should have an input tag
    });
  });

  it("Should answer GET requests for archived websites", function() {
    var fixtureName = "www.google.com";
    var req = new stubs.Request("/" + fixtureName, "GET");

    handler.handleRequest(req, res);

    waitsFor(function(){
      return res._ended;
    });

    runs(function(){
      expect(res._responseCode).toEqual(200);
      expect(res._data).toMatch(/google/); // the resulting html should have the text "google"
    });
  });

  it("Should append submitted sites to 'sites.txt'", function() {
    var url = "www.example.com";
    var req = new stubs.Request("/", "POST", {url: url});

    // Reset the test file and process request
    fs.writeFileSync(archive.paths.list, "");
    handler.handleRequest(req, res);

    waitsFor(function(){
      return res._ended;
    });

    runs(function(){
      var fileContents = fs.readFileSync(archive.paths.list, 'utf8');
      expect(res._responseCode).toEqual(302);
      expect(fileContents).toEqual(url + "\n");
    });
  });

  it("Should 404 when asked for a nonexistent file", function() {
    var req = new stubs.Request("/arglebargle", "GET");
    var oldPath = archive.paths.list;
    archive.initialize({ list : path.join(__dirname, "/testdata/sites.txt") });

    handler.handleRequest(req, res);

    waitsFor(function(){
      return res._ended;
    });

    runs(function(){
      archive.initialize({ list : archive.paths.list });
      expect(res._responseCode).toEqual(404);
    });
  });

});

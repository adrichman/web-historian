var http = require("http");
var handler = require("./request-handler");
var httpHelper = require("./http-helpers");
var fs = require("fs");

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(function(req,res){
  httpHelper.route(req, res);
  handler.handleRequest;
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);


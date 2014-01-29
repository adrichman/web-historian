var http = require("http");
var handler = require("./request-handler");
var fs = require("fs");

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(function(req,res){
  var path = req.url;
  if (path === '/' || path === '/index.html'){
    var html = fs.readFileSync('public/index.html', 'utf8');
    var type = 'text/html';
  } 
  if (path === '/styles.css'){
    var html = fs.readFileSync('public/styles.css', 'utf8');
    var type = 'text/css';
  } 
  res.writeHead(200, {'Content-Type': type});
  res.end(html);
  handler.handleRequest;
});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);


/* vim: set expandtab tabstop=2 shiftwidth=2: */
// Load the http module to create an http server.
var http = require('http');

var args = require('optimist')
    .options('port', {
        default: 9042,
        alias: 'p'
    }).describe('port', 'port to run the server on')
    .options('geodb', {
        default: './GeoLiteCity.dat',
        alias: 'g'
    }).describe('geodb', 'path to the GeoLiteCity database from MaxMind')
    .options('help', {
        default: false,
        alias: 'h'
    }).describe('help', 'this help message')
    .alias('help', '?')
    .usage("Usage: $0");
var argv = args.argv;

if (argv.help) {
  args.showHelp();
  process.exit(0);
}

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(argv.port);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:%s/, using %s", argv.port, argv.geodb);

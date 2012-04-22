/* vim: set expandtab tabstop=2 shiftwidth=2: */
// Load the http module to create an http server.
var http = require('http'),
    path = require('path'),
    geoip = require('geoip');

// Command line options
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

// Can we open the geo database?
if (! path.existsSync(argv.geodb)) {
  console.error("The geodb file doesn't exist: %s", argv.geodb);  
  process.exit(1);
}
try {
  var city = new geoip.City(argv.geodb); 
} catch(e) {
  console.error("Error loading the geodb file: %s", e);
  console.trace(e);
  process.exit(1);
}


// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
  console.log(request.headers)
  city.lookup('67.164.90.235', function(err, data) {
    if (err) {
      response.writeHead(500, {"Content-Type": "text/javascript"});
      response.end(err);
    } else {
      response.writeHead(200, {"Content-Type": "text/javascript"});
      response.end(JSON.stringify(data));
    }
  });
});

// Listen on port 8000, IP defaults to 127.0.0.1
server.listen(argv.port);

// Put a friendly message on the terminal
console.log("Server running at http://127.0.0.1:%s/, using %s", argv.port, argv.geodb);

Overview
=================
TODO: Node js http server that delivers geoip data via a web service. Once running, the server will
output a JSON strong with the users city, state, country of the user, like this:

<tt>{"city":"Pleasanton","country":"US"}</tt>

Inputs:
* The ip address is determined by looking at the following, stopping once one is found
    TODO: * ?ip=xxx.xxx.xxx.xxx in the url
    TODO: * X-Forwarded-For HTTP header (for proxies)
    TODO: * IP address of the user via REMOTE_ADDR
* TODO <tt>callback</tt> may be passed through the url for jsonp.


Dependencies
=================
* The excellent node-geoip library https://github.com/strange/node-geoip
* MaxMind's geoip city database, available here:
http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz
* Optional: Forever, a utility to keep the service running. https://github.com/nodejitsu/forever


TODO: Installation
=================
1) Install node.js - https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
2) To install dependencies, run:
    npm install
3) Download the latest http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz. The default location is /usr/local/share/GeoIP/GeoLiteCity.dat.gz
Run this (from the root of the repo)
curl -o 


Usage
=================
If you are using Forever (recommended):
TODO: forever start -l forever.log -o out.log -e err.log app.js

If you aren't using Forever
node app.js 

Options:
* -p or --port $port - specify an alternate port to listen to. The default is 9042
* -d or --db $file - specify an alternate location for the MaxMindDb. The default is ./GeoLiteCity.dat.gz


Updating the database
=================
Maxmind updates their city database once a month. Grab the latest one and restart the service. Here's a cron that will do it once a month
TODO: 42 0 13 * * cd /path/to/this/repo/ && curl -o GeoLiteCity.dat.gz http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz && forever restart


Testing (TODO)
=================
When making changes to the code, run the unit tests with:
nodeunit tests.js

Overview
=================
Node js http server that delivers geoip data via a web service. Once running, the server will
output a JSON strong with the users city, state, country of the user, like this:

<code>{"country_code":"US","country_code3":"USA","country_name":"United States","region":"CA","city":"Pleasanton","latitude":37.66239929199219,"longitude":-121.89630126953125,"metro_code":807,"dma_code":807,"area_code":925,"continent_code":"NA"}</code>

Inputs:
* The ip address is determined by looking at the following, stopping once one is found
    * ?ip=xxx.xxx.xxx.xxx in the url
    * <code>X-Forwarded-For</code> HTTP header (for proxies)
    * IP address of the user via REMOTE_ADDR
* <code>callback</code> may be passed through the url for jsonp.


Dependencies
=================
* Node/npm (duh)
* The excellent node GeoIP library from kuno: https://github.com/kuno/GeoIP
* MaxMind's geoip city database, available here:
http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz
* Optional: Forever, a utility to keep the service running. https://github.com/nodejitsu/forever


Installation
=================
1. Install node.js - https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
1. Install npm - http://npmjs.org/ (run the install.sh as root)
1. Install the C api from maxmind. Recomend you use yum/apt-get instead of compile from source. <code>sudo yum install GeoIP</code>. Known to work with version 1.4.8
1. To install dependencies, run:
    <code>npm install</code>
1. Download and unzip the latest http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz. The default location $repo_root/GeoLiteCity.dat.gz
Run this (from the root of the repo)
<code>curl -o GeoLiteCity.dat.gz http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz && gunzip GeoLiteCity.dat.gz</code>


Usage
=================
If you are using Forever (recommended):
<code>forever start -l forever.log -o out.log -e err.log app.js</code>

If you aren't using Forever
<code>node app.js</code>

Options:
* -p or --port $port - specify an alternate port to listen to. The default is 9042
* -g or --geodb $file - specify an alternate location for the MaxMind DB file. The default is ./GeoLiteCity.dat


Updating the database
=================
Maxmind updates their city database once a month. Grab the latest one and restart the service. Here's a cron that will do it once a month
<code>
42 0 13 * * cd /path/to/this/repo/ && curl -o GeoLiteCity.dat.gz http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz && rm GeoLiteCity.dat && gunzip GeoLiteCity.dat.gz && forever restart
</code>


Testing (TODO)
=================
When making changes to the code, run the unit tests with:
<code>nodeunit tests.js</code>

License
=================
BSD, see <a href="https://github.com/gorillamania/node_geoip_server/blob/master/LICENSE">LICENSE</a>

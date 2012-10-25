## Overview
Node js http server that delivers geoip data via a web service. Once running, the server will
output a JSON strong with the users city, state, country, etc. like this:

```
{
 "country_code": "US",
 "country_code3": "USA",
 "country_name": "United States",
 "region": "CA",
 "city": "Pleasanton",
 "latitude": 37.66239929199219,
 "longitude": -121.89630126953125,
 "metro_code": 807,
 "dma_code": 807,
 "area_code": 925,
 "continent_code": "NA"
}
```

Inputs:

* The ip address is determined by looking at the following, stopping once one is found
    * `?ip=xxx.xxx.xxx.xxx`in the url
    * `X-Forwarded-For` HTTP header (for proxies). Supports multiple proxies.
    * IP address of the user via REMOTE_ADDR
* `callback=$functionName` wrap the result in this callback function for jsonp.
* `indent=$numSpaces` pretty print the output with this number of spaces. Ex. indent=2


## Dependencies
* The excellent node GeoIP library from kuno: https://github.com/kuno/GeoIP
* MaxMind's geoip city database, available here:
http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz
* Optional: Forever, a utility to keep the service running in production. https://github.com/nodejitsu/forever


## Installation
1. Install node.js - https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager
1. Install npm - http://npmjs.org/ (run the install.sh as root)
1. Install the C api from maxmind. Recomend you use use a packagemanager of your choice
for your OS instead of compile from source, such as <code>sudo apt-get install geoip-database</code> or <code>sudo yum install GeoIP</code>. 
Known to work with version 1.4.8
1. Install dependencies for this project:
    `npm install`
1. Download and gunzip the latest http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz The default location $repo_root/GeoLiteCity.dat , if you put it somewhere else, specify `--geodb` when starting the service.

1. Run this (from the root of the repo):

	```
	curl -o GeoLiteCity.dat.gz http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz\
   && gunzip GeoLiteCity.dat.gz
   ```


## Usage
If you are using Forever (recommended):
<code>forever start -l forever.log -o out.log -e err.log app.js</code>

If you aren't using Forever
<code>node app.js</code>

Options:
<pre>
  --port, -p      port to run the server on                      [default: 9042]
  --geodb, -g     path to the GeoLiteCity database from MaxMind  [default: "./GeoLiteCity.dat"]
  --help, -h, -?  this help message                              [default: false]
</pre>

## Updating the database
Maxmind updates their city database once a month. Grab the latest one and restart the service. Here's a cron that will do it once a month
```
42 0 13 * * cd /path/to/this/repo/ \
   && curl -o GeoLiteCity.dat.gz http://geolite.maxmind.com/download/geoip/database/GeoLiteCity.dat.gz\
   && rm GeoLiteCity.dat\
   && gunzip GeoLiteCity.dat.gz\
   && forever restartall
```

## TODO
* Unit tests
* Continuous integration testing with travis-ci
* Automate the install process

## License
BSD, see <a href="https://github.com/gorillamania/node_geoip_server/blob/master/LICENSE">LICENSE</a>

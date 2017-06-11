const Parser = require('icecast-parser');

var radioStation;

// radioStation.on('stream', function(stream) {
//     stream.pipe(process.stdout);
// });
const util = require('util')
var express = require('express');
var app = express();

let counter = 0;
setInterval(()=>{
	console.log('[ ' + counter + ' ] REQUESTS in 10sec. ~~' + (counter*6) + ' per 1 minute')
	counter=0;
}, 10000);

app.get('/', function (req, res) {
	res.send("<a href=/player/statistic/song.php?YOUR_STREAM_URL_HERE>go to script page</a>");
});

app.get('/player/statistic/song.php', function (req, res) {
	
	counter++;
	
	var i = req.url.indexOf('?');
	var query = req.url.substr(i+1).split('&');
	let url = query[0];
	
	//res.writeHead(200, {'Content-Type': 'text/plain'});
	
	console.log('stream url:', url);
	if ( url.indexOf('http://') === -1 ){
		res.send(`Song=`);
		console.log(`invalid url!`);
		return;
	}
	
	//console.log(`url: ${url}`);
	
	radioStation = new Parser({
		url: url,
		autoUpdate: false,
		metadataInterval: 30
	});
	
	radioStation.on('metadata', function(metadata) {
		res.send(`Song=${metadata.StreamTitle}`);
		console.log(`Song=${metadata.StreamTitle}`);
	});
	
	radioStation.on('empty', function() {
		res.send(`Song=empty`);
		console.log(`empty`);
	});

	radioStation.on('error', function(error) {
		res.send(`Song=error`);
		console.log(`error`);
	});


});

app.get( "/crossdomain.xml", onCrossDomainHandler )
function onCrossDomainHandler( req, res ) {
  var xml = '<?xml version="1.0"?>\n<!DOCTYPE cross-domain-policy SYSTEM' + 
            ' "http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd">\n<cross-domain-policy>\n';
      xml += '<allow-access-from domain="*" to-ports="*"/>\n';
      xml += '</cross-domain-policy>\n';
  
  req.setEncoding('utf8');
  res.writeHead( 200, {'Content-Type': 'text/xml'} );
  res.end( xml );  
}

const port = 80;
app.listen(port);

console.log(`server is started!!! 5.39.32.176:${port}`);
/**
 * Created by uaman on 28.02.2017.
 */
const Parser = require('icecast-parser');

const urlPattern = /^https?\:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}(\.[a-z]{2,6})?([-a-zA-Z0-9@:;%_\+.~#?&//=]*)$/m;

let songTitleByUrl = {};

function createStreamParser(streamUrl) {

    return new Promise((resolve, reject) => {

        try {

            songTitleByUrl[streamUrl] = 'loading...';

            let isResolved = false;

            let radioStation = new Parser({
                url: streamUrl,
                autoUpdate: true,
                metadataInterval: 15,
                emptyInterval: 10
            });

            radioStation.on('error', function (error) {
                console.log(['Connection to', this.getConfig('url'), 'was rejected'].join(' '));
                reject('error');
            });

            radioStation.on('empty', function () {
                //console.log(['Radio station', this.getConfig('url'), 'doesn\'t have metadata'].join(' '));
                songTitleByUrl[streamUrl] = 'Radio station doesn\'t have metadata';
                resolve('');
            });

            radioStation.on('metadata', function (metadata) {
                //console.log(metadata.StreamTitle);
                songTitleByUrl[streamUrl] = metadata.StreamTitle;
                if (!isResolved) {
                    isResolved = true;
                    resolve(radioStation.lastSong);
                    console.log(`resolved!`);
                    //TODO: add timeout
                }
            });

            setTimeout(() => {
                reject('error')
            }, 5000);

        } catch (err) {
            reject(err);
        }
    });
}


const express = require('express');
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', function (req, res) {
    res.status(200).send("<a href=/player/statistic/song.php?YOUR_STREAM_URL_HERE>go to script page</a>");
});

app.get('/player/statistic/song.php', function (req, res) {

    //let date = new Date();

    response = `no streamUrl specified`;

    var i = req.url.indexOf('?');
    var query = req.url.substr(i + 1).split('&');
    let url = query[0];


    if (RegExp("^https?://", "m").test(url.trim())) {
        url = `http://{$url}`;
    }

    if (!urlPattern.test(url)) {
        res.status(406).send(`Song=`);
        console.log(`invalid url!`);
        return;
    }
    else {
        response = '';

        //console.log(`url:`, url);

        if (songTitleByUrl[url] === undefined) {

            console.log(`create new StreamParser for ${url}`);

            createStreamParser(url).then(
                songTitle => {
                    res.status(200).send(`Song=${songTitle}`)
                },
                error => {
                    console.log(`create error:`, error);
                    res.status(500).send(`Song=error`);
                }
            );

        }
        else {
            response = songTitleByUrl[url];
            res.status(200).send(`Song=${response}`);
        }
    }
});


app.get("/crossdomain.xml", onCrossDomainHandler);
function onCrossDomainHandler(req, res) {
    var xml = '<?xml version="1.0"?>\n<!DOCTYPE cross-domain-policy SYSTEM' +
        ' "http://www.macromedia.com/xml/dtds/cross-domain-policy.dtd">\n<cross-domain-policy>\n';
    xml += '<allow-access-from domain="*" to-ports="*"/>\n';
    xml += '</cross-domain-policy>\n';

    req.setEncoding('utf8');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(xml);
}

const port = 80;
app.listen(port);

console.log(`server is started!!! 5.39.32.176:${port}`);

//TODO:
// - figure out how to wait for on('metadata') event
// - how to change url... or get new song by url
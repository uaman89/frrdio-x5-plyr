/**
 * Created by uaman on 28.02.2017.
 */
const Parser = require('icecast-parser');

let songTitleByUrl = {};

function createStreamParser(streamUrl) {

    return new Promise((resolve, reject) => {

        try {

            songTitleByUrl[streamUrl] = '-song-title-';

            let isResolved = false;

            let radioStation = new Parser({
                url: streamUrl,
                autoUpdate: true,
                metadataInterval: 15,
                emptyInterval: 10
            });

            radioStation.on('error', function (error) {
                console.log(['Connection to', this.getConfig('url'), 'was rejected'].join(' '));
            });

            radioStation.on('empty', function () {
                console.log(['Radio station', this.getConfig('url'), 'doesn\'t have metadata'].join(' '));
                songTitleByUrl[streamUrl] = 'Radio station doesn\'t have metadata';
            });

            radioStation.on('metadata', function (metadata) {
                console.log(metadata.StreamTitle);
                songTitleByUrl[streamUrl] = metadata.StreamTitle;
                if (!isResolved) {
                    isResolved = true;
                    resolve(radioStation.lastSong);
                    console.log(`resolved!`);
                    //TODO: add timeout
                }
            });


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

    //let date = new Date();

    response = `no streamUrl specified`;

    if (req.query.url) {
        response = '-response-';

        //console.log(`req.query.url:`, req.query.url);

        if (!songTitleByUrl[req.query.url]) {

            console.log(`create new StreamParser`);

            createStreamParser(req.query.url).then(
                songTitle => { response = songTitle },
                error => { console.log(`create error:`, error) }
            );

        }
        else {
            response = songTitleByUrl[req.query.url];
        }
    }
    res.send(response);
});

app.listen(4040);

//TODO:
// - figure out how to wait for on('metadata') event
// - how to change url... or get new song by url
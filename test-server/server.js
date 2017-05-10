/**
 * Created by uaman on 28.02.2017.
 */
const Parser = require('icecast-parser');


let url = 'http://stream.kissfm.ua:8000/KISSFM-2.0';
//url = 'http://www.giss.tv:8000/Policajka_Sara.mp3';
url = 'http://pub1.diforfree.org:8000/di_eurodance_hi';
url = 'http://pub1.diforfree.org:8000/di_hardcore_hi';

let radioStation = new Parser({
    url: url,
    autoUpdate: true,
    metadataInterval: 15,
    emptyInterval: 10
});

radioStation.on('error', function (error) {
    console.log(['Connection to', this.getConfig('url'), 'was rejected'].join(' '));
});

radioStation.on('empty', function () {
    console.log(['Radio station', this.getConfig('url'), 'doesn\'t have metadata'].join(' '));
});

let songsList = [];
let lastSong = '';

radioStation.on('metadata', function (metadata) {
    console.log(metadata.StreamTitle);
    lastSong = metadata.StreamTitle;
    if (songsList[0] != metadata.StreamTitle)
        songsList.unshift(metadata.StreamTitle);
});


// radioStation.on('stream', function(stream) {
//     stream.pipe(process.stdout);
// });

setInterval(() => {
    songsList.unshift('test');
}, 300000);


const express = require('express');
const app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', function (req, res) {
    let date = new Date();
    responce = `total: ${songsList.length}<br> list: <br> <strong> ${songsList.join('<br>')} </strong><hr>${date}`;
    if (req.query.url) {
        responce = songsList[0];
    }
    res.send(responce);

    //res.send( lastSong + Math.random() );
});

app.listen(4040);

//TODO:
// - figure out how to wait for on('metadata') event
// - how to change url... or get new song by url
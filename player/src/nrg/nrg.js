import {ajax} from "../ajax";
import {decode} from "crypto-xor";

playerHtml = require('./nrg.svg');

console.clear();

const symmetricKey = 'JaySoy4Rewa';


// let res = decode('080417390e145d3c453508250d182a4f54141a0a05126a2d1873391051', symmetricKey);
// console.log(`res:`, res);


document.addEventListener("DOMContentLoaded", function (event) {

    const script = document.querySelector("script[data-vendor=forradio]");

    const playerContainer = document.createElement("div");
    playerContainer.id = "energyPlayerForradio";

    const streamUrl = script.dataset.streamUrl;
    console.log('streamUrl:', streamUrl);

    if (!streamUrl){
        return;
    }

    const myAudio = new Audio(streamUrl);


    function loadSongTitle() {
        const origin = '5.39.32.176';
        //const origin = 'localhost';
        let serverUrl = `http://${origin}/player/statistic/song.php?` + myAudio.src;
        ajax(serverUrl).then(
            response => title.innerHTML = decode(response, symmetricKey),
            error => clearInterval(ajaxIntervalId)
        );
    }

    playerContainer.innerHTML = playerHtml;
    script.parentNode.insertBefore(playerContainer, script);

    //let script = document.querySelector("script[data-player-target]");
    //let playerContainerId = script.dataset.playerTarget;
    //console.log(`playerContainerId:`, playerContainerId);
    //document.querySelector(`#${playerContainerId}`).innerHTML = playerHtml;

    let isPlayerOn = false;

    document.querySelector("#playStopBtn").onclick = function(){
        if ( isPlayerOn ) {
            myAudio.pause();
        } else {
            myAudio.play();
        }
        isPlayerOn = !isPlayerOn;
        console.log(`isPlayerOn:`, isPlayerOn);
    };



    let title = document.querySelector('#songTitle');


    ajaxIntervalId = setInterval(function () {
        loadSongTitle();
    }, 3000);


    $("#volumeControl").change(function (e) {
        let val = $(this).val();
        console.log(`val:`, val);
        myAudio.volume = val;
    });


});



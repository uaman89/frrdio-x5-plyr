import { ajax } from "../ajax";
import { decode } from "crypto-xor";
import { playerHtml } from './nrg.tpl'

console.clear();

const symmetricKey = 'JaySoy4Rewa';

const myAudio = new Audio();

// let res = decode('080417390e145d3c453508250d182a4f54141a0a05126a2d1873391051', symmetricKey);
// console.log(`res:`, res);


document.addEventListener("DOMContentLoaded", function (event) {

    const script = document.querySelector("script[data-vendor=forradio]");

    const playerContainer = document.createElement("div");
    const streamUrl = script.dataset.streamUrl;

    console.log('streamUrl:', streamUrl);

    function loadSongTitle(){
        const origin = 'localhost';
        //const origin = '5.39.32.176';
        let serverUrl = `http://${origin}/player/statistic/song.php?` + myAudio.src;
        ajax( serverUrl ).then( response => title.value = decode(response,symmetricKey) );
    }

    playerContainer.innerHTML = playerHtml;
    script.parentNode.insertBefore(playerContainer, script);

    //let script = document.querySelector("script[data-player-target]");
    //let playerContainerId = script.dataset.playerTarget;
    //console.log(`playerContainerId:`, playerContainerId);
    //document.querySelector(`#${playerContainerId}`).innerHTML = playerHtml;

    document.querySelector("#play").onclick = () => myAudio.play();
    document.querySelector("#stop").onclick = () => myAudio.pause();


    let streamList = [
        {title: "RadioRoks (aac?)", url: "http://online-radioroks.tavrmedia.ua:7000/RadioROKS_32"},
        {title: "Hubu.FM (showcast)", url: "http://94.23.53.96:500/;?icy=http"},
        {title: "DerFm", url: "http://s2.radioboss.fm:8066/stream"},
        {title: "energylove", url: "http://energylove.ice.infomaniak.ch/energylove-high.mp3"}
    ];

    if ( streamUrl ){
        streamList.push( { title: "by data-stream-url", url: streamUrl } );
    }

    let streamListDropdown = $("#streamList");

    streamList.forEach((item)=> {
        streamListDropdown.append(`<a class="dropdown-item" data-stream="${item.url}" href="#">${item.title}</a>`);
    });

    $("#dropdownMenuButton").text(streamList[0].title);
    myAudio.src = streamList[0].url;


    types.forEach(function (type) {
        let isSupp = myAudio.canPlayType(type);
        suppInfoTxt += type + ":" + isSupp + '<br>';
        console.log(type, ":", isSupp);
    });
    $("#suppInfo span").html(suppInfoTxt);


    $('#streamList a').click(function (e) {
        e.preventDefault();
        myAudio.pause();
        console.log($(this));
        myAudio.src = $(this).data("stream");
        myAudio.volume = $("#volumeControl").val();
        myAudio.play();
        let label = $(this).text();
        $("#dropdownMenuButton").text(label);

        // myAudio.tracks = [];
        // myAudio.addTextTrack('metadata', label, "en"); // previously implemented as
        // myAudio.addTextTrack( newTrack );
        // let track = myAudio.addTextTrack("captions", "English", "en");
        // track.mode = "showing";

        loadSongTitle();
    });

    let title = document.querySelector('.song-title');



    setInterval(function () {
        $("#time").text(Math.ceil(myAudio.currentTime) + " sec.");
        loadSongTitle();
    }, 2000);




    $("#volumeControl").change(function (e) {
        let val = $(this).val();
        console.log(`val:`, val);
        myAudio.volume = val;
    });


});



import {ajax} from "./ajax";

let myAudio = new Audio('http://94.23.53.96:500/;?icy=http');
let types = ["audio/mpeg", "audio/ogg", "audio/mp4"];
let suppInfoTxt = "";


ajax('./test-song-title.txt').then( response => console.log(`response:`, response) );

import { playerHtml } from './player.tpl'

document.addEventListener("DOMContentLoaded", function (event) {

    let script = document.querySelector("script[data-vendor=forradio]");
    let playerContainer = document.createElement("div");
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
        myAudio.tracks = [];
        myAudio.addTextTrack('metadata', label, "en"); // previously implemented as
        //myAudio.addTextTrack( newTrack );
        let track = myAudio.addTextTrack("captions", "English", "en");
        track.mode = "showing";
    });

    let title = document.querySelector('.song-title');

    setInterval(function () {
        $("#time").text(Math.ceil(myAudio.currentTime) + " sec.");
        //ajax(myAudio.src).then( response => title.value = response );
        ajax('http://localhost:4040/?url='+myAudio.src).then( response => title.value = response );
    }, 1000);


    $("#volumeControl").change(function (e) {
        let val = $(this).val();
        console.log(`val:`, val);
        myAudio.volume = val;
    });

    // ajax("http://5.39.32.176/player/test-song-title.txt", (response)=>{
    ajax("https://open.cinegy.com/robots.txt", (response)=>{
        console.log(`response:`, response);
    });

});


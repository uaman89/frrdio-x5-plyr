"use strict";

var myAudio = new Audio('http://94.23.53.96:500/;?icy=http');
var types = ["audio/mpeg", "audio/ogg", "audio/mp4"];
var suppInfoTxt = "";

//context = new AudioContext();

var streamList = [{ title: "RadioRoks (aac?)", url: "http://online-radioroks.tavrmedia.ua:7000/RadioROKS_32" }, { title: "Hubu.FM (showcast)", url: "http://94.23.53.96:500/;?icy=http" }, { title: "DerFm", url: "http://s2.radioboss.fm:8066/stream" }, { title: "energylove", url: "http://energylove.ice.infomaniak.ch/energylove-high.mp3" }];

var streamListDropdown = $("#streamList");

streamList.forEach(function (item) {
    streamListDropdown.append("<a class=\"dropdown-item\" data-stream=\"" + item.url + "\" href=\"#\">" + item.title + "</a>");
});

$("#dropdownMenuButton").text(streamList[0].title);
myAudio.src = streamList[0].url;

types.forEach(function (type) {
    var isSupp = myAudio.canPlayType(type);
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
    var label = $(this).text();
    $("#dropdownMenuButton").text(label);
    myAudio.tracks = [];
    myAudio.addTextTrack('metadata', label, "en"); // previously implemented as
    //myAudio.addTextTrack( newTrack );
    var track = myAudio.addTextTrack("captions", "English", "en");
    track.mode = "showing";
});

setInterval(function () {
    $("#time").text(Math.ceil(myAudio.currentTime) + " sec.");
}, 1000);

$("#volumeControl").change(function (e) {
    var val = $(this).val();
    console.log("val:", val);
    myAudio.volume = val;
});

/**
 * Created by uaman on 12.03.2017.
 */
const playerHtml = `<div class="player-wrapper d-flex flex-column">
    <input class="song-title form-control" type="text">
    <div class="d-flex justify-content-center pt-2 pb-4">


        <div class="dropdown d-inline">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                loading...
            </button>
            <div id="streamList" class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <!--<a class="dropdown-item" data-stream="http://94.23.53.96:500/;?icy=http" href="#">Hubu.FM (showcast)</a>-->
            </div>
        </div>

        <div class="btn-group">
            <button id="play" class="btn btn-primary">Play</button>
            <button id="stop" class="btn btn-danger">Pause</button>
        </div>

        <span id="time" class="form-control"></span>

    </div>

    <div class="d-flex justify-content-center">
        <input id="volumeControl" type="range" max="1" min="0" step="0.001">
    </div>
</div>`;

export { playerHtml };

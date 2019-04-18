function setup() {
    var clip = document.getElementById("clip")
    var protocol = window.location.proto == 'https' ? 'wss' : 'ws'
    var ws = new WebSocket(protocol + '://' + window.location.hostname + ':' + window.location.port + '/clip')
        ws.onmessage = (event) => {
            clip.value = event.data;
        };

    clip.addEventListener('keyup', (event) => {
        ws.send(clip.value)
    })
};
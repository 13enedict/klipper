const express = require('express')
const ws = require('ws')
const http = require("http")
const app = express()
const server = http.createServer(app);
//const expressws = require('express-ws')(app)
const port = process.env.port || 3000

var clipContent = ''
var clients = new Set();

wss = new ws.Server({server: server, path: '/clip'})

app.use('/', express.static("public"))

wss.on('connection', (ws) => {

    clients.add(ws)
    console.log("there are " + clients.size.toString() + " clients connected")

    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {

        //log the received message and send it back to the client
        console.log('received: %s', message);
        clipContent = message


        console.log("there are " + clients.size.toString() + " clients connected")
        clients.forEach((cli) => {
            console.log("sending");
            cli.send(clipContent);
        })
    });

    ws.on('close', () => {
        clients.delete(ws);
    })

    //send immediatly a feedback to the incoming connection
    ws.send(clipContent);
});


server.listen(port, () => console.log(`Example app listening on port ${port}!`))
var fs = require('fs');
var express = require("express");
var bodyParser = require("body-parser");
var data = fs.readFileSync('db/data.json');
var chatObject = JSON.parse(data);
const PORT = process.env.PORT || 3000;
var app = express();

//middleware: request handling
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var server = app.listen(PORT, listening);

function listening() {
    console.log(`Server is listening on port ${PORT}!`);
}

app.use(express.static('public'));

//get chat data
app.get('/api/v1/chat', getChatData);

//add a chat element to data
app.post('/api/v1/chat', addChatDataElement);

//clear chat data
app.delete('/api/v1/chat', clearChatData);

function getChatData(request, response) {
    console.log('Getting Complete');
    response.json(chatObject.data);
}

function addChatDataElement(request, response) {
    chatObject.data.push({name: request.body.name, message: request.body.message, line: chatObject.data.length});
    var data = JSON.stringify(chatObject, null, 2);
    fs.writeFile('db/data.json', data, finished);

    function finished(err) {
        console.log('Writing Complete');
        response.json(chatObject.data);
    }
}

function clearChatData(request, response) {
    chatObject.data = [];
    var data = JSON.stringify(chatObject, null, 2);
    fs.writeFile('db/data.json', data, finished);

    function finished(err) {
        console.log('Writing Complete');
        response.json(chatObject.data);
    }
}


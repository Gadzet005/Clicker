const express = require("express");
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

const urlencodedParser = express.urlencoded({extended: false});

app.get("/", (req, res) => {
    res.json({
        hello: "hello world!"
    })
})

async function start() {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
}

app.post("/", urlencodedParser, function (request, response) { // register
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.userName} - ${request.body.userAge}`);
});

start();
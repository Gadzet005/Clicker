const express = require("express");
require('dotenv').config();

const port = process.env.PORT || 3000;
const app = express();

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

start();
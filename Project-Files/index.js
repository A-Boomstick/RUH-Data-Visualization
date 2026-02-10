const express = require("express");

const app = express();

app.use(express.urlencoded({extended: false}));

app.listen(3000, () => console.log("Listening on http://localhost:3000"));

app.use(express.static("./public"));

// localhost:3000/test

function getData(request, response) {
    console.log("Test activated!");
    response.send(Math.random());
}

app.get("/data", getData);
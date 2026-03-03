const express = require("express");
let mysql = require('mysql2');

const path = require('path');
const app = express();

app.use(express.urlencoded({extended: false}));

app.listen(3000, () => console.log("Listening on http://localhost:3000"));

//app.use(express.static("./public"));
app.use(express.static(path.join(__dirname, 'public')));

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bruh",
    database: "TestSet"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected")
    con.query("SELECT * FROM TestData", function (err, result, fields){
        if (err) throw err;
        console.log(JSON.stringify(result));
    });
});

function getDB(request, response) {
    console.log("Database Test Activated!")
    con.query("SELECT * FROM TestData", function(err, result, fields) {
        if (err) throw err;
        const data = result;
        console.log(data)
        response.send(data);
    })
    
}; 

// localhost:3000/test

function getData(request, response) {
    console.log("Test activated!");
    response.send(Math.random());
}

app.get("/data", getData);

app.get("/db", getDB); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});
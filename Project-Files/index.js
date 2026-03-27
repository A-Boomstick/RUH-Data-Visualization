const express = require("express");
let mysql = require('mysql2');

const path = require('path');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.listen(3000, () => console.log("Listening on http://localhost:3000"));


app.use(express.static(path.join(__dirname, 'public')));

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bruh",
    database: "RUHData"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected")
    con.query("SELECT * FROM StaffLogin", function (err, result, fields){
        if (err) throw err;
        console.log(JSON.stringify(result));
    });
});

function getDB(request, response) {
    console.log("Database Test Activated!")
    con.query("SELECT * FROM StaffLogin", function(err, result, fields) {
        if (err) throw err;
        const data = result;
        console.log(data)
        response.send(data);
    })
    
}; 

// localhost:3000/test



app.get("/db", getDB); 




app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
}); 
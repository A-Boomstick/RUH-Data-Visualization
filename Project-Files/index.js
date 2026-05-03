const express = require("express");
let mysql = require('mysql2');
const session = require('express-session');
const path = require('path');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: 'ruh-dashboard-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 8 * 60 * 60 * 1000 }
}));
app.listen(3000, () => console.log("Listening on http://localhost:3000"));


app.use(express.static(path.join(__dirname, 'public')));

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password1234!",
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

app.get("/tasks", function(req, res) {
    console.log("Getting tasks!")
    con.query("SELECT * FROM Task", function(err, result) {
        if (err) throw err;
        const data = result;
        console.log(data)
        res.send(data);
    })
});

// localhost:3000/test



app.get("/db", getDB);

app.get("/comments", function(req, res) {
    const sql = `
        SELECT rc.CommentID, rc.CommentText, rc.Panel, rc.PostedAt, sl.Username AS AuthorName
        FROM RecognitionComment rc
        JOIN StaffLogin sl ON rc.StaffID = sl.StaffID
        ORDER BY rc.PostedAt ASC
    `;
    con.query(sql, function(err, result) {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

app.post("/comments", function(req, res) {
    const { staffId, commentText, panel } = req.body;
    if (!staffId || !commentText || !panel) {
        return res.status(400).json({ error: "Missing fields" });
    }
    if (panel !== 'coaching' && panel !== 'teammate') {
        return res.status(400).json({ error: "Invalid panel" });
    }

    con.query("SELECT AccessLevel FROM StaffLogin WHERE StaffID = ?", [staffId], function(err, rows) {
        if (err || rows.length === 0) return res.status(400).json({ error: "User not found" });
        if (panel === 'coaching' && rows[0].AccessLevel < 2) {
            return res.status(403).json({ error: "Insufficient access level" });
        }

        con.query(
            "INSERT INTO RecognitionComment (StaffID, CommentText, Panel) VALUES (?, ?, ?)",
            [staffId, commentText, panel],
            function(err, result) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ CommentID: result.insertId });
            }
        );
    });
});

app.post('/login', function(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing credentials' });
    }
    con.query(
        'SELECT * FROM StaffLogin WHERE Username = ? AND Password = ?',
        [username, password],
        function(err, rows) {
            if (err) return res.status(500).json({ error: err.message });
            if (rows.length === 0) return res.status(401).json({ error: 'Invalid username or password' });
            req.session.user = rows[0];
            res.json({ success: true });
        }
    );
});

app.get('/session', function(req, res) {
    if (!req.session.user) return res.status(401).json({ error: 'Not logged in' });
    res.json(req.session.user);
});

app.post('/logout', function(req, res) {
    req.session.destroy();
    res.json({ success: true });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});
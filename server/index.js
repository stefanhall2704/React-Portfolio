const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const app = express();
const sqlite3 = require('sqlite3').verbose();
let ApplicationUserTable;
let sql_instert;


const db = new sqlite3.Database('./portfolio.db', sqlite3.OPEN_READWRITE,(err) => {
    if (err) return console.error(err.message);
});

// sql = 'CREATE TABLE ApplicationUser(id INTEGER PRIMARY KEY,FirstName,LastName,Email,Password,PhoneNumber)';
ApplicationUserTable = 'INSERT INTO ApplicationUser(FirstName,LastName,Email,Password,PhoneNumber) VALUES(?,?,?,?,?)';
// sql_instert = "SELECT * FROM ApplicationUser";
// db.all(sql_instert, (err, rows) => {
//     console.log(rows);
//     if (err) return console.error(err.message);
// });
// db.run(sql,["Stefan", "Hall", "stefhall.2704@gmail.com", "Password123", "8049304783"],(err) =>{
//     if (err) return console.error(err.message);
// });

// app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/api/get", (req, res) => {
    const sql = "SELECT * FROM ApplicationUser";

    db.all(sql, (err, rows)=> {
        console.log(rows);
        if (err) return console.error(err.message);
    });
});



app.post("/api/user/create", (req, res) => {

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const email = req.body.email;
    const password = req.body.password;
    const phone_number = req.body.phone_number;

    const sql = "INSERT INTO ApplicationUser(FirstName,LastName,Email,Password,PhoneNumber) VALUES(?,?,?,?,?)"

    db.run(sql, [first_name, last_name, email, password, phone_number], (err, result)=> {
        if (err) {
            console.error(err.message);
        }else {
            console.log(result);
        }
    });
});

app.listen(3001, () => {
    console.log('running on port 3001');
});
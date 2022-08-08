const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

// Initialize Table Variables
let ApplicationUserTable;
let ProjectTable;


const db = new sqlite3.Database('./portfolio.db', sqlite3.OPEN_READWRITE,(err) => {
    if (err) return console.error(err.message);
});

ApplicationUserTable = 'CREATE TABLE ApplicationUser(id INTEGER PRIMARY KEY,FirstName,LastName,Email,Password,PhoneNumber)';
ProjectTable = 'CREATE TABLE Project(ID INTEGER PRIMARY KEY,Title,URL,UserId,FOREIGN KEY (UserId) REFERENCES ApplicationUser(id))';

// START POSSIBLE CHANGE FOR DB TABLE CREATION
// let table_array = [];
// table_array.push(ApplicationUserTable, ProjectTable);
// for (let i = 0; i < table_array.length; i++) {
//     db.run(table_array,(err) =>{
//         if (err) return console.error(err.message);
//     });
//   }
// END POSSIBLE CHANGE FOR DB TABLE CREATION


// TURN FUNCTION ON WHEN CREATING A NEW TABLE
// db.run(ProjectTable, (err, res) => {
//     if (err){
//         console.error(err.message);
//     } else {
//         console.log(res);
//     }
// })


// app.use(cors());
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/api/get/users", (req, res) => {
    const sql = "SELECT * FROM ApplicationUser";

    db.all(sql, (err, rows)=> {
        console.log(rows);
        if (err) return console.error(err.message);
    });
});

app.get("/api/get/projects", (req, res) => {
    const sql = "SELECT * FROM Project";

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

app.post("/api/project/create", (req, res) => {

    const project_title = req.body.project_title;
    const project_url = req.body.project_url;
    const user_id = req.body.user_id;

    const sql = "INSERT INTO Project(Title,URL,UserId) VALUES(?,?,?)"

    db.run(sql, [project_title, project_url, user_id], (err, result)=> {
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
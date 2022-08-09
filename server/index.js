const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const router = express.Router();
const path = require('path');
const url = require('url');

// Initialize Table Variables
let ApplicationUserTable;
let ProjectTable;

// DB
const db = new sqlite3.Database('./portfolio.db', sqlite3.OPEN_READWRITE,(err) => {
    if (err) return console.error(err.message);
});

// CREATE TABLE SQL VARIABLES
ApplicationUserTable = 'CREATE TABLE ApplicationUser(id INTEGER PRIMARY KEY,FirstName,LastName,Email,Password,PhoneNumber)';
ProjectTable = 'CREATE TABLE Project(ID INTEGER PRIMARY KEY,Title,URL,UserId,FOREIGN KEY (UserId) REFERENCES ApplicationUser(id))';

// DB TABLE CREATION CHECKER
let table_array = [];
table_array.push(ApplicationUserTable, ProjectTable);
for (let table = 0; table < table_array.length; table++) {
    db.run(table_array[table],(err) =>{
        if (err.message.includes("already exists")){
            return console.log("No issues");
        }else{
            return console.error(err.message);
        };
    });
  }


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

// START GET API METHODS
//GET USER BY USER ID
app.get("/api/user/:id", (req, res) => {
    const user_id = req.params.id;
    const sql = `SELECT * FROM ApplicationUser WHERE id = ${user_id}`;

    db.all(sql, (err, rows)=> {
        let user_data;
        const output = rows[0]
        const first_name = output.FirstName;
        const last_name = output.LastName;
        const email = output.Email;
        const phone_number = output.PhoneNumber;
        user_data = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "phone_number": phone_number
        };

        console.log(user_data);
        if (err) return console.error(err.message);
    });
});


// GET ALL USER
app.get("/api/users", (req, res) => {
    const sql = "SELECT * FROM ApplicationUser";

    db.all(sql, (err, rows)=> {
        const user_data = [];
        let first_name;
        let last_name;
        let email;
        let phone_number;
        for (let i = 0; i < rows.length; i++) {
            first_name = rows[i].FirstName;
            last_name = rows[i].LastName;
            email = rows[i].Email;
            phone_number = rows[i].PhoneNumber;
            user_data.push({
                "first_name": first_name,
                "last_name": last_name,
                "email": email,
                "phone_number": phone_number
            });
        };

        console.log(user_data);
        if (err) return console.error(err.message);
    });
});

//GET ALL PROJECTS
app.get("/api/projects", (req, res) => {
    const sql = "SELECT * FROM Project";
    db.all(sql, (err, rows)=> {
            if (err) return console.error(err.message);
        console.log(user_data);
        console.log(rows);
        if (err) return console.error(err.message);
    });
});



// GET PROJECT BY ID
app.get("/api/project/:id", (req, res) => {
    const project_id = req.params.id;
    const sql = `SELECT * FROM Project WHERE ID = ${project_id}`;
    let output;
    db.all(sql, (err, rows)=> {
        if (err) return console.error(err.message);
        const project_data = rows[0];
        const user_id = project_data["UserId"];
        const project_title = project_data["Title"];
        const project_url = project_data["URL"];
        const user_sql = `SELECT * FROM ApplicationUser WHERE ID = ${user_id}`;
        db.all(user_sql, (err, rows) => {
            if (err) return console.error(err.message);
            let first_name;
            let last_name;
            const user_data = rows[0];
            first_name = user_data["FirstName"];
            last_name = user_data["LastName"];
            output = {
                "Title": project_title,
                "URL": project_url,
                "FirstName": first_name,
                "LastName": last_name
            };
            console.log(output);
        });

        
    });
}); 
// END GET API METHODS

// START POST API METHODS
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

// END POST API METHODS
router.get("/project/create",function(req,res) {
    res.sendFile(path.join(__dirname+'/create_project.html'));
  });
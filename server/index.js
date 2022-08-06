const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');



const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'mydb'
});

app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.urlencoded({extended: true}));


app.get("/api/get", (req, res) => {
    const sql_insert = "SELECT * FROM ApplicationUser";

    db.query(sql_insert, (err, result)=> {
        console.log("Hello");
        console.log(result);
    });
});



app.post("/api/project/create", (req, res) => {

    const project_title = req.body.project_title;
    const project_link = req.body.project_link;
    const user_id = req.body.user_id;

    const sql_insert = "INSERT INTO UserProject (ProjectName, URL, UserId) VALUES (?,?)"

    db.query(sql_insert, [project_title, project_link, user_id], (err, result)=> {
        console.log(result);
    });
});

app.listen(3001, () => {
    console.log('running on port 3001');
});
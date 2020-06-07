const express = require('express');
const mysql = require('mysql2');
const app = express();
let cors = require('cors')

app.use(cors())
app.use(express.json());

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: '35.194.85.1',
    user: 'root',
    password: 'deep6844',
    database: 'assignment2'
});

db.connect((err) => {
    if (err) {
        console.log("---------------------------------------"+err)
        throw err;
    }
    console.log('Mysql Connected Successful');
});

const jsonParser = bodyParser.json()
app.post('/api/register', jsonParser, (req, res) => {
    let name = req.body.newValues.name;
    let email = req.body.newValues.email;
    let password = req.body.newValues.password;
    let topic = req.body.newValues.topic;
    console.log(req.body.newValues);
    let sqlSelect = 'SELECT * FROM user_details WHERE email ="' +  email + '";';
    let sql = 'INSERT INTO user_details values( "' + name + '", "' + email + '", "' + password +'", "' + topic + '");';
    console.log(sqlSelect);
    let querySelect = db.query(sqlSelect, (err, result) => {
        console.log(result);
        if (result == "") {
            console.log('User details to be inserted');
            let query = db.query(sql, (err, user) => {
                if (err) {
                    throw err;
                }
                console.log(`User details (${name}, ${email}, ${topic}) inserted in the table`);
                res.send(`User details (${name}, ${email}, ${topic}) inserted in the table`);
            });
        }
        else {
            console.log(`User with email: ${email} exists already`);
            res.status(404).send(`User with email: ${email} exists already`);
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('listening on port....' + port));
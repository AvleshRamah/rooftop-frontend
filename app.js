const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const mysql = require('mysql2');



const app = express();
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(session({
    secret: 'session',
    resave: false,
    saveUninitialized: true
}));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'rooftop',
});

db.connect((err) => {
    if(err){
        console.error('Database connection failed: ', err);
    }else{
        console.log('Connected to the database');
    }
});

const calculationRoutes = require('./routes/calculate');
app.use('/', calculationRoutes);

const callBackRoutes = require('./routes/callback') (db);
//app.use('/', callBackRoutes);
app.use('/', callBackRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, "views"));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
    const results = req.session.results || { systemSize: '', totalSystemCost: '', estimatedInstallments: ''};
    res.render('index', results);
});

app.listen(1000, function(){
    console.log('App listening on port 1000!');
});


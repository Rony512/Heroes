require('./config/config');

const express = require('express');
const path = require('path');
const app = express();
var mysql = require('mysql');

const bodyParser = require('body-parser');



//mysql db connection
var db = mysql.createConnection({
    host     : 'ec2-3-217-159-183.compute-1.amazonaws.com',
    user     : 'test',
    password : 'fortnite',
    database : 'heroes'
});

db.connect(function(err) {
    if (err) throw err;
    else console.log("database Connected")
});
global.db = db;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, './public')));

// Configuración global de rutas
app.use(require('./lib/routes'));


app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});
const express = require('express');
var heroController = require('../controllers/hero_information');


let app = express();


app.post('/heroes',heroController.create);
app.get('/heroes', heroController.findByparameters);
app.get('/heroes/:id', heroController.findById);
app.put('/heroes/:id',heroController.update);
app.delete('/heroes/:id',heroController.delete);

module.exports = app;


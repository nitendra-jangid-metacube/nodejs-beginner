const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {check, validationResult} = require('express-validator')

const homeRoutes = require('./routers/home')

const app = express();

mongoose.connect('mongodb://localhost:27017/studentdetails', {useNewUrlParser: true})

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

app.use('/', homeRoutes);

app.listen(3000);
require('dotenv').config()


const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')

// database setup
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true
    }
);


// view engine
app.set('view engine', 'ejs')


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(
    '/files', 
    express.static(path.resolve(__dirname, 'tmp','uploads')))

const routers = require('./src/router')
app.use('/', routers)



var porta = 80
app.listen(porta, () => {
    console.log(`Servidor rodando na porta ${porta}`)
})
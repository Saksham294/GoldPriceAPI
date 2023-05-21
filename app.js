const express = require("express")
const app = express()
var cors = require('cors');
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json({
    limit: "50mb"
}))

module.exports = app 


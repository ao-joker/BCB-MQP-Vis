//npm installed packages that are necessary for this transfer and reading to occur
const express = require("express")
const mutler = require("multer")
const uuid = require("uuid").v4     //Specific function for id import/export

const app = express()
app.use(express.static("public"))


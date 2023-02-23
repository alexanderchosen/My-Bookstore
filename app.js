const express = require ("express")
const bodyParser = require ("body-parser")
const CONFIG = require ("./config/config")
const connectToDb = require("./database/mongoDb")


const app = express()

// connect to database
connectToDb()

// add bodyparser middleware for both url and forms-encoded
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.get("/", (req, res) =>{
    res.send ("Welcome to your favorite Bookstore!")
})

// to start server
app.listen(CONFIG.PORT, ()=>{
    console.log(`Server started on https://localhost:${CONFIG.PORT}`)
}) 


 


 
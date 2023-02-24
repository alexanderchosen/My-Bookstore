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
    res.send("Welcome to your favorite Bookstore!")
})

// error handler MW
app.use((err, req, res, next)=>{
    console.log(err)

    const errorStatus = err.status || 500

    res.status(errorStatus).send("An error occured")

    next()
})


// to start server
app.listen(CONFIG.PORT, ()=>{
    console.log(`Server started on http://localhost:${CONFIG.PORT}`)
}) 


 


 
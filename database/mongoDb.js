const mongoose = require("mongoose")
const CONFIG = require("../config/config")

function connectToDb(){
    mongoose.set('strictQuery', true) //  done to suppress warning of strictQuery switching back to false in mongoose 7
    mongoose.connect(CONFIG.MONGODB_URL)
   

    mongoose.connection.on("connected", ()=>{
        console.log("Connection to MongoDB successful")
    })

    mongoose.connection.on("error", ()=>{
        console.log("Connection to MongoDB failed")
    })
}


module.exports = connectToDb
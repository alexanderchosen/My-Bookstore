const express = require ("express")
const bodyParser = require ("body-parser")
const CONFIG = require ("./config/config")
const rateLimiter = require("express-rate-limit")
const helmet = require("helmet")
const connectToDb = require("./database/mongoDb")

// Routes
const bookRouter = require("./routes/books")
const authorRouter = require("./routes/authors")


const app = express()

// connect to database
connectToDb()

// add bodyparser middleware for both url and forms-encoded
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const limiter = rateLimiter({
	windowMs: 1440 * 60 * 1000, // 24 hours = 1440 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 24 hours)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

// custom rate-limiter for creating new authors per IP
const createAuthorLimiter = rateLimiter({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 1, // Limit each IP to 1 create account requests per `window` (here, per hour)
	message:
		'Too many authors created from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
// apply to only the create new author's route
app.use("/api/v1/authors/create", createAuthorLimiter)

// use helmet MW to protect from some web vulnerabilities
app.use(helmet())

app.use("/api/v1/books",bookRouter)
app.use("/api/v1/authors", authorRouter)

app.get("/", (req, res) =>{
    res.status(200).send("Welcome to your favorite Bookstore!")
})

// error handler MW
app.use((err, req, res, next)=>{
    console.log(err)

    const errorStatus = err.status || 500

    
    res.status(errorStatus).send(err.message)

   // res.status(errorStatus).json({
     //   status: false,
       // message: err.message
   // })
    next()
})


// to start server
app.listen(CONFIG.PORT, ()=>{
    console.log(`Server started on http://localhost:${CONFIG.PORT}`)
})




 


 
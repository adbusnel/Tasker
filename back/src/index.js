require('dotenv').config({ path: '../.env' })

const express = require('express')
const http = require('http')
const cors = require('cors')
const RateLimit = require('express-rate-limit')

const app = express()
const router = require('./routes/router.js')
const { dbConnection } = require('./config/db.js')
const sanitizer = require('./middleware/sanitize')
const httpPort = process.env.HTTP_EXPRESS_PORT || 3000

/**
 * Set Limiter to prevent DDoS attack
 */
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20
})

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    allowedHeaders:['Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization, Cache-Control, x-auth-token'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH']
}

async function startServer() {
    const dbCo = await dbConnection('portfolio');
    if (dbCo) {
        try {
            app.use(cors(corsOptions))
            app.use(express.json())
            app.use(express.urlencoded({ extended: true }))
            if (process.env.NODE_ENV === 'production') {
                app.use(limiter)
            }
            app.use('/', sanitizer, router)
            console.log(`Server is running on port ${httpPort}`)
            const serverHttp = http.createServer(app)
            serverHttp.listen(httpPort)
        } catch (error) {
            console.error('Error starting server:', error)
        }
    }
}

startServer()
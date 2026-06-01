const mongoose = require('mongoose');
const dbDefault = require('./db.default')

async function dbConnection(databaseName) {
    const dbUri = process.env.MONGODB_URI || `mongodb://${process.env.HOSTNAME || 'localhost'}:27017/${databaseName}`
    try {
        mongoose.set('strictQuery', true)
        const connectionParams = {
            socketTimeoutMS: 1000,
            connectTimeoutMS: 1000,
            serverSelectionTimeoutMS: 1000,
            dbName: databaseName
        }
        await mongoose.connect(dbUri, connectionParams)
        console.log('Connected to MongoDB')
        await dbDefault()
        return true
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        console.log('Retrying connection in 5 seconds...')
        setTimeout(() => dbConnection(databaseName), 5000)
        return false
    }
}

module.exports = { dbConnection }
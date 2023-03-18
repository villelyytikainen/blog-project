const express = require('express')
const app = express()
const path = require('path')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const postRouter = require('./routes/BlogRoutes')
const port = 3001

dotenv.config()

const connectToMongo = async () => {
    await mongoose.connect(process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
}

connectToMongo().catch(err => console.error(err))

app.use(express.static('../client/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/posts', postRouter)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.listen(port);

module.exports = app
const express = require('express')
const app = express()
const path = require('path')
const dotenv = require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const postRouter = require('./routes/BlogRoutes')
//const openai = require('./services/OpenAI')
const port = 3001


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

//openai.sendPrompt().then((req,res) => console.log(req.data.choices))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'))
})

app.get('/ad', (req,res) => {
    res.sendFile(path.join(__dirname, '../client/ad.html'))
})

app.listen(port);

module.exports = app
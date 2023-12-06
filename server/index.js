const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postRouter = require("./routes/BlogRoutes");
const userRouter = require("./routes/UserRoutes");
const port = 3001;

const connectToMongo = async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

connectToMongo().catch((err) => console.error(err));

app.use(express.static("../client/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

app.use((req, res, next) => {
    if (res.status(404)) {
        res.redirect("/");
    }
});

app.listen(port);

module.exports = app;

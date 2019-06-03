const express = require('express');
const path = require('path');

const config = require('./config/config');

const app = express();
// var server = require('http').Server(app);
app.use(express.static('dist'));

app.get("*", (req, res) => {
    console.log(1111, __dirname);
    res.sendFile(path.resolve(__dirname, "dist/index.html"));
});


app.listen(4000, config.SERVER_URL, () => {
    console.log("Server is running on port " + config.SERVER_URL + ":4000");
});
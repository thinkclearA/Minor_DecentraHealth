const express = require('express');
const dotenv = require('dotenv').config()
const mongoose = require('mongoose');
const http = require('http');
const cors = require('cors');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const morgan=require('morgan');
const fileupload = require("express-fileupload");
const app = express();
const server = http.createServer(app);

app.use(fileupload());
app.use(morgan('tiny'));
app.use([
    cors(),
    express.static("public"),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    routes,
]);
app.use(express.static("files"));

app.disable('etag');

mongoose.connect("mongodb+srv://srivyas:decentrahealth1234@decentrahealth.rkmod.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
const port = 8000;

app.get('/', (req, res) => {
    res.send("Hello from express");
})

server.listen(process.env.PORT || port, () => {
    console.log(process.env.MONGO_URL);
    console.log(`Server is running on port ${port}!`);
});

// export default index;
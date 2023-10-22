const express = require("express");
const app=express();
const studentRouter=require("./router/StudentRouter")

const port =process.env.port|| 5000;
app.use(express.json());

let options={origin:'http://localhost:3001/'}
const cors = require('cors');
app. use( cors());
//app.use(cors(studentRouter.options))// npm install cors

app.use('/students',studentRouter);

app.use(function (error, req, res, next) {
    res.status(500).send('Something wrong');
});

app.listen(port,()=> {
    console.log("server is started");
})
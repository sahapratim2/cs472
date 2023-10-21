const express = require("express");
const app=express();
const studentRouter=require("./router/StudentRouter")

const port =process.env.port|| 3000;
app.use(express.json());

app.use('/students',studentRouter);

app.use(function (error, req, res, next) {
    res.status(500).send('Something wrong');
});

app.listen(port,()=> {
    console.log("server is started");
})
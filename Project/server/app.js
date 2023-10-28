const express = require("express");
const app=express();
const userRouter=require("./routers/userRouter");
const accountRouter=require("./routers/accountRouter");
const transactionRouter=require("./routers/transactionRouter");

const port =process.env.port|| 5000;
app.use(express.json());

const cors = require('cors');
app. use(cors());

app.use('/users',userRouter);
app.use('/accounts',accountRouter);
app.use('/accountTransactions',transactionRouter);

app.use(function (error, req, res, next) {
    res.status(500).send('Something wrong');
});

app.listen(port,()=> {
    console.log("server is started");
})
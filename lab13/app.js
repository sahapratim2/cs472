const express = require('express');
const path = require('path');

const usersRouter = require('./routers/usersRouter');
const productRouter = require('./routers/productsRouter');

const app = express();

// middleware
app.use(express.static(path.join(__dirname, 'view')));
app.use('/users', usersRouter);
app.use('/products', productRouter);

app.use('/',(req, res, next) => {
    res.sendFile(path.join(__dirname+'./view/'+'index.html')); 
})

//error handling middleware
app.use(function (error, req, res, next) {
    //res.status(500).send('Something wrong');
    res.status(404).sendFile(path.join(__dirname+'/view/'+'404.html'));
});

app.listen(3001,()=>{
    console.log("server is started");
})


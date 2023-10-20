const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/../view/'+'users.html')); 
});

router.post('/', express.urlencoded({ extended: true }), (req, res, next) => {
    console.log(req.body);
    res.write('Thank you.' + ' In request body,');
    res.write('\n Name: ' + req.body.user);
    res.write('\n Email: ' + req.body.email); 
    res.end();
});

module.exports = router;


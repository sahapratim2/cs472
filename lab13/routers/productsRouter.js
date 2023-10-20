const express = require('express');
const router = express.Router();
const path = require('path');


router.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/../view/'+'products.html')); 
});

router.post('/', express.urlencoded({ extended: true }), (req, res, next) => {
    console.log(req.body);
    res.write('Thank you.' + ' In request body,');
    res.write('\n code: ' + req.body.productCode);
    res.write('\n product: ' + req.body.product);
    res.write('\n price: ' + req.body.price);
    res.write('\n Qty: ' + req.body.qty);
    res.end();
});

module.exports = router;


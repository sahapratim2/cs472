const express=require("express");

const transactionController=require('../controllers/transactionController');

const router=express.Router();

router.get('/:accountNumber',transactionController.getTransactions);
router.post('/',transactionController.createTransaction);

module.exports = router;
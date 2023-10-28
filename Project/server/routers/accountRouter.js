const express=require("express");

const accountController=require('../controllers/accountController');

const router=express.Router();


router.get('/',accountController.getAll);
router.get('/:accountNumber',accountController.getAccountByAccountNumber);
router.get('/ownAccount/:userId',accountController.getAccountByUserId);
router.get('/banificiary/:userId',accountController.getBanificiary);
router.get('/balance/:userId',accountController.getMyBalance);
router.post('/',accountController.createAccount);
router.delete('/:accountNumber',accountController.deleteAccount);
router.put('/:accountNumber',accountController.updateAccount);

module.exports = router;
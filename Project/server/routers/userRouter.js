const express=require("express");

const userController=require('../controllers/userController');

const router=express.Router();

router.get('/search?',userController.getUserByParameter);
router.get('/',userController.getAllUsers);
router.get('/:userId',userController.getUserByUserId);
router.post('/',userController.createUser);
router.delete('/:userId',userController.deleteUser);
router.put('/:userId',userController.updateUser);
router.get('/:userId',userController.getUserByUserId);
router.post('/auth',userController.getUser);


module.exports = router;
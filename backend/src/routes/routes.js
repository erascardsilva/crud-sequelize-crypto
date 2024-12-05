const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

router.post('/login', userController.login);

router.post('/create', userController.createUser);
router.get('/buscar', auth , userController.getAllUsers);
router.get('/buscar/:id', auth , userController.getUserById);
router.put('/atualizar/:id', auth, userController.updateUser);
router.delete('/deleta/:id', auth ,userController.deleteUser);


module.exports = router;
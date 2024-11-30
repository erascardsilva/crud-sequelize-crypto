const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { auth } = require('../middleware/auth');

router.post('/login', userController.login);

router.post('/create', userController.createUser);
router.get('/buscar', userController.getAllUsers);
router.get('/buscar/:id', userController.getUserById);
router.put('/atualizar/:id', userController.updateUser);
router.delete('/deleta/:id', userController.deleteUser);


module.exports = router;
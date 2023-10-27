const {Router} = require('express');
const router = Router();

const controller = require('../controllers/auth.controller');

const verifyToken = require('../middleware/verifyToken');

router.post('/registrarUsuario', verifyToken, controller.registrarUsuario);
router.post('/login', controller.login);
router.post('/validateToken', controller.validateToken);

module.exports = router;
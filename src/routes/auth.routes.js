const {Router} = require('express');
const router = Router();

const controller = require('../controllers/auth.controller');

router.post('/registrarUsuario', controller.registrarUsuario);
router.post('/login', controller.login);
router.post('/validateToken', controller.validateToken);

module.exports = router;
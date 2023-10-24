const {Router} = require('express');
const router = Router();

const controller = require('../controllers/gestion.controller');

router.post('/registrarEmpleado', controller.registrarEmpleado);
router.post('/getEmpleado', controller.getEmpleado);
router.put('/modificarEmpleado/:id_empleado', controller.modificarEmpleado);
router.delete('/eliminarEmpleado', controller.eliminarEmpleado);

module.exports = router;
const {Router} = require('express');
const router = Router();

const controller = require('../controllers/gestion.controller');
const verifyToken = require('../middleware/verifyToken');

router.post('/registrarEmpleado', verifyToken, controller.registrarEmpleado);
router.post('/getEmpleados', verifyToken, controller.getEmpleados);
router.put('/modificarEmpleado/:id_empleado', verifyToken, controller.modificarEmpleado);
router.delete('/eliminarEmpleado', verifyToken, controller.eliminarEmpleado);
router.get('/getEmpleadoId/:id_empleado', verifyToken, controller.getEmpleadoId);

module.exports = router;
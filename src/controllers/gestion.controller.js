const connection = require('../config/config');
const getAvalibleId = require('../middleware/avalibleId');

const registrarEmpleado = async(req, res) => {
    const id_empleado = await getAvalibleId({table: 'empleados', column: 'id_empleado', min: 100, max: 999});
        
    const { nombre, apellidos, telefono, correoElectronico, direccion } = req.body;
    const query = 'INSERT INTO empleados (id_empleado, nombre, apellidos, telefono, correoElectronico, direccion) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [id_empleado, nombre, apellidos, telefono, correoElectronico, direccion], (err, rows) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json({
                message: 'Empleado registrado con éxito',
                id_empleado: id_empleado,
                nombre: nombre,
            });
        }
    });
}

const getEmpleados = async(req, res) => {
    const { nombre } = req.body;
    const query = 'SELECT * FROM empleados WHERE LOWER(nombre) LIKE ?';
    connection.query(query, [`%${nombre.toLowerCase()}%`], (err, rows) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json(rows);
        }
    });
}

const getEmpleadoId = async(req, res) => {
    const { id_empleado } = req.params;
    const query = 'SELECT * FROM empleados WHERE id_empleado = ?';
    connection.query(query, [id_empleado], (err, rows) => {
        if (err) {
            return res.status(400).json(err);
        }

        if (rows.length === 0) {
            return res.status(501).json({
                message: 'Empleado no encontrado',
            });
        }
        
        
        res.status(200).json(rows[0]);
    });
}

const modificarEmpleado = async(req, res) => {
    const { id_empleado } = req.params;
    const { nombre, apellidos, telefono, correoElectronico, direccion } = req.body;
    const query = 'UPDATE empleados SET nombre = ?, apellidos = ?, telefono = ?, correoElectronico = ?, direccion = ? WHERE id_empleado = ?';
    connection.query(query, [nombre, apellidos, telefono, correoElectronico, direccion, id_empleado], (err, rows) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json({
                message: 'Empleado modificado con éxito',
                id_empleado: id_empleado,
                nombre: nombre,
                apellidos: apellidos,
                telefono: telefono,
                correoElectronico: correoElectronico,
                direccion: direccion,
            });
        }
    });
}

const eliminarEmpleado = async(req, res) => {
    const { id_empleado } = req.body;
    const query = 'DELETE FROM empleados WHERE id_empleado = ?';
    connection.query(query, [id_empleado], (err, rows) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(200).json({
                message: 'Empleado eliminado con éxito',
                id_empleado: id_empleado,
            });
        }
    });
}

module.exports = {
    registrarEmpleado,
    getEmpleados,
    modificarEmpleado,
    eliminarEmpleado,
    getEmpleadoId,
}
const connection = require('../config/config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getAvalibleId = require('../middleware/avalibleId');

const registrarUsuario = async(req, res) => {
    const id_usuario = await getAvalibleId({table: 'usuarios', column: 'id_usuario', min: 100, max: 999});
    const {usuario, contrasena, descripcion, pkmFavorito, id_empleado} = req.body;

    const salt = await bcrypt.genSalt(10);
    const hash_contrasena = await bcrypt.hash(contrasena, salt);

    const query = 'INSERT INTO usuarios (id_usuario, usuario, hash_contrasena, descripcion, pkmFavorito, id_empleado) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(query, [id_usuario, usuario, hash_contrasena, descripcion, pkmFavorito, id_empleado], (err, rows) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json({
                message: 'Usuario registrado con éxito',
                id_usuario: id_usuario,
                usuario: usuario,
            });
        }
    });
}

const login = async(req, res) => {
    const {usuario, contrasena} = req.body;
    const query = 'SELECT * FROM usuarios WHERE usuario = ?';
    connection.query(query, [usuario], async(err, rows) => {
        if (err) {
            res.status(400).json(err);
        } else {
            if (rows.length > 0) {
                const validPassword = await bcrypt.compare(contrasena, rows[0].hash_contrasena);
                if (validPassword) {
                    const token = jwt.sign({
                        id_usuario: rows[0].id_usuario,
                        usuario: rows[0].usuario,
                    }, process.env.JWT_SECRET, { expiresIn: '1h' });
                    res.status(200).json({
                        message: 'Usuario logeado con éxito',
                        id_usuario: rows[0].id_usuario,
                        usuario: rows[0].usuario,
                        token: token,
                    });
                } else {
                    res.status(401).json({
                        message: 'Usuario o contraseña incorrectos',
                    });
                }
            } else {
                res.status(401).json({
                    message: 'Usuario o contraseña incorrectos',
                });
            }
        }
    });
}

const validateToken = async(req, res) => {
    const token = req.header('auth-token');
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({
                message: 'Token inválido',
            });
        } else {
            res.status(200).json({
                message: 'Token válido',
            });
        }
    });
}

module.exports = {
    registrarUsuario,
    login,
    validateToken,
}

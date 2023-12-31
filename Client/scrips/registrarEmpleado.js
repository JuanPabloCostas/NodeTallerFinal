// registrarEmpleado.js

import { showMessage } from './showMessage.js';

const form = document.getElementById('registrarEmpleadoForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {
        nombre: formData.get('nombre'),
        apellidos: formData.get('apellidos'),
        telefono: formData.get('telefono'),
        correoElectronico: formData.get('correo'),
        direccion: formData.get('direccion'),
    };

    fetch('https://becastest1.ue.r.appspot.com/api/gestion/registrarEmpleado', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al registrar el empleado');
        }
        return response.json();
    })
    .then(result => {
        console.log('Success:', result);
        showMessage('Empleado registrado exitosamente');
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage(error.message);
    });
}
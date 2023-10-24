// registrarEmpleado.js

import { showMessage } from './showMessage.js';

const form = document.getElementById('registrarEmpleadoForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {
        nombre: formData.get('nombre'),
        apellido: formData.get('apellido'),
        email: formData.get('email'),
        password: formData.get('password'),
        rol: formData.get('rol'),
    };

    fetch('http://localhost:3003/api/gestion/registrarEmpleado', {
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
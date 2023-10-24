// buscarEmpleado.js

import { showMessage } from './showMessage.js';

const form = document.getElementById('buscarEmpleadoForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {
        nombre: formData.get('nombre')
    };

    fetch('http://localhost:3003/api/gestion/getEmpleado', {
        method: 'GET',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al buscar el empleado');
        }
        return response.json();
    })
    .then(result => {
        console.log('Success:', result);
        showMessage('Empleado encontrado exitosamente');
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage(error.message);
    });
}
// registrarUsuario.js

import { showMessage } from './showMessage.js';

const form = document.getElementById('registrarUsuarioForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {
        usuario: formData.get('usuario'),
        contrasena: formData.get('contrasena'),
        descripcion: formData.get('descripcion'),
        pkmFavorito: formData.get('pkmFavorito'),
        id_empleado: formData.get('id_empleado'),
    };

    fetch('https://becastest1.ue.r.appspot.com/api/auth/registrarUsuario', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al registrar el usuario');
        }
        return response.json();
    })
    .then(result => {
        console.log('Success:', result);
        showMessage('Usuario registrado exitosamente');
        form.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage(error.message);
    });
}
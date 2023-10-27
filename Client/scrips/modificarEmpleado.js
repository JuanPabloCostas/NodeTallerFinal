// Actualizar empleado
import { showMessage } from './showMessage.js';




// get id of the employee on load
// example url: http://127.0.0.1:5500/Client/modificarEmpleado.html?100
// id is 100 in this case
const id = window.location.search.split('?')[1];

// get employee data
fetch(`https://becastest1.ue.r.appspot.com/api/gestion/getEmpleadoId/${id}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
    },
})
.then(response => {
    if (!response.ok) {
        if (response.status === 501) {
            throw new Error('Error al obtener el empleado');
        }
        throw new Error('Error al obtener el empleado');
    }
    return response.json();
})
.then(result => {
    // console.log('Success:', result);
    showMessage('Empleado encontrado exitosamente');
    document.getElementById('id_empleado').value = result.id_empleado || "";
    document.getElementById('nombre').value = result.nombre || "";
    document.getElementById('apellidos').value = result.apellidos || "";
    document.getElementById('telefono').value = result.telefono || "";
    document.getElementById('correoElectronico').value = result.correoElectronico || "";
    document.getElementById('direccion').value = result.direccion || "";

    document.getElementById('nombre').disabled = false;
    document.getElementById('apellidos').disabled = false;
    document.getElementById('telefono').disabled = false;
    document.getElementById('correoElectronico').disabled = false;
    document.getElementById('direccion').disabled = false;
    document.getElementById('submitButton').disabled = false;

})
.catch(error => {
    console.error('Error:', error);
});

const formFetch = document.getElementById('formFetch');
formFetch.addEventListener('submit', handleFetch)

function handleFetch(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = formData.get('id_empleado')

    fetch(`https://becastest1.ue.r.appspot.com/api/gestion/getEmpleadoId/${data}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
        },
    })
    .then(response => {
        if (!response.ok) {
            if (response.status === 501) {
                showMessage("Empleado no encontrado")
                throw new Error('Error al buscar el empleado');
            }
            throw new Error('Error al actualizar el empleado');
        }
        return response.json();
    })
    .then(result => {
        showMessage("Empleado encontrado")
        const submitButton = document.getElementById('submitButtonSearch');
        submitButton.disabled = true;
        document.getElementById('id_empleado').disabled = true;

        document.getElementById('nombre').value = result.nombre || "";
        document.getElementById('apellidos').value = result.apellidos || "";
        document.getElementById('telefono').value = result.telefono || "";
        document.getElementById('correoElectronico').value = result.correoElectronico || "empty";
        document.getElementById('direccion').value = result.direccion || "";

        
        document.getElementById('nombre').disabled = false;
        document.getElementById('apellidos').disabled = false;
        document.getElementById('telefono').disabled = false;
        document.getElementById('correoElectronico').disabled = false;
        document.getElementById('direccion').disabled = false;
        document.getElementById('submitButton').disabled = false;


    })
}

const form = document.getElementById('actualizarEmpleadoForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    const id = document.getElementById('id_empleado').value

    const formData = new FormData(this);
    const data = {
        nombre: formData.get('nombre'),
        apellidos: formData.get('apellidos'),
        telefono: formData.get('telefono'),
        correoElectronico: formData.get('correoElectronico'),
        direccion: formData.get('direccion'),
    };

    console.log(data);

    fetch(`https://becastest1.ue.r.appspot.com/api/gestion/modificarEmpleado/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
        },
    })
    .then(response => {
        if (!response.ok) {
            showMessage('Error al actualizar el empleado')
            throw new Error('Error al actualizar el empleado');
        }
        return response.json();
    })
    .then(result => {
        console.log('Success:', result);
        showMessage('Empleado actualizado exitosamente');
        form.reset();
        formFetch.reset();

        document.getElementById('submitButtonSearch').disabled = false;
        document.getElementById('id_empleado').disabled = false;

        document.getElementById('nombre').disabled = true;
        document.getElementById('apellidos').disabled = true;
        document.getElementById('telefono').disabled = true;
        document.getElementById('correoElectronico').disabled = true;
        document.getElementById('direccion').disabled = true;
        document.getElementById('submitButton').disabled = true;
        
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage(error.message);
    });
}


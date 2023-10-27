// buscarEmpleado.js

import { showMessage } from './showMessage.js';

const form = document.getElementById('buscarEmpleadoForm');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    // Disable submit button to prevent multiple submits
    const submitButton = document.getElementById('submitButton');
    submitButton.disabled = true;

    const formData = new FormData(this);
    const data = {
        nombre: formData.get('nombre')
    };

    fetch('https://becastest1.ue.r.appspot.com/api/gestion/getEmpleados', {
        method: 'POST',
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

        // Enable button again
        submitButton.disabled = false;

        return response.json();
    })
    .then(result => {
        console.log('Success:', result);
        showMessage('Empleado encontrado exitosamente');
        form.reset();

        console.log(result.length);
        if (result.length === 0) {
            const tbody = document.getElementById('body');
            tbody.innerHTML = '';

            showMessage('No se encontraron empleados');
            document.getElementById('nodata').style.display = 'block';

        }else{
            const table = document.getElementById('tablaEmpleados');
            const tbody = document.getElementById('body');
            tbody.innerHTML = '';
            result.forEach(row => {
                const tr = document.createElement('tr');
                const tdId = document.createElement('td');
                const tdNombre = document.createElement('td');
                const tdApellidos = document.createElement('td');
                const tdTelefono = document.createElement('td');
                const tdCorreoElectronico = document.createElement('td');
                const tdDireccion = document.createElement('td');
                const tdButtonModificar = document.createElement('td');
                const tdButtonEliminar = document.createElement('td');
                tdId.textContent = row.id_empleado;
                tdNombre.textContent = row.nombre;
                tdApellidos.textContent = row.apellidos;
                tdTelefono.textContent = row.telefono;
                tdCorreoElectronico.textContent = row.correoElectronico;
                tdDireccion.textContent = row.direccion;
                const buttonModificar = document.createElement('button');
                buttonModificar.textContent = 'Modificar';
                buttonModificar.classList.add('btn', 'btn-primary');
                buttonModificar.onclick = function () {
                    window.location.href = `modificarEmpleado.html?${row.id_empleado}`;
                };
                const buttonEliminar = document.createElement('button');
                buttonEliminar.textContent = 'Eliminar';
                buttonEliminar.classList.add('btn', 'btn-danger');
                buttonEliminar.onclick = function () {
                    window.location.href = `eliminarEmpleado.html?${row.id_empleado}`;
                };
                tr.appendChild(tdId);
                tr.appendChild(tdNombre);
                tr.appendChild(tdApellidos);
                tr.appendChild(tdTelefono);
                tr.appendChild(tdCorreoElectronico);
                tr.appendChild(tdDireccion);
                tdButtonModificar.appendChild(buttonModificar);
                tdButtonEliminar.appendChild(buttonEliminar);
                tr.appendChild(tdButtonModificar);
                tr.appendChild(tdButtonEliminar);
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);

            document.getElementById('nodata').style.display = 'none';
        
        }
        // Enable button again
        submitButton.disabled = false;

    })
    .catch(error => {
        console.error('Error:', error);
        showMessage(error.message);

        // Enable button again
        submitButton.disabled = false;
    });

}
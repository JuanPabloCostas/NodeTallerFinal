import { showMessage } from "./showMessage.js";

const id = window.location.search.split("?")[1];

if (id) {
    document.getElementById("id_empleado").value = id;
}

const form = document.getElementById("eliminarEmpleadoForm");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    event.preventDefault();

    // Ask for confirmation before deleting
    if (!confirm("¿Está seguro que desea eliminar el empleado?")) {
        return;
    }
    
    const formData = new FormData(this);
    const data = {
        id_empleado: formData.get("id_empleado"),
    };

    fetch("https://becastest1.ue.r.appspot.com/api/gestion/eliminarEmpleado", {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "auth-token": token,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al eliminar el empleado");
            }
            return response.json();
        })
        .then((result) => {
            console.log("Success:", result);
            showMessage("Empleado eliminado exitosamente");
            form.reset();
        })
        .catch((error) => {
            console.error("Error:", error);
            showMessage(error.message);
        });
}
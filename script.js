// Variables de almacenamiento
let usuarios = [];
const celdas = [
    { id: 1, estado: "disponible" },
    { id: 2, estado: "disponible" },
    { id: 3, estado: "disponible" },
];
let pagos = [];
let registros = [];

// Gestión de Usuarios
document.getElementById("usuario-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const rol = document.getElementById("rol").value;

    usuarios.push({ nombre, correo, rol });
    alert("Usuario registrado exitosamente.");
    actualizarUsuarios();
});

function actualizarUsuarios() {
    const lista = document.getElementById("usuarios-lista");
    lista.innerHTML = "";
    usuarios.forEach((usuario, index) => {
        const li = document.createElement("li");
        li.textContent = `${usuario.nombre} (${usuario.rol})`;
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.onclick = () => eliminarUsuario(index);
        li.appendChild(eliminarBtn);
        lista.appendChild(li);
    });
}

function eliminarUsuario(index) {
    usuarios.splice(index, 1);
    alert("Usuario eliminado.");
    actualizarUsuarios();
}

// Gestión de Celdas y Registro de Entrada/Salida
document.getElementById("entrada-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const placa = document.getElementById("placa").value;
    const tipo = document.getElementById("tipo-vehiculo").value;

    const celdaDisponible = celdas.find((celda) => celda.estado === "disponible");
    if (celdaDisponible) {
        celdaDisponible.estado = "ocupada";
        registros.push({
            placa,
            tipo,
            fecha: new Date().toLocaleString(),
            celda: celdaDisponible.id,
        });
        alert(`Vehículo ${placa} asignado a celda ${celdaDisponible.id}.`);
        actualizarCeldas();
        actualizarRegistros();
    } else {
        alert("No hay celdas disponibles.");
    }
});

function actualizarCeldas() {
    const celdasGrid = document.getElementById("celdas-grid");
    celdasGrid.innerHTML = "";
    celdas.forEach((celda) => {
        const celdaDiv = document.createElement("div");
        celdaDiv.className = `celda ${celda.estado}`;
        celdaDiv.textContent = `Celda ${celda.id}: ${celda.estado === "ocupada" ? "Ocupada" : "Disponible"
            }`;
        celdasGrid.appendChild(celdaDiv);
    });
}

function actualizarRegistros() {
    const listaRegistros = document.getElementById("registro-lista");
    listaRegistros.innerHTML = "";
    registros.forEach((registro, index) => {
        const li = document.createElement("li");
        li.textContent = `Placa: ${registro.placa}, Tipo: ${registro.tipo}, Fecha: ${registro.fecha}, Celda: ${registro.celda}`;
        const salirBtn = document.createElement("button");
        salirBtn.textContent = "Registrar Salida";
        salirBtn.onclick = () => liberarCelda(index);
        li.appendChild(salirBtn);
        listaRegistros.appendChild(li);
    });
}

function liberarCelda(index) {
    const registro = registros[index];
    const celda = celdas.find((c) => c.id === registro.celda);
    celda.estado = "disponible";
    registros.splice(index, 1);
    alert(`Vehículo con placa ${registro.placa} ha salido. Celda ${celda.id} liberada.`);
    actualizarCeldas();
    actualizarRegistros();
}

// Gestión de Pagos
document.getElementById("pago-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const usuario = document.getElementById("usuario-pago").value;
    const monto = document.getElementById("monto").value;

    pagos.push({ usuario, monto });
    alert(`Pago de $${monto} registrado para ${usuario}.`);
    actualizarPagos();
});

function actualizarPagos() {
    const listaPagos = document.getElementById("lista-pagos");
    listaPagos.innerHTML = "";
    pagos.forEach((pago) => {
        const li = document.createElement("li");
        li.textContent = `Usuario: ${pago.usuario}, Monto: $${pago.monto}`;
        listaPagos.appendChild(li);
    });
}

// Inicializar
actualizarCeldas();

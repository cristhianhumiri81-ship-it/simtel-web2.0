
/* =====================================
   SIMTELE-WEB
   TODO EL JAVASCRIPT DEL PROYECTO
===================================== */


/* =====================================
   PARTE 1: INICIO Y CIERRE DE SESIÓN
===================================== */

// Credenciales de demostración
const usuarioCorrecto = "admin";
const contrasenaCorrecta = "1234";

// Capturamos los elementos del HTML
const formLogin = document.getElementById("formLogin");
const pantallaLogin = document.getElementById("pantallaLogin");
const panelPrincipal = document.getElementById("panelPrincipal");
const mensajeLogin = document.getElementById("mensajeLogin");
const nombreUsuario = document.getElementById("nombreUsuario");
const btnCerrarSesion = document.getElementById("btnCerrarSesion");

// Variable para controlar la sesión
let sesionActiva = false;


// Evento para iniciar sesión
formLogin.addEventListener("submit", function(event) {

    event.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const contrasena = document.getElementById("contrasena").value;

    if (usuario === usuarioCorrecto &&
        contrasena === contrasenaCorrecta) {

        sesionActiva = true;

        nombreUsuario.textContent = usuario;

        pantallaLogin.hidden = true;
        panelPrincipal.hidden = false;

        mensajeLogin.textContent = "";

        formLogin.reset();

    } else {

        mensajeLogin.textContent = "Usuario o contraseña incorrectos.";

    }

});


// Evento para cerrar sesión
btnCerrarSesion.addEventListener("click", function() {

    if (sesionActiva === true) {

        sesionActiva = false;

        panelPrincipal.hidden = true;
        pantallaLogin.hidden = false;

        formLogin.reset();

        mensajeLogin.textContent = "La sesión se ha cerrado correctamente.";

        window.scrollTo(0, 0);

    }

});


/* =====================================
   PARTE 2: MÓDULO DE EMERGENCIA
===================================== */

// FUNCIÓN PROPIA 1
// Calcula la distancia de reacción
function calcularDistancia(velocidad, tiempo) {

    return (velocidad / 3.6) * tiempo;

}


// FUNCIÓN PROPIA 2
// Clasifica la distancia calculada
function clasificarDistancia(distancia) {

    if (distancia < 30) {

        return "Baja";

    } else if (distancia <= 60) {

        return "Moderada";

    } else {

        return "Elevada";

    }

}


// Capturamos el formulario
const formEmergencia = document.getElementById("formEmergencia");

const resultadoEmergencia = document.getElementById("resultadoEmergencia");

formEmergencia.addEventListener("submit", function(event) {

    event.preventDefault();

    const velocidad = parseFloat(document.getElementById("velocidad").value);

    const tiempo = parseFloat(document.getElementById("tiempo").value);

    // Validamos los datos
    if (!Number.isFinite(velocidad) ||
        !Number.isFinite(tiempo) ||
        velocidad < 0 ||
        tiempo < 0) {

        resultadoEmergencia.textContent = "Ingrese valores válidos.";

        return;

    }

    // Utilizamos nuestras funciones
    const distancia = calcularDistancia(velocidad, tiempo);

    const clasificacion = clasificarDistancia(distancia);

    // Mostramos el resultado
    resultadoEmergencia.textContent =
        "Distancia de reacción: " + distancia.toFixed(2) +
        " metros. Clasificación simulada: " + clasificacion + ".";

});


/* =====================================
   PARTE 3: MÓDULO DE MANTENIMIENTO
===================================== */

// Arreglo para almacenar los mantenimientos
let mantenimientos = [];


// Capturamos elementos
const formMantenimiento = document.getElementById("formMantenimiento");

const tablaMantenimiento = document.getElementById("tablaMantenimiento");

const mensajeMantenimiento = document.getElementById("mensajeMantenimiento");


// Evento para agregar mantenimiento
formMantenimiento.addEventListener("submit", function(event) {

    event.preventDefault();

    const componente = document.getElementById("componente").value.trim();

    const horas = parseFloat(document.getElementById("horas").value);

    const estado = document.getElementById("estado").value;

    // Validación
    if (componente === "" ||
        !Number.isFinite(horas) ||
        horas < 0 ||
        estado === "") {

        mensajeMantenimiento.textContent = "Complete correctamente todos los campos.";

        return;

    }

    // Creamos un objeto
    const nuevoRegistro = {

        componente: componente,
        horas: horas,
        estado: estado

    };

    // Agregamos el objeto al arreglo
    mantenimientos.push(nuevoRegistro);

    mensajeMantenimiento.textContent = "Registro agregado correctamente.";

    formMantenimiento.reset();

    mostrarMantenimientos();

});


// FUNCIÓN PARA MOSTRAR LOS MANTENIMIENTOS
function mostrarMantenimientos() {

    tablaMantenimiento.innerHTML = "";

    mantenimientos.forEach(function(registro, indice) {

        const fila = document.createElement("tr");

        const celdaComponente = document.createElement("td");
        celdaComponente.textContent = registro.componente;

        const celdaHoras = document.createElement("td");
        celdaHoras.textContent = registro.horas;

        const celdaEstado = document.createElement("td");
        celdaEstado.textContent = registro.estado;

        const celdaAccion = document.createElement("td");

        const botonEliminar = document.createElement("button");

        botonEliminar.textContent = "Eliminar";

        botonEliminar.className = "btn-eliminar";

        botonEliminar.dataset.indice = indice;

        celdaAccion.appendChild(botonEliminar);

        fila.appendChild(celdaComponente);
        fila.appendChild(celdaHoras);
        fila.appendChild(celdaEstado);
        fila.appendChild(celdaAccion);

        tablaMantenimiento.appendChild(fila);

    });

}


// Evento para eliminar registros
tablaMantenimiento.addEventListener("click", function(event) {

    if (event.target.classList.contains("btn-eliminar")) {

        const indice = parseInt(event.target.dataset.indice, 10);

        mantenimientos.splice(indice, 1);

        mostrarMantenimientos();

    }

});


/* =====================================
   PARTE 4: MÓDULO DE VIENTO Y OSCILACIÓN
===================================== */

// FUNCIÓN PROPIA 3
// Calcula el promedio y el máximo
function calcularEstadisticasViento(mediciones) {

    let suma = 0;

    let maximo = mediciones[0];

    for (let i = 0; i < mediciones.length; i++) {

        suma = suma + mediciones[i];

        if (mediciones[i] > maximo) {

            maximo = mediciones[i];

        }

    }

    const promedio = suma / mediciones.length;

    return {
        promedio: promedio,
        maximo: maximo
    };

}


// FUNCIÓN PROPIA 4
// Clasifica el promedio del viento
function clasificarViento(promedio) {

    if (promedio <= 20) {

        return "Bajo";

    } else if (promedio <= 40) {

        return "Moderado";

    } else {

        return "Elevado";

    }

}


// Capturamos el formulario
const formViento = document.getElementById("formViento");

const resultadoViento = document.getElementById("resultadoViento");

formViento.addEventListener("submit", function(event) {

    event.preventDefault();

    // Guardamos las cinco mediciones en un arreglo
    const mediciones = [

        parseFloat(document.getElementById("viento1").value),

        parseFloat(document.getElementById("viento2").value),

        parseFloat(document.getElementById("viento3").value),

        parseFloat(document.getElementById("viento4").value),

        parseFloat(document.getElementById("viento5").value)

    ];

    // Verificamos que los valores sean correctos
    const datosValidos = mediciones.every(function(valor) {

        return Number.isFinite(valor) && valor >= 0;

    });

    if (!datosValidos) {

        resultadoViento.textContent = "Ingrese cinco valores válidos.";

        return;

    }

    // Utilizamos las funciones
    const estadisticas = calcularEstadisticasViento(mediciones);

    const clasificacion = clasificarViento(estadisticas.promedio);

    // Mostramos los resultados
    resultadoViento.textContent =
        "Promedio: " + estadisticas.promedio.toFixed(2) +
        " | Máximo: " + estadisticas.maximo +
        " | Clasificación simulada: " + clasificacion;

});


/* =====================================
   PARTE 5: MÓDULO DE SENSORES
===================================== */

// Arreglo para guardar sensores
let sensores = [];


// Expresión regular para validar códigos
const patronSensor = /^SEN-\d{3}$/;


// Capturamos los elementos
const formSensores = document.getElementById("formSensores");

const tablaSensores = document.getElementById("tablaSensores");

const mensajeSensor = document.getElementById("mensajeSensor");


// Evento para registrar sensores
formSensores.addEventListener("submit", function(event) {

    event.preventDefault();

    const codigo = document.getElementById("codigoSensor").value.trim();

    const tipo = document.getElementById("tipoSensor").value.trim();

    const lecturaTexto = document.getElementById("lecturaSensor").value;

    const lectura = parseFloat(lecturaTexto);

    // FUNCIÓN PROPIA 5
    // Validamos el formato del código
    if (!patronSensor.test(codigo)) {

        mensajeSensor.textContent = "Código inválido. Utilice el formato SEN-001.";

        return;

    }

    // Validamos los demás datos
    if (tipo === "" ||
        lecturaTexto.trim() === "" ||
        !Number.isFinite(lectura)) {

        mensajeSensor.textContent = "Complete correctamente todos los campos.";

        return;

    }

    // Creamos un objeto sensor
    const nuevoSensor = {

        codigo: codigo,
        tipo: tipo,
        lectura: lectura

    };

    // Guardamos el sensor
    sensores.push(nuevoSensor);

    mensajeSensor.textContent = "Sensor registrado correctamente.";

    formSensores.reset();

    mostrarSensores();

});


// FUNCIÓN PARA MOSTRAR LOS SENSORES
function mostrarSensores() {

    tablaSensores.innerHTML = "";

    sensores.forEach(function(sensor) {

        const fila = document.createElement("tr");

        const celdaCodigo = document.createElement("td");
        celdaCodigo.textContent = sensor.codigo;

        const celdaTipo = document.createElement("td");
        celdaTipo.textContent = sensor.tipo;

        const celdaLectura = document.createElement("td");
        celdaLectura.textContent = sensor.lectura;

        fila.appendChild(celdaCodigo);
        fila.appendChild(celdaTipo);
        fila.appendChild(celdaLectura);

        tablaSensores.appendChild(fila);

    });

}

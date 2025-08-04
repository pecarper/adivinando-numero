let numeroIntentosMaximo = 0;
let numeroIntentosRestantes = 0;
let numeroSecreto = 0;
let numeroIngresaUsuario = 0;


function eventoIntentos() {

    const valor = document.querySelector('#intentos-ajustar').value;
    const numero = parseInt(valor, 10);
    numeroIntentosMaximo = numero;
    numeroIntentosRestantes = numeroIntentosMaximo;

    generarNumeroSecreto();
    mostrarOcultarAdivinanza();
    manejadorEliminaValidacionIntentos();
}


// Centra la lógica del juego
function eventoAdivinanza() {

    const valor = document.querySelector('#adivinar-numero').value;
    const numero = parseInt(valor, 10);
    numeroIngresaUsuario = numero;

    if (isNaN(numero) || numero < 1 || numero > 10) {
        asignarContenidoElemento('#adivinar-texto', 'Debes ingresar un número entre 1 y 10');
        return;
    }

    if (numeroIngresaUsuario === numeroSecreto) {
        asignarContenidoElemento('#adivinar-texto', '¡Lo hiciste, adivinaste el número secreto!');
        manejadorEliminaEventos();
        manejadorEliminaValidacionAdivinanza();
        mostrarOcultarReinicio();
        return;
    } else {
        if (numeroIngresaUsuario > numeroSecreto) {
            asignarContenidoElemento('#adivinar-texto', 'El número secreto es menor:');
        } else {
            if (numeroIngresaUsuario < numeroSecreto) {
                asignarContenidoElemento('#adivinar-texto', 'El número secreto es mayor:');
            }
        }

        numeroIntentosRestantes--;
        asignarContenidoElemento('#contador-intentos', `Intentos restantes: ${numeroIntentosRestantes}`);
        limpiarAdivinanza();

        if (numeroIntentosRestantes <= 0) {
            asignarContenidoElemento('#contador-intentos', `Intentos restantes: ${numeroIntentosRestantes}`);
            asignarContenidoElemento('#adivinar-texto', `Agotaste tus intentos. El número secreto era ${numeroSecreto}. Prueba de nuevo.`);
            manejadorEliminaEventos();
            manejadorEliminaValidacionAdivinanza();
            mostrarOcultarReinicio();
            return;
        }
    }
}


// Manejadores para agregar y eliminar eventos (listeners)
function manejadorAgregaEventos() {
    document.querySelector('#intentos-boton').addEventListener('click', eventoIntentos);
    document.querySelector('#adivinar-boton').addEventListener('click', eventoAdivinanza);
    document.querySelector('#intentos-ajustar').addEventListener('input', validarIntentos);
    document.querySelector('#adivinar-numero').addEventListener('input', validarAdivinanza);
}

function manejadorEliminaEventos() {
    document.querySelector('#intentos-boton').removeEventListener('click', eventoIntentos);
    document.querySelector('#adivinar-boton').removeEventListener('click', eventoAdivinanza);
}

function manejadorEliminaValidacionIntentos() {
    document.querySelector('#intentos-ajustar').removeEventListener('input', validarIntentos)
}

function manejadorEliminaValidacionAdivinanza() {
    document.querySelector('#adivinar-numero').removeEventListener('input', validarAdivinanza);
}


// Restaura las condiciones iniciales para jugar
function eventoReinicio() {
    condicionesIniciales();
    manejadorAgregaEventos();
}


// Valida las entradas del usuario
function validarIntentos() {
    const valor = document.querySelector('#intentos-ajustar').value;
    const numero = parseInt(valor, 10);
    const intentosPermitidos = [1, 3, 5, 7];

    if (isNaN(numero) ||
        numero < 1 || numero > 10 ||
        !intentosPermitidos.includes(numero)
    ) {
        document.querySelector('#intentos-boton').disabled = true;
        asignarContenidoElemento('#intentos-texto', 'Debes ingresar un número de intento permitido: 1, 3, 5 o 7');
    } else {
        document.querySelector('#intentos-boton').disabled = false;
        asignarContenidoElemento('#intentos-texto', `Eliges ${numero} ${numero == 1 ? 'intento' : 'intentos'}. Para aceptar y jugar presiona el botón comenzar.`);
    }
}


// Valida las entradas del usuario
function validarAdivinanza() {
    const valor = this.value;
    const numero = parseInt(valor, 10);
    if (isNaN(numero) ||
        numero < 1 ||
        numero > 10
    ) {
        document.querySelector('#adivinar-boton').disabled = true;
        asignarContenidoElemento('#adivinar-texto', 'Debes ingresar un número entre 1 y 10');
    } else {
        document.querySelector('#adivinar-boton').disabled = false;
    }
}


function condicionesIniciales() {
    asignarContenidoElemento('h1', 'Adivina el número secreto');
    asignarContenidoElemento('#intentos-texto', 'Elige tu número de intentos:');
    limpiarIntentos();
    limpiarAdivinanza();
    mostrarOcultarIntentos();
}


function asignarContenidoElemento(atributo, texto) {
    let elemento = document.querySelector(atributo);
    elemento.textContent = texto;
}


function limpiarIntentos() {
    document.querySelector('#intentos-ajustar').value = '';
}


function limpiarAdivinanza() {
    document.querySelector('#adivinar-numero').value = '';
}


function mostrarOcultarIntentos() {
    document.querySelector('#intentos-contenedor').style.display = 'block';
    document.querySelector('#intentos-ajustar').disabled = false;
    document.querySelector('#intentos-boton').disabled = true;
    document.querySelector('#contador-contenedor').style.display = 'none';
    document.querySelector('#adivinar-contenedor').style.display = 'none';
    document.querySelector('#adivinar-numero').disabled = true;
    document.querySelector('#adivinar-boton').disabled = true;    
    document.querySelector('#reiniciar-boton').style.display = 'none';
    document.querySelector('#reiniciar-boton').disabled = true;  
}


function mostrarOcultarReinicio() {
    document.querySelector('#contador-contenedor').style.display = 'block';
    document.querySelector('#adivinar-numero').disabled = true;
    document.querySelector('#adivinar-boton').disabled = true;
    document.querySelector('#reiniciar-contenedor').style.display = 'block';
    document.querySelector('#reiniciar-boton').disabled = false;
    document.querySelector('#reiniciar-boton').style.display = 'block';
}


function mostrarOcultarAdivinanza() {
    document.querySelector('#intentos-contenedor').style.display = 'none';
    document.querySelector('#intentos-ajustar').disabled = true;
    document.querySelector('#intentos-boton').disabled = true;
    document.querySelector('#contador-contenedor').style.display = 'block';
    asignarContenidoElemento('#contador-intentos', `Intentos restantes: ${numeroIntentosRestantes}`);
    document.querySelector('#adivinar-contenedor').style.display = 'block';
    asignarContenidoElemento('#adivinar-texto', 'Ingresa un número entre 1 y 10');
    document.querySelector('#adivinar-numero').disabled = false;
    document.querySelector('#adivinar-boton').disabled = true;
    document.querySelector('#reiniciar-boton').disabled = true;
}


function generarNumeroSecreto() {
    numeroSecreto = Math.floor(Math.random() * 10) + 1;
}


window.addEventListener(
    'DOMContentLoaded',
    function () {
        condicionesIniciales();
        manejadorAgregaEventos();

        document.querySelector('#reiniciar-boton').addEventListener('click', eventoReinicio);
    }
);




/* Función recursiva para genrar una lista de números irrepetibles

function generarNumeroSecreto() {
    let numeroSecreto = Math.floor(Math.random() * 10) + 1;
    console.log("Número secreto:", numeroSecreto);
    console.log("Lista de números generados:", listaNumerosGenerados);

    if (listaNumerosGenerados.length == 10) {
        asignarContenidoElemento('p', 'Se han generado todos los números posibles. Reinicia el juego para continuar.');
    } else {
        if (listaNumerosGenerados.includes(numeroSecreto)) {
            return numeroSecretoGenerado();
        }
        listaNumerosGenerados.push(numeroSecreto);
        return numeroSecreto;
    }
}


function interruptorDuranteJuego() {
    document.getElementById('intentos-ajustar').disabled = true;
    document.getElementById('adivinar-boton').disabled = false;
}

function registrarEventoBotones() {
    const botonJugar = document.getElementById('iniciar-juego');
    const botonadivinar-boton = document.getElementById('adivinar-boton');

    botonJugar.addEventListener(
        'click',
        ajustarIntentos()
    );

    botonadivinar-boton.addEventListener(
        'click',
        comprobarIntentoUsuario()
    );
    
}


function ajustarIntentosMaximo() {

    const elemento = document.getElementById('valor-usuario');
    console.log(elemento);

    elemento.addEventListener(
        'input',
        function () {
            const valorActual = elemento.value;
            console.log('Valor actual:', valorActual);

            if (valorActual !== '') {
                document.getElementById('iniciar-juego').disabled = false;
            } else {
                document.getElementById('iniciar-juego').disabled = true;
    }});

    document.getElementById('valor-usuario').addEventListener(
        'keydown',
        function (e) {
            // Permite solo flechas arriba/abajo, tab, shift
            if (
                e.key !== "ArrowUp" &&
                e.key !== "ArrowDown" &&
                e.key !== "Tab"
            ) {
                e.preventDefault();
    }});
}

*/
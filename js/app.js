// Variables
const formulario = document.querySelector('#formulario');
const lista = document.querySelector('#lista-tweets');
// Almacenar tweets
let tweets = [];
// Event Listeners
eventListener();
function eventListener() {
	// Cuado el usuario agrega un nuevo tweet
	formulario.addEventListener('submit', agregarTweet);

	// Cuando el documento esta listo
	document.addEventListener('DOMContentLoaded', () => {
		tweets = JSON.parse(localStorage.getItem('tweets')) || [];
		console.log(tweets);
		// Se manda a llamar los tweets del localstorage guardados.
		crearHTML();
	});
}

// Funciones

function agregarTweet(e) {
	e.preventDefault();
	// Textarea donde el usuario escriba
	const tweet = document.querySelector('#tweet').value;
	// Validación de que el usuario escriba algo
	if (tweet === '') {
		mostrarError('El tweet no puede estar vacío');
		return; // Evita que se ejecuten más líneas de código
	}
	// Añadir al arreglo de tweet
	const tweetObj = {
		id: Date.now(),
		tweet,
	};
	// Añadir al arreglo de tweets
	tweets = [...tweets, tweetObj];
	console.log(tweets);

	// Una vez agregado, se crea el HTML ->
	crearHTML();
	formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error) {
	const mensajeError = document.createElement('p');
	mensajeError.textContent = error;
	mensajeError.classList.add('error');

	// Insertar en el contenido
	const contenido = document.querySelector('#contenido');
	contenido.appendChild(mensajeError);

	// Eliminar mensaje de error despues de 3 segundos
	setTimeout(() => {
		mensajeError.remove();
	}, 3000);
}

// Muestra un listado de los tweets

function crearHTML() {
	limpiarHTML();
	if (tweets.length > 0) {
		tweets.forEach((msg) => {
			// Agregar boton de eliminar
			const btnEliminar = document.createElement('a');
			btnEliminar.classList.add('borrar-tweet');
			btnEliminar.innerHTML = 'X';
			// Añadir la función de eliminar
			btnEliminar.onclick = () => {
				borrarTweet(msg.id);
			};
			// Crear el HTML
			const li = document.createElement('li');
			// Añadir el texto
			li.innerText = msg.tweet;
			// Asignar el botón X
			li.appendChild(btnEliminar);
			//Insertarlo en el html
			lista.appendChild(li); // El appendchild no elimina el código previo
		});
	}
	guardarLocalStorage();
}
// Agregar los tweets actuales al Localstorage
function guardarLocalStorage() {
	localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Limpiar el HTML

function limpiarHTML() {
	// Mientras haya elementos en el listado, eliminar
	while (lista.firstChild) {
		lista.removeChild(lista.firstChild);
	}
}

// Eliminar un tweet
function borrarTweet(id) {
	tweets = tweets.filter((tweet) => tweet.id !== id);
	crearHTML();
}

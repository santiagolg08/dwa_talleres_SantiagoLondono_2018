window.onload = init;

//Variables a utilizar
var btnRegistro, btnIngreso, secciones, linksIngreso, usuarios,btnSeccionAgregar, btnAgregarTarea, tareas, usuarioIngresado,btnCancelarTarea , 
	contenidoPendientes, tareaActual, btnMenu, menu, btnCerrarMenu, contenidoPrincipal, itemsMenu, contenidoPendientes, contenidoRealizadas,
	btnBuscarFinalizadas, btnBuscarPendientes,inputBuscarPendientes,inputBuscarFinalizadas, btnCancelarFinalizadas, btnCancelarPendientes ;

function init() {
	inicializarVariables();
	inicializarEventos();
}

function inicializarVariables(){
	secciones = [];
	linksIngreso = [];
	usuarios = [];
	tareas = [];
	usuarioIngresado = [];
	tareaActual = [];
	itemsMenu = [];
	itemsMenu[0] =  document.getElementById("Pendientes");
	itemsMenu[1] =  document.getElementById("Realizadas");
	btnMenu = document.getElementById("btnMenu");
	menu = document.getElementById("menuDesplegable");
	tabActual = true;
	btnBuscarFinalizadas = document.getElementById("btnBuscarFinalizadas");
	btnBuscarPendientes = document.getElementById("btnBuscarPendientes");
	btnCancelarFinalizadas = document.getElementById("btnCancelarFinalizadas");
	btnCancelarPendientes = document.getElementById("btnCancelarPendientes");
	btnCerrarMenu = document.getElementById("btnCerrarMenu");
	contenidoPrincipal = document.getElementById("contenidoPrincipal");
	contenidoPendientes = document.getElementById("tareasPendientes");
	contenidoRealizadas = document.getElementById("tareasRealizadas");
	linksIngreso[0] = document.getElementById("link_ingreso");
	linksIngreso[1] = document.getElementById("link_registro");
	btnRegistro = document.getElementById("btn_Registrar");
	btnIngreso = document.getElementById("btn_Ingresar");
	secciones[0] = document.getElementById("registro");
	secciones[1] = document.getElementById("ingreso");
	secciones[2] = document.getElementById("paginaPrincipal");
	secciones[3] = document.getElementById("agregarTareas");
	btnSeccionAgregar = document.getElementById("btn_agregar");
	btnAgregarTarea = document.getElementById("btn_AgregarTarea");
	btnCancelarTarea = document.getElementById("btn_cancelarTarea");
}

function inicializarEventos(){
	for (var i = 0; i < linksIngreso.length; i++) {
		linksIngreso[i].addEventListener("click",cambiarFormulario);
	}
	for(var j = 0; j < itemsMenu.length; j++){
		itemsMenu[j].addEventListener("click",cambiarContenido);
	}
	btnRegistro.addEventListener("click",validarRegistro);
	btnIngreso.addEventListener("click",validarIngreso);
	btnSeccionAgregar.addEventListener("click", seccionAgregar);
	btnAgregarTarea.addEventListener("click",agregarTareaFormulario);
	btnCancelarTarea.addEventListener("click",seccionAgregar);
	btnMenu.addEventListener("click",openNav);
	btnCerrarMenu.addEventListener("click",closeNav);
	btnBuscarPendientes.addEventListener("click",buscarPendientes);
	btnBuscarFinalizadas.addEventListener("click",buscarFinalizadas);
	btnCancelarFinalizadas.addEventListener("click",cancelarBusquedaFinalizadas);
	btnCancelarPendientes.addEventListener("click",cancelarBusquedaPendientes);
}

function cancelarBusquedaFinalizadas(){
	for (var i = 2; i < contenidoRealizadas.childElementCount; i++) {
		contenidoRealizadas.children[i].classList.remove("invisible");
	}
}


function cancelarBusquedaPendientes(){
	for (var i = 3; i < contenidoPendientes.childElementCount; i++) {
		contenidoPendientes.children[i].classList.remove("invisible");
	}
}

function buscarFinalizadas(){
	inputBuscarFinalizadas = document.getElementById("inputBuscarFinalizadas");
	for (var i = 2; i < contenidoRealizadas.childElementCount; i++) {
		if (contenidoRealizadas.children[i].childNodes[1].value.toLowerCase() != inputBuscarFinalizadas.value.toLowerCase()) {
			contenidoRealizadas.children[i].classList.add("invisible");
		}
	}
}

function buscarPendientes(){
	inputBuscarPendientes = document.getElementById("inputBuscarPendientes");
	for (var i = 3; i < contenidoPendientes.childElementCount; i++) {
		if (contenidoPendientes.children[i].childNodes[1].value.toLowerCase() != inputBuscarPendientes.value.toLowerCase()) {
			contenidoPendientes.children[i].classList.add("invisible");
		}
	}
}

function cambiarContenido(){
	if (this.id == "Pendientes") {
		contenidoRealizadas.hidden = true;
		contenidoPendientes.hidden = false;
		tabActual = true;
	}else{
		contenidoPendientes.hidden = true;
		contenidoRealizadas.hidden = false;
		tabActual = false;
	}
}

function openNav() {
    menu.classList.add("menuVisible");
    contenidoPrincipal.classList.add("moverContenido");
}

function closeNav() {
    menu.classList.remove("menuVisible");
    contenidoPrincipal.classList.remove("moverContenido");
}


function agregarTareaFormulario(){
	var titulo = document.getElementById("agregarTitulo");
	var fecha = document.getElementById("agregarFecha");
	if (titulo.value != "") {
		if (fecha.value != "") {
			agregarTarea(usuarioIngresado.usuario,titulo.value,fecha.value);
			tareas = JSON.parse(localStorage.getItem("tareas"));
			if (tareas == null) {
				tareas = [];
			}
			var tarea = {};
			tarea.usuario = usuarioIngresado.usuario;
			tarea.titulo = titulo.value;
			tarea.fecha = fecha.value;
			tarea.finalizada = false;
			tareas.push(tarea);
			localStorage.setItem("tareas", JSON.stringify(tareas));
			seccionAgregar();
		}else{
			alert("Debe ingresar una fecha");
		}
	}else{
		alert("Debe ingresar un titulo");
	}
}

function agregarTarea(usuario,titulo,fecha,finalizada){

	var contenedor = document.createElement("div");
	contenedor.classList.add("tarea","center");
	var inputTitulo = document.createElement("input");
	var inputFecha = document.createElement("input");
	var btnFinalizar = document.createElement("input");
	var divGuardar = document.createElement("div");
	var divCancelar = document.createElement("div");
	var iconEditar = document.createElement("img");
	var divImagen = document.createElement("div");
	iconEditar.type = "button";
	iconEditar.classList.add("btnEditar");
	contenedor.appendChild(iconEditar);
	inputTitulo.type = "text";
	inputTitulo.value = titulo;
	inputTitulo.readOnly = true; 
	inputTitulo.classList.add("inputTransparente","center");
	contenedor.appendChild(inputTitulo);
	inputFecha.type = "date";
	inputFecha.value = fecha;
	inputFecha.readOnly = true; 
	inputFecha.classList.add("inputTransparente");
	contenedor.appendChild(inputFecha);
	divImagen.innerHTML = "<img src='img/caricatura.png' hidden>";
	contenedor.appendChild(divImagen);
	divGuardar.classList.add("inline", "margin");
	divGuardar.innerHTML = "<input type='hidden' value='Guardar'>";
	divGuardar.firstElementChild.addEventListener("click",editarTarea);
	contenedor.appendChild(divGuardar);
	divCancelar.classList.add("inline", "margin");
	divCancelar.innerHTML = "<input type='hidden' value='Cancelar' class='btnCancelar'>";
	divCancelar.firstElementChild.addEventListener("click",cerrarTarea);
	contenedor.appendChild(divCancelar);
	btnFinalizar.value = "Finalizar";
	btnFinalizar.classList.add("finalizar");
	btnFinalizar.addEventListener("click",finalizarTarea);

	if (finalizada) {
		contenedor.firstElementChild.src = "img/show.png";
		contenedor.firstElementChild.addEventListener("click",mostrarTarea);
		btnFinalizar.type = "hidden";
		contenidoRealizadas.appendChild(contenedor);
	}else{
		contenedor.firstElementChild.src = "img/edit.png";
		contenedor.firstElementChild.addEventListener("click",desplegarTarea);
		btnFinalizar.type = "button";
		contenidoPendientes.appendChild(contenedor);
	}
	contenedor.appendChild(btnFinalizar);
}

function mostrarTarea(evt){
	var tarea = evt.currentTarget.parentElement;
	tarea.childNodes[3].firstElementChild.hidden = false;
	tarea.childNodes[5].firstElementChild.type = "button";
	tarea.childNodes[6].type = "hidden";
}

function finalizarTarea(evt){
	var tarea = evt.currentTarget.parentElement;
	tareaActual.usuario = usuarioIngresado.usuario;
	tareaActual.titulo = tarea.childNodes[1].value;
	tareaActual.fecha = tarea.childNodes[2].value;
	tareaActual.finalizada = true;
	agregarTarea(tareaActual.usuario, tareaActual.titulo, tareaActual.fecha, true);
	tareas = JSON.parse(localStorage.getItem("tareas"));
	if (tareas != null) {
		for(var i in tareas){
			if(tareas[i].usuario == tareaActual.usuario && tareas[i].titulo == tareaActual.titulo && tareas[i].fecha == tareaActual.fecha){
				tareas[i].usuario = tareaActual.usuario;
				tareas[i].titulo = tareaActual.titulo;
				tareas[i].fecha = tareaActual.fecha;
				tareas[i].finalizada = tareaActual.finalizada;
			}
		}
	}
	localStorage.setItem("tareas",JSON.stringify(tareas));
	evt.currentTarget.parentElement.parentElement.removeChild(tarea);
}

function editarTarea(evt){
	var tarea = evt.currentTarget.parentElement.parentElement;
	if (tarea.childNodes[1].value != "") {
		if (tarea.childNodes[2].value != "") {
			tareas = JSON.parse(localStorage.getItem("tareas"));
			if (tareas != null) {
				for(var i in tareas){
					if(tareas[i].usuario == tareaActual.usuario && tareas[i].titulo == tareaActual.titulo && tareas[i].fecha == tareaActual.fecha){
						tareas[i].usuario = tareaActual.usuario;
						tareas[i].titulo = tarea.childNodes[1].value;
						tareas[i].fecha = tarea.childNodes[2].value;
						tareas[i].finalizada = tareaActual.finalizada;
					}
				}
			}
			localStorage.setItem("tareas",JSON.stringify(tareas));
			cerrarTarea(evt);
			}else{
				alert("Debe ingresar una fecha");
			}
	}else{
		alert("Debe ingresar un titulo");
	}
}

function cerrarTarea(evt){
	var tarea = evt.currentTarget.parentElement.parentElement;
	tarea.childNodes[1].classList.add("inputTransparente");
	tarea.childNodes[1].readOnly = true;
	tarea.childNodes[2].classList.add("inputTransparente");
	tarea.childNodes[2].readOnly = true;
	tarea.childNodes[3].firstElementChild.hidden = true;
	tarea.childNodes[4].firstElementChild.type = "hidden";
	tarea.childNodes[5].firstElementChild.type = "hidden";
	if (tabActual) {
		tarea.childNodes[6].type = "button";
	}
}

function desplegarTarea(evt){
	var tarea = evt.currentTarget.parentElement;
	tarea.childNodes[1].classList.remove("inputTransparente");
	tarea.childNodes[1].readOnly = false;
	tarea.childNodes[2].classList.remove("inputTransparente");
	tarea.childNodes[2].readOnly = false;
	tarea.childNodes[3].firstElementChild.hidden = false;
	tarea.childNodes[4].firstElementChild.type = "button";
	tarea.childNodes[5].firstElementChild.type = "button";
	tarea.childNodes[6].type = "hidden";
	tareaActual.usuario = usuarioIngresado.usuario;
	tareaActual.titulo = tarea.childNodes[1].value;
	tareaActual.fecha = tarea.childNodes[2].value;
	tareaActual.finalizada = false;

}

function seccionAgregar(){
	if (secciones[3].hidden) {
		secciones[3].hidden=false;
	}else{
		secciones[3].hidden = true;
	}
}

function validarRegistro(){
	usuarios = JSON.parse(localStorage.getItem("usuarios"));
	if (usuarios == null) {
		usuarios = [];
	}
	var usuarioRegistro = document.getElementById("registroUsuario");
	var passwordRegistro = document.getElementById("registroPassword");
	if (usuarioRegistro.value != "" || passwordRegistro.value != "") {
		var passwordValida = validarPassword(passwordRegistro.value);
		if (passwordValida) {
		if (usuarioRegistro != null && passwordRegistro != null ) {
			var usuario = {};
			usuario.usuario = usuarioRegistro.value;
			usuario.password = passwordRegistro.value;
			usuarios.push(usuario);
			localStorage.setItem("usuarios",JSON.stringify(usuarios));
			alert("Usuario creado correctamente");
			usuarioRegistro.value = "";
			passwordRegistro = "";
			secciones[0].hidden = true;
			secciones[1].hidden = false;
		}
		}else{
			alert("La contraseña debe tener mínimo 8 caracteres, dos numeros y un caracter especial");
		}
	}else{
		alert("Ingrese todos los campos");
	}
}

function cargarTareas(usuario){
	tareas = JSON.parse(localStorage.getItem("tareas"));
	if (tareas != null) {
		for(var i in tareas){
			if(tareas[i].usuario == usuario && tareas[i].finalizada == false){
				agregarTarea(tareas[i].usuario, tareas[i].titulo, tareas[i].fecha, false);
			} else if(tareas[i].usuario == usuario && tareas[i].finalizada == true){
				agregarTarea(tareas[i].usuario, tareas[i].titulo, tareas[i].fecha, true);
			}
		}
	}
}

function validarIngreso(){
	var usuarioIngreso = document.getElementById("ingresoUsuario");
	var passwordIngreso  = document.getElementById("ingresoPassword");
	if (usuarioIngreso.value != "" || passwordIngreso.value != "") {
		usuarios = JSON.parse(localStorage.getItem("usuarios"));
		var encontro = false;
		for(var i in usuarios){
			if (usuarios[i].usuario == usuarioIngreso.value) {
				if (usuarios[i].password == passwordIngreso.value) {
					alert("Usuario ingresado");
					usuarioIngresado = usuarios[i];
					usuarioIngreso.value = "";
					passwordIngreso = "";
					encontro = true;
					cargarTareas(usuarioIngresado.usuario);
					secciones[1].hidden = true;
					secciones[2].hidden = false;
					return true;
				}
				else{
					alert("Contraseña incorrecta");
					return false;
				}
			}
		}
		if (!encontro) {
			alert("El usuario no existe");
		}
	}else{
		alert("Ingrese todos los campos");
	}

}

function validarPassword(password){
	var regex =/^(?=.*[a-z])(?=.*[0-9]{2})(?=.*[!@#\$%\^&\*])(?=.{8,})/;
	if ( regex.test(password) ){
	    return true;
	}
	else{
		return false;
	}
}

function cambiarFormulario(evt){
	var id = evt.currentTarget.id;
	var seccionId = id.split("_")[1];
	var seccion = 	document.getElementById(seccionId);
	ocultarSecciones();
	seccion.hidden = false;
}

function ocultarSecciones(){
	for (var i = 0; i < secciones.length; i++) {
		secciones[i].hidden = true;
	}
}
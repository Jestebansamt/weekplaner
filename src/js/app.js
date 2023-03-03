

let tabla = document.getElementById('tabla');
let scroll = document.getElementById('scroll');
let dias = document.getElementById('dias');
let formularioTarea = document.querySelectorAll('#formularioTarea');
let agregarTareas = document.querySelectorAll('#agregarTareas');
let mostrarTarea = document.querySelectorAll('#mostrarTarea');
let nuevoGrupo = document.getElementById('nuevoGrupo');
let mostrarGrupos = document.getElementById('mostrarGrupos');
let nombreNuevoGrupo = document.getElementById('nombreNuevoGrupo');


// listaTareas[i][j].tarea;
// listaTareas[i][j].grupo;

let listaTareas = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
};

let listaGrupo = {
    "Universidad": ["calculo", "Programacion", "Algebra"],
    "Casa": ["Cuentas", "Oficio"],
}


tabla.addEventListener('click', function () {
    scroll.classList.remove('seleccionado');
    tabla.classList.add('seleccionado');
    dias.classList.add('tabla')
});

scroll.addEventListener('click', function () {
    tabla.classList.remove('seleccionado');
    scroll.classList.add('seleccionado');
    dias.classList.remove('tabla')

});
let vanGrupo = false;
nuevoGrupo.addEventListener('click', function () {
    mostrarGrupos.innerHTML = "";
    if (vanGrupo == false) {
        mostrarGrupos.classList.add('mostrarGrupos');
        mostrarGrupos.classList.remove('ocultarGrupos');
        vanGrupo = true;
    }
    else {
        mostrarGrupos.classList.remove('mostrarGrupos');
        mostrarGrupos.classList.add('ocultarGrupos');
        vanGrupo = false;
    }
    funcionMostrarGrupos();


})

function funcionNuevoGrupo() {
    agregarGrupos.addEventListener('click', function () {
        mostrarGrupos.innerHTML += ` <form autocomplete="off">
            <input type="text" class="nombreNuevoGrupo" id="nombreNuevoGrupo" name="nombreNuevoGrupo"
            placeholder="Nuevo Grupo" ">
        </form>`

        let nombreNuevoGrupo = document.getElementById('nombreNuevoGrupo')
        nombreNuevoGrupo.addEventListener('keypress', (event) => {
            if (event.which == 13) {
                event.preventDefault();
                listaGrupo[`${nombreNuevoGrupo.value}`] = [];
                funcionMostrarGrupos();
            }
        });
    })
}



function funcionMostrarGrupos(grupoEditar = '') {
    mostrarGrupos.innerHTML = "";
    for (const grupo in listaGrupo) {

        if (grupoEditar == grupo) {
            mostrarGrupos.innerHTML += `<div class="infoGrupo">
            <form autocomplete = "off">
                <input type="text" class="nombreNuevoGrupo" id="nombreNuevoGrupo" name="nombreNuevoGrupo"
                    placeholder="Nombre grupo">
            </form>
            <div class="imagenesGrupo">
                <img id="eliminar${grupo}" src="/build/img/delete.svg" alt="eliminar Grupo">
                <img id="editar${grupo}" src="/build/img/edit.svg" alt="editar Grupo">
                <img src="/build/img/add.svg" alt="crear Grupo">
            </div>
            </div>`;

            funcionNombreNuevoGrupo();
        }
        else {
            mostrarGrupos.innerHTML += ` <div class="infoGrupo">
            <p class="bold">${grupo}</p>
            <div class="imagenesGrupo">
                <img id="eliminar${grupo}" src="/build/img/delete.svg" alt="eliminar Grupo">
                <img id="editar${grupo}" src="/build/img/edit.svg" alt="editar Grupo">
                <img src="/build/img/add.svg" alt="crear Grupo">
            </div>
            </div>`;
        }

        for (let i = 0; i < listaGrupo[grupo].length; i++) {
            mostrarGrupos.innerHTML += `<p>:: ${listaGrupo[grupo][i]}</p>`;

        }
        mostrarGrupos.innerHTML += `<div class="linea"></div`
    }
    mostrarGrupos.innerHTML += `<div class="agregarGrupos" id="agregarGrupos"><p>+ Nuevo</p></div>`
    let agregarGrupos = document.getElementById('agregarGrupos');
    agregarGrupos.addEventListener('click', function () {
        funcionNuevoGrupo();
    })

    let eliminarGrupo = [];
    let nombreGrupo = [];
    for (const grupo in listaGrupo) {
        eliminarGrupo.push(document.getElementById(`eliminar${grupo}`));
        nombreGrupo.push(grupo);
    }
    for (let x = 0; x < eliminarGrupo.length; x++) {
        eliminarGrupo[x].addEventListener('click', function () {
            delete listaGrupo[`${nombreGrupo[x]}`];
            funcionMostrarGrupos();
        })
    }

    let editarGrupo = [];
    nombreGrupo = [];
    for (const grupo in listaGrupo) {
        editarGrupo.push(document.getElementById(`editar${grupo}`));
        nombreGrupo.push(grupo);
    }
    for (let x = 0; x < editarGrupo.length; x++) {
        editarGrupo[x].addEventListener('click', function () {
            funcionMostrarGrupos(nombreGrupo[x]);
        })
    }
}

function funcionNombreNuevoGrupo() {
    nombreNuevoGrupo = document.getElementById('nombreNuevoGrupo');
    console.log(nombreNuevoGrupo)
    //No hay errores con el nombreNuevoGrupo
    nombreNuevoGrupo.addEventListener('keypress', (event) => {
        // No entra a esta zona
        event.preventDefault();
        console.log(event)
    })
}



for (let i = 0; i < agregarTareas.length; i++) {
    agregarTareas[i].addEventListener('click', function () {
        formularioTareaFuncion(i, '', ' Grupo');
    });

}

function eliminarTarea(i, eliminar) {
    for (let j = 0; j < listaTareas[i].length; j++) {
        if (listaTareas[i][j].tarea == eliminar) {
            listaTareas[i].splice(j, 1);
        }
    }
    mostrarTareas(i);
}

function mostrarTareas(i) {
    mostrarTarea[i].innerHTML = '';
    for (let j = 0; j < listaTareas[i].length; j++) {
        let contador = j;
        mostrarTarea[i].innerHTML += `
        <div class="headerTarea">
        <div class="tarea">
            <div class="tareaNombre">
                <p class="bold">${listaTareas[i][j].tarea}</p>
                <div class=tareaAjustes>
                    <img id="check" src="/build/img/check.svg" alt="check" onclick="(eliminarTarea('${i}','${listaTareas[i][j].tarea}'))">
                    <img id="edit" src="/build/img/edit.svg" alt="edit" onclick="(editarTarea('${i}', '${listaTareas[i][j].tarea}', '${listaTareas[i][j].grupo}'))">
                    <img id="trash" src="/build/img/delete.svg" alt="trash" onclick="(eliminarTarea('${i}','${listaTareas[i][j].tarea}'))">
                </div>
            </div>
            <div class="tareaGrupo">
                <p class="bold">${listaTareas[i][j].grupo}</p>
            </div>
        
            </div>
        </div>`;
    }
}

function editarTarea(i, tarea, grupoTarea) {
    for (let j = 0; j < listaTareas[i].length; j++) {
        if (listaTareas[i][j].tarea == tarea) {
            listaTareas[i].splice(j, 1);
        }
        // ENVIAR FORMULARIO PARA QUE SE PUEDA VISUALIZAR EN LA PAGINA
        mostrarTareas(i);
        formularioTareaFuncion(i, tarea, grupoTarea);
        mostrarTareas(i);

    }
}

function formularioTareaFuncion(i, tarea, grupoTarea) {
    formularioTarea[i].innerHTML = `
    <form autocomplete = "off">
        <input type="text" class="nombreTarea" id="nombreTarea" name="nombreTarea"
            placeholder="Tarea Nueva" value="${tarea}">
    </form>
    <div class="select">
        <p id="select">>${grupoTarea}</p>
        <div class="subjectOculto" id="subject">
            <div class="opcion">
                <p id="opcion">opcion1</p>
                <div class="gruposOcultos" id="grupos">
                    <p id="grupo">Grupo 1</p>
                    <p id="grupo">Grupo 2</p>
                </div>
            </div>
            <div class="opcion">
                <p id="opcion">opcion2</p>
                <div class="gruposOcultos" id="grupos">
                    <p id="grupo">grupo1</p>
                    <p id="grupo">grupo2</p>
                </div>
            </div>
            <div class="opcion">
                <p id="opcion">opcion3</p>
                <div class="gruposOcultos" id="grupos">
                    <p id="grupo">grupo1</p>
                    <p id="grupo">grupo2</p>
                </div>
            </div>
        </div>
    </div>`;

    let select = document.getElementById('select');
    let subject = document.getElementById('subject');
    let opcion = document.querySelectorAll('#opcion');
    let grupos = document.querySelectorAll('#grupos');
    let grupo = document.querySelectorAll('#grupo');
    let vanSelect = false;
    select.addEventListener('click', function () {

        if (vanSelect == false) {
            subject.classList.add('subject');
            subject.classList.remove('subjectOculto');
            vanSelect = true;
        }
        else {
            subject.classList.remove('subject');
            subject.classList.add('subjectOculto');
            for (let x = 0; x < opcion.length; x++) {
                grupos[x].classList.remove('grupos');
                grupos[x].classList.add('gruposOcultos');
            }
            vanSelect = false;
        }

    });
    for (let x = 0; x < opcion.length; x++) {

        opcion[x].addEventListener('click', function () {
            grupos[x].classList.add('grupos');
            grupos[x].classList.remove('gruposOcultos');
            testigo = x;

            for (let k = 0; k < opcion.length; k++) {
                if (k != testigo) {
                    grupos[k].classList.remove('grupos');
                    grupos[k].classList.add('gruposOcultos');
                }
            }
        })
    }
    let grupoSeleccionado = "";
    for (let x = 0; x < grupo.length; x++) {
        grupo[x].addEventListener('click', function () {
            select.innerHTML = `${grupo[x].textContent}`;
            grupoSeleccionado = grupo[x].textContent;

            subject.classList.remove('subject');
            subject.classList.add('subjectOculto');
            for (let x = 0; x < opcion.length; x++) {
                grupos[x].classList.remove('grupos');
                grupos[x].classList.add('gruposOcultos');
            }
            vanSelect = false;
        })
    }


    let nombreTarea = document.querySelectorAll('#nombreTarea')
   
    nombreTarea[nombreTarea.length - 1].addEventListener('keypress', (event) => {
    
        if (event.which == 13) {
            event.preventDefault();
            listaTareas[i].push({ tarea: nombreTarea[nombreTarea.length - 1].value, grupo: grupoSeleccionado });
            formularioTarea[i].innerHTML = ' ';
            mostrarTareas(i);
        }

    });
}

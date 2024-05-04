/** Asignacion de variables */

const carrito = document.getElementById('carrito');
//querySelector, QuerySelectorAll
const bodyCarrito = document.querySelector('#lista-carrito tbody');
const footerCarrito = document.querySelector('#lista-carrito tfoot');
const vaciarCarrito = document.getElementById('vaciar-carrito');
const listadoCursos = document.getElementById('lista-cursos');
let arregloCarrito = [];

cargarEventos(); 
//Declaro la funcion
function cargarEventos ( ){
    //Haciendo llamado de las funciones que vamos a hacer

    //Llamar a funcion agregarCurso, el evento esta atento al contenedor main
    listadoCursos.addEventListener('click', agregarCurso);
    //llamamos al evento de escucha para que este atento al contenedor de la tabla
    carrito.addEventListener('click', eliminarcurso);
}
function agregarCurso(e){
    //cancela la accion que esta predeterminada a un elemento
    e.preventDefault(e.target);

    //classList
    if(e.target.classList.contains('button-carrito')){
        //Mandamos a llamar los elementos padre de la etiqueta que estamos seleccionando
       // console.log(e.target.parentElement.parentElement);

        const cursoSeleccionado = e.target.parentElement.parentElement;
        //leerDatosCurso(cursoSeleccionado);
        //Modificamos el texto de la etiqueta
        e.target.innerText='Ir al Carrito';
        //podemos modificar el html
        //e.target.innerHTML ='Aca las etiquetas'

        //agregamos una clase a la etiqueta
        e.target.classList.add('disabled');

        //enviamos una alerta para el usuario
        Swal.fire({
            icon: "success",
            title: "Agregado correctamente",
            showConfirmButton: false,
            timer: 900
        });
        leerDatosCurso(cursoSeleccionado);
    }
}
//funcion para mandar la informacion del curso al arreglo
function leerDatosCurso(curso){
    console.log(curso);
    //convertimmos la informacion del curso a un objeto

    const objetoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h5').textContent,
        precio: curso.querySelector('.precio').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    //solo es para probar si me esta guardando la informacion que necesito
    //console.log(objetoCurso);
    //Metodo para agregar elementos a un arreglo
    arregloCarrito.push(objetoCurso);
    //console.table(arregloCarrito);

    //arregloCarrito = [...arregloCarrito, objetoCurso];
    console.table(arregloCarrito);
    carritoHTML();
}
function carritoHTML(){
    //bucles => for, while, do while, foreach
    //Ejecutamos la funcion para eliminar los duplicados de los cursos
    limpiarCarritoBody(bodyCarrito);
    let total = 0;
    
    arregloCarrito.map(curso =>{
        //console.log(curso.titulo);
        //creamos filas con tr
        let formatear_precio = parseInt(curso.precio.slice(1));
        console.log(formatear_precio);
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>
            <img src="${curso.imagen}" width="100">
        </td>
        <td>
            "${curso.titulo}"
        </td>
        <td>
            "${curso.precio}"
        </td>
        <td>
            <a href="#" class="borra-curso" data-id="${curso.id}">Eliminar
            item</a>
        </td>
        `;
        bodyCarrito.appendChild(fila);
        total += formatear_precio;
    })
    limpiarCarritoBody(footerCarrito);
    const fila_total_foot = document.createElement('tr');
    fila_total_foot.innerHTML = `
            <td colspan="3">Total a pagar</td>
            <td>$${total}</td>
    `;
    footerCarrito.appendChild(fila_total_foot)
}

//Funcion para eliminar los hijos anteriores del arreglo

function limpiarCarritoBody(elemento){
        while(elemento.firstChild){
            elemento.removeChild(elemento.firstChild);
        }
}
// function limpiarfootercarrito(){
//     while(footerCarrito.firstChild){
//         footerCarrito.removeChild(footerCarrito.firstChild)
//     }
// }bo
//Metodo para eliminar un curso por su id
function eliminarcurso(e){
    if(e.target.classList.contains('borra-curso')){
        //imprimir el id
        const cursoId = e.target.getAttribute('data-id');
        const habilitarBoton = document.querySelector(`.button-carrito[data-id="${cursoId}"]`);
       // console.log(habilitarBoton);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then((result) => {
            if (result.isConfirmed) {
                arregloCarrito = arregloCarrito.filter(curso => curso.id !==cursoId);
        
                Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
                        });
                if (habilitarBoton){
                    habilitarBoton.classList.remove('disabled');
                }
            carritoHTML();
            }
        });


        
        
    }
}

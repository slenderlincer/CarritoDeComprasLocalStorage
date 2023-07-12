//Variables

const carrito = document.querySelector('#carrito');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCultivos = document.querySelector('#lista-cultivos');

//Array
let articulosCarrito = [];

//Eventos
EventListeners();

function EventListeners(){

    //Agregar Curso al carrito
    listaCultivos.addEventListener('click', agregarCajas);

    //Elimina una caja del carrito
    carrito.addEventListener('click', eliminarCaja);

    //Muestra los cursos del local Storage
    document.addEventListener('DOMContentLoaded', ()=>{
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carritoUI();
    });

    //vaciar el carrito

    vaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHTML();
    });
};

//Funciones
function agregarCajas(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){


        //Seleccion de elemento 
        const cultivoSeleccionado = e.target.parentElement.parentElement;

        //Prueba de que funciona desde la consola
        //console.log(cultivoSeleccionado);

        DatosCultivos(cultivoSeleccionado);
    };
};

//Elimina una caja del carrito

function eliminarCaja(e){
    
    
    if(e.target.classList.contains('borrar-curso')){

        const cajaId = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(caja => caja.id !== cajaId);

       carritoUI();
    };
};

//Lee el contenido del elemento HTML y extrae la informacion del cultivo

function DatosCultivos(caja){

    //Prueba de que funciona desde la consola
    //console.log(caja);

    //Se crea un objeto con el contenido que se extrae

    const infoCultivo = {
        imagen: caja.querySelector('img').src,
        titulo: caja.querySelector('h5').textContent,
        precio: caja.querySelector('.precio').textContent,
        id: caja.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    //Prueba de que se extrae y se crea el objeto con la informacion de forma correcta desde la consola
    //console.log(infoCultivo);

    //Revisa si un elemento ya existe en el carrito, si existe aumenta la cantidad
    
    const existe = articulosCarrito.some(caja => caja.id == infoCultivo.id);
    if(existe){

        //Actualiza la cantidad de cajas
        const cajas = articulosCarrito.map(caja => {
            if(caja.id === infoCultivo.id){
                caja.cantidad++

                return caja;
            }else{
                return caja;
            };
        });
        
        articulosCarrito = [...cajas]
    }else{
        
        //Se agregan los elementos del arrelgo de carrito

        articulosCarrito = [...articulosCarrito, infoCultivo];
    };
    
    carritoUI();
};

function carritoUI(){

    limpiarHTML();
    //Recorre el carrito y genera el HTML

    articulosCarrito.forEach(caja => {
        const {imagen, titulo, precio, cantidad, id} = caja;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src = "${imagen}">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href = "#" class = "borrar-curso" data-id = "${id}"> Eliminar </a>
        </td>`;

        listaCarrito.appendChild(row)
    });

    //Sincronizar el carrito de comprar con el local Storage
    sincronizacionStorage();
};

function sincronizacionStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
};

function limpiarHTML(){
    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild);
    };
};
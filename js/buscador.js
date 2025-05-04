function cargarDatos(encontrar = ''){
    // console.log(encontrar);
    var peticion = new XMLHttpRequest()
    peticion.open('GET','js/datos.json')
    
        peticion.onload = function (){
        
        if (peticion.status == 200){
            var datos = JSON.parse(peticion.response);
            let canciones = datos.canciones; 
            
        if (encontrar) {
                canciones = canciones.filter( cancion => cancion.nombre.toLowerCase().includes(encontrar.toLowerCase()) )
                
            }
            
            let lista = document.getElementById('listamusica');
                                   
            canciones.forEach(item => {
                let cancion = document.createElement('div');
                cancion.innerHTML = '<p class="nombre-cancion">'+item.nombre+'<li><h4 class="img-salsa">🎵</h4><audio class="centrar-audio" controls play><source src="'+item.ruta+'" type="audio/mpeg"></audio></li></p>';
                lista.appendChild(cancion);
               
            });
                    
        }
    }
    
    peticion.send()
}

window.addEventListener('load', cargarDatos());

document.addEventListener('keyup', e=>{

    if (e.target.matches('#buscador')){
  
        if (e.key ==='Escape')e.target.value = "";

        document.getElementById('listamusica').innerHTML = '';
        // Esta linea limpia el div con el id conteido para que cada vez que inserte una letra el contenedor se limpie y no imprima lo mismo
        
        let li = document.querySelector(".titulo");
        li.style.color = 'green';

        cargarDatos(e.target.value);
      }
  })
  //Datos Json pàgina imagenes
console.log('archivo buscador.js cargado correctamente');

const datafile = 'js/datos.json';

//Selecciòn elementos del Dom
const cantantesMusic = document.getElementById('imagen');

//Funciòn para cargar datos del archivo
async function loadData(){
    try{
        //Carga del archivo json
        const response = await fetch('js/datos.json');
        if (!response.ok){
            throw new Error('No se pudo cargar el archivo');
        }
        const data = await response.json();

        //Cargar las imagenes dinamicamente
        data.cantantesmusic.forEach(cantante => {
            const cantanteItem = document.createElement('div');
            cantanteItem.classList.add('cantante-item');
            cantanteItem.innerHTML = `
                <h3>${cantante.titulo}</h3>
                <img class="img-item" src="${cantante.img}">
            `;
            cantantesMusic.appendChild(cantanteItem);
        })
    } catch (error){
        console.log('Error al cargar los datos:', error);
      }
    }
    //Ejecutar la funciòn al cargar la pàgina
    document.addEventListener('DOMContentLoaded', loadData);
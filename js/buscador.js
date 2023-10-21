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

  // CREATE TABLE IF NOT EXISTS `empresa`.`permisos` (
  //   `id` INT NOT NULL AUTO_INCREMENT,
  //   `usuario_id` INT NOT NULL,
  //   `tipo_usuario` INT NOT NULL,
  //   `aplicacion_id` INT NOT NULL,
  //   PRIMARY KEY (`id`),
  //   INDEX `ix_usuario_id` USING BTREE (`usuario_id`) INVISIBLE,
  //   INDEX `ix_tipo_usario_id` USING BTREE (`tipo_usuario`) VISIBLE,
  //   INDEX `ix_aplicacion_id` USING BTREE (`aplicacion_id`) VISIBLE,
  //   CONSTRAINT `fk_tipo_usuario_id`
  //     FOREIGN KEY ()
  //     REFERENCES `empresa`.`tipo_usuarios` ()
  //     ON DELETE CASCADE
  //     ON UPDATE CASCADE,
  //   CONSTRAINT `fk_usuario_id`
  //     FOREIGN KEY ()
  //     REFERENCES `empresa`.`usuarios` ()
  //     ON DELETE CASCADE
  //     ON UPDATE CASCADE,
  //   CONSTRAINT `fk_aplicacion_id`
  //     FOREIGN KEY ()
  //     REFERENCES `empresa`.`aplicaciones` ()
  //     ON DELETE CASCADE
  //     ON UPDATE CASCADE)
  // ENGINE = InnoDB
  // COMMENT = 'SHOW TABLES\n'
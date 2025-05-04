//Funcion boton menu tres lineas 
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
    
navToggle.addEventListener("click",()=>{
navMenu.classList.toggle("nav-menu_visible");
});
//-------------------------------------------------------

//Funcione del boton contacto modal
document.getElementById('abrir-modal').addEventListener('click', function() {
  Swal.fire({
      title: 'Contacto',
      html: `
      <div>
        <p class="abrir_modal">🤵 James Marin</p>
        <p class="abrir_modal">📧 frelancerjm@gmail.com</p>
        <p class="abrir_modal">📞 +34 624845149</p>
      </div>
      `,
      icon: 'info',
      confirmButtonText: 'Cerrar',
      customClass: {
          popup: 'custom-swal-popup'
      }
  });
});

//Validación sencilla formulario
const formulario = document.getElementById('myForm');

// Escuchar el evento submit
formulario.addEventListener('submit', function (event) {
    // Seleccionar los campos
    const nombre = document.querySelector('#nombre').value.trim();
    const comentario = document.getElementById('comentario').value.trim();
    // const mensaje = document.getElementById('mensaje');

    // Validar si están vacíos
    if (!nombre || !comentario) {
        event.preventDefault(); // Evitar el envío del formulario
        // mensaje.textContent = 'Todos los campos son obligatorios ve...';
        // mensaje.style.color = "red";
        alert("Todos los campos son obligatorios ve...");
    } else {
        alert("Se creo el contenido correctamente 😀");
    }
    formulario.reset();
});
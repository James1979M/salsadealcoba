document.getElementById("formulario-sugerencia").addEventListener("submit", function(event) {
    event.preventDefault();

    let cancion = document.getElementById("cancion").value.trim();
    let artista = document.getElementById("artista").value.trim();
    // let comentario = document.getElementById("comentario").value.trim();
    let mensaje = document.getElementById("mensaje");//Div que muestra el mensaje

    // Validación: No permitir enviar si los campos obligatorios están vacíos
    if (cancion === "" || artista === "") {
        mensaje.innerText = "⚠️ Debes completar todos los campos";
        mensaje.style.color = "red";
        return;
    }

    let datos = {
        cancion: cancion,
        artista: artista
        // comentario: comentario
    };
    //URL de la aplicacion web
    fetch("https://script.google.com/macros/s/AKfycbzPYn71l3pssEH17D5iMKKN9ZfqKZ_kbu-suSIGC613CMpwyC3703H4lqDFDr2fC9c/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(datos)
    })
    .then(() => {
        mensaje.innerText = "✅ ¡Sugerencia enviada con éxito!";
        mensaje.style.color = "green";
        document.getElementById("formulario-sugerencia").reset();
    })
    .catch(error => {
        mensaje.innerText = "❌ Error al enviar sugerencia.";
        mensaje.style.color = "red";
        console.error(error);
    });
});
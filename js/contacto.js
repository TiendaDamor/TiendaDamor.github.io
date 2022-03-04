/*
var registros=[];
  localStorage.setItem("Formularios", JSON.stringify(registros));
*/
registros = JSON.parse(localStorage.getItem("Formularios"));
class Form {
    constructor(nombre, email, telefono, mensaje) {
        this.nombre = nombre;
        this.email = email;
        this.telefono = telefono;
        this.mensaje = mensaje;
    }
}
function agregar(formulario) {

    var nombre = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('phone').value;
    var mensaje = document.getElementById('Mensaje').value;
    validarForm(nombre, email, telefono, mensaje);
}

function validarForm(nombre, email, telefono, mensaje) {
    var correcto = true;

    if (nombre.length < 2) {
        correcto = false;
        alert("Nombre muy corto");

    }

    if (isNaN(telefono)) {
        correcto = false;
        alert("No es un numero de telefono valido");
    }

    var expresion = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
    if (!expresion.test(email)) {
        correcto = false;
        alert("Email invalido");
    }

    if (!correcto) {
        alert("Algunos campos no estan correctos,")
    } else {
        var formulario = new Form(nombre, email, telefono, mensaje);

        registros.push(formulario);
        localStorage.setItem("Formularios", JSON.stringify(registros));
        sendEmail(formulario);
        nombre = "";
        email = "";
        telefono = "";
        mensaje = "";
    }
    console.log(correcto);
    return correcto;
}
//Comentario
function sendEmail(formulario) {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "sailor.scoutsc7@gmail.com",
        Password: "generation7",
        To: 'sailor.scoutsc7@gmail.com',
        From: "sailor.scoutsc7@gmail.com",
        Subject: "Prueba1",
        Body: `Nombre: ${formulario.nombre} \nEmail: ${formulario.email} \nteléfono: ${formulario.telefono} \nMensaje: ${formulario.mensaje}`
    }).then(
        message => alert("Correo enviado correctamente!")
    );
}

/*Email.send({
        Host: "smtp.mailtrap.io",
        Username: "331a9965e85259",
        Password: "ea9496b5bc4d5d",
        To: 'sailor.scoutsc7@gmail.com',
        From: "sailor.scoutsc7@gmail.com",
        Subject: "Prueba1",
        Body: formulario
    }).then(msg => alert("The email successfully sent")) */
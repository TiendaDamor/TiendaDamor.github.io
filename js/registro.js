/*
var registro_usuarios=[];//Crea la lista donde se van a almacenar los registros
localStorage.setItem("Registro_usuarios", JSON.stringify(registro_usuarios));
*/
 registro_usuarios = JSON.parse(localStorage.getItem("Registro_usuarios"));
class Usuario {//El Usuario tiene que ingresar estos datos.
    constructor(nombre,telefono,correo,contraseña) {
       
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.contraseña = contraseña;
    }
}
function agregarUsuario(){
    var nombre = document.getElementById('nombre').value;//Recupero los elementos de las textbox
    var correo = document.getElementById('email').value;
    var contraseña = document.getElementById('contraseña').value;
    var telefono = document.getElementById('telefono').value;
    var contraseña2 = document.getElementById('contraseña2').value;
    if (contraseña==contraseña2) {
        const usuario=new Usuario(nombre,telefono,correo,contraseña);
        fetch('http://localhost:8081/api/usuarios/', {
             method: 'POST',
            headers: {
            'Content-Type': 'application/json',
             },
  
         body: JSON.stringify(usuario),
        })
        .then(response => response.json())
        .then(usuario => {
            console.log('Success:',usuario);
                })
            .catch((error) => {
            console.error('Error:', error);
            });
    } else {
        alert("Contraseñas no coinciden");
    }
}
function validar(nombre,telefono,email,contraseña,contraseña2){
    validarRegistro(nombre,telefono,email,contraseña,contraseña2);
}

function validarRegistro(nombre,telefono,email,contraseña1,contraseña2){
    var correcto = true;
    var nombre = document.getElementById('nombre').value;;
    var expresioName= /^[ÁÉÍÓÚA-Z][a-záéíóú]+(\s+[ÁÉÍÓÚA-Z]?[a-záéíóú]+)*$/;
    if(!expresioName.test(nombre)){
        correcto = false;
        alert("Nombre no valido: Nombre Inica en Mayuscula");
    }

    var expresionNumero = /^(\(\+?\d{2,3}\)[\*|\s|\-|\.]?(([\d][\*|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/;
    var telefono = document.getElementById("telefono").value;
    if(!expresionNumero.test(telefono)){
        correcto= false;
        alert("Numero no valido");
    }

    var expresionEmail = /^[a-z][\w.-]+@\w[\w.-]+\.[\w.-]*[a-z][a-z]$/i;
    if (!expresionEmail.test( email = document.getElementById('email').value)) {
        correcto = false;
        alert("Email invalido");
        console.log("invalido");
    }

    var contraseña = document.getElementById('contraseña').value;
    var expresionContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if ( !expresionContrasena.test(contraseña) ) {
        correcto = false;
        alert("Contrasena Invalida: \nDebe contener 8 caracteres\n1 Mayuscula,Minusculas y almenos 1 Numero");
    }
    var contraseña2 = document.getElementById('contraseña2').value;
    if ( contraseña2 != contraseña ) {
        correcto = false;
        alert("Contrasenas No son iguales");

    }
    if(!correcto){
        alert("No se creo cuenta")
    }else{
        alert("Cuenta creada " + nombre);
       agregarUsuario();
    }

}





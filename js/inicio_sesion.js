fetch('http://localhost:8081/api/usuarios/')
    .then(function(response){
      response.json().then(function(registro_usuarios){
            
          console.log(registro_usuarios);
      })
    }); 

 function iniciar(){
    fetch('http://localhost:8081/api/usuarios/')
    .then(function(response){
      response.json().then(function(registro_usuarios){
        var ingresar_correo=document.getElementById("correo").value; //aqui se guarda el correo ingresado por el usuario
        var ingresar_contraseña=document.getElementById("contraseña").value;//aqui se guarda la contraseña ingresada por el usuario
        //Este for busca si existe el correo ingresado por eo usuario dentro del arreglo
        for (let index = 0; index < registro_usuarios.length; index++) {
            const verificar_correo = registro_usuarios[index].correo;
            const verificar_contraseña = registro_usuarios[index].contraseña;
         if (ingresar_correo==verificar_correo&&ingresar_contraseña==verificar_contraseña) {
             var validar=true;
             break;//si se encuentra el correo se sale del ciclo, sino sigue buscando
         } else {
            continue;
         }
        }
        if(validar){
            //aqui se agrega el código del carrito
    
            
            location.href ="../html/listaproductos.html";
        }else{
            alert("correo y contraseña incorrectos");
        }     
          
      })
    });    
      }
 








//Validación
function valida(email,contrasena){
    validaInicioSesion(email,contrasena);
}

function validaInicioSesion(email,contrasena){
    var correcto =  true;

   var email = document.getElementById('correo').value
    if (email == "") {
        correcto = false;
        alert("Debes Ingresar un Email");
    }

    var contrasena = document.getElementById('contraseña').value;
    if ( contrasena == "" ) {
        correcto = false;
        alert("Debes Ingresar Una Contraseña");

    }

    if (!correcto) {
        alert("Datos Erroneos");

    } else {
        iniciar();
    }

}


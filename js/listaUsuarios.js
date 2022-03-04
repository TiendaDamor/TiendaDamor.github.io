console.log("Sistema funcionando")

var Url='http://localhost:8081/api/usuarios/';
fetch(Url)
    .then(function(response){
      response.json().then(function(usuario){
            for (let j = 0; j < usuario.length; j++) {
                var cargar = usuario[j];
                cargarUsuario(cargar);
              console.log(cargar);
            }
      })
    });
  

function cargarUsuario(usuarios){
  const itemHTML= `
  <tr id="${usuarios.id}">
  <td scope="row">${usuarios.id}</td>
  <td class="text-left">${usuarios.nombre}</td>
  <td class="text-left">${usuarios.correo}</td>
  <td class="text-left">${usuarios.direccion}</td>
  <td class="text-left">${usuarios.telefono}</td>
  <td class="text-left">${usuarios.contraseña}</td>
  <td class="text-left"><button class="btn btn-success btn-sm" title="Editar" type="button" data-toggle="modal" data-target="#exampleModal1" >Editar</button><button class="btn btn-danger btn-sm" title="Eliminar" onclick="eliminarUsuario(${usuarios.id})">Eliminar</button></td>
  
  </tr>`
    const itemsContainer = document.getElementById("listaUsuarios");//define en que sección poner el producto
    itemsContainer.innerHTML += itemHTML;//añade el elemento HTML
}

function crearUsuario(){

  
var nombre = document.getElementById("nombre").value;
var correo = document.getElementById("correo").value;
var direccion=document.getElementById("direccion").value;
var telefono=document.getElementById("telefono").value;
var contraseña = document.getElementById("contrasena").value;
  const obj = {
    nombre: nombre,
    correo:correo,
    direccion:direccion,
    telefono:telefono,
    contraseña:contraseña
  }
  
  fetch(Url, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  
    //make sure to serialize your JSON body
    body: JSON.stringify(obj)
  })
  .then( (response) => { 
    alert("Usuario"+ nombre + "Creado");
  });
  };

  function eliminarUsuario(id){
    fetch(Url + id, {
      method: 'DELETE',
    })
    .then(res => {
      alert("Eliminado con Exito");
    }) 
  }

// Para actualizar
function updateUsuario(id){
  console.log(cargar);
  $("#enombre").val(usuarios.nombre);
  $("#correo").val(usuarios.correo);
  $("#direccion").val(usuarios.direccion);
  $("#telefono").val(usuarios.telefono);
  $("#contraseña").val(usuarios.contraseña);


  fetch('http://localhost:8080/api/usuarios/',+id+'?nombre='+nombre+'&correo='+correo+'&direccion='+direccion+'&telefono='+telefono+'&contraseña='+contraseña, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'user'
  })
})
.then(res => {
  return res.json()
})
.then(data => console.log(data))
}
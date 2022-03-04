console.log("Sistema funcionando")
load();
function load(){
fetch('http://localhost:8081/api/productos/')
    .then(function(response){
      response.json().then(function(productos){
            for (let j = 0; j < productos.length; j++) {
                var cargar = productos[j];
                cargarProducto(cargar);
                console.log(cargar)
            }
      })
    });
  }
function agregarModal(){
  $("#id").val("");
  document.getElementById("id1").style.display = 'none';
  document.getElementById("update").style.display = 'none';
  document.getElementById("add").style.display = '';
  $('#exampleModalLabel').html("Añadir Producto"); 
  $("#imagen").val("");
  $("#nombre").val("");
  $("#precio").val("");
  $("#cantidad").val("");
  $("#descripcion").val("");
}
function cargarProducto(cargar){
    const itemHTML= `
    <tr id="${cargar.id}">
    <td scope="row">${cargar.id}</td>
    <td class="text-left">${cargar.url_Imagen}</td>
    <td class="text-left">${cargar.nombre}</td>
    <td class="text-left">${cargar.descripcion}</td>
    <td class="text-left">${cargar.tipo}</td>
    <td class="text-left">${cargar.precio} pesos</td>
    <td class="text-left">${cargar.cantidad}</td>
    <td class="text-left"><button class="btn btn-success btn-sm" title="Editar" type="button" data-toggle="modal" data-target="#modal" data-whatever="@mdo" onclick="modal(${cargar.id})">Editar</button></td>
    <td class="text-left"><a href="#"><button class="btn btn-danger btn-sm" title="Eliminar" onclick="eliminar(${cargar.id})">Eliminar</button></a></td>
    </tr>
    `
    const itemsContainer = document.getElementById("lista");//define en que sección poner el producto
    itemsContainer.innerHTML += itemHTML;//añade el elemento HTML
}

function eliminar(id){
   fetch(`http://localhost:8081/api/productos/${id}`, {
             method: 'DELETE'
            })
        .then(console.log("Exito"))   
        var elem = document.getElementById(id);
        elem.parentNode.removeChild(elem);
}


function modal(id){
  $('#exampleModalLabel').html("Editar Producto"); 
  document.getElementById("id1").style.display = '';
  document.getElementById("update").style.display = '';
  document.getElementById("add").style.display = 'none';
  console.log(id);
  fetch(`http://localhost:8081/api/productos/${id}`)
.then(data => {
return data.json();
})
.then(post => {
  $("#id").val(post.id);
  $("#imagen").val(post.url_Imagen);
  $("#nombre").val(post.nombre);
  $("#precio").val(post.precio);
  $("#cantidad").val(post.cantidad);
  $("#descripcion").val(post.descripcion);
});
}

function actualizar(){
  var id= document.getElementById('id').value;
  var nombre = document.getElementById('nombre').value;
    var precio = document.getElementById('precio').value;
    var cantidad = document.getElementById('cantidad').value;
    var tipo = document.getElementById('tipo').value;
    var descripcion = document.getElementById('descripcion').value;
    var url_Imagen = document.getElementById('imagen').value;
    var producto=new Producto(id,nombre,precio,cantidad,tipo,descripcion,url_Imagen);
    fetch(`http://localhost:8081/api/productos/${id}?nombre=${nombre}&precio=${precio}&cantidad=${cantidad}&tipo=${tipo}&descripcion=${descripcion}&url_Imagen=${url_Imagen}`, {
      method: 'PUT', // or 'PUT'
      //body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(response => {
        console.log('Success:',response);
            })
            
            .catch((error) => {
              console.error('Error:',error);
              })
      $('#modal').modal('hide');
      var elem = document.getElementById(id);
      elem.parentNode.removeChild(elem);
     cargarProducto(producto);
      $("#id").val("");
  $("#imagen").val("");
  $("#nombre").val("");
  $("#precio").val("");
  $("#cantidad").val("");
  $("#descripcion").val("");
      alert("Producto modificado correctamente");
}


class Producto {
  constructor(id,nombre,precio,cantidad,tipo,descripcion,url_Imagen) {
      this.id=id;
      this.nombre = nombre;
      this.precio = precio;
      this.cantidad= cantidad;
      this.tipo= tipo;
      this.descripcion= descripcion;
      this.url_Imagen= url_Imagen;
  }
}

function añadirProducto(){
  var id= document.getElementById('id').value;
  var nombre = document.getElementById('nombre').value;
    var precio = document.getElementById('precio').value;
    var cantidad = document.getElementById('cantidad').value;
    var tipo = document.getElementById('tipo').value;
    var descripcion = document.getElementById('descripcion').value;
    var url_Imagen = document.getElementById('imagen').value;
    var producto=new Producto(id,nombre,precio,cantidad,tipo,descripcion,url_Imagen);
    fetch(`http://localhost:8081/api/productos/`, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(producto), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(response => {
        console.log('Success:',response);
            })
            
            .catch((error) => {
              console.error('Error:',error);
              })
      $('#modal').modal('hide');
     cargarProducto(producto);
      $("#id").val("");
      $("#imagen").val("");
      $("#nombre").val("");
      $("#precio").val("");
      $("#cantidad").val("");
      $("#descripcion").val("");
      
}
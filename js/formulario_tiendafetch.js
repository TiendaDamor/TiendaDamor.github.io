 console.log("Sistema funcionando");
 //Montar el servidor (Solo usar una vez)

//   var regular=[];
//    localStorage.setItem("regular", JSON.stringify(regular));
//   var producto_covid=[];
//   localStorage.setItem("producto_covid", JSON.stringify(producto_covid));
//   var temporada=[];
//   localStorage.setItem("temporada", JSON.stringify(temporada));

regular = JSON.parse(localStorage.getItem("regular"));
temporada = JSON.parse(localStorage.getItem("temporada"));
producto_covid = JSON.parse(localStorage.getItem("producto_covid"));

class Producto {
    constructor(nombre,precio,cantidad,tipo,descripcion,img) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad= cantidad;
        this.tipo= tipo;
        this.descripcion= descripcion;
        this.img= img;
    }
}
function agregarProducto(formulario) {
    var nombre = document.getElementById('nombre_producto').value;
    var precio = document.getElementById('Precio').value;
    var cantidad = document.getElementById('cantidad').value;
    var tipo = document.getElementById('tipo').value;
    var descripcion = document.getElementById('Descripcion').value;
    var img = document.getElementById('imagen').value;
    img = img.replace(/^.*\\/, "");
    //validarForm(nombre, email, telefono, mensaje);
    var producto = new Producto(nombre,precio,cantidad,tipo,descripcion,img);
    console.log(tipo);
    tipoProducto(tipo,producto);
    ID="";
    nombre="";
    precio="";
    cantidad="";
    tipo="";
    descripcion="";
    img="";
}
//función que determina en que almacenamiento guardar cada producto.
function tipoProducto(tipo,producto){
   switch(tipo){
   case "regular":
    regular.push(producto);
    localStorage.setItem("regular", JSON.stringify(regular));
    break;
   case "temporada":
    temporada.push(producto);
    localStorage.setItem("temporada", JSON.stringify(temporada));
    break;
   case "producto_covid":
    producto_covid.push(producto);
    localStorage.setItem("producto_covid", JSON.stringify(producto_covid));
    break;
   }
}
//función que usa los datos del LocaStorage para hacer las tarjetas del producto
function añadirProducto(subir_producto){
    
    var primerletra = subir_producto.tipo.charAt(0);
    const itemHTML = 
        '<div class="col-md-4">\n'                                         +
        '<div class="card" style="width: 18rem;">\n'                        +
        '<img src="../html/assets/Store/'+subir_producto.tipo+'/'+subir_producto.url_Imagen+'" class="card-img-top" alt="'+subir_producto.nombre+'">\n'                        +
        '    <div class="card-body">\n'                                     +
        '        <h5 class="card-title">'+subir_producto.nombre+'</h5>\n'   +
        '        <h6 style="color: brown; font-sixe: 50px" id="precio">'+subir_producto.precio+' MXN</h6>\n'   +
        '        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#' + primerletra + subir_producto.ID + '" onclick="agregarModal()">Agregar</button>\n' +
        '    </div>\n'                                                      +
        '</div>\n'                                                          +
        '</div>\n'                                                          +    
         //Modal

         '<div class="modal fade bd-example-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="' + primerletra + subir_producto.ID + '">\n' +
         '<div class="modal-dialog modal modal-dialog-centered" role="document">\n' +
         '<div class="modal-content">\n' +
         '<div class="modal-header" style="text-align: center;">\n' +
         '<h5 class="modal-title" id="exampleModalLongTitle" style="text-align: center;">' + subir_producto.nombre + '</h5>\n' +
         '<button type="button" class="close" data-dismiss="modal" style="font-size=15px" aria-label="Close>\n' +
         '<span aria-hidden="true">&times;</span>\n' +
         '</button>\n' +
         '</div>\n' +
         '<div class="modal-body">\n' +
         '<div class="container-fluid">\n' +
         '<div class="row">\n' +
         '<div class="col-md-4"><img src="../html/assets/Store/' + subir_producto.tipo + '/' + subir_producto.url_Imagen + '" class="img-fluid"></div>\n' +
         '<div class="col-md-8" ><p style="text-align: justify;">'+subir_producto.descripcion+'</p><p style="text-align: justify;">Precio: </p>' +'<a id="cambioPrecio" style="font-size=15px" >' + subir_producto.precio + '</a>' +' <a>pesos.</a><div class="btn-mas"><span>-</span><span class="numero" id="value">1</span><span>+</span></div></div>\n' +
         '</div>\n' +
         '</div>\n' +
         '</div>\n' +
         '<div class="modal-footer">\n' +
         '<button type="button" class="btn btn-primary">Agregar</button>\n' +
         '</div>\n' +
         '</div>\n' +
         '</div>\n' +
         '</div>';                                                       
    const itemsContainer = document.getElementById(subir_producto.tipo);//define en que sección poner el producto
    itemsContainer.innerHTML += itemHTML;//añade el elemento HTML
}

// función que añade productos al carrusel
function añadirProductosTempo(añadir_productoTemp){
    const itemHTML2 = 
        '<div class="carousel-item">\n'                                     +
        '<img src="assets/Store/temporada/'+añadir_productoTemp.img +'" class="d-block w-100" alt="..." height="500" width="150"></img>\n'+
         '</div>';
    const itemsContainer2 = document.getElementById("carrusel");//define en que sección poner el producto
    itemsContainer2.innerHTML += itemHTML2;//añade el elemento HTML
}
/*
<div class="carousel-item">
          <img src="assets/Store/temporada/febrero.jpg" class="d-block w-100" alt="..." height="500" width="150">
          </div>
*/
//Código para añadir productos al HTML.


    //contador del modal 
    document.querySelectorAll(".btn-mas>span:first-child, .btn-mas>span:last-child").forEach(span => {
        span.addEventListener("click",
        function () {
            var element=this.parentElement.querySelector(".numero");
            var numero=parseInt(document.getElementById(cambioPrecio));
            var prueba = subir_producto.precio+numero;
            if (this.innerText=="+") {
                // incrementamos
                num ++;
                           
            } else {
                // decrementano
                
                num--;
            }
            element.innerText=num;  
            document.getElementById("cambioPrecio").innerText =  prueba.toString();
        });
    });//document

    /*
    function CambioDePrecio(){
        
    document.getElementById("cambioPrecio").innerText =  prueba.toString();
    }

CambioDePrecio();*/


fetch('http://localhost:8081/api/productos/')
    .then(function(response){
      response.json().then(function(productos){

      })
    });
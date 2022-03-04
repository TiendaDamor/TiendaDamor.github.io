

var cart = {



    // (A) PROPERTIES
    hPdt: null,      // html products list
    hItems: null,    // html current cart
    items: {},       // current items in cart
    iURL: "../html/assets/Store/", // product image url folder

    // (B) LOCALSTORAGE CART
    // (B1) SAVE CURRENT CART INTO LOCALSTORAGE
    save: () => {
        sessionStorage.setItem("cart", JSON.stringify(cart.items));
    },

    // (B2) LOAD CART FROM LOCALSTORAGE
    load: () => {
        cart.items = sessionStorage.getItem("cart");
        if (cart.items == null) { cart.items = {}; }
        else { cart.items = JSON.parse(cart.items); }
    },

    // (B3) EMPTY ENTIRE CART
    nuke: () => {
        if (confirm("¿Estás seguro que quieres cancelar tu compra?")) {
            cart.items = {};
            sessionStorage.removeItem("cart");
            cart.list();
        }
    },
    // (C) INITIALIZE
    init: () => {
        // (C1) GET HTML ELEMENTS
        
                  cart.hPdt = document.getElementById("regular");
                  cart.hItems = document.getElementById("cart-items");
                  // (C2) DRAW PRODUCTS LIST
                  //cart.hPdt.innerHTML = "";
                 // fetch(`http://localhost:8081/api/productos/`)
                   // .then(response => response.json())
                    //.then(products => {

                  let template = document.getElementById("template-product").content,
                      p, item, part;
                  for (let id in products) {
                      p = products[id];
                      console.log(p)
                      item = template.cloneNode(true);
                      cart.hPdt = document.getElementById(p.tipo);
                      item.querySelector(".p-img").src = cart.iURL + p.tipo+ "/" + p.url_Imagen;
                      item.querySelector(".p-name").textContent = p.nombre;
                      item.querySelector(".p-desc").textContent = p.descripcion;
                      item.querySelector(".p-price").textContent = "$" + p.precio.toFixed(2);
                      item.querySelector(".p-add").onclick = () => { cart.add(id); };
                      console.log(p.tipo)

                      cart.hPdt.appendChild(item);
          
                  }
          
                  // (C3) LOAD CART FROM PREVIOUS SESSION
                  cart.load(products);
          
                  // (C4) LIST CURRENT CART ITEMS
                  cart.list();      
                //})
        
    },

    // (D) LIST CURRENT CART ITEMS (IN HTML)
    list: () => {
        // (D1) RESET
        cart.hItems.innerHTML = "";
        let item, part, pdt, empty = true;
        for (let key in cart.items) {
            if (cart.items.hasOwnProperty(key)) { empty = false; break; }
        }

        // (D2) CART IS EMPTY
        if (empty) {
            item = document.createElement("div");
            item.innerHTML = "Carrito vacio";
            cart.hItems.appendChild(item);
        }

        // (D3) CART IS NOT EMPTY - LIST ITEMS
        else {

          //  fetch(`http://localhost:8081/api/productos/`)
            //        .then(response => response.json())
              //      .then(products => {
                        let template = document.getElementById("template-cart").content,
                        p, total = 0, subtotal = 0;
                    for (let id in cart.items) {
                        // (D3-1) PRODUCT ITEM
                        p = products[id];
                        console.log(p)
                        item = template.cloneNode(true);
                        cart.hPdt = document.getElementById(p.tipo);
                        item.querySelector(".c-del").onclick = () => { cart.remove(id); };
                        item.querySelector(".c-img").src = cart.iURL + p.tipo+ "/" + p.url_Imagen;
                        item.querySelector(".c-name").textContent = p.nombre;
                        item.querySelector(".c-price").textContent = "Precio: $" + p.precio;
                        //item.createElement("div").className = "c"
                        item.querySelector(".c-qty").value = cart.items[id];
                        item.querySelector(".c-qty").onchange = function () { cart.change(id, this.value); };
                        cart.hItems.appendChild(item);
                        
        
                        // (D3-2) SUBTOTAL
                        subtotal = cart.items[id] * p.precio;
                        total += subtotal;
                        
                    }
        
                    // (D3-3) TOTAL AMOUNT
                    item = document.createElement("div");
                    item.className = "c-total";
                    item.id = "c-total";
                    item.innerHTML = "TOTAL: $" + total;
                    cart.hItems.appendChild(item);
        
                    // (D3-4) EMPTY & CHECKOUT
                    item = document.getElementById("template-cart-checkout").content.cloneNode(true);
                    item.querySelector(".c-checkout").onclick= function (){cart.checkout(total);};
                    cart.hItems.appendChild(item);


                  //  })
            
        }
    },

    // (E) ADD ITEM INTO CART
    add: (id) => {
        if (cart.items[id] == undefined) { cart.items[id] = 1; }
        else { cart.items[id]++; }
        cart.save(); cart.list();
        openNav();
    },

    // (F) CHANGE QUANTITY
    change: (pid, qty) => {
        // (F1) REMOVE ITEM
        if (qty <= 0) {
            delete cart.items[pid];
            cart.save(); cart.list();
        }

        // (F2) UPDATE TOTAL ONLY
        else {
          //  fetch(`http://localhost:8081/api/productos/`)
           // .then(response => response.json())
            //.then(products => {
            cart.items[pid] = qty;
            var total = 0;
            for (let id in cart.items) {
                total += cart.items[id] * products[id].precio;
                document.getElementById("c-total").innerHTML = "TOTAL: $" + total;
            }
        //})
        }
    },

    // (G) REMOVE ITEM FROM CART
    remove: (id) => {
        delete cart.items[id];
        cart.save();
        cart.list();
    },

    // (H) CHECKOUT
    checkout: (total) => {
        
        item = document.createElement("div");
            item.className = "paypal-button-container";
            item.id = "paypal-button-container";
            cart.hItems.appendChild(item);
        console.log(total)
        paypal.Buttons({

            // Sets up the transaction when a payment button is clicked
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: total // Can reference variables or functions. Example: `value: document.getElementById('...').value`
                        }
                    }]
                });
            },
            
            // Finalize the transaction after payer approval
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (orderData) {
                    // Successful capture! For dev/demo purposes:
                    console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));
                    var transaction = orderData.purchase_units[0].payments.captures[0];
                    alert('Transaction ' + transaction.status + ': ' + transaction.id + '\n\nSee console for all available details');
            
                    // When ready to go live, remove the alert and show a success message within this page. For example:
                    // var element = document.getElementById('paypal-button-container');
                    // element.innerHTML = '';
                    // element.innerHTML = '<h3>Thank you for your payment!</h3>';
                    // Or go to another URL:  actions.redirect('thank_you.html');
                });
            }
            }).render('#paypal-button-container');
           
        // SEND DATA TO SERVER
        // CHECKS
        // SEND AN EMAIL
        // RECORD TO DATABASE
        // PAYMENT
        // WHATEVER IS REQUIRED
        //alert("Confirma compra");

        /*
        var data = new FormData();
        data.append("cart", JSON.stringify(cart.items));
        data.append("products", JSON.stringify(products));
    
        fetch("SERVER-SCRIPT", { method:"POST", body:data })
        .then(res=>res.text()).then((res) => {
          console.log(res);
        })
        .catch((err) => { console.error(err); });
        */
    }
};
window.addEventListener("DOMContentLoaded", cart.init);

//}) //finfetcharriba


const productos = [
  {
    id: 1,
    "product-title": "Bamboo Toothbrush",
    "product-price": 15.0,
    "product-image": "assets/products/Bamboo Toothbrush (Pack of 4).jpg",
    "product-description":
      "A portable set of bamboo utensils including a fork, knife, spoon, and chopsticks, perfect for on-the-go meals.",
    "product-image-alt": "Bamboo Toothbrush",
  },
  {
    id: 2,
    "product-title": "Organic Cotton Tote Bag",
    "product-price": 15.0,
    "product-image": "assets/products/Organic Cotton Tote Bag.jpg",
    "product-description":
      "A portable set of bamboo utensils including a fork, knife, spoon, and chopsticks, perfect for on-the-go meals.",
    "product-image-alt": "Organic Cotton Tote Bag",
  },
  {
    id: 3,
    "product-title": "Recycled Glass Jars",
    "product-price": 15.0,
    "product-image":
      "assets/products/Recycled Glass Storage Jars (Set of 2).jpg",
    "product-description":
      "A portable set of bamboo utensils including a fork, knife, spoon, and chopsticks, perfect for on-the-go meals.",
    "product-image-alt": "Recycled Glass Jars",
  },
  {
    id: 4,
    "product-title": "Reusable Stainless Steel Water Bottle",
    "product-price": 15.0,
    "product-image":
      "assets/products/Reusable Stainless Steel Water Bottle.jpg",
    "product-description":
      "A portable set of bamboo utensils including a fork, knife, spoon, and chopsticks, perfect for on-the-go meals.",
    "product-image-alt": "Reusable Stainless Steel Water Bottle",
  },
  {
    id: 5,
    "product-title": "Solar-Powered Phone Charger",
    "product-price": 15.0,
    "product-image": "assets/products/Solar-Powered Phone Charger.jpg",
    "product-description":
      "A portable set of bamboo utensils including a fork, knife, spoon, and chopsticks, perfect for on-the-go meals.",
    "product-image-alt": "Solar-Powered Phone Charger",
  },
];

const cart = JSON.parse(localStorage.getItem('cart')) || [];

let productosHTML = "";
productos.forEach((producto) => {
  productosHTML += `
      <li class="product-item" id="${"product-" + producto.id}">
          <div class="product-header">
              <h3 class="product-title">${producto["product-title"]}</h3>
              <h4 class="product-price">$${producto["product-price"].toFixed(
                2
              )}</h4>
              <p id="product-${producto.id}" class="product-id" hidden>${
    producto.id
  }</p>
          </div>
          <div class="product-image-container">
              <img class="product-image"  src="${
                producto["product-image"]
              }" alt="${producto["product-image-alt"]}">
          </div>
          <div class="product-footer">
              <p class="product-description">
              ${producto["product-description"]}
              </p>
              <button class="add-to-cart-button">Add to Cart</button>
          </div>
      </li>`;
});

const productContainer = document.getElementById("product-section");
productContainer.innerHTML = productosHTML;

const phoneRegExp = new RegExp("^\\+[\\-\\s\\d]+");
const nameRegExp = new RegExp("[a-zA-Z'’\\-\\s]+");
const emailRegExp = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
const messageRegExp = new RegExp("^[a-zA-Z0-9\\s\\.\\,\\!\\?\\'\\-]{1,250}$");

function validateForm(formInput, regExp, formValidation) {
  let value = formInput.value || "";
  if(regExp.test(value)){
    formValidation.attr("hidden", true);
    return true;
  } else {
    formValidation.attr("hidden", false);
    return false;
  };
};


console.log("Loading eEvent handler");
$(document).ready(function () {
  let cartHTML = "";
  //console.log("Document loaded");

  /* Contact form validation */
  $("#tel").on("change", function (event) {
    console.log("Event handler working");
    validateForm(event.target, phoneRegExp, $("#phonecheck"));
  });
  $("#nombre").on("change", function (event) {
    console.log("Event handler working");
    validateForm(event.target, nameRegExp, $("#firstnamecheck"));
  });
  $("#apellido").on("change", function (event) {
    console.log("Event handler working");
    validateForm(event.target, nameRegExp, $("#lastnamecheck"));
    });
  $("#email").on("change", function (event) {
    console.log("Event handler working");
    validateForm(event.target, emailRegExp, $("#emailcheck"));
  });
  $("#mensaje").on("change", function (event) {
    console.log("Event handler working");
    validateForm(event.target, messageRegExp, $("#messagecheck"));
  });

  // Submit button
  $("#submitbtn").click(function (event) {
    event.preventDefault();
    let phoneError = validateForm(document.getElementById("tel"), phoneRegExp, $("#phonecheck"));
    let firstNameError = validateForm(document.getElementById("nombre"), nameRegExp, $("#firstnamecheck"));
    let lastNameError = validateForm(document.getElementById("apellido"), nameRegExp, $("#lastnamecheck"));
    let emailError = validateForm(document.getElementById("email"), emailRegExp, $("#emailcheck"));
    let messageError = validateForm(document.getElementById("mensaje"), messageRegExp, $("#messagecheck"));
    if(
      phoneError &&
      firstNameError &&
      lastNameError &&
      emailError &&
      messageError
    ) {
      console.log("Form validated, submitting");
      document.getElementById("contact-form").submit();
      return true;
    } else {
      console.log("Form not valid")
      return false;
    }
  });

  /* Cart functionality */

  if(cart.length > 0){
    console.log('Cart found, uplaoding info.');
    document.getElementById("cart-size").innerText = cart.length.toString();
    cart.forEach((product) => {
      cartHTML += `
          <tr>
              <td>${product.title}</td>
              <td>${product.ammount}</td>
              <td>$${product.price.toFixed(2)}</td>
              <td>$${(product.price * product.ammount).toFixed(2)}</td>
          </tr>
          `;
    });
    document.getElementById("cart-items").innerHTML = cartHTML;
    document.getElementById("cart-total").innerHTML =
      "$" +
      cart.reduce((acc, product) => acc + product.price * product.ammount, 0);
  }

  document.getElementById("cart-container").style.marginTop = `${
    document.getElementById("nav-section").offsetHeight + 10
  }px`;

  $(".add-to-cart-button").click(function (event) {
    //console.log("Add to cart button clicked");


    /* Get the info of the clicked product */
    const productElement = this.closest(".product-item");
    //console.log(productElement);

    const productId = parseInt(productElement.id.split("-")[1]);
    const title = productElement.querySelector(".product-title").innerText;
    const price = parseFloat(
      productElement.querySelector(".product-price").innerText.split("$")[1]
    );

    //console.log({productId, title, price});

    /* See if the product is already on cart and then add one if present or create line if not*/
    const existingProduct = cart.find((product) => product.id === productId);
    if (existingProduct) {
      // Increase the quantity in productCounts
      //console.log("Product already in cart");
      existingProduct.ammount += 1;
      //console.log(existingProduct);
    } else {
      // Add the product to the cart
      //console.log("Product not in cart");
      const newProduct = { id: productId, ammount: 1, title, price };
      console.log(newProduct);
      // Add product to cart
      cart.push(newProduct);
    }

    document.getElementById("cart-size").innerText = cart.length.toString();
    //console.log(cart);
    //console.log(cart.length);

    /* Update the cart */
    cartHTML = "";
    cart.forEach((product) => {
      cartHTML += `
          <tr>
              <td>${product.title}</td>
              <td>${product.ammount}</td>
              <td>$${product.price.toFixed(2)}</td>
              <td>$${(product.price * product.ammount).toFixed(2)}</td>
          </tr>
          `;
    });
    //console.log(cartHTML);

    document.getElementById("cart-items").innerHTML = cartHTML;
    document.getElementById("cart-total").innerHTML =
      "$" +
      cart.reduce((acc, product) => acc + product.price * product.ammount, 0);
    localStorage.setItem('cart', JSON.stringify(cart));
  });

  $("#show-cart-btn").click(function () {
    const cart = document.getElementById("cart-container");
    if (cart.hidden) {
      $("#cart-container").attr("hidden", false);
    } else {
      $("#cart-container").attr("hidden", true);
    }
  });
  $("#close-cart-btn").click(function () {
    //console.log("Close cart button clicked");
    $("#cart-container").attr("hidden", true);
  });
  $("#clear-cart-btn").click(function () {
    //console.log("Clear cart button clicked");
    document.getElementById("cart-items").innerHTML = "";
    document.getElementById("cart-size").innerHTML = "0";
    document.getElementById("cart-total").innerHTML = "$0.00";
    cart.length = 0;
    localStorage.removeItem('cart');
  });
});

/*
  $('form').on('submit', function(event){
      event.preventDefault();
      const mailRegExp = new RegExp('\+\d{1,12}$');
      if(document.querySelector("#tel").nodeValue.match(mailRegExp)){
          alert('Valid Phone Number');
          return true;
      } else {
          alert('Not a Valid Phone Number');
          return false;
      }
  }
  
  )
  */

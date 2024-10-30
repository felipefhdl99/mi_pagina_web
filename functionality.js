//import jQuery from "https://code.jquery.com/jquery-3.6.3.min.js";
/*
window.onload = function () {
    if (window.jQuery) {
        alert("jQuery is loaded.");
    } else {
        alert("jQuery is not loaded.");
    }
};
*/

class Item {
  constructor(item_id, item_name) {
    this.item_id = item_id;
    this.item_name = item_name;
  }
}

let cart = {
  currency: "USD",
  value: 0.0,
  cupon: "",
  items: [],
};

const phoneRegExp = new RegExp("\\+\\d{1,3}\\d{1,12}", "gm");
const nameRegExp = new RegExp("[a-zA-Z]{1,}", "gi");

console.log("Loading eEvent handler");
$(document).ready(function () {
    console.log("Document loaded");
  $("#tel").on("change", function (event) {
    console.log("Event handler working");
    if (phoneRegExp.test(event.target.value)) {
      $("#phonecheck").hide();
      phoneError = true;
      return true;
    } else {
      $("#phonecheck").show();
      phoneError = false;
      return false;
    }
  });

  $("#nombre").on("change", function (event) {
    console.log("Event handler working");
    if (nameRegExp.test(event.target.value)) {
      $("#firstnamecheck").hide();
      firstNamecheckError = true;
      return true;
    } else {
      $("#firstnamecheck").show();
      firstNamecheckError = false;
      return false;
    }
  });
  $("#apellido").on("change", function (event) {
    console.log("Event handler working");
    if (nameRegExp.test(event.target.value)) {
      $("#lastnamecheck").hide();
      lastNamecheckError = true;
      return true;
    } else {
      $("#lastnamecheck").show();
      lastNamecheckError = false;
      return false;
    }
  });

  // Submit button
  $("#submitbtn").click(function () {
    validatePhone();
    if (phoneError) {
      return true;
    } else {
      return false;
    }
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

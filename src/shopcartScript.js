let summary = 0;


function loadDishes(importedData) {
  const images = document.querySelectorAll(".img-container img");
  const quantities = document.getElementsByClassName("ordered-quantity");
  const names = document.getElementsByClassName("food-name");
  const prices = document.getElementsByClassName("price");
  const choices = document.getElementsByClassName("inputed-info");
  const instructions = document.getElementsByClassName("inputed-text")

  for (i = 0; i<importedData.length; i++) {
    const item = importedData[i];
    
    images[i].src = item[0];
    images[i].alt = item[2];
    quantities[i].innerText = item[1] + 'x';

    if (item[1] === "1") {
      const button = quantities[i].closest(".price-summary").getElementsByTagName("button")[1];
      button.disabled = true;
      button.classList.add("not-less");
    }
    names[i].innerText = item[2];
    prices[i].innerText = item[3];

    summary += parseFloat(item[3].slice(1)) * Number(item[1]);

    for (j=0; j<4; j++) {
      choices[4*i + j].innerText = item[4+j];
    }
    instructions[i].innerText = item[8];
  }
}


addEventListener('DOMContentLoaded', () => {
  localStorage.setItem("codes", JSON.stringify([["code", " -10%"], ["easter egg", " -20$"]]));
  
  const importedData = JSON.parse(localStorage.getItem("order"));
  
  if (importedData !== null  &&  importedData.length > 0) {
    for (i = 1; i<importedData.length; i++){
      const clone = document.getElementById("items").getElementsByTagName("li")[0].cloneNode(true);
      document.getElementById("items").getElementsByTagName("ul")[0].appendChild(clone);
    }


    loadDishes(importedData);

    document.getElementsByClassName("summed-price")[0].innerText = "$" + summary.toFixed(2);
  } else {
    cartIsEmpty();
  }
});


function cartIsEmpty() {
  document.getElementsByClassName("summed-price")[0].innerText = "$0.00";
  document.getElementById("items").getElementsByTagName("ul")[0].style.display = "none";
  document.getElementsByClassName("empty-cart")[0].style.display = "block";
}


addEventListener('load', () => {
  Array.from(document.querySelectorAll("input[type=text]")).forEach( function(element) {
  element.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      verifyCode(element);
    }
  })
  });
})


function verifyCode (element) {
  const inputElement = element.closest(".discounts").querySelector("input[type=text]");
  const inputedText = inputElement.value.toLowerCase();
  const codes = JSON.parse(localStorage.getItem("codes"));
  
  codes.forEach( codeArray => {
    if (codeArray[0] === inputedText) {
      const inputs = document.querySelectorAll(".promo input[type=text]");
      inputs.forEach(input => input.style.display = "none");

      const buttons = document.querySelectorAll(".discounts button");
      buttons.forEach(button => button.style.display = "none");


      const promos = document.getElementsByClassName("promo");
      Array.from(promos).forEach( promo => {
        promo.innerText += codeArray[1];
      })


      updateDisplayedPrice();
    }
  });

  inputElement.value = "";
}


function showInfo(element) {
    element.parentElement.nextElementSibling.children[0].classList.toggle("shown");
}


function orderedQty (value, element) {
  const quantityElement = element.closest(".price-summary").getElementsByClassName("ordered-quantity")[0];

  if (value === -1  &&  quantityElement.innerText === "2x") {
    element.disabled = true;
    element.classList.add("not-less");
    
  } else if (quantityElement.innerText === "1x") {
    const minusButton = element.nextElementSibling;
    minusButton.disabled = false;
    minusButton.classList.remove("not-less");
  };

  const quantity = Number((quantityElement.innerText).slice(0, -1));
  quantityElement.innerText = quantity + value + "x";


  let orderedArray = JSON.parse(localStorage.getItem("order"));
  const quantityButtons = document.getElementsByClassName("modify-quantity");

  let i = 0;
  while (quantityButtons[i] !== element.parentElement) i++;

  const dishCounter = Number(orderedArray[i][1]);
  orderedArray[i][1] = dishCounter + value;
  localStorage.setItem("order", JSON.stringify(orderedArray));


  const priceElement = element.closest(".money-summary").getElementsByClassName("price")[0];
  let itemPrice = parseFloat(priceElement.innerText.slice(1));

  summary += value*itemPrice;
  updateDisplayedPrice();
}


function trashItem(element) {
  let orderedArray = JSON.parse(localStorage.getItem("order"));
  const trashButtons = document.getElementsByClassName("trash");

  let i = 0;
  while (trashButtons[i] !== element) i++;
  
  
  orderedArray.splice(i, 1);
  
  localStorage.setItem("order", JSON.stringify(orderedArray));


  const priceElement = element.closest(".money-summary").getElementsByClassName("price")[0];
  let price = parseFloat(priceElement.innerText.slice(1));

  const quantityElement = element.closest(".money-summary").getElementsByClassName("ordered-quantity")[0];
  const quantity = Number(quantityElement.innerText.slice(0, -1));

  summary -= price * quantity;
  updateDisplayedPrice();

  element.closest("li").remove();

  if (document.querySelector("#items li") === null) {
    cartIsEmpty();
  }
}


function updateDisplayedPrice() {
  const promo = document.getElementsByClassName("promo")[0].innerText;
  const codeValue = promo.slice(promo.indexOf("-"), -1);
  let price = summary;

  if (promo.slice(-1) === "%"){
    price *= (100 + parseFloat(codeValue))/100;
  } else if (promo.slice(-1) === "$") {
    price += parseFloat(codeValue);
  }

  document.getElementsByClassName("summed-price")[0].innerText = "$" + (Math.max(price, 0)).toFixed(2);
}


function paymentSelected() {
  document.getElementsByClassName("payment-text")[0].innerText = "Finalise order ";
  document.getElementsByClassName("link-to-payment")[0].innerText = "here";
}
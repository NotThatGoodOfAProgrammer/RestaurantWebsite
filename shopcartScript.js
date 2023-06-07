let summary = 0;


addEventListener('DOMContentLoaded', () => {
  localStorage.setItem("codes", JSON.stringify([["code", " -10%"], ["easter egg", " -20$"]]));
  
  const importedData = JSON.parse(localStorage.getItem("order"));
  
  if (importedData !== null  &&  importedData.length > 0) {
    for (i = 1; i<importedData.length; i++){
      const clone = document.getElementById("items").getElementsByTagName("li")[0].cloneNode(true);
      document.getElementById("items").getElementsByTagName("ul")[0].appendChild(clone);
    }

    const names = document.getElementsByClassName("food-name");
    const choices = document.getElementsByClassName("inputed-info");
    const images = document.querySelectorAll(".img-container img");
    const quantities = document.getElementsByClassName("ordered-quantity");
    const prices = document.getElementsByClassName("price");
    const instructions = document.getElementsByClassName("inputed-text")

    for (i = 0; i<importedData.length; i++) {
      const item = importedData[i];
      
      images[i].src = item[0];
      images[i].alt = item[2];
      quantities[i].innerText = item[1] + 'x';

      if (item[1] === "1x") {
        button = quantities[i].closest(".price-summary").getElementsByTagName("button")[1];
        button.disabled = true;
        button.classList.add("not-less");
      }
      names[i].innerText = item[2];
      prices[i].innerText = item[3];

      summary += parseFloat(item[3].slice(1)) * Number(item[1]);

      for (j=0; j<4; j++) {
        choices[4*i + j].innerText = item[4+j];
      };
      instructions[i].innerText = item[8];
    }
    
    document.getElementsByClassName("summed-price")[0].innerText = "$" + summary.toFixed(2);
  } else {
    emptyCart();
  }
});


function emptyCart() {
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
  let price = parseFloat(priceElement.innerText.slice(1));

  summary += value*price;
  price = priceIncludingCode(summary);
  document.getElementsByClassName("summed-price")[0].innerText = "$" + (Math.max(price, 0)).toFixed(2);
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
  document.getElementsByClassName("summed-price")[0].innerText = "$" + (Math.max(priceIncludingCode(summary), 0)).toFixed(2);

  element.closest("li").remove();

  if (document.querySelector("#items li") === null) {
    emptyCart();
  }
}


function priceIncludingCode(price) {
  const promo = document.getElementsByClassName("promo")[0].innerText;
  const numberedPrice = promo.slice(promo.indexOf("-"), -1);

  if (promo.slice(-1) === "%"){
    price *= (100 + parseFloat(numberedPrice))/100;
  } else if (promo.slice(-1) === "$") {
    price -= parseFloat(numberedPrice);
  }

  return price;
}


function verifyCode (element) {
  const inputElement = element.closest(".discounts").querySelector("input[type=text]");
  const inputedText = inputElement.value.toLowerCase();
  const codes = JSON.parse(localStorage.getItem("codes"));
  
  codes.forEach( codeArray => {
    if (codeArray[0] === inputedText) {
      const inputs = document.querySelectorAll(".promo input[type=text");
      inputs.forEach(input => input.style.display = "none");

      const buttons = document.querySelectorAll(".discounts button");
      buttons.forEach(button => button.style.display = "none");


      const promo = document.getElementsByClassName("promo");
      promo[0].innerText += codeArray[1];
      promo[1].innerText += codeArray[1];



      document.getElementsByClassName("summed-price")[0].innerText = "$" + (Math.max(priceIncludingCode(summary), 0)).toFixed(2);
    }
  });
  inputElement.value = "";
}


function paymentSelected() {
  document.getElementsByClassName("payment-text")[0].innerText = "Finalise order ";
  document.getElementsByClassName("link-to-payment")[0].innerText = "here";
}

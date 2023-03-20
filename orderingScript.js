addEventListener('DOMContentLoaded', (event) => {
  localStorage.setItem("codes", JSON.stringify([["code", " -10%"], ["easter egg", " -20$"]]));
  
  const importedData = JSON.parse(localStorage.getItem("order"));
  if (importedData !== null) {
    for (i = 1; i<importedData.length; i++){
      let a = document.getElementById("items").getElementsByTagName("li")[0].cloneNode(true);
      document.getElementById("items").getElementsByTagName("ul")[0].appendChild(a);
    }

    const names = document.getElementsByClassName("food-name");
    const choices = document.getElementsByClassName("inputed-info");
    const images = document.querySelectorAll(".img-container img");
    const quantities = document.getElementsByClassName("ordered-quantity");
    const prices = document.getElementsByClassName("price");
    const instructions = document.getElementsByClassName("inputed-text")

    let summary = 0;
    for (i = 0; i<importedData.length; i++){
      const item = importedData[i];
      
      images[i].src = item[0];
      quantities[i].innerText = item[1];

      if (item[1] === "1x") {
        element = quantities[i].closest(".price-summary").getElementsByTagName("button")[1];
        element.disabled = true;
        element.classList.add("not-less");
      }
      names[i].innerText = item[2];
      prices[i].innerText = item[3];

      summary += parseFloat(item[3].slice(1)) * Number(item[1].slice(0, -1));

      for (j=0; j<4; j++) {
        choices[4*i + j].innerText = item[4+j];
      };
      instructions[i].innerText = item[8];
    }

    document.getElementsByClassName("summed-price")[0].innerText = "$" + summary.toFixed(2);
  } else {
    document.getElementById("items").getElementsByTagName("ul")[0].style.display = "none";
    document.getElementsByClassName("empty-cart")[0].style.display = "block";
  }
});


addEventListener('load', (event) => {
  const images = document.querySelectorAll(".img-container img");
  images.forEach(function(image) {
    const width = image.scrollWidth;
    const height = image.scrollHeight;
    
    if (width > height) {
      image.style.height = "100%";
      image.style.margin = "0 -" + ((width - height)*height /300) + "px";
    } else {
      image.style.width = "100%";
    };
  });


  Array.from(document.querySelectorAll("input[type=text]")).forEach( function(element) {
  element.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      verifyCode(element);
    }
  })
  });
})


function showInfo(element) {
  try{
    element.parentElement.nextElementSibling.children[0].classList.toggle("shown");
  } catch (e) {
    element.previousElementSibling.children[0].classList.toggle("shown");
  }
}


function orderedQty (value, element) {
  let quantity = element.closest(".price-summary").getElementsByClassName("ordered-quantity")[0];

  if (value === -1  &&  quantity.innerText === "2x") {
    element.disabled = true;
    element.classList.add("not-less");
    
  } else if (quantity.innerText === "1x") {
    element.nextElementSibling.disabled = false;
    element.nextElementSibling.classList.remove("not-less");
  };

  const multi = Number((quantity.innerText).slice(0, -1)) + value;
  quantity.innerText = multi + "x";


  let orderedArray = JSON.parse(localStorage.getItem("order"));
  let quantityButtons = document.getElementsByClassName("modify-quantity");

  let i = 0;
  while (quantityButtons[i] !== element.parentElement) i++;

  orderedArray[i][1] = Number(orderedArray[i][1].slice(0, -1)) + value + "x";
  localStorage.setItem("order", JSON.stringify(orderedArray));


  let price = parseFloat(element.closest(".price-summary").getElementsByClassName("price")[0].innerText.slice(1));
  let promo = document.getElementsByClassName("promo")[0].innerText;
  if (promo.slice(-1) === "%") price *= (100 + parseFloat(promo.slice(promo.indexOf("-"), -1)))/100;
  summary = document.getElementsByClassName("summed-price")[0];
  summary.innerText = "$" + (parseFloat(summary.innerText.slice(1)) + value*price).toFixed(2);
}


function trashItem (item) {
  let price = parseFloat(item.closest(".money-summary").getElementsByClassName("price")[0].innerText.slice(1));
  let promo = document.getElementsByClassName("promo")[0].innerText;
  if (promo.slice(-1) === "%") price *= (100 + parseFloat(promo.slice(promo.indexOf("-"), -1)))/100;


  let orderedArray = JSON.parse(localStorage.getItem("order"));
  let trashButtons = document.getElementsByClassName("trash");

  let i = 0;
  while (trashButtons[i] !== item) i++;

  orderedArray.splice(i, i);
  localStorage.setItem("order", JSON.stringify(orderedArray));


  let quantity = Number(item.closest(".money-summary").getElementsByClassName("ordered-quantity")[0].innerText.slice(0, -1));
  let summary = document.getElementsByClassName("summed-price")[0];
  summary.innerText = "$" + Math.max((parseFloat(summary.innerText.slice(1)) - price * quantity).toFixed(2), 0);
  item.closest("li").remove();


  if (document.querySelector("#items li") === null) {
    document.getElementById("items").getElementsByTagName("ul")[0].style.display = "none";
    document.getElementsByClassName("empty-cart")[0].style.display = "block";
  }
}


function verifyCode (element) {
  inputed = element.closest(".submitions").querySelector("input[type=text]").value.toLowerCase();
  let a = JSON.parse(localStorage.getItem("codes"));
  
  a.forEach ( function(codeArray) {
    if (codeArray[0] == inputed) {
      document.getElementsByClassName("submitions")[0].style.display = "none";
      document.getElementsByClassName("submitions")[1].style.display = "none";
      document.getElementsByClassName("promo")[0].innerText += codeArray[1];
      document.getElementsByClassName("promo")[1].innerText += codeArray[1];

      summary = document.getElementsByClassName("summed-price")[0];
      if (codeArray[1].slice(-1) === "%") {
        summary.innerText = "$" + (parseFloat(summary.innerText.slice(1)) * (100 + parseFloat(codeArray[1].slice(1, -1)))/100).toFixed(2);
      } else if (codeArray[1].slice(-1) === "$") {
        summary.innerText = "$" + (parseFloat(summary.innerText.slice(1)) + parseFloat(codeArray[1].slice(1, -1))).toFixed(2);
      }
    }
  });
  element.closest(".submitions").querySelector("input[type=text]").value = "";
}


function paymentSelected() {
  document.getElementsByClassName("payment-text")[0].innerText = "Finalise order ";
  document.getElementsByClassName("link-to-payment")[0].innerText = "here";
}

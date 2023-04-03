addEventListener('load', () => {
  sessionStorage.setItem("prevRadioValue", 0);
  document.getElementsByClassName("add-to-cart")[0].disabled = true;
});


function showPopUp(clicked) {
  const presentation = document.getElementsByClassName("presentation")[0];
  presentation.style.visibility = "visible";

  const imgToShow = clicked.getElementsByTagName("img")[0].src;
  const nameToShow = clicked.getElementsByClassName("food-name")[0].innerText;
  const priceToShow = clicked.getElementsByClassName("price")[0].innerText;

  presentation.getElementsByClassName("product-img")[0].src = imgToShow;
  presentation.getElementsByClassName("poped-food-name")[0].innerText = nameToShow;
  presentation.getElementsByClassName("poped-price")[0].innerText = priceToShow;


  document.onclick = function(element) {
    if (element.target.className === "presentation"
        ||
        element.target.className === "close"
        ||
        element.target.className === "add-to-cart active") {

      resetPresentation();
    };
  };
}


function resetPresentation() {
  document.getElementsByClassName("pop-up")[0].scrollTop = 0;

  document.getElementsByClassName("presentation")[0].style.visibility = "hidden";


  document.querySelectorAll(".item input").forEach(input => input.checked = false);
  sessionStorage.setItem("prevRadioValue", 0);

  document.querySelectorAll("input:disabled").forEach(input => {
    input.disabled = false;
    input.closest(".item-and-price").classList.remove("disabled");
  });


  const addToCartButton = document.getElementsByClassName("add-to-cart")[0];
  addToCartButton.disabled = true;
  addToCartButton.classList.remove("active");
  addToCartButton.innerText = "COMPLETE REQUIRED INFO";


  document.getElementsByClassName("quantity")[0].innerText = 1;
  
  const minusButton = document.querySelector(".quantity-container button");
  minusButton.disabled = true;
  minusButton.classList.add("not-less");
}


function buttonActivity() {
  const checkboxes = document.querySelectorAll("input[name=toss-ins]:checked");
  const addToCartButton = document.getElementsByClassName("add-to-cart")[0];

  if (checkboxes.length > 0) {
    const radio = document.querySelector("input[name=takeaway]:checked");

    if (radio !== null) {
      addToCartButton.disabled = false;
      addToCartButton.classList.add("active");
      addToCartButton.innerText = "ADD TO CART";

      return;
    };
  };

  addToCartButton.disabled = true;
  addToCartButton.classList.remove("active");
  addToCartButton.innerText = "COMPLETE REQUIRED INFO";
}


function addPrice (element) {
  const quantity = Number(document.getElementsByClassName("quantity")[0].innerText);
  const addPrice = element.closest(".item-and-price").getElementsByClassName("item-price")[0].innerText;

  if (addPrice !== "FREE") {
    let value = parseFloat(addPrice.slice(2));

    const price = parseFloat((document.querySelector(".poped-price").innerText).slice(1));
    
    if (element.parentElement.className === "custom-radio") {
      prev = sessionStorage.getItem("prevRadioValue");

      sessionStorage.setItem("prevRadioValue", value);
      value -= prev;
    }

    const finalPrice = element.checked ? price + value * quantity : price - value * quantity;
    document.querySelector(".poped-price").innerText = "$" + (finalPrice).toFixed(2);

  } else if (element.parentElement.className === "custom-radio") {
    const prev = sessionStorage.getItem("prevRadioValue");
  
    sessionStorage.setItem("prevRadioValue", 0);

    const priceElement = document.querySelector(".poped-price");

    const finalPrice = parseFloat((priceElement.innerText).slice(1)) - prev * quantity;
    priceElement.innerText = "$" + (finalPrice).toFixed(2);
  };
}


function changeQty (value) {
  const quantity = document.getElementsByClassName("quantity")[0];
  const minusButton = document.querySelector(".quantity-container button");

  if (value === -1  &&  quantity.innerText === "2") {
    minusButton.disabled = true;
    minusButton.classList.add("not-less");
    
  } else if (quantity.innerText === "1") {
    minusButton.disabled = false;
    minusButton.classList.remove("not-less");
  };

  const newQty = Number(quantity.innerText) + value;
  quantity.innerText = newQty;

  const priceElement = document.getElementsByClassName("poped-price")[0];
  const oldPrice = parseFloat(priceElement.innerText.slice(1));
  priceElement.innerText = "$" + ((oldPrice /(newQty - value) *newQty).toFixed(2));
}


function addToCart () {
  const alertElement = document.getElementsByClassName("added-to-cart")[0];
  alertElement.classList.add("show-added-to-cart");

  const productImg = document.getElementsByClassName("product-img")[0].src;
  const quantity = document.getElementsByClassName("quantity")[0].innerText;
  const foodName = document.getElementsByClassName("poped-food-name")[0].innerText;

  document.querySelector(".short-description img").src = productImg;
  document.getElementsByClassName("count")[0].innerText = quantity + "x";
  document.getElementsByClassName("name")[0].innerText = foodName;

  document.getElementsByClassName("add-to-cart")[0].disabled = true;
  
  document.querySelectorAll("input:disabled").forEach(element => {
    element.disabled = false;
    element.closest(".item-and-price").classList.remove("disabled");
  });


  const multipliedPrice = parseFloat((document.querySelector(".poped-price").innerText).slice(1));
  const price = "$" + (multipliedPrice / quantity).toFixed(2);
  
  const selectedRadio = document.querySelector("input[name=takeaway]:checked");
  const eatIn = selectedRadio.parentElement.getElementsByClassName("option-name")[0].innerText;

  const tossIns = fillWithInputs("toss-ins");

  const dressing = fillWithInputs("dressing");

  const addOns = fillWithInputs("add-ons");

  const text = document.getElementsByTagName("textarea")[0].value;


  const exportData = [productImg, quantity, foodName, price, eatIn, tossIns, dressing, addOns, text]

  let dataArray = JSON.parse(localStorage.getItem("order"));
  if (dataArray === null) {
    dataArray = [];
  }
  
  dataArray.push(exportData);
  localStorage.setItem("order", JSON.stringify(dataArray));

  document.getElementsByTagName("textarea")[0].value = "";
  
  setTimeout(() => {alertElement.classList.remove("show-added-to-cart")}, 6000);
}


function fillWithInputs(name) {
  let array = [];
  const inputs = document.querySelectorAll("input[name=" + name + "]:checked");
  Array.from(inputs).forEach(input => {
    array.push(input.parentElement.getElementsByClassName("option-name")[0].innerText);
  })

  return array;
}


function maxSelected(name) {
  const tossInsLimit = 3;
  const dressingLimit = 2;

  const currentLimit = (name === "toss-ins" ? tossInsLimit : dressingLimit);

  const checked = document.querySelectorAll("input[name=" + name + "]:checked");
  const theRest = document.querySelectorAll("input[name=" + name + "]:not(:checked)");


  if (checked.length == currentLimit) {
    theRest.forEach(element => {
      element.closest(".item-and-price").classList.add("disabled");
      element.disabled = true;
    });
  } else {
    theRest.forEach(element => {
      element.closest(".item-and-price").classList.remove("disabled");
      element.disabled = false;
    });
  };
}

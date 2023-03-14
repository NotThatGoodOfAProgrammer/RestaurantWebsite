addEventListener('load', (event) => {
  sessionStorage.setItem("prevRadioValue", 0);
  document.querySelector(".add-to-cart").disabled = true;


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
});


function showPopUp(clicked) {
  const popUp = document.getElementsByClassName("presentation")[0];
  popUp.style.visibility = "visible";


  popUp.getElementsByClassName("product-img")[0].src = clicked.getElementsByTagName("img")[0].src;
  popUp.getElementsByClassName("poped-food-name")[0].innerText = clicked.getElementsByClassName("food-name")[0].innerText;
  popUp.getElementsByClassName("poped-price")[0].getElementsByTagName("span")[0].innerText = clicked.getElementsByClassName("price")[0].innerText;


  document.onclick = function(element) {
    if (element.target.className === "presentation"  ||  element.target.className === "close"  ||  element.target.className === "add-to-cart active") {
      document.getElementsByClassName("pop-up")[0].scrollTop = 0;


      popUp.style.visibility = "hidden";


      document.querySelectorAll(".item input").forEach(element => element.checked = false)
      sessionStorage.setItem("prevRadioValue", 0);


      document.querySelector(".add-to-cart").classList.remove("active");
      document.querySelector(".add-to-cart").innerText = "COMPLETE REQUIRED INFO";


      document.getElementsByClassName("amount")[0].innerText = 1;
      const minusButton = document.querySelector(".quantity button")
      
      minusButton.disabled = true;
      minusButton.classList.add("not-less");
    };
  };
}


function buttonActivity() {
  const checkboxes = document.querySelectorAll("input[name=toss-ins]:checked");
  const button = document.querySelector(".add-to-cart");

  if (checkboxes.length > 0) {
    const radio = document.querySelector("input[name=takeaway]:checked");

    if (radio !== null) {
      button.disabled = false;
      button.classList.add("active");
      button.innerText = "ADD TO CART";
      return
    };
  };

  button.disabled = true;
  button.classList.remove("active");
  button.innerText = "COMPLETE REQUIRED INFO";
}


function addPrice (element) {
  const quantity = Number(document.getElementsByClassName("amount")[0].innerText);
  let string = element.closest(".item-and-price").querySelector(".item-price span").innerText;

  if (string !== "FREE") {
    let value = parseFloat(string.slice(2));
    let price = parseFloat((document.querySelector(".poped-price span").innerText).slice(1));
    
    if (element.parentNode.className == "custom-radio") {
      prev = sessionStorage.getItem("prevRadioValue");

      sessionStorage.setItem("prevRadioValue", value);
      value -= prev;
    }
    if (element.checked) {
        document.querySelector(".poped-price span").innerText = "$" + (price + value * quantity).toFixed(2);
      } else {
        document.querySelector(".poped-price span").innerText = "$" + (price - value * quantity).toFixed(2);
    };

  } else if (element.parentNode.className == "custom-radio") {
    let prev = sessionStorage.getItem("prevRadioValue");
  
    sessionStorage.setItem("prevRadioValue", 0);

    let price = parseFloat((document.querySelector(".poped-price span").innerText).slice(1));
    document.querySelector(".poped-price span").innerText = "$" + (price - prev * quantity).toFixed(2);
  };
}


function changeQty (value) {
  let quantity = document.getElementsByClassName("amount")[0];
  let minusButton = document.querySelector(".quantity button");

  if (value === -1  &&  quantity.innerText === "2") {
    minusButton.disabled = true;
    minusButton.classList.add("not-less");
    
  } else if (quantity.innerText === "1") {
    minusButton.disabled = false;
    minusButton.classList.remove("not-less");
  };

  const multi = Number(quantity.innerText) + value;
  quantity.innerText = multi;

  document.querySelector(".poped-price span").innerText = "$" + ((parseFloat(document.querySelector(".poped-price span").innerText.slice(1)) /(multi - value) *multi).toFixed(2));
}


function addToCart () {
  let alertClass = document.getElementsByClassName("added-to-cart")[0].classList;
  alertClass.add("show-added-to-cart")

  const productImg = document.getElementsByClassName("product-img")[0].src;
  const amount = document.getElementsByClassName("amount")[0].innerText + "x";
  const foodName = document.getElementsByClassName("poped-food-name")[0].innerText;

  document.querySelector(".short-description img").src = productImg;
  document.getElementsByClassName("count")[0].innerText = amount;
  document.getElementsByClassName("name")[0].innerText = foodName;

  document.querySelector(".add-to-cart").disabled = true;
  
  document.querySelectorAll("input:disabled").forEach(element => {
    element.disabled = false;
    element.closest(".item-and-price").classList.remove("disabled");
  });


  const price = "$" + (parseFloat((document.querySelector(".poped-price span").innerText).slice(1)) / amount.slice(0, -1)).toFixed(2);
  
  const eatIn = document.querySelector("input[name=takeaway]:checked").nextElementSibling.nextElementSibling.innerText;

  let tossIns = []
  Array.from(document.querySelectorAll("input[name=toss-ins]:checked")).forEach(element => {
    tossIns.push(element.nextElementSibling.nextElementSibling.innerText);
  })

  let dressing = []
  Array.from(document.querySelectorAll("input[name=dressing]:checked")).forEach(element => {
    dressing.push(element.nextElementSibling.nextElementSibling.innerText);
  })

  let addOns = []
  Array.from(document.querySelectorAll("input[name=add-ons]:checked")).forEach(element => {
    addOns.push(element.nextElementSibling.nextElementSibling.innerText);
  })

  const text = document.getElementsByTagName("textarea")[0].value;


  let exportData = [productImg, amount, foodName, price, eatIn, tossIns, dressing, addOns, text]

  let dataArray = JSON.parse(localStorage.getItem("order"));
  if (dataArray === null) {
    dataArray = [];
  }
  
  dataArray[dataArray.length] = exportData;
  localStorage.setItem("order", JSON.stringify(dataArray));

  document.getElementsByTagName("textarea")[0].value = "";

  setTimeout(() => {alertClass.remove("show-added-to-cart")}, 4000);
}


function maxSelected(name) {
  const tossInsLimit = 3;
  const dressingLimit = 2;

  const currentLimit = (name === "toss-ins" ? tossInsLimit : dressingLimit);

  const checkboxes = document.querySelectorAll("input[name=" + name + "]:checked");
  const theRest = document.querySelectorAll("input[name=" + name + "]:not(:checked)");


  if (checkboxes.length == currentLimit) {
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

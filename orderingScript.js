function openMenu () {
  const tabContent = document.getElementsByClassName("tab-content")[0];

  tabContent.classList.toggle("tab-content-open");
}


function changeMode () {
  const theme = document.querySelector(".switch input").checked ? "dark" : "light";
  localStorage.setItem("theme", theme)

  document.querySelectorAll("section").forEach(section => {
    section.classList.toggle("dark-mode");
  });

  document.body.classList.toggle("dark");

  Array.from(document.getElementsByClassName("required")).forEach(section => {
    section.classList.toggle("dark-mode");
  });

  document.querySelector(".pop-up").classList.toggle("dark");

  document.querySelector(".finalise-order").classList.toggle("dark");
}


function copyContact (media, index) {
  let text = document.getElementsByClassName(media)[index].innerText;

  text = text.substring(text.indexOf(": ") +2);

  navigator.clipboard.writeText(text);
}


addEventListener('load', (event) => {

  const setting = localStorage.getItem("theme");
  let preference = setting;
  if (! setting) {
    preference = window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches ? "dark" : "light";
  }

  if (preference === "dark") {
    document.querySelector(".switch input").checked = true;
    changeMode();
  } else {
    document.querySelector(".switch input").checked = false;
  };
  

  sessionStorage.setItem("prevRadioValue", 0);


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

  document.body.style.visibility = "visible";
  
  document.body.style.transition = "0.4s";
  document.querySelectorAll("section").forEach(section => {
    section.style.transition = "0.4s";
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
      document.querySelector(".add-to-cart").innerText = "COMPLETE REQUIRED INFO ABOVE";


      document.getElementsByClassName("amount")[0].innerText = 1;
      const minusButton = document.querySelector(".quantity button")
      
      minusButton.disabled = true;
      minusButton.classList.add("not-less");
    };
  };
}


function buttonActivity() {
  const tossInsLimit = 3;

  const checkboxes = document.querySelectorAll("input[name=toss-ins]:checked");
  const theRest = document.querySelectorAll("input[name=toss-ins]:not(:checked)");


  if (checkboxes.length == tossInsLimit) {
    theRest.forEach(element => {
      element.closest(".item-and-price").classList.add("disabled");
      element.disabled = true;
    });
  } else {
    theRest.forEach(element => {
      element.closest(".item-and-price").classList.remove("disabled")
      element.disabled = false;
    });
  };


  if (checkboxes.length > 0) {
    const radio = document.querySelector("input[name=takeaway]:checked");

    if (radio !== null) {
      document.querySelector(".add-to-cart").classList.add("active");
      document.querySelector(".add-to-cart").innerText = "ADD TO CART";
      return
    };
  };

  document.querySelector(".add-to-cart").classList.remove("active");
  document.querySelector(".add-to-cart").innerText = "COMPLETE REQUIRED INFO ABOVE";
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

  document.querySelector(".short-description img").src = document.getElementsByClassName("product-img")[0].src;
  document.getElementsByClassName("count")[0].innerText = "x" + document.getElementsByClassName("amount")[0].innerText;
  document.getElementsByClassName("name")[0].innerText = document.getElementsByClassName("poped-food-name")[0].innerText;

  setTimeout(() => {alertClass.remove("show-added-to-cart")}, 4000);
}

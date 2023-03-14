addEventListener('DOMContentLoaded', (event) => {
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
      for (j=0; j<4; j++) {
        choices[4*i + j].innerText = item[4+j];
      };
      instructions[i].innerText = item[8];
    }
  }


  /*const images2 = document.querySelectorAll(".img-container img");
  images2.forEach(function(image) {
    const width = image.scrollWidth;
    const height = image.scrollHeight;
    console.log(width, height);
    if (width > height) {
      image.style.height = "100%";
      image.style.margin = "0 -" + ((width - height)*height /300) + "px";
    } else {
      image.style.width = "100%";
    };
  });*/
});


addEventListener('load', (event) => {
  const images2 = document.querySelectorAll(".img-container img");
  images2.forEach(function(image) {
    const width = image.scrollWidth;
    const height = image.scrollHeight;
    console.log(width, height);
    if (width > height) {
      image.style.height = "100%";
      image.style.margin = "0 -" + ((width - height)*height /300) + "px";
    } else {
      image.style.width = "100%";
    };
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
  let quantity = element.closest(".price-summary").querySelector(".ordered-quantity")

  if (value === -1  &&  quantity.innerText === "2x") {
    element.disabled = true;
    element.classList.add("not-less");
    
  } else if (quantity.innerText === "1x") {
    element.nextElementSibling.disabled = false;
    element.nextElementSibling.classList.remove("not-less");
  };

  const multi = Number((quantity.innerText).slice(0, -1)) + value;
  quantity.innerText = multi + "x";
}
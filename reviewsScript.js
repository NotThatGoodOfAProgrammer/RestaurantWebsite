function loadReviews(reviews) {
  reviews.forEach(review => {
    const reviewsSection = document.getElementById("reviews");
    const reviewElement = reviewsSection.getElementsByTagName("li")[0].cloneNode(true);
    const newReview = reviewsSection.getElementsByTagName("ul")[0].appendChild(reviewElement);

    newReview.getElementsByClassName("name")[0].innerText = review[0];
    const spans = newReview.getElementsByClassName("review")[0].getElementsByTagName("span");
    spans[0].innerText = review[1].slice(0, 200);
    spans[1].innerText = review[1].slice(200);

    if (review[1].length < 201) {
      newReview.getElementsByClassName("show-more")[0].remove();
    }
  })

  document.getElementById("reviews").getElementsByTagName("li")[0].remove();
}


addEventListener("load", () => {
  let reviews = JSON.parse(localStorage.getItem("reviews"));

  if (reviews === null) {
    reviews = [["Jan Kowalski", "Dumplings were nice"], ["Elizabeth", "Indeed it was quite as mouthwatering as restaurant name suggests. My prefered dish is Meat with vegetables but I also quite enjoyed cheese dumplings. Overall 10/10 😊"], ["terk", "terk      terkk"], ["John", "abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  ."], ["a enjoyer", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]];
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }

  document.getElementsByClassName("input-name")[0].addEventListener("keyup", (event) => {
    if (event.key === "enter") {
      submitReview();
    }
  })

  loadReviews(reviews);
})


function submitReview() {
  const text = document.querySelector(".textarea-container textarea");
  const name = document.getElementsByClassName("input-name")[0];

  if (name.value.trim() != '') {
    let reviews = JSON.parse(localStorage.getItem("reviews"));
    reviews.push([name.value.trim(), text.value.trim()]);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    const submitButton = document.getElementsByClassName("submit-button")[0];
    finaliseReview(submitButton);
    submitButton.classList.remove("active");

    text.value = "";
  }else {

    name.value = "";
    window.alert("Invalid name");
  }
}


function showMore(element) {
  const restOfReview = element.parentElement.getElementsByClassName("more")[0];
  
  if (restOfReview.style.display === "initial") {
    restOfReview.style.display = "none";
    element.getElementsByTagName("em")[0].innerText = "... show more";
  } else {
    
    restOfReview.style.display = "initial";
    element.getElementsByTagName("em")[0].innerText = "show less";
  }
}


function finaliseReview(button) {
  const confirmation = document.getElementsByClassName("confirmation")[0];
  const message = button.getElementsByTagName("span")[0];

  if (message.innerText === "Submit review") {
    message.innerText = "Cancel";

    confirmation.style.display = "flex";
    setTimeout(() => confirmation.style.opacity = 1, 0);
  } else {
    message.innerText = "Submit review";

    confirmation.style.opacity = 0;
    setTimeout(() => confirmation.style.display = "none", 400);
  }
  
}


function activateButton(text){
  const submitButton = document.getElementsByClassName("submit-button")[0];
  if (text.trim() === ''){
    submitButton.disabled = true;
    submitButton.classList.remove("active");
  } else {
    submitButton.disabled = false;
    submitButton.classList.add("active");
  }
}

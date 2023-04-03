addEventListener("load", () => {
  let comments = JSON.parse(localStorage.getItem("comments"));

  if (comments === null) {
    comments = [["Jan Kowalski", "Dumplings were nice"], ["Elizabeth", "Indeed it was quite as mouthwatering as restaurant name suggests. My prefered dish is Meat with vegetables but I also quite enjoyed cheese dumplings. Overall 10/10 😊"], ["terk", "terk      terkk"], ["John", "abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  abc abcd ae  ."], ["a enjoyer", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]];
    localStorage.setItem("comments", JSON.stringify(comments));
  }

  document.getElementsByClassName("input-name")[0].addEventListener("keyup", (event) => {
    if (event.key === "enter") {
      submitComment();
    }
  })

  comments.forEach(comment => {
    let commentNode = document.getElementById("comments").getElementsByTagName("li")[0].cloneNode(true);
    const newComment = document.getElementById("comments").getElementsByTagName("ul")[0].appendChild(commentNode);

    newComment.getElementsByClassName("name")[0].innerText = comment[0];
    let spans = newComment.getElementsByClassName("comment")[0].getElementsByTagName("span");
    spans[0].innerText = comment[1].slice(0, 200);
    spans[1].innerText = comment[1].slice(200);

    if (comment[1].length < 201) {
      newComment.getElementsByClassName("show-more")[0].remove();
    }
  })

  document.getElementById("comments").getElementsByTagName("li")[0].remove();
})


function submitComment() {
  const text = document.querySelector(".textarea-container textarea");
  const name = document.getElementsByClassName("input-name")[0];

  let comments = JSON.parse(localStorage.getItem("comments"));
  comments.push([name.value.trim(), text.value.trim()]);
  localStorage.setItem("comments", JSON.stringify(comments));

  text.value = "";
  name.value = "";
}


function showMore(element) {
  const restOfComment = element.parentElement.getElementsByClassName("more")[0];
  if (restOfComment.style.display == "initial") {
    restOfComment.style.display = "none";
    element.getElementsByTagName("em")[0].innerText = "... show more";
  } else {
    restOfComment.style.display = "initial";
    element.getElementsByTagName("em")[0].innerText = "show less";
  }
}


function finaliseComment(button) {
  let confirmation = document.getElementsByClassName("confirmation")[0];
  let message = button.children[0];

  if (message.innerText === "Submit comment") {
    message.innerText = "Cancel";

    confirmation.style.display = "block";
    setTimeout(() => confirmation.style.opacity = 1, 0);
  } else {
    message.innerText = "Submit comment";

    confirmation.style.opacity = 0;
    setTimeout(() => confirmation.style.display = "none", 400);
  }
  
}


function activateButton(text){
  if (text === ''){
    document.getElementsByClassName("submit-button")[0].disabled = true;
    document.getElementsByClassName("submit-button")[0].classList.remove("active");
  } else {
    document.getElementsByClassName("submit-button")[0].disabled = false;
    document.getElementsByClassName("submit-button")[0].classList.add("active");
  }
}
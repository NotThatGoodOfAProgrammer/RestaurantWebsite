function openMenu () {
  document.getElementsByClassName("tab-content")[0].classList.toggle("tab-content-open");
}


function changeMode () {
  const theme = document.querySelector(".dark-mode-switch input").checked ? "dark" : "light";
  localStorage.setItem("theme", theme);

  Array.from(document.getElementsByTagName("section")).forEach(section => {
    section.classList.toggle("dark-mode");
  });

  document.body.classList.toggle("dark");

  try {
    Array.from(document.getElementsByClassName("required")).forEach(section => {
      section.classList.toggle("dark-mode");
    });
    
    document.getElementsByClassName("pop-up")[0].classList.toggle("dark");
    document.getElementsByClassName("finalise-order")[0].classList.toggle("dark");
  
    document.getElementsByClassName("added-to-cart")[0].classList.toggle("dark");
  } catch (e) {};
}


function copyContact (element) {
  let text = element.innerText;

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
    document.querySelector(".dark-mode-switch input").checked = true;
    changeMode();
  } else {
    document.querySelector(".dark-mode-switch input").checked = false;
  };
  
  
  document.body.style.visibility = "visible";
  
  document.body.style.transition = "0.4s";
  Array.from(document.getElementsByTagName("section")).forEach(section => {
    section.style.transition = "0.4s";
  });
});

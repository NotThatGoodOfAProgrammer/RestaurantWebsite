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
}


function copyContact (media, index) {
  let text = document.getElementsByClassName(media)[index].innerText;

  text = text.substring(text.indexOf(": ") +2);

  navigator.clipboard.writeText(text);
}


addEventListener('DOMContentLoaded', (event) => {
  const scroll = window.requestAnimationFrame ||
              function(callback) {
                window.setTimeout(callback, 1000/60)
              };


  function isElementInViewport(element) {
    if (typeof jQuery === "function" && element instanceof jQuery) {
      element = element[0];
    }
    let rect = element.getBoundingClientRect();
    return (
      (rect.top <= 0  &&  rect.bottom >= 0)
      ||
      (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
      ||
      (rect.top >= 0  &&  rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
  };


  const elementsToShow = document.querySelectorAll(".show-on-scroll");
  function loop() {
    elementsToShow.forEach(function (element)
    {
      if (isElementInViewport(element)) {
        element.classList.add("is-visible");
      };
    });
    scroll(loop);
  };

  loop();
});


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
  
  
  document.body.style.visibility = "visible";
  
  document.body.style.transition = "0.4s";
  document.querySelectorAll("section").forEach(section => {
    section.style.transition = "0.4s";
  });
});
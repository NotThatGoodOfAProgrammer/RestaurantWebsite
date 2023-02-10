function openMenu () {
  tabContent = document.getElementsByClassName("tab-content")[0];

  if (tabContent.style.display === "flex") {
    tabContent.style.display = "none";
  } else {
    tabContent.style.display = "flex";
  };
}

function changeMode () {
  const sections = document.querySelectorAll("section");

  sections.forEach(section => {
    section.classList.toggle("dark-mode");
  });

  document.body.classList.toggle("dark");
}

function copyContact (media, index) {
  let text = document.getElementsByClassName(media)[index].innerText;

  text = text.substring(text.indexOf(": ") +2);

  navigator.clipboard.writeText(text);
}
addEventListener('DOMContentLoaded', () => {
  const scroll = window.requestAnimationFrame ||
              function(callback) {
                window.setTimeout(callback, 1000/60)
              };


  function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      (rect.top <= 0  &&  rect.bottom >= 0)
      ||
      (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
      ||
      (rect.top >= 0  &&  rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
      &&
      (rect.top != rect.bottom)
    );
  };


  const elementsToShow = document.getElementsByClassName("show-on-scroll");
  function loop() {
    Array.from(elementsToShow).forEach(function (element)
    {
      if (isElementInViewport(element)) {
        element.classList.add("is-visible");
      };
    });
    scroll(loop);
  };

  loop();
});

document.addEventListener("DOMContentLoaded", function () {

  const track = document.querySelector(".slider-track");
  const cards = document.querySelectorAll(".review-card");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let index = 0;

  function getVisibleCards() {
    return window.innerWidth <= 900 ? 1 : 2;
  }

  function updateSlider() {
    const cardWidth = cards[0].offsetWidth + 40; // width + gap
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  nextBtn.addEventListener("click", function () {
    const maxIndex = cards.length - getVisibleCards();
    if (index < maxIndex) {
      index++;
      updateSlider();
    }
  });

  prevBtn.addEventListener("click", function () {
    if (index > 0) {
      index--;
      updateSlider();
    }
  });

  window.addEventListener("resize", updateSlider);

});
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".slider-track");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const originalCards = Array.from(document.querySelectorAll(".review-card"));

  let index, isJumping, totalCards, visibleCount;

  function getGap() {
    return parseInt(getComputedStyle(track).gap) || 0;
  }

  function getCardWidth() {
    return track.querySelectorAll(".review-card")[0].getBoundingClientRect().width + getGap();
  }

  function updateSlider(animate = true) {
    track.style.transition = animate ? "transform 0.5s ease" : "none";
    track.style.transform = `translateX(-${index * getCardWidth()}px)`;
  }
  
  function initSlider() {
    // Remove existing clones
    track.querySelectorAll(".review-card").forEach(c => c.remove());

    // Re-add original cards
    originalCards.forEach(c => track.appendChild(c.cloneNode(true)));

    visibleCount = window.innerWidth <= 900 ? 1 : 2;
    isJumping = false;

    const freshCards = Array.from(track.querySelectorAll(".review-card"));

    // Clone ends
    const clonesStart = freshCards.slice(-visibleCount).map(c => c.cloneNode(true));
    const clonesEnd = freshCards.slice(0, visibleCount).map(c => c.cloneNode(true));

    clonesEnd.forEach(c => track.appendChild(c));
    clonesStart.reverse().forEach(c => track.insertBefore(c, track.firstChild));

    index = visibleCount;
    totalCards = track.querySelectorAll(".review-card").length;

    updateSlider(false);
  }

  nextBtn.addEventListener("click", function () {
    if (isJumping) return;
    index++;
    updateSlider();
  });

  prevBtn.addEventListener("click", function () {
    if (isJumping) return;
    index--;
    updateSlider();
  });

  track.addEventListener("transitionend", () => {
    if (index >= totalCards - visibleCount) {
      isJumping = true;
      index = visibleCount;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        track.style.transition = "none";
        track.style.transform = `translateX(-${index * getCardWidth()}px)`;
        isJumping = false;
      }));
    } else if (index < visibleCount) {
      isJumping = true;
      index = totalCards - visibleCount * 2;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        track.style.transition = "none";
        track.style.transform = `translateX(-${index * getCardWidth()}px)`;
        isJumping = false;
      }));
    }
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => initSlider(), 150);
  });

  function updateDots() {
    if (window.innerWidth > 900) return;
    const dots = document.querySelectorAll('.dot');
    const realIndex = ((index - visibleCount) % originalCards.length + originalCards.length) % originalCards.length;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === realIndex));
  }

  track.addEventListener("transitionend", () => {
    updateDots();
  });

  let startX = 0;
  if (window.innerWidth <= 900) {
    track.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (diff > 50) nextBtn.click();
      else if (diff < -50) prevBtn.click();
    });
  }
  initSlider();
  updateDots();
});
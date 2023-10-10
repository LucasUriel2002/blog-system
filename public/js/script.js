// ---- SELECT ITEMS ----

// ---- VARIABLES ----

// ---- FUNCTIONS ----

// Title function
window.addEventListener("scroll", () => {
  const titleContainer = document.querySelector(".title-container");
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 433) {
    titleContainer.style = `position: fixed; top: 2.80%;`;
  } else {
    titleContainer.style = `position: absolute;`;
  }
});

window.addEventListener("scroll", () => {
  const parallaxCloud1 = document.querySelector(".cloud-1");
  const parallaxCloud2 = document.querySelector(".cloud-2");
  const scrollPosition = window.scrollY;

  const speed = 0.5;

  parallaxCloud1.style.transform = `translateY(-${scrollPosition * speed}px)`;
  parallaxCloud2.style.transform = `translateY(-${scrollPosition * speed}px)`;
});

// Resize Title function
const listItems = document.querySelectorAll("li");
const minFontSize = 15; // in px

listItems.forEach((li) => {
  const titleLink = li.querySelector("span");

  const maxSize = 20; // in px

  // Verify the title lenght
  const titleTextSize = titleLink.textContent.length;

  if (titleTextSize > maxSize) {
    const newFontSize = (maxSize / titleTextSize) * 16;
    titleLink.style.fontSize = Math.max(newFontSize, minFontSize) + "px";
  }
});

// ---- SELECT ITEMS ----

// ---- VARIABLES ----

// ---- FUNCTIONS ----

// Title function
window.addEventListener("scroll", () => {
  const titleContainer = document.querySelector(".title-container");
  const navbar = document.querySelector(".navbar");

  const x = getComputedStyle(document.documentElement).getPropertyValue("--x");

  if (window.scrollY > x) {
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

// Function to scroll to a coordinate

document.addEventListener("DOMContentLoaded", () => {
  // Variables for buttons and coordinate values
  var scrollButton1 = document.getElementById("btn-scr-1");
  var scrollButton2 = document.getElementById("btn-scr-2");
  var scrollTopButton = document.getElementById("scrollTopButton");

  // Function for smooth scrolling
  function scrollToCoordinate(coordinate, duration) {
    const start = window.scrollY;
    const change = coordinate - start;
    const increment = 20;
    let currentTime = 0;

    function animateScroll() {
      currentTime += increment;
      const newPosition = easeInOutQuad(currentTime, start, change, duration);
      window.scrollTo(0, newPosition);
      if (currentTime < duration) {
        requestAnimationFrame(animateScroll);
      }
    }

    animateScroll();
  }

  // Function for easing
  function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) {
      return (c / 2) * t * t + b;
    } else {
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }
  }

  // Get coordinate values from CSS variables
  const scr1 = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--scr-1")
  );
  const scr2 = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--scr-2")
  );

  // Click event for scroll buttons
  scrollButton1.addEventListener("click", () => {
    scrollToCoordinate(scr1, 5000);
  });

  scrollButton2.addEventListener("click", () => {
    scrollToCoordinate(scr2, 5000);
  });

  // Click event for "Back to Top" button
  scrollTopButton.addEventListener("click", () => {
    scrollToCoordinate(0, 1000); // Smoothly scroll back to top in 1 second
  });

  // Scroll event to show/hide "Back to Top" button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 1000) {
      scrollTopButton.style.display = "block";
    } else {
      scrollTopButton.style.display = "none";
    }
  });
});

// const toggleBtn = document.querySelector(".switch");

// toggleBtn.addEventListener('click',()=>{
//     document.documentElement.classList.toggle("dark")
// })

const lightBtn = document.querySelector(".fa-sun");
const darkBtn = document.querySelector(".fa-moon");

lightBtn.addEventListener("click", () => {
  document.documentElement.classList.remove("dark");
});
darkBtn.addEventListener("click", () => {
  document.documentElement.classList.add("dark");
});

// Hamburger function
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const lines = hamburger.querySelectorAll("span");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("scale-y-0");
  mobileMenu.classList.toggle("scale-y-100");

  // Animate hamburger to X
  lines[0].classList.toggle("rotate-45");
  lines[0].classList.toggle("translate-y-3");

  lines[1].classList.toggle("opacity-0");

  lines[2].classList.toggle("-rotate-45");
  lines[2].classList.toggle("-translate-y-3");
});

// Subscribe form confirmation display
const form = document.getElementById("subscribeForm");
  const message = document.getElementById("subscribeMessage");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    const res = await fetch("/blogs", {
      method: "POST",
      body: new URLSearchParams(formData),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await res.json();

    if (data.success) {
      form.reset();
      message.classList.remove("hidden");
    }
  });





const animatedElements = document.querySelectorAll(".scroll-animation");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.2, // animate when 20% is visible
  }
);

animatedElements.forEach((el) => observer.observe(el));

// Color Animation
const colorElements = document.querySelectorAll(".text-scroll-color");

const colorObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active"); // revert to original color
      }
    });
  },
  {
    threshold: 0.2,
  }
);

colorElements.forEach((el) => colorObserver.observe(el));

//temp

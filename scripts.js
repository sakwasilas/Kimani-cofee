document.addEventListener("DOMContentLoaded", function () {
  /* ------------------------------
     NAV TOGGLE (mobile)
  ------------------------------ */
  const toggleBtn = document.getElementById("menuToggle");
  const navList = document.getElementById("navList");
  if (toggleBtn && navList) {
    toggleBtn.addEventListener("click", function () {
      navList.classList.toggle("show");
    });
  }

  /* ------------------------------
     SMOOTH SCROLL (exposed for inline onclick)
  ------------------------------ */
  window.scrollToProducts = function () {
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  /* ------------------------------
     EMAIL (Contact Form) - EmailJS + SweetAlert
  ------------------------------ */
  try {
    if (window.emailjs && typeof emailjs.init === "function") {
      emailjs.init("YOUR_PUBLIC_KEY"); // <-- replace
    }
  } catch (err) {
    console.warn("EmailJS not available:", err);
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!(window.emailjs && typeof emailjs.sendForm === "function")) {
        if (window.Swal) {
          Swal.fire("Email service not configured", "Contact form will not send until EmailJS is set up.", "warning");
        } else {
          alert("Email service not configured. Please set up EmailJS.");
        }
        return;
      }

      emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this)
        .then(() => {
          if (window.Swal) {
            Swal.fire("Message sent", "Thank you — we'll get back to you soon.", "success");
          } else {
            alert("Message sent — thank you!");
          }
          contactForm.reset();
        }, (err) => {
          console.error("EmailJS error:", err);
          if (window.Swal) {
            Swal.fire("Error", "There was a problem sending your message. Try again later.", "error");
          } else {
            alert("Error sending message.");
          }
        });
    });
  }

  /* ------------------------------
     GENERIC SLIDESHOW FUNCTION
     - Works for both "about" and "hero"
  ------------------------------ */
  function initSlideshow(containerSelector, interval = 5000) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const slides = container.querySelectorAll(".slide, img, .hero-slide");
    if (!slides.length) return;

    let dotsContainer = container.querySelector(".slideshow-dots, .hero-dots");
    if (!dotsContainer) {
      dotsContainer = document.createElement("div");
      dotsContainer.className = containerSelector.includes("hero")
        ? "hero-dots"
        : "slideshow-dots";
      container.appendChild(dotsContainer);
    }

    dotsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const dot = document.createElement("span");
      dot.className = "dot";
      if (i === 0) dot.classList.add("active");
      dot.dataset.index = i;
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");

    let current = 0;
    let timer;

    function show(i) {
      slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
      dots.forEach((d, idx) => d.classList.toggle("active", idx === i));
      current = i;
    }

    function next() {
      show((current + 1) % slides.length);
    }

    function start() {
      stop();
      timer = setInterval(next, interval);
    }

    function stop() {
      if (timer) clearInterval(timer);
    }

    dots.forEach(dot =>
      dot.addEventListener("click", e => {
        show(parseInt(e.target.dataset.index));
        start();
      })
    );

    // Navigation buttons (only hero has them)
    const prevBtn = container.querySelector(".hero-prev");
    const nextBtn = container.querySelector(".hero-next");
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener("click", () => { show((current - 1 + slides.length) % slides.length); start(); });
      nextBtn.addEventListener("click", () => { next(); start(); });
    }

    // Pause on hover
    container.addEventListener("mouseenter", stop);
    container.addEventListener("mouseleave", start);

    // Init
    show(0);
    start();
  }

  /* ------------------------------
     INIT ALL SLIDESHOWS
  ------------------------------ */
  initSlideshow(".about-image .slideshow", 4000);
  initSlideshow(".hero-carousel", 5000);

});


let current = 0;
const slides = document.querySelectorAll('.slideshow img');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    dots[i].classList.remove('active');
    if (i === index) {
      slide.classList.add('active');
      dots[i].classList.add('active');
    }
  });
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

// Start with first slide
showSlide(current);

// Auto-slide every 4 seconds
setInterval(nextSlide, 4000);


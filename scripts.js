// ----------------------
// Your Existing JS
// ----------------------

// Initialize EmailJS
(function() {
  emailjs.init("_SXjFbWGSqCBOHJuR"); // ✅ Your Public Key
})();

// Scroll to Products Section
function scrollToProducts() {
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

// Contact Form Handling
document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  // Send form data using EmailJS
  emailjs.sendForm("service_xxxxxx", "template_ku5iln6", this) // ⬅️ Replace Service & Template IDs
    .then(function() {
      Swal.fire({
        title: "Message Sent!",
        text: "We will get back to you soon.",
        icon: "success",
        confirmButtonColor: "#3085d6"
      });
      document.getElementById("contactForm").reset();
    }, function(error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to send message. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33"
      });
      console.error("EmailJS Error:", error);
    });
});

// ----------------------
// Slideshow Logic for About Card
// ----------------------
const slides = document.querySelectorAll(".slideshow img");
let current = 0;

function showSlide(index) {
  slides.forEach((img, i) => {
    img.classList.remove("active");
    if (i === index) img.classList.add("active");
  });
}

// Initially show first slide
showSlide(current);

// Change slide every 5 seconds
setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 5000);

document.addEventListener("DOMContentLoaded", () => {
  const footerItems = document.querySelectorAll(".footer-carousel .footer-item");
  let footerIndex = 0;

  function showNextFooterItem() {
    footerItems[footerIndex].classList.remove("active");
    footerIndex = (footerIndex + 1) % footerItems.length;
    footerItems[footerIndex].classList.add("active");
  }

  // Show the first footer item
  footerItems[footerIndex].classList.add("active");

  // Rotate every 4 seconds
  setInterval(showNextFooterItem, 4000);
});

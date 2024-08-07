// Add event listener to nav links
document.addEventListener("DOMContentLoaded", function() {
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach(function(link) {
    link.addEventListener("click", function() {
      // Add active class to link
      link.classList.add("active");
    });
  });
});

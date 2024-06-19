// Navbar functionality
const navbarLinks = document.querySelectorAll(".navbar a");
const mainContent = document.getElementById("main");

navbarLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const page = link.getAttribute("href").replace("#", "");
    mainContent.innerHTML = "";
    fetch(`src/html/${page}.html`)
      .then((response) => response.text())
      .then((html) => {
        mainContent.innerHTML = html;
      });
    navbarLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Settings modal functionality
const settingsBtn = document.getElementById("settings-btn");
const settingsModal = document.getElementById("settings-modal");
const closeModalBtn = document.getElementById("close-modal-btn");
const saveBtn = document.getElementById("save-btn");
const cancelBtn = document.getElementById("cancel-btn");
const resetBtn = document.getElementById("reset-btn");

settingsBtn.addEventListener("click", () => {
  settingsModal.classList.add("show");
});

closeModalBtn.addEventListener("click", () => {
  settingsModal.classList.remove("show");
});

saveBtn.addEventListener("click", () => {
  // Save settings to local storage
  const darkMode = document.getElementById("dark-mode-toggle").checked;
  const fontSize = document.getElementById("font-size-slider").value;
  const fontFamily = document.getElementById("font-family-dropdown").value;
  const language = document.getElementById("language-dropdown").value;
  localStorage.setItem(
    "settings",
    JSON.stringify({ darkMode, fontSize, fontFamily, language })
  );
  settingsModal.classList.remove("show");
});

cancelBtn.addEventListener("click", () => {
  settingsModal.classList.remove("show");
});

resetBtn.addEventListener("click", () => {
  // Reset settings to default
  localStorage.removeItem("settings");
  settingsModal.classList.remove("show");
});

// Load settings from local storage
const storedSettings = localStorage.getItem("settings");
if (storedSettings) {
  const settings = JSON.parse(storedSettings);
  document.getElementById("dark-mode-toggle").checked = settings.darkMode;
  document.getElementById("font-size-slider").value = settings.fontSize;
  document.getElementById("font-family-dropdown").value = settings.fontFamily;
  document.getElementById("language-dropdown").value = settings.language;
  applySettings(settings);
}

// Apply settings to entire homepage
function applySettings(settings) {
  if (settings.darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  document.body.style.fontSize = `${settings.fontSize}px`;
  document.body.style.fontFamily = settings.fontFamily;
  // Apply language settings
}

// Search bar functionality
const searchInput = document.getElementById("search-input");
const catalogueItems = document.getElementById("catalogue-items");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const catalogueItemsArray = Array.from(catalogueItems.children);
  catalogueItemsArray.forEach((item) => {
    const itemName = item.querySelector(".item-name").textContent.toLowerCase();
    const itemCategory = item
      .querySelector(".item-category")
      .textContent.toLowerCase();
    const itemPrice = item
      .querySelector(".item-price")
      .textContent.toLowerCase();
    if (
      itemName.includes(searchTerm) ||
      itemCategory.includes(searchTerm) ||
      itemPrice.includes(searchTerm)
    ) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

// Catalogue items functionality
const catalogueItemsJSON = "catalogue-items.json";
fetch(catalogueItemsJSON)
  .then((response) => response.json())
  .then((data) => {
    const catalogueItemsHTML = data
      .map((item) => {
        return `
        <div class="item">
          <h2 class="item-name">${item.name}</h2>
          <p class="item-category">${item.category}</p>
          <p class="item-price">${item.price}</p>
          <p class="item-description">${item.description}</p>
          <img src="${item.image}" alt="${item.name}">
          <button class="add-to-cart-btn">Add to cart</button>
        </div>
      `;
      })
      .join("");
    catalogueItems.innerHTML = catalogueItemsHTML;
  });

// Cart functionality
const cartModal = document.getElementById("cart-modal");
const cartCloseBtn = document.getElementById("cart-close-btn");
const cartCheckoutBtn = document.getElementById("cart-checkout-btn");
const cartTotalPrice = document.getElementById("cart-total-price");
const cartItemsList = document.getElementById("cart-items-list");

cartCloseBtn.addEventListener("click", () => {
  cartModal.classList.remove("show");
});

cartCheckoutBtn.addEventListener("click", () => {
  // Checkout functionality
});

const cartItems = [];

catalogueItems.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const item = e.target.parentNode;
    const itemName = item.querySelector(".item-name").textContent;
    const itemPrice = item.querySelector(".item-price").textContent;
    cartItems.push({ name: itemName, price: itemPrice });
    updateCart();
  }
});

function updateCart() {
  cartItemsList.innerHTML = "";
  cartItems.forEach((item) => {
    const cartItemHTML = `
      <div class="cart-item">
        <p>${item.name}</p>
        <p>${item.price}</p>
        <button class="remove-btn">Remove</button>
      </div>
    `;
    cartItemsList.innerHTML += cartItemHTML;
  });
  cartTotalPrice.textContent = `Total: ${cartItems
    .reduce((acc, item) => acc + parseFloat(item.price), 0)
    .toFixed(2)}`;
}

// To-top-btn functionality
const toTopBtn = document.getElementById("to-top-btn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    toTopBtn.style.display = "block";
  } else {
    toTopBtn.style.display = "none";
  }
});

toTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

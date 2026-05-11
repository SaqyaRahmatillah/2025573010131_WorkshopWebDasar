const products = [
  {
    id: 1,
    name: "Laptop",
    price: 9500000,
    image: "https://laptopmedia.com/wp-content/uploads/2021/01/1-62.jpg",
  },

  {
    id: 2,
    name: "Keyboard",
    price: 350000,
    image:
      "https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/10/corsair-k100-air-review-ultra-thin-wireless-mechanical-keyboard.jpg",
  },

  {
    id: 3,
    name: "Mouse",
    price: 150000,
    image: "https://5.imimg.com/data5/JB/IH/HH/SELLER-32247283/wired-mouse.jpg",
  },

  {
    id: 4,
    name: "Headset",
    price: 500000,
    image: "https://m.media-amazon.com/images/I/712fHsfyIFL._AC_.jpg",
  },

  {
    id: 5,
    name: "Monitor",
    price: 4500000,
    image: "https://m.media-amazon.com/images/I/81sUJtTXjZL._AC_.jpg",
  },
];

let cart = [];

const productsContainer = document.getElementById("products");
const cartItems = document.getElementById("cart-items");
const totalElement = document.getElementById("total");
const cartCount = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");

function renderProducts() {
  productsContainer.innerHTML = "";

  products.forEach((product) => {
    productsContainer.innerHTML += `
    
      <div class="card">

        <img src="${product.image}" alt="${product.name}">

        <div class="card-body">

          <h3>${product.name}</h3>

          <p>
            Harga: Rp${product.price.toLocaleString()}
          </p>

          <button onclick="addToCart(${product.id})">
            Tambah ke Keranjang
          </button>

        </div>

      </div>

    `;
  });
}

function addToCart(id) {
  const item = cart.find((product) => product.id === id);

  if (item) {
    item.quantity++;
  } else {
    const product = products.find((product) => product.id === id);

    cart.push({
      ...product,
      quantity: 1,
    });
  }

  renderCart();
}

function renderCart() {
  cartItems.innerHTML = "";

  let total = 0;
  let totalItems = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    totalItems += item.quantity;

    cartItems.innerHTML += `

      <div class="cart-item">

        <h4>${item.name}</h4>

        <p>
          Rp${item.price.toLocaleString()} x ${item.quantity}
        </p>

        <p>
          Subtotal:
          Rp${(item.price * item.quantity).toLocaleString()}
        </p>

        <button class="plus"
          onclick="increaseQuantity(${item.id})">
          +
        </button>

        <button class="minus"
          onclick="decreaseQuantity(${item.id})">
          -
        </button>

        <button class="delete"
          onclick="removeItem(${item.id})">
          Hapus
        </button>

      </div>

    `;
  });

  totalElement.textContent = `Total: Rp${total.toLocaleString()}`;

  cartCount.textContent = totalItems;
}

function increaseQuantity(id) {
  const item = cart.find((product) => product.id === id);

  item.quantity++;

  renderCart();
}

function decreaseQuantity(id) {
  const item = cart.find((product) => product.id === id);

  if (item.quantity > 1) {
    item.quantity--;
  } else {
    cart = cart.filter((product) => product.id !== id);
  }

  renderCart();
}

function removeItem(id) {
  cart = cart.filter((product) => product.id !== id);

  renderCart();
}

checkoutBtn.addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }

  let summary = "=== Ringkasan Order ===\n\n";

  cart.forEach((item) => {
    summary += `${item.name} (${item.quantity}) = Rp${(
      item.price * item.quantity
    ).toLocaleString()}\n`;
  });

  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  summary += `\nTotal Bayar: Rp${total.toLocaleString()}`;

  alert(summary);
});

renderProducts();
renderCart();

// ✅ NORMAL PRODUCTS – Only Tops
const normalproduct = [
  {
    image: "images/Tops/deepnavytop.jpg",
    alt: "Top Product",
    title: "Komi Shirt-Blue Stripe",
    price: "$11.99"
  },
  {
    image: "images/Tops/denimtop.jpg",
    alt: "Top",
    title: "Denim Top",
    price: "$16.00"
  },
  {
    image: "images/Tops/blacktop.jpg",
    alt: "Top",
    title: "Black Top",
    price: "$14.00"
  },
  {
    image: "images/Tops/corsetblazer.jpg",
    alt: "Top",
    title: "Corset Blazer",
    price: "$45.00"
  },
  {
    image: "images/Tops/Denimsleeve.jpg",
    alt: "Top",
    title: "Denim Sleeve",
    price: "$15.00"
  },
  {
    image: "images/Tops/greentea.jpg",
    alt: "Top",
    title: "Komi Melon",
    price: "$16.00"
  },
  {
    image: "images/Tops/Komigirl.jpg",
    alt: "Top",
    title: "Komi Sea",
    price: "$16.00"
  },
  {
    image: "images/Tops/ohmyflower.jpg",
    alt: "Top",
    title: "Oh my Komi",
    price: "$16.00"
  },
  {
    image: "images/Tops/passion.jpg",
    alt: "Top",
    title: "Passionism",
    price: "$18.00"
  },
  {
    image: "images/Tops/redleather.jpg",
    alt: "Top",
    title: "Cherry Wine",
    price: "$32.00"
  },
  {
    image: "images/Tops/Sportfit.jpg",
    alt: "Top",
    title: "Sunny Komi",
    price: "$17.00"
  },
  {
    image: "images/Tops/tiewhite.jpg",
    alt: "Top",
    title: "White Tied",
    price: "$20.00"
  }
];

// ✅ DISCOUNTED TOPS ONLY
const discountedProducts = [
  {
    image: "images/Tops/tieblacktop.jpg",
    alt: "Discount Product",
    title: "Black Tie",
    priceNow: "$9.99",
    priceOld: "$20.00"
  },
  {
    image: "images/Tops/Coquette.jpg",
    alt: "Discount Product",
    title: "Coquette",
    priceNow: "$12.50",
    priceOld: "$25.00"
  },
  {
    image: "images/Tops/khakitanktop.jpg",
    alt: "Discount Product",
    title: "Khaki Tank Top",
    priceNow: "$13.99",
    priceOld: "$28.00"
  },
  {
    image: "images/Tops/Jacquemus.jpg",
    alt: "Discount Product",
    title: "Jacquemus",
    priceNow: "$17.50",
    priceOld: "$35.00"
  }

];

// ✅ RENDER NORMAL PRODUCTS
const container = document.getElementById('tops-product-list');
let content = "";

for (let i = 0; i < normalproduct.length; i++) {
  const product = normalproduct[i];
  content += `
    <div class="col-6 col-md-4 col-lg-3 mb-4">
      <div class="card shadow-sm card-wrapper">
        <img src="${product.image}" class="card-img-top custom-img" alt="${product.alt}">
        <div class="card-body text-center">
          <h5 class="card-title">${product.title}</h5>
          <p class="text-muted">${product.price}</p>
          <a href="#" class="btn btn-sm btn-outline-primary add-to-cart">Add to Cart</a>
        </div>
      </div>
    </div>
  `;
}
container.innerHTML = content;

// ✅ RENDER DISCOUNTED PRODUCTS
const discountContainer = document.getElementById('tops-discount-list');
let discountcontent = "";

for (let i = 0; i < discountedProducts.length; i++) {
  const products = discountedProducts[i];
  discountcontent += `
    <div class="col-6 col-md-4 col-lg-3 mb-4">
      <div class="card shadow-sm card-wrapper">
        <img src="${products.image}" class="card-img-top custom-img" alt="${products.alt}">
        <div class="card-body text-center">
          <h5 class="card-title">${products.title}</h5>
          <p class="text-danger fw-bold mb-1">
            Now <span class="price-now">${products.priceNow}</span>
            <span class="text-muted text-decoration-line-through ms-1">${products.priceOld}</span>
          </p>
          <a href="#" class="btn btn-sm btn-outline-primary add-to-cart">Add to Cart</a>
        </div>
      </div>
    </div>
  `;
}
discountContainer.innerHTML = discountcontent;

// ✅ ADD TO CART HANDLER
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    e.preventDefault();

    const card = e.target.closest(".card");
    const title = card.querySelector(".card-title").textContent;
    const image = card.querySelector("img").getAttribute("src");

    const nowPriceElem = card.querySelector(".text-danger");
    const oldPriceElem = card.querySelector(".text-decoration-line-through");

    let cartItem;

    if (nowPriceElem && oldPriceElem) {
      const priceNow = nowPriceElem.querySelector(".price-now")?.textContent.trim();
      const priceOld = oldPriceElem.textContent.trim();

      cartItem = {
        title,
        image,
        type: "discounted",
        priceNow,
        priceOld
      };
    } else {
      const price = card.querySelector("p").textContent.trim();
      cartItem = {
        title,
        image,
        type: "normal",
        price
      };
    }

    const existingCart = JSON.parse(localStorage.getItem("komi-cart")) || [];
    existingCart.push(cartItem);
    localStorage.setItem("komi-cart", JSON.stringify(existingCart));

    alert(`${title} added to cart!`);
  }
});

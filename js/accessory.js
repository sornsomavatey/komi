// ✅ NORMAL PRODUCTS – Only Tops
const normalproduct = [
  {
    image: "images/Acessories/blackglasses.jpg",
    alt: "Glasses",
    title: "Black Glasses",
    price: "$26.00"
  },
  {
    image: "images/Acessories/blackysl.jpg",
    alt: "bag",
    title: "Komi Black Handbag",
    price: "$70.00"
  },
  {
    image: "images/Acessories/bow-clip.jpg",
    alt: "Clip",
    title: "Komi - Bow Clip",
    price: "$3.00"
  },
  {
    image: "images/Acessories/bluebag.jpg",
    alt: "Bag",
    title: "Komi - Blue Bag",
    price: "$30.00"
  },
  {
    image: "images/Acessories/denim-bow-cap.jpg",
    alt: "cap",
    title: "Denim Bow Cap",
    price: "$8.00"
  },
  {
    image: "images/Acessories/genzbag.jpg",
    alt: "bag",
    title: "Komi Bag",
    price: "$22.00"
  },
  {
    image: "images/Acessories/goldearring.jpg",
    alt: "earring",
    title: "Komi Golden Earrings",
    price: "$15.00"
  },
  {
    image: "images/Acessories/heartlace.jpg",
    alt: "necklace",
    title: "Komi Heartlace",
    price: "$11.00"
  },
  {
    image: "images/Acessories/ivycap.jpg",
    alt: "cap",
    title: "Komi Ivy Cap",
    price: "$15.00"
  },
  {
    image: "images/Acessories/pinkyhandbag.jpg",
    alt: "bag",
    title: "Komi Pinky Bag",
    price: "$29.00"
  },
  {
    image: "images/Acessories/redwatch.jpg",
    alt: "watch",
    title: "Komi Red Hunter",
    price: "$40.00"
  },
  {
    image: "images/Acessories/silverred.jpg",
    alt: "Bag",
    title: "Komi Silver Wine",
    price: "$43.00"
  }
];

// ✅ DISCOUNTED TOPS ONLY
const discountedProducts = [
  {
    image: "images/Acessories/Pearl-Necklace.jpg",
    alt: "Discount Product",
    title: "Pearl Necklace",
    priceNow: "$4.00",
    priceOld: "$8.00"
  },
  {
    image: "images/Acessories/redbag.jpg",
    alt: "Discount Product",
    title: "Wine Wine",
    priceNow: "$25.00",
    priceOld: "$50.00"
  },
  {
    image: "images/Acessories/Rosebag.jpg",
    alt: "Discount Product",
    title: "Komi Rosie Pop",
    priceNow: "$20.00",
    priceOld: "$40.00"
  },
  {
    image: "images/Acessories/yslblack.jpg",
    alt: "Discount Product",
    title: "Komi Black Alter",
    priceNow: "$85.00",
    priceOld: "$42.50"
  }

];

// ✅ RENDER NORMAL PRODUCTS
const container = document.getElementById('accessories-product-list');
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
const discountContainer = document.getElementById('accessories-discount-list');
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

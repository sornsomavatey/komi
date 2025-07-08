// ✅ NORMAL PRODUCTS – Only Tops
const normalproduct = [
  {
    image: "images/Bottoms/cherrytrouser.jpg",
    alt: "Top Product",
    title: "Komi Cherry",
    price: "$11.99"
  },
  {
    image: "images/Bottoms/milkytrouser.jpg",
    alt: "Top",
    title: "Komi Milky Day",
    price: "$16.00"
  },
  {
    image: "images/Bottoms/stripetrouser.jpg",
    alt: "Top",
    title: "Komi the striped",
    price: "$14.00"
  },
  {
    image: "images/Bottoms/Allydenim.jpg",
    alt: "Top",
    title: "Ally",
    price: "$28.00"
  },
  {
    image: "images/Bottoms/blackleather.jpg",
    alt: "Top",
    title: "The leather",
    price: "$35.00"
  },
  {
    image: "images/Bottoms/Blair.jpg",
    alt: "Top",
    title: "Komi Blair",
    price: "$22.00"
  },
  {
    image: "images/Bottoms/deepnavygenz.jpg",
    alt: "Top",
    title: "Komi Deep Sea",
    price: "$28.00"
  },
  {
    image: "images/Bottoms/Denimshorts.jpg",
    alt: "Top",
    title: "Komi Deep Sea Shorts",
    price: "$29.00"
  },
  {
    image: "images/Bottoms/doubledenim.jpg",
    alt: "Top",
    title: "Komi Double",
    price: "$20.00"
  },
  {
    image: "images/Bottoms/jenniedenim.jpg",
    alt: "Top",
    title: "Miss Komi",
    price: "$19.00"
  },
  {
    image: "images/Bottoms/khakitrouser.jpg",
    alt: "Top",
    title: "Komi The Sand",
    price: "$24.00"
  },
  {
    image: "images/Bottoms/kylieleather.jpg",
    alt: "Top",
    title: "Komi Leather",
    price: "$20.00"
  }
];

// ✅ DISCOUNTED TOPS ONLY
const discountedProducts = [
  {
    image: "images/Bottoms/pinkypants.jpg",
    alt: "Discount Product",
    title: "KPink",
    priceNow: "$9.00",
    priceOld: "$18.00"
  },
  {
    image: "images/Bottoms/misslightdenim.jpg",
    alt: "Discount Product",
    title: "Miss pale",
    priceNow: "$12.50",
    priceOld: "$25.00"
  },
  {
    image: "images/Bottoms/thetrend.jpg",
    alt: "Discount Product",
    title: "Komi Pop",
    priceNow: "$13.99",
    priceOld: "$28.00"
  },
  {
    image: "images/Bottoms/whiteshorts.jpg",
    alt: "Discount Product",
    title: "Komi Sand Shorts",
    priceNow: "$17.50",
    priceOld: "$35.00"
  }

];

// ✅ RENDER NORMAL PRODUCTS
const container = document.getElementById('bottoms-product-list');
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
const discountContainer = document.getElementById('bottoms-discount-list');
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

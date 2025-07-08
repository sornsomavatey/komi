// Normal Products
const normalproduct = [
  {
    image: "images/Tops/deepnavytop.jpg",
    alt: "Top Product",
    title: "Komi Shirt-Blue Stripe",
    price: "$11.99"
  },
  {
    image: "images/Acessories/redbag.jpg",
    alt: "Accessory",
    title: "Komi-Red Handbag",
    price: "$12.00"
  },
  {
    image: "images/Bottoms/stripetrouser.jpg",
    alt: "Trouser",
    title: "Komi-Office Pants",
    price: "$18.00"
  },
  {
    image: "images/Sets/Sleevelessminidress.jpg",
    alt: "Dress",
    title: "Sleeveless Mini Dress",
    price: "$28.00"
  },
  {
    image: "images/Tops/denimtop.jpg",
    alt: "Top",
    title: "Denim Top",
    price: "$16.00"
  },
  {
    image: "images/Acessories/download(11).jpg",
    alt: "Bag",
    title: "Komi-Tote Bag",
    price: "$12.00"
  },
  {
    image: "images/Acessories/Baguette-Bag.jpg",
    alt: "Bag",
    title: "Baguette Bag",
    price: "$65.00"
  },
  {
    image: "images/Acessories/Pearl-Necklace.jpg",
    alt: "Necklace",
    title: "Pearl Necklace Y2k",
    price: "$16.00"
  },
  {
    image: "images/Sets/autumnminidress.jpg",
    alt: "Blue Mini Dress",
    title: "AutumnWinter Dress",
    price: "$32.00"
  }
];

const container = document.getElementById('product-list');
let content = "";
for (let i = 0; i<normalproduct.length; i++) {
  const product = normalproduct[i];
  content += `
    <div class="col-md-4 mb-4">
      <div class="card shadow-sm">
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

//Discounted Product
const discountedProducts = [
  {
    image: "images/Skirts/khakiskirt.jpg",
    alt: "Discount Product",
    title: "Khaki Skirt",
    priceNow: "$5.99",
    priceOld: "$18.00"
  },
  {
    image: "images/Tops/tieblacktop.jpg",
    alt: "Discount Product",
    title: "White Blouse",
    priceNow: "$9.99",
    priceOld: "$20.00"
  },
  {
    image: "images/Sets/sampeal.jpg",
    alt: "Discount Product",
    title: "Komi- Dress",
    priceNow: "$11.99",
    priceOld: "$24.00"
  }
];

const discountContainer = document.getElementById('discount-list');
let discountcontent = "";
for (let i = 0; i<discountedProducts.length; i++) {  
  const products = discountedProducts[i];
  discountcontent += `
    <div class="col-md-4 mb-4">
      <div class="card shadow-sm">
        <img src="${products.image}" class="card-img-top custom-img" alt="${products.alt}">
        <div class="card-body text-center">
          <h5 class="card-title">${products.title}</h5>
          <p class="text-danger fw-bold">
            Now <span class="price-now">${products.priceNow}</span>
            <span class="text-muted text-decoration-line-through price-old ms-1">${products.priceOld}</span>
          </p>
          <a href="#" class="btn btn-sm btn-outline-primary add-to-cart">Add to Cart</a>
        </div>
      </div>
    </div>
  `;

}
discountContainer.innerHTML = discountcontent; 


document.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-to-cart")) {
    e.preventDefault();

    const card = e.target.closest(".card");
    const title = card.querySelector(".card-title").textContent;
    const image = card.querySelector("img").getAttribute("src");

    const nowPriceElem = card.querySelector(".text-danger"); // used in discounted
    const oldPriceElem = card.querySelector(".text-decoration-line-through");

    let cartItem;

    if (nowPriceElem && oldPriceElem) {
      // ✅ Discounted product
      const priceNow = nowPriceElem.childNodes[1]?.textContent.trim();
      const priceOld = oldPriceElem.textContent.trim();  

      cartItem = {
        title,
        image,
        type: "discounted", // 🔥 this must be here!
        priceNow,
        priceOld
      };
    } else {
      // ✅ Normal product
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

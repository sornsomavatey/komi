const products = [
  {
    image: "../images/Tops/Woven Collar Stripe Short Sleeve Shirt For School.jpg",
    alt: "Top Product",
    title: "Komi Shirt-Blue Stripe",
    price: "$11.99"
  },
  {
    image: "../images/Acessories/Juoxeepy Ita Bag Cute Bow Purse Aesthetic Japanese Shoulder Bag Faux Leather Tote Bag Y2k Red Handbag Purse.jpg",
    alt: "Accessory",
    title: "Komi-Red Handbag",
    price: "$12.00"
  },
  {
    image: "../images/Bottoms/download (8).jpg",
    alt: "Trouser",
    title: "Komi-Office Pants",
    price: "$18.00"
  },
  {
    image: "../images/Sets/Sleeveless Mini Dress.jpg",
    alt: "Dress",
    title: "Sleeveless Mini Dress",
    price: "$28.00"
  },
  {
    image: "../images/Tops/download.jpg",
    alt: "Top",
    title: "Block Shirt Top",
    price: "$16.00"
  },
  {
    image: "../images/Acessories/download (11).jpg",
    alt: "Bag",
    title: "Komi-Tote Bag",
    price: "$12.00"
  },
  {
    image: "../images/Acessories/Baguette Bag.jpg",
    alt: "Bag",
    title: "Baguette Bag",
    price: "$65.00"
  },
  {
    image: "../images/Acessories/Pearl Necklace.jpg",
    alt: "Necklace",
    title: "Pearl Necklace Y2k",
    price: "$16.00"
  },
  {
    image: "../images/Sets/Autumn Mini Dress.jpg",
    alt: "Blue Mini Dress",
    title: "AutumnWinter Dress",
    price: "$32.00"
  }
];

const container = document.getElementById('product-list');

products.forEach(product => {
  const col = document.createElement('div');
  col.className = 'col-md-4 mb-4';
  col.innerHTML = `
    <div class="card shadow-sm">
      <img src="${product.image}" class="card-img-top custom-img" alt="${product.alt}">
      <div class="card-body text-center">
        <h5 class="card-title">${product.title}</h5>
        <p class="text-muted">${product.price}</p>
        <a href="#" class="btn btn-sm btn-outline-primary">Add to Cart</a>
      </div>
    </div>
  `;
  container.appendChild(col);
});

const discountedProducts = [
  {
    image: "images/Skirts/Khaki Women Shorts.jpg",
    alt: "Discount Product",
    title: "Khaki Skirt",
    priceNow: "$5.99",
    priceOld: "$18.00"
  },
  {
    image: "images/Tops/Puff sleeve 2 in 1.jpg",
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

discountedProducts.forEach(product => {
  const col = document.createElement('div');
  col.className = 'col-md-4 mb-4';
  col.innerHTML = `
    <div class="card shadow-sm">
      <img src="${product.image}" class="card-img-top custom-img" alt="${product.alt}">
      <div class="card-body text-center">
        <h5 class="card-title">${product.title}</h5>
        <p class="text-danger fw-bold">Now ${product.priceNow} 
          <span class="text-muted text-decoration-line-through">${product.priceOld}</span>
        </p>
        <a href="#" class="btn btn-sm btn-outline-danger">Add to Cart</a>
      </div>
    </div>
  `;
  discountContainer.appendChild(col);
});


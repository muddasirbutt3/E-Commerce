let products = document.querySelector(".products");
let wish = document.querySelector(".wish-count");

let wishCount = 0 
function calCount() {
    let wishbox = document.querySelectorAll(".wish-box");
    wishbox.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            
            if (item.getAttribute('data-added') !== 'false') {
                item.innerHTML = '<i class="fa-regular fa-heart"></i>'
                item.setAttribute('data-added', 'false');
                wishCount--;
            } else {
                item.innerHTML = '<i class="fa-solid red fa-heart"></i>'
                item.setAttribute('data-added', 'true');
                wishCount++;
            }
            
            wish.innerHTML = wishCount;
        })
    })
    
}
fetch("https://fakestoreapi.com/products")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    displays(data);
    console.log(data[0]);
    goToProduct()
    calCount()
  });
console.log(products);
function calStars(rating) {
  let fullstar = Math.floor(rating);
  let halfstar = fullstar % 1 >= 0.5 ? 1 : 0;
  let emptystar = 5 - fullstar - halfstar;
  let stars = "";
  for (let i = 0; i < fullstar; i++) {
    stars += "★";
  }
  if (halfstar) {
    stars += "⯪";
  }
  for (let i = 0; i < emptystar; i++) {
    stars += "☆";
  }
  return stars;
}

function displays(data) {
  data.slice(0, 10).forEach((product) => {
    products.innerHTML += `
          <div class="product-box">
                <div class="product-img">
                    <img src="${product["image"]}" alt="">
                     <div class="wish-box" data-added="false" ><i class="fa-regular fa-heart"></i></div>
                    </div>
                    <div class="text">
                    <p class="title">${product["title"]}</p>
                    <p class="cate">${product["category"]}</p>
                    <p class="rate">${calStars(product["rating"]["rate"])}</p>
                    <p class="price"><span class="dis-price">${
                      product["price"] - 3
                    }$</span> <span class="act-price">${
      product["price"]
    }$</span></p>
                </div>
            </div>
          `;
  });
}
function goToProduct() {
    const productCards = document.querySelectorAll(".product-box");
    productCards.forEach((card,index) => {
        card.addEventListener("click", () => {
          window.location.href = `./product.html?id=${index+1}`;
        })
    })
}

// Variables
let apivariable = "categories";
let products = "products";
let section = document.querySelector('.items');
let orderArray = [];

// Fetch function
function drawItems(a, id) {
  fetch(`https://competa-api.dev.competa.com/api/${a}`)
  .then(result => {
    // IF Invalid
    if (result.status !== 200) {
      console.log(result.status);
      console.log(result);
    }
    // IF Valid
    return result.json();
  }).then(result => {
    // IF Function has id
    if (id > 0){
        // Empty earlier category
        section.innerHTML = "";
        for (let i=0; i < result.length; i++){
            if (result[i].category_id == id) {
                section.innerHTML += `
                  <div onclick="openBox(${result[i].id})" class="grid-item item__box">
                  <h2 class="box__titel">${result[i].name}</h2>
                  <div style="text-align: center; margin-top:30px;">
                  <hr class="main-hr"/>
                  <button data-id="${result[i].id}" data-price="${result[i].price}" data-name="${result[i].name}" onclick="addItem(${result[i].id})" class="icon-btn add-btn add-btn${result[i].id}">
                    <div class="add-icon"></div>
                    <div class="btn-txt"">Add</div>
                  </button>
                  <button data-name="${result[i].name}" onclick="removeItem(${result[i].id})" class="icon-btn add-btn remove-btn${result[i].id}">  
                    <div class="btn-txt">Remove</div>
                  </button>
                  <div>
                  <div class="item__detail item__detail${result[i].id}">
                    ${result[i].price}&#36;<br>
                  </div>
                  </div>
                `;

                // IF Item has description
                if(result[i].description === ""){
                }
                else{
                  let x = document.querySelector(`.item__detail${result[i].id}`);
                  x.innerHTML += `
                    ingredienten:<br>
                    ${result[i].description}
                  `;
                };
            }
        }
    }

    // If Function has no id create links
    else{
    let link = document.querySelector('.main__dropdown-content');
    for (var i = 0; i < result.length; i++) {
      link.innerHTML += `
        <a onClick="drawItems(products, ${result[i].id})">${result[i].name}</a>
      `;
    }
    }  
  });
};

// Add Item
function addItem(a) {
  let x = document.querySelector(`.add-btn${a}`);
  let data = x.getAttribute('data-name');
  let price = x.getAttribute('data-price');
  let id = x.getAttribute('data-id');
  let amount = 1;
  let obj = {name: data, priceamount: price, amount: amount, id: id};

  cartItem = orderArray.find((item) => { return item.name == data});
  if (cartItem) {
    cartItem.amount++;
  } 
  else orderArray.push(obj);

  menuList();
}

// Remove Item
function removeItem(a) {
  let x = document.querySelector(`.remove-btn${a}`);
  let data = x.getAttribute('data-name');
  cartItem = orderArray.find((item) => { return item.name == data});
  cartItem.amount--;
  if (cartItem.amount == 0) {
    orderArray.splice(data, 1);
  }

  menuList();
}

function menuList() {
  let x = document.querySelector('.main__menulist');
  x.innerHTML = `
    <h2 class="main__menulist_titel">Added Items</h2><br>
  `;

  for (let i = 0; i < orderArray.length; i++) {
    x.innerHTML += `
      <p class="${orderArray[i].id}">${orderArray[i].amount}x ${orderArray[i].name} 
        - &euro;${orderArray[i].priceamount * orderArray[i].amount} 
      </p>
    `;
  }
}

// Open detail box
function openBox(a) {
  let x = document.querySelector(`.item__detail${a}`);
  if (x.style.display === "none") {
    x.style.display = "block";
  } 
  else {
    x.style.display = "none";
  }
}

window.onunload = function(){
  localStorage.setItem("order", JSON.stringify(orderArray));
};

window.onload = function(){
  let storedData = localStorage.getItem("order");
  if (storedData) {
    orderArray = JSON.parse(storedData);
  }
  menuList();
};

//localStorage.clear();
drawItems(apivariable, 0);

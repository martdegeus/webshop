let apivariable = "categories";
let products = "products";
let section = document.querySelector('.items');
let orderArray = [];

//fetch function
function drawItems(a, id) {
  fetch(`https://competa-api.dev.competa.com/api/${a}`)
  .then(result => {
    // Invalid
    if (result.status !== 200) {
    }

    // If valid
    return result.json();
  }).then(result => {
    // If function has id
    if (id > 0){
        //empty earlier categories
        section.innerHTML = "";
        for (let i=0; i < result.length; i++){
            if (result[i].category_id == id) {
                section.innerHTML += `
                  <div onclick="openBox(${result[i].id})" class="grid-item item__box">
                  ${result[i].name}
                  <div style="text-align: center; margin-top:30px;">
                  <hr class="main-hr"/>
                  <button onClick="addItem(${result[i].name})" class="icon-btn add-btn">
                    <div class="add-icon"></div>
                    <div class="btn-txt"">Add</div>
                  </button>
                  <button class="icon-btn add-btn">  
                    <div class="btn-txt">Remove</div>
                  </button>
                  <div>
                  <div class="item__detail item__detail${result[i].id}">
                    ${result[i].price}&#36;<br>
                  </div>
                  </div> `;
                
                // If item has description
                if(result[i].description === ""){
                }
                else{
                  let x = document.querySelector(`.item__detail${result[i].id}`);
                  x.innerHTML += `
                    ingredienten:<br>
                    ${result[i].description}
                  `
                };
            }
        }
    }
    // If function has no id create links
    else{
    let link = document.querySelector('.main__dropdown-content');
    for (var i = 0; i < result.length; i++) {
      link.innerHTML += `
        <a onClick="drawItems(products, ${result[i].id})">${result[i].name}</a>
      `;
    }
    console.log(result);
    }  
  });
};

function addItem(item) {
  orderArray.push(item);
}

// Open detail box
function openBox(a) {
    let x = document.querySelector(`.item__detail${a}`);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

drawItems(apivariable, 0);
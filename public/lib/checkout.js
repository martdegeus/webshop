let checkoutItems = [];

function menuList() {
    let x = document.querySelector('.main__menulist');
    x.innerHTML = `
      <h2 class="main__menulist_titel">Added Items</h2><br>
    `;
    
    for (let i = 0; i < checkoutItems.length; i++) {
      x.innerHTML += `
        <p class="${checkoutItems[i].id}">${checkoutItems[i].amount}x ${checkoutItems[i].name} 
          - &euro;${checkoutItems[i].priceamount * checkoutItems[i].amount} 
        </p>
      `;
    }
  }

window.onload = function(){
    let storedData = localStorage.getItem("order");
    if (storedData) {
      checkoutItems = JSON.parse(storedData);
    }

    menuList();
};

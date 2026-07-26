/* Image Filter Section */

const allFilterItems = document.querySelectorAll('.filter-item');
const allFilterBtns = document.querySelectorAll('.filter-btn');

window.addEventListener('DOMContentLoaded', () => {
    allFilterBtns[1].classList.add('active-btn');
});

allFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        showFilteredContent(btn);
    });
});

function showFilteredContent(btn){
    allFilterItems.forEach((item) => {
        if(item.classList.contains(btn.id)){
            resetActiveBtn();
            btn.classList.add('active-btn');
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function resetActiveBtn(){
    allFilterBtns.forEach((btn) => {
        btn.classList.remove('active-btn');
    });
}


/* Shopping Cart Section */
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded' , ready);
}

else{
    ready();
}


 function ready(){
    var removeCartItemButton = document.getElementsByClassName('btn-danger');
    for (var i = 0 ; i < removeCartItemButton.length; i++){
        var button = removeCartItemButton[i];
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0 ;i < quantityInputs.length ; i++){
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for(var i = 0; i< addToCartButtons.length; i++){
        var button = addToCartButtons[i];
        button.addEventListener('click',addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
 }


 function purchaseClicked(){
    localStorage.removeItem("sale");
   localStorage.removeItem("totals");
      var cartItems = document.getElementsByClassName('cart-items')[0];
     while(cartItems.hasChildNodes()){
         cartItems.removeChild(cartItems.firstChild)
     }
     updateCartTotal();
 }

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
  
}

function  quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value <= 0 ){
        input.value = 1;
    }
    updateCartTotal();
}


function addToCartClicked(event){
  const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    var button = event.target;
    var shopItem = button.parentElement;
    var time = hour+":"+minutes+":"+seconds;
    var id = shopItem.getElementsByClassName('shop-item-id')[0].innerText;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText;
    var qty = shopItem.getElementsByClassName('card-title shop-item-input')[0].innerText;
 //  localStorage.clear();
 sumey = localStorage.getItem("identifier");
 if (sumey == null || sumey == ""){
 const date = new Date();
 const ruhi = date.getHours();
 const aisha =date.getMinutes();
const mylove = date.getSeconds();
const my = date.getMilliseconds();
localStorage.setItem("identifier",my+""+ruhi+""+mylove+""+aisha)}
window.location.href="https://accessmatt.co.ke/Cart/Cart1.php?products="+id+"|"+title+"|"+price+"|"+qty+"|"+"&customer="+localStorage.getItem("identifier")+".txt";
  addItemToCart(time,id,title,price,qty);
    updateCartTotal();
}

function addItemToCart(time, id, title, price ,qty){
    var cartRow = document.createElement('tr');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-id');

    for (i = 0; i< cartItemNames.length ; i++){
        if(cartItemNames[i].innerText == id){
            alert('This item already has added to the cart!');
            return
        }
    }
    var imran = "https://accessmatt.co.ke/Accessories/accessories.php?accessories=";
   var sume = `
      <div><td class="cart-item cart-column">
            <span class="cart-item-time">${time}</span>                  
        </td>
      <td class="cart-item cart-column">
            <span class="cart-item-id">${id}</span>                  
        </td>
       <td class="cart-item cart-column">
            <span class="cart-item-title">${title}</span>                  
        </td>
      <td class="cart-item cart-column">
            <span class="cart-price cart-column">${price}</span>
        </td>
      <td class="cart-item cart-column">
            <span class="cart-quantity-input cart-column">${qty}</span><b class="btn btn-danger">pcs</b></td> 
            <td class="cart-item cart-column">${customer}</td>
            <td class="cart-item cart-column">${numbr}</td>
            <td class="cart-item cart-column">${payment}</td>
    `;
     
     var cartRowContents = imran + sume;
    localStorage.setItem("ne",cartRowContents) ;
  
}
function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0 ; i< cartRows.length ; i++){
        var cartRow =cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('Rs ' , ''))
        var quantity = parseFloat(quantityElement.innerText.replace('Rs ' , ''))
        total = total + price * quantity;
         
    }
    total = Math.round(total * 100 )/100;
    document.getElementsByClassName('cart-total-price')[0].innerText = 'ksh '+ total + '.00';
 
}
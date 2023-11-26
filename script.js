let all_products = document.querySelector('.products');
// console.log(all_products)
let cartList = document.querySelector('tbody')
// console.log(cartList)

all_products.addEventListener('click',addProduct);
cartList.addEventListener('click',removeProduct);
document.addEventListener('DOMContentLoaded', getProduct);


function createProduct_Tr( product_name,product_price){

    let trItem = document.createElement('tr');

    let td1 =  document.createElement('td');
    td1.appendChild(document.createTextNode(product_name)) 

    let td2 = document.createElement('td');
    td2.appendChild(document.createTextNode(product_price)) 

    let btn =  document.createElement('button');
    btn.setAttribute('class','btn btn-danger btn-sm');
    btn.setAttribute('type','submit');
    btn.appendChild(document.createTextNode("Remove"))
    let td3 =  document.createElement('td');
    td3.appendChild(btn)

    trItem.appendChild(td1)
    trItem.appendChild(td2)
    trItem.appendChild(td3)
    cartList.appendChild(trItem)          
}



function addProduct(e){  
    if(e.target.tagName=="BUTTON"){
 
        let product_name = e.target.parentElement.firstElementChild.textContent;
        // console.log(product_name);
        let product_price = e.target.previousElementSibling.previousElementSibling.textContent;
        // console.log(product_price);
        // console.log(cartList)

        let child_count= cartList.childElementCount;


            if(cartList.childElementCount===0 ){
                createProduct_Tr( product_name,product_price)
                storeTaskInLocalStorage(product_name,product_price)
            }
            else{
                let find = false;
                for(var i = 0; i < child_count; i++){
                    let cart_has = cartList.children[i].firstElementChild.textContent;
                    console.log(cart_has) 
                    console.log("product: " + product_name+"-------------")
                    if(cart_has === product_name){
                        find = true
                        break;
                    } 
                }
                if(!find){
                    createProduct_Tr( product_name,product_price)
                    storeTaskInLocalStorage(product_name,product_price)
                }
                else{
                    alert("Already Added in Shop Cart")
                }

            }

        

    } 
}


function removeProduct(e){

    if(e.target.tagName === 'BUTTON'){  
 
        if(confirm("Are u sure?")){
             let product = e.target.parentElement.parentElement;
             console.log(product)
             product .remove(); 
             removeFromLS(product);
        }
    }
    
}




function storeTaskInLocalStorage(name,price){

    let names;
    let prices;
    if(localStorage.getItem('names') === null && localStorage.getItem('prices') === null){
        names = [];
        prices =[];
    }else{
        names = JSON.parse(localStorage.getItem('names'));
        prices = JSON.parse(localStorage.getItem('prices'));
    }
    prices.push(price);
    names.push(name);

    localStorage.setItem('names',JSON.stringify(names));
    localStorage.setItem('prices',JSON.stringify(prices));
 }



 function getProduct() {
    const names = JSON.parse(localStorage.getItem('names') || '[]');
    const prices = JSON.parse(localStorage.getItem('prices') || '[]');

    for(var i = 0 ; i < names.length; i++){

        createProduct_Tr( names[i],prices[i])

    } 
}



 function removeFromLS(product) {
    const names = JSON.parse(localStorage.getItem('names') || '[]');
    const prices = JSON.parse(localStorage.getItem('prices') || '[]');

    let tr_row = product;
    console.log("tr row" + tr_row)
    console.log("tr_row_lastchild")
    tr_row.removeChild(tr_row.lastChild);
    

    names.forEach((name, index) =>{
        if(tr_row.firstElementChild.textContent.trim()=== name) {
            names.splice(index, 1);
        }
    });

    prices.forEach((price, index) =>{
        if(tr_row.lastElementChild.textContent.trim()=== price) {
            prices.splice(index, 1);
        }
    });

  
    localStorage.setItem('names', JSON.stringify(names));
    localStorage.setItem('prices', JSON.stringify(prices));
}



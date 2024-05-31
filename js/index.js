var pNameInput = document.getElementById("pName");
var pPriceInput = document.getElementById("pPrice");
var pCatInput = document.getElementById("pCat");
var pImgInput = document.getElementById("pImg");
var pSearch = document.getElementById("searchInput");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
var index = 0;

var arrContainer = [];

if(localStorage.getItem("store") != null){
    arrContainer = JSON.parse(localStorage.getItem("store"));
    show();
}

function addProduct(){
    if(validCat() ==true && validName() == true && validPrice() == true){
        var add = {
            name: pNameInput.value,
            price: pPriceInput.value ,
            category: pCatInput.value,
            imgg: pImgInput.files[0]?.name
        }
    
        arrContainer.push(add);
    
        localStorage.setItem("store" , JSON.stringify(arrContainer));
    
        show();
        clear();
    }
}


function show(){
    var product = "";
    for(var i =0; i<arrContainer.length; i++){
        product += `
            <div class=" col-xl-3 col-lg-6 ">
            <div class=" frm p-3">
                <div class=" d-flex flex-column justify-content-center align-items-center p-2">
                    <img src="images/${arrContainer[i].imgg}" class=" m img-fluid w-50 border border-2" alt=""></div>
                    <h5 class=" text-center">${arrContainer[i].name}</h5>
                    <div><span class=" fw-semibold">Price: </span>${arrContainer[i].price}</div>
                    <div class=" pb-3"><span class=" fw-semibold">Category: </span> ${arrContainer[i].category}</div>
                    <button onclick="DeleteItem(${i})" class=" btn btn-outline-light px-3 text-dark">Delete</button>
                    <button onclick="setUpdate(${i})" class=" btn btn-outline-light px-3 text-dark">Update</button>
            </div>
        </div> `
    }
    document.getElementById("content").innerHTML = product;

}


function search(){
    var word = pSearch.value;

    var product = "";
    for(var i =0; i<arrContainer.length; i++){
        if(arrContainer[i].name.toLowerCase().includes(word.toLowerCase()) == true){
            product += `
            <div class=" col-xl-3 col-lg-6 ">
            <div class=" frm p-3">
                <div class=" d-flex flex-column justify-content-center align-items-center p-2">
                    <img src="images/${arrContainer[i].imgg}" class=" m img-fluid w-50 border border-2" alt=""></div>
                    <h5 class=" text-center">${arrContainer[i].name}</h5>
                    <div><span class=" fw-semibold">Price: </span>${arrContainer[i].price}</div>
                    <div class=" pb-3"><span class=" fw-semibold">Category: </span> ${arrContainer[i].category}</div>
                    <button onclick="DeleteItem(${i})" class=" btn btn-outline-light px-3 text-dark">Delete</button>
                    <button onclick="setUpdate(${i})" class=" btn btn-outline-light px-3 text-dark">Update</button>
            </div>
        </div> `
        }
    }
    document.getElementById("content").innerHTML = product;

}

function clear(){
    pNameInput.value = null;
    pPriceInput.value = null;
    pCatInput.value = null;
    pImgInput.value = null

    pNameInput.classList.remove("is-valid");
    pPriceInput.classList.remove("is-valid");
    pCatInput.classList.remove("is-valid");
    pImgInput.classList.remove("is-valid");
}


function DeleteItem(indexItem){
    arrContainer.splice(indexItem,1);
    localStorage.setItem("store" , JSON.stringify(arrContainer));
    show();
}



function setUpdate(indexElement){
    pNameInput.value = arrContainer[indexElement].name
    pPriceInput.value = arrContainer[indexElement].price
    pCatInput.value = arrContainer[indexElement].category

    btnAdd.classList.add("d-none");
    btnUpdate.classList.remove("d-none");

    index = indexElement;
}


function updateData(){
    var add = {
        name: pNameInput.value,
        price: pPriceInput.value ,
        category: pCatInput.value,
        imgg: pImgInput.files[0]?.name
    }

    arrContainer.splice(index, 1, add);
    
    show();
    clear();
    localStorage.setItem("store" , JSON.stringify(arrContainer));

}


function validName(){
    var text = pNameInput.value
    var validmsg = document.getElementById("validMsg")
    var regex = /^.{3,}$/

    if(regex.test(text) == true){
        pNameInput.classList.add("is-valid")
        pNameInput.classList.remove("is-invalid")
        validmsg.classList.add("d-none")
        return true;
    }
    else{
        pNameInput.classList.add("is-invalid")
        pNameInput.classList.remove("is-valid")
        validmsg.classList.remove("d-none")
        return false;
    }
}

function validPrice(){
    var num = pPriceInput.value;
    var validprice = document.getElementById("validPrice")
    var regex = /^[\d]{2,}$/

    if(regex.test(num) == true){
        pPriceInput.classList.add("is-valid")
        pPriceInput.classList.remove("is-invalid")
        validprice.classList.add("d-none")
        return true;
    }
    else{
        pPriceInput.classList.add("is-invalid")
        pPriceInput.classList.remove("is-valid")
        validprice.classList.remove("d-none")
        return false;
    }
}

function validCat(){
    var catego = pCatInput.value;
    var validcat = document.getElementById("validCat")
    var regex = /^.{3,}$/

    if(regex.test(catego) == true){
        pCatInput.classList.add("is-valid")
        pCatInput.classList.remove("is-invalid")
        validcat.classList.add("d-none")
        return true;
    }
    else{
        pCatInput.classList.add("is-invalid")
        pCatInput.classList.remove("is-valid")
        validcat.classList.remove("d-none")
        return false;
    }
}

// function validImg(){
//     var iimg = pImgInput.value;
//     var validimg = document.getElementById("validImg");
//     var regex = /^.{1,}\.(jpg|jpeg)$/;

//     if(regex.test(iimg) == true){
//         pImgInput.classList.add("is-valid")
//         pImgInput.classList.remove("is-invalid")
//         validimg.classList.add("d-none")
//         return true;
//     }
//     else{
//         pImgInput.classList.add("is-invalid")
//         pImgInput.classList.remove("is-valid")
//         validimg.classList.remove("d-none")
//         return false;
//     }
// }
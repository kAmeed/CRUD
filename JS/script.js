var productName=document.getElementById('productName');
var productPrice=document.getElementById('productPrice');
var productCategory=document.getElementById('productCategory');
var productDescription=document.getElementById('productDescription');
var productImage=document.getElementById('productImage');
var row=document.getElementById('row');
var search=document.getElementById('search');
var addBtn=document.getElementById('addBtn');
var updateBtn=document.getElementById('updateBtn');
var formAlert=document.getElementById('formAlert');
var updateNumber;
var productContainer;


if(localStorage.getItem('productContainer')!=null){
productContainer=JSON.parse(localStorage.getItem('productContainer'));
displayProduct()
}else{
    productContainer=[];
}

function addProduct(){
    var product={
        name:productName.value,
        price:productPrice.value,
        category:productCategory.value,
        description:productDescription.value,
        image:`./imgs/portfolio/${productImage.files[0].name}`
    }


if (productName.classList.contains('is-valid')&&productPrice.classList.contains('is-valid')&&productCategory.classList.contains('is-valid')&&productDescription.classList.contains('is-valid')) {
    productContainer.push(product);
localStorage.setItem('productContainer',JSON.stringify(productContainer));
displayProduct();
clearProduct();
resetFunction();

}else{
}
console.log(productImage.value);
addBtn.removeAttribute('data-bs-dismiss');
        updateBtn.removeAttribute('data-bs-dismiss');
}

function clearProduct() {
    productName.value='';
    productPrice.value='';
    productCategory.value='';
    productDescription.value='';
    productImage.value='';
}

function deleteProduct(index){
    productContainer.splice(index,1);
    localStorage.setItem('productContainer',JSON.stringify(productContainer));

    if (productContainer=='') {
        var cartona='';
        row.innerHTML=cartona;
    }else{
        displayProduct();
    }
    
}

function searchProduct() {
    var cartona='';
    for (let i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(search.value.toLowerCase())==true) {

            cartona+=`<div class="col-md-3">
            <!-- card -->
            <div class="card mt-3" style="width: 18rem">
              <img src="${productContainer[i].image}" class="card-img-top" alt="1" />
              <div class="card-body">
                <h2 class="card-text"> ${productContainer[i].name}</h2>
                <h3 class="card-text h5 text-muted "> ${productContainer[i].description}</h3>
                <h3 class="card-text h5">Category: ${productContainer[i].category}</h3>
                <h3 class="card-text h5">Price: ${productContainer[i].price} L.E</h3>
                
                
                <button class="btn btn-danger w-100" onclick="deleteProduct(${i})" >Delete</button>
               <button class="btn btn bg-warning mt-2 w-100">Update</button>
              </div>
            </div>
           </div>` 
        }
        row.innerHTML=cartona;

    }
    }
    function setAdd() {
        productName.classList.add('nodalBlock');
        productPrice.classList.add('nodalBlock');
        productCategory.classList.add('nodalBlock');
        productDescription.classList.add('nodalBlock');
        addBtn.classList.remove('d-none');
        updateBtn.classList.add('d-none');
        clearProduct();
    }

    function setProductUpdate(updateIndex) {
        addBtn.classList.add('d-none');
        updateBtn.classList.remove('d-none');

        productName.value=productContainer[updateIndex].name;
        productPrice.value=productContainer[updateIndex].price;
        productCategory.value=productContainer[updateIndex].category;
        productDescription.value=productContainer[updateIndex].description;
        updateNumber=updateIndex;
    }

    function updateProduct(){
        var indexToReplace;
        indexToReplace = updateNumber;

        var newObject={
            name:productName.value,
            price:productPrice.value,
            category:productCategory.value,
            description:productDescription.value,
            image:`./imgs/portfolio/${productImage.files[0].name}`
        }
        if (!productName.classList.contains('is-invalid')&&!productPrice.classList.contains('is-invalid')&&!productCategory.classList.contains('is-invalid')&&!productDescription.classList.contains('is-invalid')){
            productContainer.splice(indexToReplace, 1, newObject);
            localStorage.setItem('productContainer',JSON.stringify(productContainer));
            displayProduct();
            clearProduct();
            resetFunction();
        }
        
    }
    

function displayProduct(){
    var cartona='';
for (let i = 0; i < productContainer.length; i++) {
 cartona+=`<div class="col-md-3">
 <!-- card -->
 <div class="card mt-3" style="width: 18rem">
   <img src="${productContainer[i].image}" class="card-img-top" alt="1" />
   <div class="card-body">
     <h2 class="card-text">${productContainer[i].name}</h2>
     <h3 class="card-text h5 text-muted ">${productContainer[i].description}</h3>
     <h3 class="card-text h5">Category: ${productContainer[i].category}</h3>
     <h3 class="card-text h5">Price: ${productContainer[i].price} L.E</h3>

     <button class="btn btn-danger w-100" onclick="deleteProduct(${i})" >Delete</button>
    <button data-bs-toggle="modal"data-bs-target="#staticBackdrop" onclick="setProductUpdate(${i})" class="btn btn bg-warning mt-2 w-100">Update</button>
   </div>
 </div>
</div>`   

row.innerHTML=cartona;
}
}

function validateInputs(element) {

    var regex={
        productName:/^[A-Z]\w{3,10}\s?\w{0,5}$/,
        productPrice:/^[1-9][0-9][0-9][0-9][0-9]?$/,
        productCategory:/^(Mobile|TV|Laptop)$/,
        productDescription:/^.{4,300}$/
    }


    if (regex[element.id].test(element.value)){
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        element.nextElementSibling.classList.add('d-none');
        element.classList.remove('nodalBlock');
    }else{
        element.classList.remove('is-valid');
        element.nextElementSibling.classList.remove('d-none');  
        element.classList.add('is-invalid');
        element.classList.add('nodalBlock');
    }

    if (element.classList.contains('is-valid')&&!productName.classList.contains('nodalBlock')&&!productPrice.classList.contains('nodalBlock')&&!productDescription.classList.contains('nodalBlock')&&!productCategory.classList.contains('nodalBlock')) {
        
        addBtn.setAttribute("data-bs-dismiss", "modal");
        updateBtn.setAttribute("data-bs-dismiss", "modal");
        formAlert.classList.add('d-none');


    } else {
        formAlert.classList.remove('d-none');
        addBtn.removeAttribute('data-bs-dismiss');
        updateBtn.removeAttribute('data-bs-dismiss');
    }

    console.log(element.classList);
}

function resetFunction() {
    productName.classList.remove('is-valid');
    productName.classList.remove('is-invalid');
    productName.classList.remove('nodalBlock');
    productName.nextElementSibling.classList.add('d-none');
    productPrice.classList.remove('is-valid');
    productPrice.classList.remove('is-invalid');
    productPrice.classList.remove('nodalBlock');
    productPrice.nextElementSibling.classList.add('d-none');
    productCategory.classList.remove('is-valid');
    productCategory.classList.remove('is-invalid');
    productCategory.classList.remove('nodalBlock');
    productCategory.nextElementSibling.classList.add('d-none');
    productDescription.classList.remove('is-valid');
    productDescription.classList.remove('is-invalid');
    productDescription.classList.remove('nodalBlock');
    productDescription.nextElementSibling.classList.add('d-none');
    formAlert.classList.add('d-none');
}


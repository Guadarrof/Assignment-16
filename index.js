const contactName=document.getElementById("userName");
const contactPhoneNum=document.getElementById("phoneNum");
const contactEmail=document.getElementById("userEmail");
const contactBD=document.getElementById("bDate");
const contactCardName=document.getElementById("userCardName");
const message=document.getElementById("popUpText");
const errorPopUp=document.getElementById("popUp");


const btnEdit=document.getElementById("editBtn");
const btnSave=document.getElementById("saveBtn");
const btnDelete=document.getElementById("deleteBtn");
const btnAdd=document.getElementById("addBtn");


function closePopUp(){
    errorPopUp.style.display='none';
}

function openPopUp(){
    errorPopUp.style.display='block'; 
}

document.addEventListener("DOMContentLoaded",closePopUp())

function inputLength(input, minLength, inputName){
    if(input.length<minLength){
        openPopUp();
        message.innerText= `El campo ${inputName} requiere mas de ${minLength} caracteres`;
    }else{
        closePopUp();
        return true
    }
}

function testName(){
    let nameValue=contactName.value;
    let emptyField=nameValue.trim() === "";
    if (emptyField){
        openPopUp();
        message.innerText= `El campo name es requerido`;
    }else{
        let newRegEx= /^[A-Za-záéíóúüñ]{1}[a-záéíóúüñ]+$/
        if(newRegEx.test()){
            return inputLength(nameValue, 4, contactName.name);
        }else{
            openPopUp();
            message.innerText= `El campo name solo puede tener valores alfabeticos`;
        }
    }
}

function testNum(){
    let phoneValue=contactPhoneNum.value;
    let emptyField=phoneValue.trim() === "";
    if (emptyField){
        openPopUp();
        message.innerText= `Este campo phone es requerido`;
    }else{
        return inputLength(phoneValue, 8, contactPhoneNum.name);
    }
}



let contactId= 1
let myContacts=[]

function saveContact(){
    testName();
    testNum();
    if (testName() && testNum()){
        let contact={
            contactId: contactId++,
            contactName: contactName.value,
            contactPhone: contactPhoneNum.value,
            contactBD: contactBD.value,
        }
        if(!myContacts.length){
            myContacts.push("contact")
            localStorage.setItem("contactInfo", JSON.stringify(contact));
        }else{
            myContacts= JSON.parse(localStorage.getItem("contactInfo"));
            myContacts.push("contact");
            localStorage.setItem("contactInfo", JSON.stringify(contact));

        }
    }
}

let mainPageData=document.getElementById("phoneContacts");
let moreData=document.getElementById("userInfo");

myContacts.forEach(contact => {
    let mainText=`<div class="user_group">
    <div class="user_card">
        <h4 class="user__name">${contact.contactName}</h4>
        <a href="./contact.html" class="user__info"> > </a>
    </div>
    <hr>
    </div>`
    mainPageData.appendChild(mainText);

    let moreInfo=
    `<div class="user_inputGroup">
        <label for="userName">Name</label>
        <input class="inputInactive" type="text" id="userName" name="Name" value="${contact.contactName}" disabled>
    </div>
    <div class="user_inputGroup">
        <label for="phoneNum">Phone Number</label>
        <input class="inputInactive" type="number" id="phoneNum" name="Phone" value="${contact.contactPhone}" disabled>
    </div>
    <div class="user_inputGroup">
        <label for="userEmail">E-mail</label>
        <input class="inputInactive" type="email" id="userEmail" name="Email" value="${contact.contactEmail}" disabled>
    </div>
    <div class="user_inputGroup">
        <label for="bDate">Date of birth</label>
        <input class="inputInactive" type="date" id="bDate" name="BDate" value="${contact.contactBD}" disabled>
    </div>`
    moreData.appendChild(moreInfo)
});
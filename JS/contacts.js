const contactName=document.getElementById("userName");
const contactPhoneNum=document.getElementById("phoneNum");
const contactEmail=document.getElementById("userEmail");
const contactBD=document.getElementById("bDate");
const message=document.getElementById("popUpText");
let myContacts=[];
let contactId= 0;
const saveBtn=document.getElementById("saveBtn");
const deleteBtn=document.getElementById("deleteBtn");
const editBtn=document.getElementById("editBtn");
const btn_back=document.getElementById("btn_back");

if (localStorage.getItem("contactInfo") !== null) {   
    myContacts = JSON.parse(localStorage.getItem("contactInfo"));   
} 

// Crear un objeto URLSearchParams con la cadena de consulta de la URL actual
var parametrosURL = new URLSearchParams(window.location.search);

// Obtener el valor de un parámetro específico
contactId = parametrosURL.get('id');
// alert(contactId);
if(contactId!=-1)
{

    var contactoSeleccionado = myContacts.find(function(objeto) {
        return objeto.contactId == contactId;
      });

    
    contactName.value=contactoSeleccionado.contactName;
    contactPhoneNum.value=contactoSeleccionado.contactPhone;
    var fechaActual = new Date(contactoSeleccionado.contactBD);
    contactBD.value=fechaActual.toISOString().split('T')[0];
   
    deshabilitarInputs();
    deleteBtn.style.display = "block";
    editBtn.style.display = "block";
}
else
{
    habilitarInputs();
    saveBtn.removeAttribute("disabled");   
    deleteBtn.style.display = "none";
    editBtn.style.display = "none";
}

document.addEventListener("DOMContentLoaded",closePopUp());
function inputLength(input, minLength, inputName){
    if(input.length<minLength){
        openPopUp();
        message.innerText= `El campo ${inputName} requiere mas de ${minLength} caracteres`;
        return false;
    }else{
        closePopUp();
        return true;
    }
}

function habilitarInputs(){
    let htmlCollectionInput=document.getElementsByClassName("user_input");
    for (let index = 0; index < htmlCollectionInput.length; index++) {
        const element = htmlCollectionInput[index];
        element.removeAttribute("disabled");
    }
}

function deshabilitarInputs(){
    let htmlCollectionInput=document.getElementsByClassName("user_input");
    for (let index = 0; index < htmlCollectionInput.length; index++) {
        const element = htmlCollectionInput[index];
        element.setAttribute("disabled", true);
    }
}

function edit()
{
    habilitarInputs();
    saveBtn.removeAttribute("disabled");
}

function eliminarContacto()
{   
    var nuevoArray = myContacts.filter(function(objeto) {
        return objeto.contactId != contactId;
    });
    myContacts=nuevoArray;
}

function deleteContact()
{
    eliminarContacto();
    localStorage.setItem("contactInfo", JSON.stringify(myContacts));
    btn_back.click();
}

function save(){
    if(contactId!=-1)
    { 
        eliminarContacto();
    }
    saveContact();

}

function testName(){
    let flag=true;
    let nameValue=contactName.value;
    let emptyField=nameValue.trim() === "";
    if (emptyField){
        openPopUp();
        message.innerText= `El campo name es requerido`;
        flag=false;
    }else{
        let newRegEx= /^[A-Za-záéíóúüñ]{1}[a-záéíóúüñ]+$/
        if(newRegEx.test()){
            flag= inputLength(nameValue, 4, contactName.name);
        }else{
            openPopUp();
            message.innerText= `El campo name solo puede tener valores alfabeticos`;
            flag=false;
        }
    }
    return flag;
}

function testNum(){
    let flag=true;
    let phoneValue=contactPhoneNum.value;
    let emptyField=phoneValue.trim() === "";
    if (emptyField){
        openPopUp();
        message.innerText= `Este campo phone es requerido`;
        flag=false;
    }else{
        flag= inputLength(phoneValue, 8, contactPhoneNum.name);
    }
    return flag;
}

function saveContact(){    
   
    if (testName() && testNum()){
       
        contactId=0;
       
        for (var i = 0; i < myContacts.length; i++) {
                var objeto = myContacts[i];
                if(contactId<objeto.contactId)
                {
                    contactId=objeto.contactId;
                }       
            }

        let contact={
            contactId: ++contactId,
            contactName: contactName.value,
            contactPhone: contactPhoneNum.value,
            contactBD: contactBD.value,
        }

       
        myContacts.push(contact)
        localStorage.setItem("contactInfo", JSON.stringify(myContacts));
        

        btn_back.click();
    }
}
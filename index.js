const contactCardName=document.getElementById("userCardName");
const btnAdd=document.getElementById("addBtn");

let contactId= 0;
let myContacts=[];
let mainPageData=document.getElementById("phoneContacts");
let moreData=document.getElementById("userInfo");

if (localStorage.getItem("contactInfo") !== null) {   
    //myConacts e sun Array de objetos
    myContacts = JSON.parse(localStorage.getItem("contactInfo"));
    mostrarContactos();
} 
else{
    let contact={
        contactId: ++contactId,
        contactName: "GUADA",
        contactPhone: "15613-165188",
        contactBD: "04/07/1983",
    }
    myContacts.push(contact);
    localStorage.setItem("contactInfo", JSON.stringify(myContacts));
    mostrarContactos();
}

function mostrarContactos()
{

    myContacts.sort(function(a, b) {
        return a.contactName.localeCompare(b.contactName);
      });


    let contactosConcatenadosHTML="";
    myContacts.forEach(contact => {
        let mainText=`<div class="user_group">
        <div class="user_card">
            <h4 class="user__name">${contact.contactName}</h4>
            <a href="../Html/contact.html?id=${contact.contactId}" class="user__info"> > </a>
        </div>
        <hr>
        </div>`;
        contactosConcatenadosHTML+=mainText;
    })

    mainPageData.innerHTML=contactosConcatenadosHTML;

}
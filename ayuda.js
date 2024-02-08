
//Inicializo mi variable global como un array vacio.
var contactos=[]; 
var nextId=0;


//asocio los btnes con los lso eventos.
var btnGrillaEditCollection =document.getElementsByClassName("btnGrillaEdit");
for (let index = 0; index < btnGrillaEditCollection.length; index++) {
    const element = btnGrillaEditCollection[index];
    element.addEventListener('click',eliminarContacto);
}

//No existe la funcion editarContacto (no alcance)
var btnGrillaDelCollection =document.getElementsByClassName("btnGrillaEditDelete");
for (let index = 0; index < btnGrillaDelCollection.length; index++) {
    const element = btnGrillaDelCollection[index];
    element.addEventListener('click',editarContacto);
}


//Verificar si ya hay una variables CONTACTOS (con contactos logicamente) en LocalStorage

//localStorage.getItem("misContactos") esto lo que hace es intentar obtener
//un objeto por asi decirlo, desde el LOCALSTORAGE, para recorrerlo y 
//armar mi HTML desde javascript que sería mi lista de contactos.

//if(localStorage.getItem("misContactos")!== null) evalua si existe.
//si no encuentra nada con el nombre misContactos devuelve null

if (localStorage.getItem("misContactos") !== null) {
    // La variable misContactos existe en LocalStorage
    var valor = localStorage.getItem("misContactos");
    //esto me imprime en consola el array en bruto.
    console.log("Valor de misContactos:", valor);
    //los descargo y transformo en array de la siguiente forma 
    //por que fueron almacenados como string con la funcion JSON.stringify
    //que esta mas abajo
    contactos = JSON.parse(localStorage.getItem("misContactos"));
    //muestro objeto por objeto. Recorro el array en su forma gracias a JSON.parse
    // Mostrar el array de objetos
    for (var i = 0; i < contactos.length; i++) {
        var objeto = contactos[i];
        console.log('Id:', objeto.ID);
        console.log('NOMBRE:', objeto.NOMBRE);
        console.log('FECHANACIMIENTO:', objeto.FECHANACIMIENTO);
        console.log('EMAIL:', objeto.EMAIL);
        console.log('---'); // Separador entre objetos

        if(nextId<objeto.ID)
        {
            nextId=objeto.ID;
        }
        //cuando salga del LOOP, nextId va a tener el valor mas alto de los IDs almacenados.
        //por lo tanto cdo termino, incremento el nextId en 1
    }
    nextId=nextId+1;

  } else {
    // La variable no existe en LocalStorage
    console.log("misContactos no está en LocalStorage");
    //sino existe, voy a crear un array con datos ficticios para ejemplo y 
    //crear algo en el LS (localStorage)

    contactos = [
        { ID:1,NOMBRE: 'Juan', FECHANACIMIENTO: '1990-05-15', EMAIL: 'juan@example.com' },
        { ID:2,NOMBRE: 'María', FECHANACIMIENTO: '1985-12-10', EMAIL: 'maria@example.com' },
        { ID:3,NOMBRE: 'Carlos', FECHANACIMIENTO: '1995-08-22', EMAIL: 'carlos@example.com' }
      ];

    // Convertir el array a una cadena JSON para poder almacenarla en LS. 
    //Solo lo haces a JSON.stringify cuando es un array. Si es un valor simple, lo guardas directamente.
    var nuevosContactosComoString = JSON.stringify(contactos);

    // Almacenar la cadena en LocalStorage con una clave misContactos
    localStorage.setItem("misContactos", nuevosContactosComoString);
  }

//////////////////////////ACA TERMINA LA SENTENCIA ANTERIOR IF - ELSE///////////////////////////
/////UNA VEZ QUE SE CORRIÓ LO ANTERIOR POR PRIMERA VEZ, VAS A VER QUE
//SE CREO UNA VARIABLE EN EL LS CON EL NOMBRE misContactos..te dejo una imagen donde lo ves en CHROME





////Ahora supongamos que el usuario hizo click apra agregar un nuevo contacto
//cuando ahce click, llama a la funcion addContact

function addContact()
{

    //aca antes de emepzar con el guardado del elemento
    //valido los campos
    //CamposValidos es una funcion que va a validar lo que vos queiras.
    //Como haciamos en el alta producto te acodas? del intergador parte 1.
    //Va a devolver (return true;) si esta todo OK y sino false si algo esta mal
    if(camposValidos())
    {
        //voy a suponer los nombres de los INPUTS.
        var name=document.getElementById("idName");
        var fechaNacimiento=document.getElementById("idfechaNacimiento");
        var email=document.getElementById("idEmail");

        //nextId, es un valor que vas incrementando cada vez que agregas un contacto
        //para que no se pisen los IDs. DEBEN SER UNICOS.
        //cuando cargas los contactos almacenados en LS, tendrías 
        //que obtener la forma de hacerte del ID almacenado mas alto
        //para leugo incrementar en +1 ese valor.
        var nuevoContacto = {       
            ID:nextId,
            NOMBRE: name.value,
            FECHANACIMIENTO: fechaNacimiento.value,
            EMAIL: email.value
        };

        //Ya tenemos nuestro array de contactos en la VARIABLE GLOBAL "contactos" (LINEA 1), VACIO o lo que obtuvimos del LS 
        //al principio de el JS.
        //por lo tanto lo sumo al array, y actualizo mi variable en el LS
        //para simplificar cree una funcion que guarde todo en el array y en el LS.
        guardarContacto(nuevoContacto);       
    }

}

function guardarContacto(contactoRecibido)
{
    //actualizo mi variable global contactos
    contactos.push(contactoRecibido);
    //actualizo el LS
    var nuevosContactosComoString = JSON.stringify(contactos);
    // Almacenar la cadena en LocalStorage con una clave misContactos
    localStorage.setItem("misContactos", nuevosContactosComoString);

    //actualizo el valor de nextId en 1
    nextId=nextId+1;

    //llamo a una funcion que refresque mi lista de contactos
    //no le paso nada por que contactos esta definida al principio del codigo y la puedo acceder desde
    //la funcion.
    recargarContactos();
}

function recargarContactos(){
    //ACA recorres el array y creas tu estructura HTML de contactos
    //dinammicamnete.. Como haciamos antes.
    //Si fuesen <p>, haria algo asi como ejemplo (aca hay que ver TU estructura HTML)

    var htmlCollection="";
    for (var i = 0; i < contactos.length; i++) {
        var objeto = contactos[i];
        
        
        let unContacto=`<p id="${objeto.ID}"> NOMBRE: ${objeto.NOMBRE}, 
        Fecha de Nacimiento: ${objeto.FECHANACIMIENTO}, email: ${objeto.EMAIL} 
        <button class="btnGrillaEdit" value="${objeto.ID}">Editar</button>
        <button class="btnGrillaEditDelete" value="${objeto.ID}">Borrar</button>
        </p>`;
        htmlCollection=htmlCollection.concat(unContacto);

        //ejemplo del <p> creado en unContacto
        //<p id=1>
        //    Nombre:Enzo, Fecha de Nacimiento: xx/xx/xxxx email: ferar@gm...
        //  
        //</p>
    }

    //supongamos que un div contiene todo esto:
    var miDivContenedor= document.getElementById("idDivContenedor");
    miDivContenedor.innerHTML=htmlCollection;
}


// Cada contacto va a tener dos botones quizas o lo que elijas si?
// vas cuando crees dinamicamente el HTML de contactos
//a cada boton, vas a tener que hacerle el addEventListener de la funcion eliminarContacto
//puede ser una etiqueta <i>.. etc.
function eliminarContacto(e)
{
    //recupero la etiqueta value que tiene el ID del contacto que voy a eliminar
    //lo hago con event "e". No lo explico marcos, pero no se como se le ocurre que lo iban hacer.
    let reciboUnIdUNICO=e.target.value;

    //Aca es cuando usas el "e" de evento apra recuperar 
    // Filtrar el array para obtener un nuevo array sin el objeto a eliminar
    // FILTER devuelve un array nuevo sin ese objeto.si?
    //por que dentro de filter va function(objeto)? 
    //Rta CHAT GPT: En el método filter, la función que se proporciona como argumento es una función de 
    //filtrado que se aplica a cada elemento del array. La función recibe 
    //un parámetro (en este caso, llamado objeto) que representa cada elemento del array que está siendo evaluado.
    var nuevoArray = contactos.filter(function(objeto) {
        return objeto.ID !== reciboUnIdUNICO;
    });
    
    //como nuevoArray contiene lo mismo que contactos menos el valor filtrado
    //debemos actualizar la variable (array contactos) y actualziar LS
    contactos=nuevoArray;

    //actualizo el LS
    var nuevosContactosComoString = JSON.stringify(contactos);
    // Almacenar la cadena en LocalStorage con una clave misContactos
    localStorage.setItem("misContactos", nuevosContactosComoString);

    //llamo a recargar los contactos xq ahora eliminé 1 contacto.
    recargarContactos();   
}

 //Cuando eliminas un CONTACTO, no te importa actualizar nada de del valor nextId
// por que? supongamos que tenemos los siguientes contactos.

// ID 1 Nombre Enzo
// ID 2 Nombre Pedro
// ID 3 Nombre Juan
// ID 4 Nombre Enzo

//en este momento nextId tiene el valor de 5

//si yo borro el ID 3 obtengo:
// ID 1 Nombre Enzo
// ID 2 Nombre Pedro
// ID 4 Nombre Enzo

//por lo tanto ya no impota el valor ID 3, sino sigo gaurdando para arriba numericamente
// apra no pisar ningun valor de ID. de esa forma me garantizo no repetir IDs.
//En bases de datos, estos IDs se incrementan autoamticamente cdo guardas un registro.
//Vos no te ocupas de eso en Bases de Datos. ACA SI xq estamos usando de "base de datos"
//el LS y no lo es.. si?


import Cookies from 'universal-cookie'
import swal from 'sweetalert';

// importacion de la libreria sha256
var sha256 = require('js-sha256');

// cookies
const cookies = new Cookies();


// plantillas para alertas
const mostrarAlerta=(titulo,mensaje,icono)=>{
    swal({
        title:""+titulo,
        text:""+mensaje,
        icon:""+icono,
        button:"Aceptar"
    })
}


// funcion para verificion del inicio de session 
async function session(usuario,password){

    var url = 'http://localhost:4000/login';

    var data = {username:''+usuario,password:''+sha256(password)}

    let respuesta;

    await fetch(url,{
        method:'POST',
        body: JSON.stringify(data)
        }).then(Response=>Response.json())
        .then(function(jsons){            
            console.log(jsons);
            respuesta = jsons;
        })
        .catch(error =>  {
            console.error('Error',error);
        })
    // 
    // console.log(usuario);
    // console.log(password);
    return respuesta;
}

export default session;
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
            // console.log(Response);
            // //   
            // if(Response.TIPO==0)
            // {
            //     mostrarAlerta("ERROR","Usuario no Encontrado","error"); 
            //     // alert("Usuario No encontrado");                 
            // }
            // else{
            //     var resultado = Response[0];
            //     console.log(resultado);
            //     cookies.set('id_usuario',resultado.ID,{path:"/"});
            //     cookies.set('username',resultado.USERNAME,{path:"/"});
            //     cookies.set('nombre_usuario',resultado.NOMBRE,{path:"/"});
            //     // cookies.set('foto_perfil',resultado.FOTO_PERFIL,{path:"/"}); 
            //     cookies.set('tipo_usuario',resultado.TIPO,{path:"/"});                               
            //     // alert(`Bienvenido ${resultado.ID} ${resultado.USERNAME} ${resultado.NOMBRE}`);
            //     window.location.href="./perfil";
            // }
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
import Cookies from 'universal-cookie'

// importacion de la libreria sha256
var sha256 = require('js-sha256');

// cookies
const cookies = new Cookies();


// funcion para verificion del inicio de session 
async function session(usuario,password){

    var url = 'http://localhost:4000/login';

    var data = {username:''+usuario,password:''+sha256(password)}
    fetch(url,{
        method:'POST',
        body: JSON.stringify(data)
        }).then(res=>res.json())
        .then(Response => {
            console.log(Response);
            //   
            if(Response.TIPO==0)
            {
                alert("Usuario No encontrado");                 
            }
            else{
                var resultado = Response[0];
                console.log(resultado);
                cookies.set('id_usuario',resultado.ID,{path:"/"});
                cookies.set('username',resultado.USERNAME,{path:"/"});
                cookies.set('nombre_usuario',resultado.NOMBRE,{path:"/"});
                cookies.set('tipo_usuario',resultado.TIPO,{path:"/"});                
                // alert(`Bienvenido ${resultado.ID} ${resultado.USERNAME} ${resultado.NOMBRE}`);
                window.location.href="./perfil";
            }
        })
        .catch(error =>  {
            console.error('Error',error);
        })
    // 
    // console.log(usuario);
    // console.log(password);
}

export default session;


// importacion de la libreria sha256
var sha256 = require('js-sha256');

// para verificar conexion
async function consultarUsuario(usuario,password){

    var url = 'http://localhost:4000/login';

    var data = {username:''+usuario,password:''+sha256(password)}

    console.log(data);

    let respueta;

    await fetch(url,{
        method:'POST',
        body: JSON.stringify(data)
    })
    .then (Response => Response.json())
    .then(function(jsons){
        console.log(jsons);
        respueta = jsons;
    })
    .catch(error =>{
        console.error('Error: ',error)
    })
    return respueta;
}

export default consultarUsuario;


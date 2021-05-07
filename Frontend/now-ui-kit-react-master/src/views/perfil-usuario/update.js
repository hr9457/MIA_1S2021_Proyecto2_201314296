
// importacion de la libreria sha256
var sha256 = require('js-sha256');

// para verificar conexion
async function updateUsuario(username,nombre,apellido,fecha_nacimiento,correo,password){

    var url = 'http://localhost:4000/actualizar_datos';

    let respuesta

    console.log(password);

    var data = {
        username:''+username,
        nombre:''+nombre,
        apellido:''+apellido,
        fecha_nacimiento:''+fecha_nacimiento,
        correo:''+correo,
        password:''+sha256(password)
    }

    console.log(data);

    await fetch(url,{
        method:'POST',
        body: JSON.stringify(data)
    })
    .then(Response => Response.json())
    .then(function(josns){
        console.log(josns)
        respuesta= josns
    })
    .catch(error =>{
        console.error('Error: ',error);
    })

    return respuesta;
}

export default updateUsuario;
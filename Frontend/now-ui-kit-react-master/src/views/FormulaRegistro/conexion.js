
import Cookies from 'universal-cookie'

// importacion de la libreria sha256
var sha256 = require('js-sha256');

// cookies
const cookies = new Cookies();

// fecha
// const fecha = new Date();


async function conexion(username,nombre,apellido,fecha_nacimiento,
    fecha_registro,correo,foto_perfil,password){

    var url = 'http://localhost:4000/registro_usuario'

    var data = {username:''+username,nombre:''+nombre,apellido:''+apellido,
    fecha_nacimiento:''+fecha_nacimiento+' 00:00:00',fecha_registro:''+fecha_registro,
    correo:''+correo,foto_perfil:''+foto_perfil,password:''+sha256(password)}

    fetch(url,{
        method:'POST',
        body: JSON.stringify(data)
    })
    .then(res=>res.json())
    .then(Response=>{

    })
    .catch(error=>{
        console.error('Error',error)
        console.log('Error',error)
    })

}

export default conexion;
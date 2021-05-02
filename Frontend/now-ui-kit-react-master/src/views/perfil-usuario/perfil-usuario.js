import React,{useState,useEffect} from 'react';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

import obtenerFoto from 'views/perfil-usuario/ObtenerImagen.js'

import Cookies from 'universal-cookie';

const cookies = new Cookies();

function cerrrarSession(){
    cookies.remove('id_usuario',{path:"/"});
    cookies.remove('username',{path:"/"});
    cookies.remove('nombre_usuario',{path:"/"});
    cookies.remove('tipo_usuario',{path:"/"});
    // cookies.remove('foto_perfil',{path:"/"})
    window.location.href="./login-page";
}



// pagina de usuario perfil de administrador
function ProfileUsser(){

    // imagen
    const[user,setUser] = useState({});



    useEffect( async () => {
        let url = 'http://localhost:4000/image_perfil'
        var data = {username:'Hektor_Orozco'}

        let respuesta;

        await fetch(url,{
            method:'POST',
            body:JSON.stringify(data)
        })
        .then(Response => Response.json())
        .then(function(jsons){
            // console.log(jsons);
            setUser(jsons);
        })

    },[]);


    // retorno de la pagina
    return(
        // contenedor principal
        <div>

            {/* navbar principal */}
            <div>
                <nav class="navbar navbar-dark bg-primary">
                    <a href="#"><h2>Perfil</h2> </a>
                    <a href="#" onClick={cerrrarSession}><h2>Salir</h2> </a>                            
                </nav>              
            </div>    

            {/* infromacion principal */}
            <div>
                <Row>
                    <Col md="3"> 
                        <img src={user.FOTO_PERFIL} />                       
                    </Col>
                    <Col md ="5">
                        <h1 className="display-1">{cookies.get('username')}</h1>
                        <h2>Nombre : { cookies.get('nombre_usuario')}</h2>
                    </Col>  
                </Row> 
            </div>          

        </div>
    );
}

export default ProfileUsser;
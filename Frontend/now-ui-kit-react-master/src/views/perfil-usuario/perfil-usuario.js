import React,{useState,useEffect} from 'react';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';

import obtenerFoto from 'views/perfil-usuario/ObtenerImagen.js'

import Cookies from 'universal-cookie';
import Navbar from 'reactstrap/lib/Navbar';
import Container from 'reactstrap/lib/Container';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';

const cookies = new Cookies();

function cerrrarSession(){
    cookies.remove('id_usuario',{path:"/"});
    cookies.remove('username',{path:"/"});
    cookies.remove('nombre_usuario',{path:"/"});
    cookies.remove('tipo_usuario',{path:"/"});
    // cookies.remove('foto_perfil',{path:"/"})
    window.location.href="./login-page";
}

// redireccon para ediccion de informacion de usuario
function editProfile(){
    window.location.href="./editar_profiel";
}



// pagina de usuario perfil de administrador
function ProfileUsser(){

    // imagen
    const[user,setUser] = useState({});



    useEffect( async () => {
        let url = 'http://localhost:4000/image_perfil'
        var data = {username:cookies.get('username')}

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
        <div  style={{backgroundColor:'#ECF0F1'}}>

            {/* navbar principal */}
            <Navbar className="bg-info" expand="lg">
                <Container>
                <div className="navbar-translate">
                    <NavbarBrand target="_blank" id="navbar-brand">
                        <h4>QUINIELA APP</h4>
                    </NavbarBrand>
                    
                    <Button color="info" size="lg" onClick={editProfile}>
                        <i class="now-ui-icons users_circle-08"></i>
                        Perfil
                    </Button>
                    <Button color="info" size="lg" onClick={cerrrarSession}>
                        <i className="now-ui-icons objects_key-25"></i>
                        salir
                    </Button>
                </div>
                </Container>
            </Navbar>  

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
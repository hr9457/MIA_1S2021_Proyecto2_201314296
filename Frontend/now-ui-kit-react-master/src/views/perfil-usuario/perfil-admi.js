import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from 'reactstrap/lib/Button';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Nav from 'reactstrap/lib/Nav';
import Navbar from 'reactstrap/lib/Navbar';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';
import NavItem from 'reactstrap/lib/NavItem';
import Row from 'reactstrap/lib/Row';
import UncontrolledCollapse from 'reactstrap/lib/UncontrolledCollapse';

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
function ProfileAdmi(){


    // retorno de la pagina
    return(
        // contenedor principal
        <div>

            {/* navbar principal */}
            <div>
                <nav class="navbar navbar-dark bg-dark">
                    <a href="#"><h2>Perfil</h2> </a>
                    <a href="#" onClick={cerrrarSession}><h2>Salir</h2> </a>                            
                </nav>              
            </div>    

            {/* infromacion principal */}
            <div>
                <Row>
                    <Col md="2">
                        <h3>imagen</h3>                        
                    </Col>  
                    <Col md="5">
                        <h3>{cookies.get('username')}</h3>
                    </Col>  
                </Row> 
            </div>        

            <br/>
            <br/>
            <br/>
            {/* acciones */}
            <div>
                <Row>
                    <Col md="3">
                        <h1>Carga Masiva</h1>
                    </Col>
                    <Col>
                        <Button color="info" size="lg">Cargar</Button>
                    </Col>
                </Row>
            </div>

        </div>
    );
}

export default ProfileAdmi;
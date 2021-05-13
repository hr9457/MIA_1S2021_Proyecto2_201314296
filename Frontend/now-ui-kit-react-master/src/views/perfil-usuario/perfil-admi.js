import DefaultFooter from 'components/Footers/DefaultFooter';
import React,{useState,useEffect} from 'react';
import Button from 'reactstrap/lib/Button';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardImg from 'reactstrap/lib/CardImg';
import CardTitle from 'reactstrap/lib/CardTitle';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Navbar from 'reactstrap/lib/Navbar';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';
import Row from 'reactstrap/lib/Row';

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

// function para redigir hacia la carga masiva
function Administracion(){
    window.location.href="./administracion";  
}




// pagina de usuario perfil de administrador
function ProfileAdmi(){


    // retorno de la pagina
    return(
        // contenedor principal
        <div style={{backgroundColor:'#ECF0F1'}}>
            {/* barra de navegacion para el administrador */}
            <Navbar className="bg-info"  expand="lg">
                <Container>
                <div className="navbar-translate">
                    <NavbarBrand target="_blank" id="navbar-brand">
                        ADMINISTRACION 
                    </NavbarBrand>
                    <button className="navbar-toggler navbar-toggler"></button>
                    <Button color="info" size="sm">Estadisticas</Button>
                    <Button color="info" size="sm" onClick={Administracion}>Administracion</Button>
                    <Button color="info" size="sm" onClick={cerrrarSession}>Salir</Button>
                </div>
                </Container>
            </Navbar>

            

            {/* infromacion principal */}
            <div>
                <Row>
                    <Col md="4">
                        <Card>
                            <CardImg></CardImg>
                            <CardBody>
                                <CardTitle tag="h3">{`Usuario: ${cookies.get('username')}`}</CardTitle>
                            </CardBody>
                        </Card>                        
                    </Col>
                </Row>
            </div>        

            <br/>
            <br/>
            <br/>

            {/* tarjetas de presentacion principal */}
            <div>
                <Row>
                    <Col md="4"></Col>
                    <Col md="4">
                        <Card className="text-center" style={{backgroundColor: '#1F618D', borderColor: '#1C2833' }}>
                            <CardHeader tag="h1" style={{color:'#FBFCFC',fontFamily:'monospace'}}>Capital Actual</CardHeader>
                            <CardBody>
                                <h3 style={{color:'#FBFCFC'}}>Temporada Q3</h3>
                                <h3 style={{color:'#FBFCFC'}}>$10000</h3>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card style={{backgroundColor: '#9A7D0A', borderColor: '#1C2833' }}>
                            <CardTitle tag="h1" style={{color:'#FBFCFC',fontFamily:'monospace'}}>Bronce</CardTitle>
                            <CardBody>
                                <h3 style={{color:'#FBFCFC'}}>Participantes</h3>
                                <h3 style={{color:'#FBFCFC'}}>300</h3>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{backgroundColor: '#A6ACAF', borderColor: '#1C2833' }}>
                            <CardTitle tag="h1" style={{color:'#FBFCFC',fontFamily:'monospace'}}>Silver</CardTitle>
                            <CardBody>
                                <h3 style={{color:'#FBFCFC'}}>Participantes</h3>
                                <h3 style={{color:'#FBFCFC'}}>300</h3>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{backgroundColor: '#EFB810', borderColor: '#1C2833' }}>
                            <CardTitle tag="h1" style={{color:'#FBFCFC',fontFamily:'monospace'}}>Gold</CardTitle>
                            <CardBody>
                                <h3 style={{color:'#FBFCFC'}}>Participantes</h3>
                                <h3 style={{color:'#FBFCFC'}}>300</h3>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>


            <br/>
            <br/>
            <br/>

            {/* acciones */}
            <div>
                <DefaultFooter></DefaultFooter>
            </div>

        </div>
    );
}

export default ProfileAdmi;
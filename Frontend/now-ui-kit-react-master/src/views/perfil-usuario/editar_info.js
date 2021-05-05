import DefaultFooter from 'components/Footers/DefaultFooter';
import React from 'react';
import Button from 'reactstrap/lib/Button';
import Card from 'reactstrap/lib/Card';
import CardTitle from 'reactstrap/lib/CardTitle';
import Col from 'reactstrap/lib/Col';
import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Row from 'reactstrap/lib/Row';

import Cookies from 'universal-cookie';
var sha256 = require('js-sha256');

const cookies = new Cookies();


function FormularioEdit(){


    // para guardar datos para actualizacion
    const [datos,setDatos] = React.useState({
        nombre:'',
        password:''
    })

    const handleInputChange = (event) =>{
        console.log(event.target.value);
    }

    function evitarEnvio(event){
        event.preventDefault();
    }

    function back(){
        window.location.href="./perfil-usuario"; 
    }



    return(
        <div style={{backgroundColor:'#ECF0F1'}}>
            <Row>
                <Col md="12">
                    <Card className="text-center">
                        <CardTitle tag="h1">Perfil de Usuario</CardTitle>
                    </Card>
                </Col>
            </Row>

           <div style={{backgroundColor:'white'}}>
               <Row>
                   <Col xs="4"></Col>
                    <Col xs="5">
                        <h2>Datos de Usuario</h2>
                        <Form>
                            <FormGroup>
                                <label>Username</label>
                                <label>{`: ${cookies.get('username')}`}</label>
                                <Input type="text" name="nombre" onChange={handleInputChange}></Input>
                            </FormGroup>
                            <FormGroup>
                                <label>Nombre</label>
                                <label>{`: ${cookies.get('nombre_usuario')}`}</label>
                                <Input type="text"></Input>
                            </FormGroup>
                            <FormGroup>
                                <label>Apellido</label>
                                <label>{`: ${cookies.get('apellido_usuario')}`}</label>
                                <Input type="text"></Input>
                            </FormGroup>
                            <FormGroup>
                                <label>Correo Electronico</label>
                                <label>{`: ${cookies.get('correo_electronico')}`}</label>
                                <Input type="text"></Input>
                            </FormGroup>
                            <FormGroup>
                                <label>Password</label>
                                <Input type="text"></Input>
                            </FormGroup>
                            <FormGroup>
                                <label>Fecha Nacimiento</label>
                                <Label>{`: ${cookies.get('fecha_nacimiento')}`}</Label>
                                <Input type="text"></Input>
                            </FormGroup>
                            <FormGroup>
                                <Button color="info" size="lg">Modificar</Button>
                                <Button color="danger" size="lg" onClick={back}>Salir</Button>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
           </div>

            <div>
                <DefaultFooter></DefaultFooter>
            </div>

            
        </div>
    );
}


export default FormularioEdit;
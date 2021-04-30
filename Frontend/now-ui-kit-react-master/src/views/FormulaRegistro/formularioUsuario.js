import React, { useState }  from "react";

import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Datetime from 'react-datetime';
import InputGroup from 'reactstrap/lib/InputGroup';
import InputGroupAddon from 'reactstrap/lib/InputGroupAddon';
import InputGroupText from 'reactstrap/lib/InputGroupText';
import Row from 'reactstrap/lib/Row';
import swal from 'sweetalert';
import {FilePicker} from 'react-file-picker';
import {ImagePicker} from 'react-file-picker'


import conexion from 'views/FormulaRegistro/conexion.js'




function Registro(){

    // alertas
    const mostrarAlerta=(titulo,mensaje,icono)=>{
        swal({
            title:""+titulo,
            text:""+mensaje,
            icon:""+icono,
            button:"Aceptar"
        })
    }

    // estructura para almacenar los datos
    const [datos,setDatos] = React.useState({
        username:'',
        nombre:'',
        apellido:'',
        fecha_nacimiento:'',
        fecha_registro:'',
        correo:'',
        foto_perfil:'',
        password:''
    });

    // // // evento para almacenar los datos
    const handleInputChange = (event) =>{
        console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }


    function evitarEnvio(event){
        event.preventDefault();
    }

    // evento del boton para enviar datos
    const enviarDatos =  async (event) => {
        // console.log("enviando datos")
        // event.preventDefault();
        // event.preventDefault();

        // validacion de campos vacios en el formulario
        if(datos.username === '' || datos.nombre === '' 
        || datos.apellido === '' || datos.fecha_nacimiento === ''
        || datos.correo === '' || datos.password === '' || datos.foto_perfil === '' ){
            mostrarAlerta("ERROR","Faltan datos...","error"); 
            return;
        }

        var respuesta = await conexion(datos.username,datos.nombre,datos.apellido,datos.fecha_nacimiento,datos.fecha_registro,datos.correo,datos.foto_perfil,datos.password);    
        
        alert("2")
        
        
        // alert("333")
        // console.log(respuesta);
        // alert("1")

        // verificacon de la respuesta de go
        if(respuesta.TIPO === 0 ){
            mostrarAlerta("ERROR","No se ha podido registrar el usuario","error");
        }
        else if (respuesta.TIPO === 1){
            mostrarAlerta("REGISTRO","Se ha registrado el usuario correctamente","success");  
        } else {
            mostrarAlerta("ERROR","No se ha podido registrar el usuario","error"); 
            // alert("Error")
        }
        
    }

   


    // return de la pagina del formulario de registro
    return(
        <>
        <div style={{ backgroundColor: '#6A959D' }}>
            <Container> 
                <Col className="ml-auto mr-auto" md="7">
                    <Card style={{  width: "40rem",backgroundColor: '#E8F1F2'}}>
                        <CardBody>
                            <CardTitle tag="h2">Formulario de Registro</CardTitle>
                                <Form onSubmit={evitarEnvio}>

                                    {/* entrada para  username */}
                                    <FormGroup>
                                        <label htmlFor="exampleInputPassword1">Username</label>
                                            <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons tech_controller-modern"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input 
                                            placeholder="Username de Usuario" 
                                            type="text"
                                            name="username"
                                            // funcion para captura de datos 
                                            onChange = {handleInputChange} 
                                            // //  
                                            // onFocus={() => setFirstFocus(true)}
                                            // onBlur={() => setFirstFocus(false)}
                                            ></Input>
                                            </InputGroup>                                            
                                    </FormGroup>

                                    {/* entrada para  NOmbre de suario*/}
                                    <FormGroup>
                                        <label htmlFor="exampleInputPassword1">Nombre</label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons emoticons_satisfied"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                            placeholder="Nombre..."
                                            type="text"
                                            name="nombre"
                                            // funcion para captura de datos 
                                            onChange = {handleInputChange} 
                                            ></Input>
                                            </InputGroup>                                        
                                    </FormGroup>


                                    {/* entrada para Apellido de usuario */}
                                    <FormGroup>
                                        <label htmlFor="exampleInputPassword1">Apellido</label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons emoticons_satisfied"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                            placeholder="Apellido..."
                                            type="text"
                                            name="apellido"
                                            // funcion para captura de datos 
                                            onChange = {handleInputChange} 
                                            ></Input>
                                            </InputGroup>                                         
                                    </FormGroup>

                                    <br/>

                                    {/* fecha de nacimiento */}
                                    {/* <Datetime
                                    inputProps={{ placeholder: "Ingrese su fecha de nacimiento" }}
                                    name="fecha_nacimiento"
                                    // funcion para captura de datos 
                                    onChange = {handleInputChange} 
                                    /> */}

                                    <br></br>

                                    {/* entrada para  fecha de registor*/}
                                    <FormGroup>
                                        <label htmlFor="exampleInputPassword1">Fecha Nacimiento</label>
                                        <Input
                                            placeholder="Username"
                                            type="date"
                                            name="fecha_nacimiento"
                                            onChange = {handleInputChange}
                                        ></Input>
                                    </FormGroup>
                                                        

                                    {/* correo electronico  */}
                                    <FormGroup>
                                        <label htmlFor="exampleInputEmail1">Email address</label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons ui-1_email-85"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                            // aria-describedby="emailHelp"
                                            // id="exampleInputEmail1"
                                            placeholder="Ingrese su Email"
                                            type="text"
                                            name="correo"
                                            // funcion para captura de datos 
                                            onChange = {handleInputChange} 
                                            ></Input>
                                            </InputGroup> 
                                        
                                    <FormText className="text-muted" color="default" id="emailHelp">
                                        We'll never share your email with anyone else.
                                    </FormText>
                                    </FormGroup>


                                    
                                    {/*  */}
                                    <FormGroup>
                                        <label htmlFor="exampleInputPassword1">Password</label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons loader_gear"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                            id="exampleInputPassword1"
                                            placeholder="Password"
                                            type="password"
                                            name="password"
                                            // funcion para captura de datos 
                                            onChange = {handleInputChange} 
                                            ></Input>
                                            </InputGroup>                                         
                                    </FormGroup>


                                    {/* entrada para  perfil*/}
                                    {/* <FormGroup>
                                        <label htmlFor="exampleInputPassword1">Foto Perfil</label>
                                        <InputGroup>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="now-ui-icons emoticons_satisfied"></i>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input
                                            placeholder="Foto de Perfil"
                                            type="text"
                                            name="foto_perfil"
                                            // funcion para captura de datos 
                                            onChange = {handleInputChange} 
                                            ></Input>
                                            </InputGroup>                                         
                                    </FormGroup> */}
                                    <br/>
                                    <ImagePicker
                                        name="foto_perfil"
                                        extensions={['png']}
                                        dims={{minWidth: 100, maxWidth: 500, minHeight: 100, maxHeight: 500}}
                                        onChange={ base64 => datos.foto_perfil = base64}
                                        onError = {errMsg => mostrarAlerta("ERROR","No se ha podido cargar la imagen","error") }
                                        >
                                        <Button color="info" size="lg">
                                            Click para subir la imagen
                                        </Button>
                                    </ImagePicker>

                                    
                                    <Button 
                                    color="primary" 
                                    type="submit" 
                                    onClick={enviarDatos}>
                                        REGISTRAR
                                    </Button>

                                </Form>
                        </CardBody>            
                    </Card>
                </Col>
            </Container>
      </div>
      
      </>
          
    );
}


export default Registro;
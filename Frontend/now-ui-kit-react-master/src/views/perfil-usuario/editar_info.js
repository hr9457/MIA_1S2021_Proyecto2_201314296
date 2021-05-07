import DefaultFooter from 'components/Footers/DefaultFooter';
import React,{useState} from 'react';
import Button from 'reactstrap/lib/Button';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardTitle from 'reactstrap/lib/CardTitle';
import Col from 'reactstrap/lib/Col';
import Form from 'reactstrap/lib/Form';
import FormGroup from 'reactstrap/lib/FormGroup';
import Input from 'reactstrap/lib/Input';
import Label from 'reactstrap/lib/Label';
import Row from 'reactstrap/lib/Row';

import VerificarUsuario from 'views/perfil-usuario/consultas.js'
import actualizar  from 'views/perfil-usuario/update.js'
import swal from 'sweetalert';

import Cookies from 'universal-cookie';
var sha256 = require('js-sha256');


const cookies = new Cookies();


function FormularioEdit(){

    // alertar
    // funcion para mostrar alertas
    const mostrarAlerta=(titulo,mensaje,icono)=>{
        swal({
            title:""+titulo,
            text:""+mensaje,
            icon:""+icono,
            button:"Aceptar"
        })
    }

    // estado de los input
    const [estado,setEstado] = useState(false);

    
    // para guardar datos para actualizacion
    const [datos,setDatos] = React.useState({
        username            :cookies.get('username'),
        nombre              :cookies.get('nombre_usuario'),
        apellido            :cookies.get('apellido_usuario'),
        correo              :cookies.get('correo_electronico'),
        password            : '',
        fecha_nacimiento    :cookies.get('fecha_nacimiento'),
        passwordOLD         :''
    })

    // evento para almacenar los datos
  const handleInputChange = (event) => {
    console.log(event.target.value)
    setDatos({
      ...datos,
      [event.target.name] : event.target.value
    })
  }


    // consultar para habilitar los campos
    const habilitarCampos = async (event) =>{
        let respuesta = await VerificarUsuario(cookies.get('username'),datos.passwordOLD);
        if(respuesta[0].TIPO === 0)
        {
            mostrarAlerta("ERROR","Usuario no Encontrado","error"); 
            return;
        }
        // usuario encontrado
        if(respuesta[0].TIPO === 2)
        { 
            setEstado(true);
            return;
        }
    }


    function evitarEnvio(event){
        event.preventDefault();
    }

    function back(){
        window.location.href="./perfil-usuario"; 
    }


    // funcion para actualizar datos
    const actualizarDatos =  async () =>{
        let usr = cookies.get('username');
        // console.log(usr);
        let respuestaActualizacion = await actualizar(datos.username,datos.nombre,datos.apellido,datos.fecha_nacimiento,datos.correo,datos.passwordOLD);
        if(respuestaActualizacion.TIPO === 0){
            mostrarAlerta("ERROR","No se ha podido actualizar","error");
        } else if (respuestaActualizacion.TIPO === 1 ){
            mostrarAlerta("ACTUALIZACION","Datos actualizados","success");
        } else {
            mostrarAlerta("ERROR","No se ha podido actualizar","error");
        }
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

            <div>
                <Row>
                    <Col md="3"></Col>
                    <Col md="6">
                        <Card className="text-center">
                            <CardTitle tag="h2">Habilitar Campos</CardTitle>
                            <CardBody>
                                <label>Password</label>
                                <Input type="text" class="form-control" name="passwordOLD" onChange={handleInputChange}></Input>                              
                                <Button color="success" size="lg" onClick={habilitarCampos}>Habilitar</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>

           <div style={{backgroundColor:'white'}}>
               <Row>
                   <Col xs="4"></Col>
                    <Col xs="5">
                        <h2>Datos de Usuario</h2>
                        <Form onSubmit={evitarEnvio}>
                            <FormGroup>
                                <label>Username</label>
                                <Input type="text" name="username" value={datos.username} onChange={handleInputChange} disabled></Input>
                            </FormGroup>
                            <FormGroup>
                                <label>Nombre</label>
                                <Input type="text" name="nombre" value={datos.nombre} onChange={handleInputChange}  disabled={!estado}></Input>
                            </FormGroup>
                            <FormGroup>
                                <label>Apellido</label>
                                <Input type="text" name="apellido" value={datos.apellido} onChange={handleInputChange}  disabled={!estado}></Input>
                            </FormGroup>
                            <FormGroup>
                                <label>Correo Electronico</label>
                                <Input type="text" name="correo" value={datos.correo} onChange={handleInputChange}  disabled={!estado}></Input>
                            </FormGroup>
                            <FormGroup>
                                <label>Password</label>
                                <Input type="text" name="password" value={datos.passwordOLD} onChange={handleInputChange}  disabled={!estado}></Input>
                            </FormGroup>
                            <FormGroup>
                                <label>Fecha Nacimiento</label>
                                <Input type="date" name="fecha_nacimiento" value={datos.fecha_nacimiento} onChange={handleInputChange} disabled={!estado}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Button color="info" size="lg" disabled={!estado} onClick={actualizarDatos}>Modificar</Button>
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
import React,{useState,useEffect} from 'react';
import Button from 'reactstrap/lib/Button';
import CardBody from 'reactstrap/lib/CardBody';
import CardHeader from 'reactstrap/lib/CardHeader';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';



var sha256 = require('js-sha256');


const cookies = new Cookies();


function Actualizar(){


    const[datos,setDatos] = useState({
        pass1:'',
        pass2:''
    })

    // funcion para capturar los datos
    const handleInputChange = (event) =>{
        console.log(event.target.value);
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }


    // alertar para aviso al usuario
    const mostrarAlerta=(titulo,mensaje,icono)=>{
        swal({
            title:""+titulo,
            text:""+mensaje,
            icon:""+icono,
            button:"Aceptar"
        })
    }


    // peticion post para enviar datos
    const peticionPost = async()=>{
        let respuesta;

        if(datos.pass1 != datos.pass2){
            mostrarAlerta('Aviso','password con coniciden','error');
            return;
        }

        // actualizar password
        const url = "http://localhost:4000/actualizar_password";
        console.log(cookies.get('username'));
        let data={Username:cookies.get('username'),password:''+sha256(datos.pass2)}
        
        await fetch(url,{
            method:'POST',
            body: JSON.stringify(data)
        })
        .then(Response => Response.json())
        .then(function(jsons){
            console.log(jsons)
            respuesta = jsons;
        })
        .catch(error =>{
            console.error('Error: ',error)
        })
        // redireccion a la respueta
        if (respuesta.TIPO === 1 ){
            // ELIMIANDO DATOS DE LAS COOKIES
            mostrarAlerta('Aviso','Datos actualizados','sucess');
            cookies.remove('username',{path:"/"});
            cookies.remove('correo',{path:"/"});
            window.location.href="./login-page";
        }
        console.log(respuesta);

    }



    return(
        <div>
            <h1>Datos</h1>
            <Row>
                <Col md="3"></Col>
                <Col md="5">
                    <CardHeader tag="h1">Nuevo Password</CardHeader>
                    <CardBody>
                        <label>Ingrese su nuevo password</label>
                        <br/>
                        <input id="password" name="pass1" onChange={handleInputChange}></input>
                        <br/>
                        <label>Confirme su password</label>
                        <br/>
                        <input id="password2" name="pass2" onChange={handleInputChange}></input>
                        <br/>
                        <Button color="info" onClick={peticionPost}>Cambiar</Button>
                    </CardBody>
                </Col>
            </Row>
        </div>
    );
}


export default Actualizar;
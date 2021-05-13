import { Card, responsiveFontSizes } from '@material-ui/core';
import React,{useState,useEffect} from 'react';
import Button from 'reactstrap/lib/Button';
import CardBody from 'reactstrap/lib/CardBody';
import CardHeader from 'reactstrap/lib/CardHeader';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import Cookies from 'universal-cookie';
import swal from 'sweetalert';
import axios from 'axios';


// cookies para tener informaicon del usuario
const cookies = new Cookies();




function Password(){

    // estructura de los datos
    const [datos,setDatos] = useState({
        user:''
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


    const peticionPost = async()=>{
        const url = "http://localhost:4000/recuperar-password";
        var data = {username:''+datos.user}
        let respueta;
        await fetch(url,{
            method:'POST',
            body: JSON.stringify(data)
        })
        .then(Response => Response.json())
        .then(function(jsons){
            // console.log(jsons)
            respueta = jsons;
        })
        .catch(error =>{
            console.error('Error: ',error)
        })

        // maniupacion
        // console.log(respueta)
        if (respueta[0].Correo === ""){
            mostrarAlerta('Aviso','usuario no encontrado','error');
        } else {
            let correo = respueta[0].Correo;
            mostrarAlerta('Aviso','email enviado a: '+correo,'sucess');
            // inseto en la cookies
            cookies.set('username',respueta[0].Username,{path:"/"})
            cookies.set('correo',respueta[0].Correo,{path:"/"})
            window.location.href="./actualizar-recuperar"
        }
    }



    return(
        // contenendor principal
        <div>

            <h1>Recuperacion de Password</h1>

            <Row>
                <Col md="3"></Col>
                <Col md="5">
                    <Card className="text-center">
                        <CardHeader tag="h1">USERNAME</CardHeader>
                        <CardBody>
                            <input id="user" name="user" onChange={handleInputChange}></input>
                            <br/>
                            <Button color="info" onClick={peticionPost} >Recuperar</Button>
                        </CardBody>
                    </Card>
                </Col>
            </Row>

        </div>
    );
}



export default Password;
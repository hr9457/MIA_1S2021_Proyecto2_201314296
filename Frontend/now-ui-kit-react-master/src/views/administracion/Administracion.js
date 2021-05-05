import React,{useState} from 'react';
import Button from 'reactstrap/lib/Button';
import Card from 'reactstrap/lib/Card';
import CardBody from 'reactstrap/lib/CardBody';
import CardHeader from 'reactstrap/lib/CardHeader';
import Col from 'reactstrap/lib/Col';
import Row from 'reactstrap/lib/Row';
import yaml from 'js-yaml';



var resultYaml;

// retorno a la pagina principal
function back(){
    window.location.href="./perfil-admi"; 
}
 

// pagina de a rederizar
function Administracion(){


    // evento para tener los datos del archivo YAML
    const imprimirDatos = async (event) => {
        let file = event.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file);
        
        reader.onload = function() {
            resultYaml = yaml.load(reader.result);
            console.log(resultYaml)
            var obejtoJS = JSON.parse(JSON.stringify(resultYaml));
            console.log(obejtoJS.A2.nombre);
            console.log(obejtoJS.A2.apellido);
            console.log(obejtoJS.A2.password);
            console.log(obejtoJS.A2.username);
            // console.log(JSON.parse(resultYaml).nombre);
        };
        
        reader.onerror = function() {
            console.log(reader.error);
        };
    }

   

    return(

        // contenedor principal
        <div style={{backgroundColor:'#ECF0F1'}}>
            


            {/* sepraciones para las opciones del administracion */}
            <Row>
                <Button color="danger" size="lg" onClick={back}>Regresar</Button>
            </Row>

            <Row>
                <Col md="3"></Col>
                <Col md="5">
                    <Card className="text-center">
                        <CardHeader tag="h1">Cargar Datos</CardHeader>
                        <CardBody>
                            <input id="files" type="file" name="files"  onChange={imprimirDatos}></input>
                            <br/>
                            <Button color="info" size="lg" ><h2>Cargar</h2></Button>
                        </CardBody>
                    </Card> 
                </Col>                          
            </Row>


        </div>
        

    );

}


export default Administracion;
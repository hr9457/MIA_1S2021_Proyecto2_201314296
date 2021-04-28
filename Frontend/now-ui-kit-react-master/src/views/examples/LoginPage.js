import React, { useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Col,
  Alert 
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import TransparentFooter from "components/Footers/TransparentFooter.js";
// exportacion de funcion para comprobar la session
import IniciarSession from "views/examples/session.js"



// funcion para redirigir al formulario de registro
function redirigir_formulario(){
  window.location.href="./registro-usuario";
}


function LoginPage() {  

  // estrutra de los datos
  const [datos,setDatos] = useState({
    usuario: '',
    password: ''
  })

  const enviarDatos = (event) => {
    // event.preventDefault();
    IniciarSession(datos.usuario,datos.password);    
  }

  // evento para almacenar los datos
  const handleInputChange = (event) => {
    // console.log(event.target.value)
    setDatos({
      ...datos,
      [event.target.name] : event.target.value
    })
  }

  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  }, []);
  return (
    <>
      {/* <ExamplesNavbar /> */}
      <div className="page-header clear-filter">
        <div
          // className="page-header-image"
          // style={{
          //   backgroundImage: "url(" + require("assets/img/login.jpg") + ")",
          // }}
        ></div>
        <div >
          <Container>
            <Col className="ml-auto mr-auto" md="7">
              <Card className="card-login card-plain" >
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <div >
                      <img
                        alt="..."
                        src={require("assets/img/now-logo.png")}
                      ></img>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      // className={
                      //   "no-border input-lg" +
                      //   (firstFocus ? " input-group-focus" : "")
                      // }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* ingreso de usuario */}
                      <Input
                        placeholder="Usuario"
                        type="text"
                        name="usuario"  
                        // funcion para captura de datos 
                        onChange = {handleInputChange}   
                        //  
                        // onFocus={() => setFirstFocus(true)}
                        // onBlur={() => setFirstFocus(false)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      // className={
                      //   "no-border input-lg" +
                      //   (lastFocus ? " input-group-focus" : "")
                      // }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      {/* ingreso del password */}
                      <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        // funcion para captura de datos 
                        onChange = {handleInputChange}   
                        //  
                        // onFocus={() => setLastFocus(true)}
                        // onBlur={() => setLastFocus(false)}
                      ></Input>
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    {/* Boton de accion para el ingreso del login */}
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      // href="#pablo"
                      size="lg"
                      onClick={enviarDatos}
                      >
                      Login
                    </Button>

                      {/* boton de crear cuenta */}
                    <div className="pull-left">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={redirigir_formulario}
                        >
                          Crear Cuenta
                        </a>
                      </h6>
                    </div>

                    {/* opcion de ayuda */}
                    <div className="pull-right">
                      <h6>
                        <a
                          className="link"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          Ayuda
                        </a>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LoginPage;

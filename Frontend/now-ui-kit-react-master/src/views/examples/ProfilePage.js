import React, { Component } from "react";

// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DefaultFooter from "components/Footers/DefaultFooter.js";
import axios from 'axios';
import obtener from 'views/examples/obtenerImagen.js'

import Cookies from 'universal-cookie';
import { convertToObject, getLeadingCommentRanges } from "typescript";

const cookies = new Cookies();

function cerrrarSession(){
  cookies.remove('id_usuario',{path:"/"});
  cookies.remove('username',{path:"/"});
  cookies.remove('nombre_usuario',{path:"/"});
  cookies.remove('tipo_usuario',{path:"/"});
  // cookies.remove('foto_perfil',{path:"/"})
  window.location.href="./login-page";
}




function ProfilePage() {

  
  const obtenerDato = async (event) =>{
    let respuesta =  await obtener();
    console.log(respuesta.FOTO_PERFIL)
    return respuesta
  }
  // 
  // console.log(cookies.get('foto_perfil'));
  // console.log(cookies.get('username'))
  const [pills, setPills] = React.useState("2");
  React.useEffect(() => {
    document.body.classList.add("profile-page");    
  }, []);
  return (
    <>
      {/* <ExamplesNavbar /> */}
      <div className="wrapper">
        <ProfilePageHeader />
        
        <div className="section">

          <Container>

            {/* boton para cierre de session */}
            <div className="button-container">
              <Button className="btn-round" color="info" size="lg" onClick={cerrrarSession}>
                Cerrar Session
              </Button>  
            </div>

            <h1> {cookies.get('username')} </h1>
            <br/>

            <div>
              <img src={obtenerDato.FOTO_PERFIL}></img>
            </div>

            <br/>
            <Button className="btn-round" color="info" size="lg" onClick={obtenerDato}>
                PUSH
              </Button>  
            
            {/* cuerpo para perfil de usuario */}

          </Container>

        {/* pie de pagina */}
        </div>
        <DefaultFooter />
      </div>

    </>
  );
}

export default ProfilePage;

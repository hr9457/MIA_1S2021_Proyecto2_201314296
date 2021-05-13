/*

=========================================================
* Now UI Kit React - v1.4.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2020 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// styles for this kit
import "assets/css/bootstrap.min.css";
import "assets/scss/now-ui-kit.scss?v=1.4.0";
import "assets/demo/demo.css?v=1.4.0";
import "assets/demo/nucleo-icons-page-styles.css?v=1.4.0";
// pages for this kit
// import Index from "views/Index.js";
// import NucleoIcons from "views/NucleoIcons.js";
import LoginPage from "views/examples/LoginPage.js";
// import LandingPage from "views/examples/LandingPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import Menu from "views/MenuUsuario/menuUsuario.js"
import Formulario from "views/FormulaRegistro/formularioUsuario.js"
import PerfilAdmi from "views/perfil-usuario/perfil-admi.js"
import PerfilUsser from 'views/perfil-usuario/perfil-usuario.js'
import Administracion from 'views/administracion/Administracion.js'
import FormularioEdit from 'views/perfil-usuario/editar_info.js'
import Password from 'views/Password/Password.js'

ReactDOM.render(
  <BrowserRouter>
    <Switch>

      <Switch>
        <Route exact path="/registro-usuario" component={Formulario}/>
        <Route exact path="/perfil" component={ProfilePage}/>
        <Route exact path="/perfil-usuario" component={PerfilUsser} />
        <Route exact path="/perfil-admi" component={PerfilAdmi}/>
        <Route exact path="/administracion" component={Administracion} />
        <Route exact path="/editar_profiel" component={FormularioEdit} />
        <Route exact path="/menu"  component={Menu}/>
        <Route exact path="/recuperar-password" component={Password} />
        <Route path="/login-page" render={(props) => <LoginPage {...props} />} />
        <Redirect to="/login-page" />
        <Redirect from="/" to="/index-page" />
      </Switch>

    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

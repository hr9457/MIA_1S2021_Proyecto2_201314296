import Cookies from 'universal-cookie';


import React,{Component, components} from 'react';


const cookies = new Cookies();


function cerrrarSession(){
    cookies.remove('id_usuario',{path:"/"});
    cookies.remove('username',{path:"/"});
    cookies.remove('nombre_usuario',{path:"/"});
    cookies.remove('tipo_usuario',{path:"/"});
    window.location.href="./login-page";
}



function menuUsuario(){
    var username = cookies.get('username');
    alert(`username: ${username}`)
    return(        
        <div>
            Menu
            <h1>
                Bienvenido Administrador
            </h1>
            <br />
            <button onClick={ ()=>this.cerrrarSession() }> Cerrar session</button>
        </div>
    );
}

export default menuUsuario;
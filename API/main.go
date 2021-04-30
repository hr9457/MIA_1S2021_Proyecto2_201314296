package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	_ "github.com/mattn/go-oci8"
)

//***** estructuras
type rol struct {
	tipo string
}

type estado struct {
	ID     int
	NOMBRE string
	COLOR  string
}

type usuario struct {
	ID       int
	USERNAME string
	NOMBRE   string
	APELLIDO string
}

type usuario_logeado struct {
	USERNAME string
	PASSWORD string
}

type Response struct {
	respuesta string `json:respuesta`
}

// struct para devolver los paraemtros de la consulta de login
type session struct {
	ID       int
	USERNAME string
	NOMBRE   string
	TIPO     int
}

// struct para insertar un usuario en la base de datos
type nuevo_usuario struct {
	USERNAME         string
	NOMBRE           string
	APELLIDO         string
	FECHA_NACIMIENTO string
	FECHA_REGISTRO   string
	CORREO           string
	FOTO_PERFIL      string
	PASSWORD         string
	// ROL              int
}

// struct para confirmacion de actividades dentro de la base de datos
type confirmacion struct {
	MENSAJE string
	TIPO    int
}

// ****************************************************************************
// ****************************************************************************
// ****************************************************************************
// ****************************************************************************
// ****************************************************************************
// ****************************************************************************
// **** consultas
func obtenerConeccion() (db *sql.DB, e error) {
	db, err := sql.Open("oci8", "hector/soraz9457@172.17.0.2:1521/ORCL18")
	if err != nil {
		log.Fatal(err)
		return nil, err
	}
	return db, nil
}

func consultar_estadoEvento() ([]estado, error) {

	estados := []estado{}
	db, err := obtenerConeccion()

	if err != nil {
		return nil, err
	}
	defer db.Close()

	rows, err := db.Query("Select id_estado_evento,nombre_estado_evento,color_evento from estado_evento")

	if err != nil {
		log.Fatal("Error \n", err)
	}
	defer rows.Close()

	var estado_evento estado

	for rows.Next() {

		err = rows.Scan(&estado_evento.ID, &estado_evento.NOMBRE, &estado_evento.COLOR)

		if err != nil {
			return nil, err
		}

		estados = append(estados, estado_evento)

	}
	return estados, nil

}

// consulta para los usuarios
func consultar_usuarios() ([]usuario, error) {

	usuarios := []usuario{}
	db, err := obtenerConeccion()

	if err != nil {
		return nil, err
	}
	defer db.Close()

	rows, err := db.Query("Select id_usuario,usarname,nombre_usuario,apellido_usuario from usuario")

	if err != nil {
		log.Fatal("Error \n", err)
	}
	defer rows.Close()

	var usuario_registrado usuario

	for rows.Next() {
		err = rows.Scan(&usuario_registrado.ID, &usuario_registrado.USERNAME, &usuario_registrado.NOMBRE, &usuario_registrado.APELLIDO)

		if err != nil {
			return nil, err
		}

		usuarios = append(usuarios, usuario_registrado)

	}

	return usuarios, nil

}

// consulta para un usuario en concreto = login
func consultar_usuario(user_name, password_usuario string) ([]session, error) {

	usuario := []session{}
	db, err := obtenerConeccion()

	if err != nil {
		return nil, err
	}
	defer db.Close()

	rows, err := db.Query("select usuario.id_usuario,usuario.usarname,usuario.nombre_usuario,usuario.fk_id_rol from usuario where usuario.usarname = '" + user_name + "' and usuario.password = '" + password_usuario + "' ")

	if err != nil {
		log.Fatal("Error \n", err)
	}
	defer rows.Close()

	var resultado_session session

	for rows.Next() {

		err = rows.Scan(&resultado_session.ID, &resultado_session.USERNAME, &resultado_session.NOMBRE, &resultado_session.TIPO)

		if err != nil {
			return nil, err
		}

		usuario = append(usuario, resultado_session)

	}
	return usuario, nil
}

// consulta para insertar un nuevo usuario
func insertar_usuario(usuario nuevo_usuario) error {

	// obtener coneccion
	db, error := obtenerConeccion()

	if error != nil {
		fmt.Println("Error al obtener la conexion con DB")
		return error
	}
	defer db.Close()

	_, error = db.Exec("insert into usuario(usarname,nombre_usuario,apellido_usuario,fecha_nacimiento,fecha_registro,correo_electronico,foto_perfil,fk_id_rol,password)	values('" + usuario.USERNAME + "','" + usuario.NOMBRE + "','" + usuario.APELLIDO + "',TIMESTAMP '" + usuario.FECHA_NACIMIENTO + "',TIMESTAMP '" + usuario.FECHA_REGISTRO + "','" + usuario.CORREO + "','" + usuario.FOTO_PERFIL + "',2,'" + usuario.PASSWORD + "')")
	// fmt.Println(columna)
	// fmt.Println("usuario registrado")
	return error
}

// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************

// API - SET para insertar usuario nuevos en la base de datos
func set_usuarioNuevo(w http.ResponseWriter, r *http.Request) {
	today := time.Now()
	var usuario nuevo_usuario
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &usuario)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	// fmt.Println(usuario.USERNAME)
	// fmt.Println(usuario.NOMBRE)
	// fmt.Println(usuario.APELLIDO)
	// fmt.Println(usuario.FECHA_NACIMIENTO)
	// fmt.Println(today.Format("2006-01-02 15:04:05"))
	// fmt.Println(usuario.CORREO)
	// fmt.Println(usuario.FOTO_PERFIL)
	// // fmt.Println(usuario.ROL)
	// fmt.Println(usuario.PASSWORD)
	//
	usuario.FECHA_REGISTRO = today.Format("2006-01-02 15:04:05")
	// insertar_usuario(usuario.USERNAME, usuario.NOMBRE, usuario.APELLIDO, usuario.FECHA_NACIMIENTO, usuario.FECHA_REGISTRO, usuario.CORREO, usuario.FOTO_PERFIL, usuario.PASSWORD, usuario.ROL)
	error := insertar_usuario(usuario)
	if error != nil {
		// mensaje de confirmacion para el Frontend
		var confirmacion_error confirmacion
		confirmacion_error.MENSAJE = "Error al registrar un usuario"
		confirmacion_error.TIPO = 0
		// conversion a JSON para enviar
		json.NewEncoder(w).Encode(confirmacion_error)
		//
		fmt.Println("Error al registrar un usuario \n", error)
	} else {
		// mensaje de confirmacion para el Frontend
		var confirmacion_exitosa confirmacion
		confirmacion_exitosa.MENSAJE = "Usuario Registrado"
		confirmacion_exitosa.TIPO = 1
		// conversion a JSON para enviar
		json.NewEncoder(w).Encode(confirmacion_exitosa)
		//
		fmt.Println("Usuario registrado")
	}
}

// pureba de get para obtener los estados registrado para los eventos
func get_estadosEventos(w http.ResponseWriter, r *http.Request) {
	estados, err := consultar_estadoEvento()
	if err != nil {
		fmt.Printf("Error al obtener los estados")
	} else {
		json.NewEncoder(w).Encode(estados)
	}
}

// get para obtener los usuario registrados
func get_usuarios(w http.ResponseWriter, r *http.Request) {
	usuario, err := consultar_usuarios()
	if err != nil {
		fmt.Printf("Error en la consulta de los usuarios")
		// json.NewEncoder(w).Encode(usuario_no_econtrado)
	} else {
		json.NewEncoder(w).Encode(usuario)
	}
}

// get para para hacer la consulta del login
func get_login(w http.ResponseWriter, r *http.Request) {
	// almacenamiento de datos recibidos
	var datos usuario_logeado
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &datos)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	//

	usuario, err := consultar_usuario(datos.USERNAME, datos.PASSWORD)
	if err != nil {
		fmt.Printf("Error en la consulta del inicio de sesion")
	} else {
		//
		var usuario_no_econtrado session
		usuario_no_econtrado.ID = 0
		usuario_no_econtrado.NOMBRE = "No Econtrado"
		usuario_no_econtrado.USERNAME = "No Econtrado"
		usuario_no_econtrado.TIPO = 0
		//
		if len(usuario) == 0 {
			json.NewEncoder(w).Encode(usuario_no_econtrado)
		} else {
			fmt.Println(usuario)
			json.NewEncoder(w).Encode(usuario)
		}
	}
}

// api para realizar una prueba post
func prueba_post(w http.ResponseWriter, r *http.Request) {
	var datos usuario_logeado
	reqBody, _ := ioutil.ReadAll(r.Body)
	// datos resividos desde react
	json.Unmarshal(reqBody, &datos)
	println(datos.USERNAME)
	println(datos.PASSWORD)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
}

// funcion prinsipal
func main() {
	fmt.Println("Server on Port:4000")

	// inicializacion de lor router
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/estado", get_estadosEventos)

	router.HandleFunc("/usuarios", get_usuarios)

	router.HandleFunc("/prueba", prueba_post).Methods("POST")

	// router para hacer la consuta del login
	router.HandleFunc("/login", get_login).Methods("POST")

	// router para registar un usuario nuevo
	router.HandleFunc("/registro_usuario", set_usuarioNuevo).Methods("POST")

	log.Fatal(http.ListenAndServe(":4000", router))

}

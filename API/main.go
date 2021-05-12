package main

import (
	"bytes"
	"crypto/sha256"
	"database/sql"
	"encoding/base64"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"image/png"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/gorilla/mux"
	_ "github.com/mattn/go-oci8"
	"github.com/mitchellh/mapstructure"
	"github.com/spf13/viper"
)

// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************
// funciones extras

// funcion para comvertir una imagen a base 64
func imagen(imagen_base64, username string) {
	idx := strings.Index(imagen_base64, ";base64,")
	if idx < 0 {
		panic("Imagen Invalida")
	}
	ImageType := imagen_base64[11:idx]
	log.Println(ImageType)

	unbased, err := base64.StdEncoding.DecodeString(imagen_base64[idx+8:])
	if err != nil {
		panic("Error en la decoficacion b64")
	}
	r := bytes.NewReader(unbased)
	switch ImageType {
	case "png":
		im, err := png.Decode(r)
		if err != nil {
			panic("No es png")
		}
		f, err := os.OpenFile("./image/"+username+".png", os.O_WRONLY|os.O_CREATE, 0777)
		if err != nil {
			panic("Cannot open file")
		}
		png.Encode(f, im)

	}
}

// funcion para convertir a base64 una imagen del backed
func toBase64(b []byte) string {
	return base64.StdEncoding.EncodeToString(b)
}

// funcion para retornar la imagen del usuario en base64
func get_image(nombre_imagen string) string {
	// contenedor
	var imagen = "./image/" + nombre_imagen + ".png"
	//
	//
	bytes, err := ioutil.ReadFile(imagen)
	if err != nil {
		log.Fatal(err)
	}
	//
	var base64Encoding string
	//
	mimeType := http.DetectContentType(bytes)

	switch mimeType {
	case "image/png":
		base64Encoding += "data:image/png;base64,"
	}
	base64Encoding += toBase64(bytes)
	// fmt.Println(base64Encoding)
	return base64Encoding
}

// funcion para encriptar passwor de usuario con sha256
func encriptarPassword(password string) string {
	hash := sha256.New()
	hash.Write([]byte(password))
	return hex.EncodeToString(hash.Sum(nil))
}

// funcionp para mapear los datos
func mapearDatos(datos string) {
	// ------------------------------
	var contador = 0
	var estadoTemporada = "finalizada"
	// fecha_incio_temporada := ""
	// fecha_fin_temporada := ""
	// fechaInicioJornada := 0
	// ------------------------------
	vi := viper.New()
	vi.SetConfigType("yaml")
	var archivoEntrada = []byte(datos)
	vi.ReadConfig(bytes.NewBuffer(archivoEntrada))
	fDatos := vi.AllSettings()
	// fmt.Println(fDatos)
	//------------------------------------
	// separacion en structura de los datos

	// mapstructure.Decode(fDatos, &usuario)
	for id, datos := range fDatos {
		// -------------------------------
		// apertura de coneccion
		db, error := obtenerConeccion()
		// fmt.Println("id_interno: " + id)
		var usuario datos_usuario
		err := mapstructure.Decode(datos, &usuario)
		if err != nil {
			panic(err)
		}
		// fmt.Println("nombre: " + usuario.NOMBRE)
		// fmt.Println("apellido: " + usuario.APELLIDO)
		// fmt.Println("password: " + usuario.PASSWORD)
		// fmt.Println("username: " + usuario.USERNAME)
		// fmt.Println("correo: " + usuario.USERNAME)

		// datos de las temporadas
		for i := 0; i < len(usuario.RESULTADOS); i++ {
			var nombreTemporada = strings.Split(usuario.RESULTADOS[i].TEMPORADA, "-")
			var mesTemporada = strings.Split(nombreTemporada[1], "Q")
			// fmt.Println("--Nombre Temporada: " + nombreTemporada[1])
			//  variables para guardar con el formato las fechas de la temporadas
			var fecha_incio_temporada = ""
			var fecha_fin_temporada = ""
			// ****** formateo para le fecha de finalizacion de la temporada
			if mesTemporada[1] == "2" {
				// fmt.Println("--Fecha Inicio Temporada: 1/0" + mesTemporada[1] + "/" + nombreTemporada[0])
				// fmt.Println("--Fecha Fin Temporada: 29/0" + mesTemporada[1] + "/" + nombreTemporada[0])
				fecha_incio_temporada = "1/0" + mesTemporada[1] + "/" + nombreTemporada[0]
				fecha_fin_temporada = "28/0" + mesTemporada[1] + "/" + nombreTemporada[0]
				// fmt.Println("--Fecha Inicio Temporada: " + fecha_incio_temporada)
				// fmt.Println("--Fecha Fin Temporada: " + fecha_fin_temporada)
			} else {
				if mesTemporada[1] > "10" {
					// fmt.Println("--Fecha Inicio Temporada: 1/" + mesTemporada[1] + "/" + nombreTemporada[0])
					// fmt.Println("--Fecha Fin Temporada: 30/" + mesTemporada[1] + "/" + nombreTemporada[0])
					fecha_incio_temporada = "1/" + mesTemporada[1] + "/" + nombreTemporada[0]
					fecha_fin_temporada = "30/" + mesTemporada[1] + "/" + nombreTemporada[0]
					// fmt.Println("--Fecha Inicio Temporada: " + fecha_incio_temporada)
					// fmt.Println("--Fecha Fin Temporada: " + fecha_fin_temporada)
				} else {
					// fmt.Println("--Fecha Inicio Temporada: 1/0" + mesTemporada[1] + "/" + nombreTemporada[0])
					// fmt.Println("--Fecha Fin Temporada: 30/0" + mesTemporada[1] + "/" + nombreTemporada[0])
					fecha_incio_temporada = "1/0" + mesTemporada[1] + "/" + nombreTemporada[0]
					fecha_fin_temporada = "30/0" + mesTemporada[1] + "/" + nombreTemporada[0]
					// fmt.Println("--Fecha Inicio Temporada: " + fecha_incio_temporada)
					// fmt.Println("--Fecha Fin Temporada: " + fecha_fin_temporada)
				}
			}
			//
			// fmt.Println("--Estado Temporada: Finalizada")
			// fmt.Println("--Tier: " + usuario.RESULTADOS[i].TIER)
			// datos de las jornadas jugadas
			for jornada := 0; jornada < len(usuario.RESULTADOS[i].JORNADAS); jornada++ {
				// fmt.Println("----Nombre Jornada: " + usuario.RESULTADOS[i].JORNADAS[jornada].JORNADA)
				//
				// *******  formateo de la jornada
				var inicioJornada = strings.Split(usuario.RESULTADOS[i].JORNADAS[jornada].JORNADA, "J")
				fechaIncio, err := strconv.Atoi(inicioJornada[1])
				if err == nil {
				}
				var inicio = (fechaIncio*7 + 1) - 7
				var fin = (fechaIncio * 7)
				//
				// fechas de inicio y fin de una jornada
				var fecha_incio_jornada = ""
				var fecha_fin_jornada = ""
				var mesJornada, errM = strconv.Atoi(mesTemporada[1])
				if errM == nil {
				}
				//
				//  para revision de la fecha inicio de la temporada
				if inicio > 10 {
					//
					if mesJornada > 10 {
						// fmt.Println("----Fecha Inicio Jornada: " + strconv.Itoa(inicio) + "/" + mesTemporada[1] + "/" + nombreTemporada[0])
						fecha_incio_jornada = strconv.Itoa(inicio) + "/" + mesTemporada[1] + "/" + nombreTemporada[0]
						// fmt.Println("----Fecha Inicio Jornada: " + fecha_incio_jornada)
					} else if mesJornada < 10 {
						// fmt.Println("----Fecha Inicio Jornada: " + strconv.Itoa(inicio) + "/0" + mesTemporada[1] + "/" + nombreTemporada[0])
						fecha_incio_jornada = strconv.Itoa(inicio) + "/0" + mesTemporada[1] + "/" + nombreTemporada[0]
						// fmt.Println("----Fecha Inicio Jornada: " + fecha_incio_jornada)
					}
					//
				} else {
					//
					if mesJornada > 10 {
						// fmt.Println("----Fecha Inicio Jornada: 0" + strconv.Itoa(inicio) + "/" + mesTemporada[1] + "/" + nombreTemporada[0])
						fecha_incio_jornada = "0" + strconv.Itoa(inicio) + "/" + mesTemporada[1] + "/" + nombreTemporada[0]
						// fmt.Println("----Fecha Inicio Jornada: " + fecha_incio_jornada)
					} else {
						// fmt.Println("----Fecha Inicio Jornada: 0" + strconv.Itoa(inicio) + "/0" + mesTemporada[1] + "/" + nombreTemporada[0])
						fecha_incio_jornada = "0" + strconv.Itoa(inicio) + "/0" + mesTemporada[1] + "/" + nombreTemporada[0]
						// fmt.Println("----Fecha Inicio Jornada: " + fecha_incio_jornada)
					}
					//
				}
				// para revision de la fecha final de la jornada
				if fin > 10 {
					//
					if mesJornada > 10 {
						// fmt.Println("----Fecha Fin Jornada: " + strconv.Itoa(fin) + "/" + mesTemporada[1] + "/" + nombreTemporada[0])
						fecha_fin_jornada = strconv.Itoa(fin) + "/" + mesTemporada[1] + "/" + nombreTemporada[0]
						// fmt.Println("----Fecha Fin Jornada: " + fecha_fin_jornada)
					} else {
						// fmt.Println("----Fecha Fin Jornada: " + strconv.Itoa(fin) + "/0" + mesTemporada[1] + "/" + nombreTemporada[0])
						fecha_fin_jornada = strconv.Itoa(fin) + "/0" + mesTemporada[1] + "/" + nombreTemporada[0]
						// fmt.Println("----Fecha Fin Jornada: " + fecha_fin_jornada)
					}
					//
				} else {
					//
					if mesJornada > 10 {
						// fmt.Println("----Fecha Fin Jornada: 0" + strconv.Itoa(fin) + "/" + mesTemporada[1] + "/" + nombreTemporada[0])
						fecha_fin_jornada = "0" + strconv.Itoa(fin) + "/" + mesTemporada[1] + "/" + nombreTemporada[0]
						// fmt.Println("----Fecha Fin Jornada: " + fecha_fin_jornada)
					} else {
						// fmt.Println("----Fecha Fin Jornada: 0" + strconv.Itoa(fin) + "/0" + mesTemporada[1] + "/" + nombreTemporada[0])
						fecha_fin_jornada = "0" + strconv.Itoa(fin) + "/0" + mesTemporada[1] + "/" + nombreTemporada[0]
						// fmt.Println("----Fecha Fin Jornada: " + fecha_fin_jornada)
					}
					//
				}
				// ******* formateo para el fin de la jornada
				//
				//
				// nivel de los datos de los deportes
				for deporte := 0; deporte < len(usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES); deporte++ {
					// fmt.Println("------Deporte: " + usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES[deporte].DEPORTE)
					// fmt.Println("------Fecha Inicio: " + usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES[deporte].FECHA)
					// fmt.Println("------Equipo visitante: " + usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES[deporte].VISITANTE)
					// fmt.Println("------Equipo Local: " + usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES[deporte].LOCAL)
					// fmt.Println("------P. Visitante: " + strconv.Itoa(usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES[deporte].PREDICCION.VISITANTE))
					// fmt.Println("------P. Local: " + strconv.Itoa(usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES[deporte].PREDICCION.LOCAL))
					// fmt.Println("------R. Visitante: " + strconv.Itoa(usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES[deporte].RESULTADO.VISITANTE))
					// fmt.Println("------R. Local: " + strconv.Itoa(usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES[deporte].RESULTADO.LOCAL))

					// INSERT A LA BASE DE DATOS EN LA TABLA TEMPORAL
					// coneccion con la base de datos
					// db, error := obtenerConeccion()
					if error != nil {
						fmt.Println("Error al obtener la conexion con DB")
						// fin de conexion
						defer db.Close()
					} else {
						// insert en la base de datos
						_, err = db.Exec("insert into temporal(id_interno_usr,nombre_usuario,apellido_usuario,password_usuario,username_usuario,correo_usuario,nombre_temporada,fecha_inicio_temporada,fecha_fin_temporada,estado_temporada,tier_temporada,nombre_jornada,fecha_inicio_jornada,fecha_fin_jornada,deporte,fecha_evento_deportivo,equipo_visitante,equipo_local,prediccion_visitante,prediccion_local,resultado_vistante,resultado_local) values(:1,:2,:3,:4,:5,:6,:7,:8,:9,:10,:11,:12,:13,:14,:15,:16,:17,:18,:19,:20,:21,:22) ", id, usuario.NOMBRE, usuario.APELLIDO, encriptarPassword(usuario.PASSWORD), usuario.USERNAME, usuario.USERNAME, nombreTemporada[1], fecha_incio_temporada, fecha_fin_temporada, estadoTemporada, usuario.RESULTADOS[i].TIER, usuario.RESULTADOS[i].JORNADAS[jornada].JORNADA, fecha_incio_jornada, fecha_fin_jornada, usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES[deporte].DEPORTE, usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES[deporte].FECHA, usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES[deporte].VISITANTE, usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES[deporte].LOCAL, strconv.Itoa(usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES[deporte].PREDICCION.VISITANTE), strconv.Itoa(usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES[deporte].PREDICCION.LOCAL), strconv.Itoa(usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES[deporte].RESULTADO.VISITANTE), strconv.Itoa(usuario.RESULTADOS[i].JORNADAS[jornada].PREDICCIONES[deporte].RESULTADO.LOCAL))

						contador = contador + 1

						if err != nil {
							fmt.Println(err)
							fmt.Println("Fallo en el registro No. " + strconv.Itoa(contador))
						} else {
							fmt.Println("Registro realizado No." + strconv.Itoa(contador))

						}
						// defer db.Close()
					}
					// fin de la consulta para insertar los valores a la tabla temporal

				}
			}
		}
		// cierre de conexion despues de registro de actividades por usuario
		defer db.Close()
	}
}

// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************
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
	USERNAME    string
	PASSWORD    string
	FOTO_PERFIL string
}

type Response struct {
	respuesta string `json:respuesta`
}

// struct para devolver los paraemtros de la consulta de login
type session struct {
	ID               int
	USERNAME         string
	NOMBRE           string
	APELLIDO         string
	FECHA_NACIMIENTO string
	CORREO           string
	TIPO             int
	PASSWORD         string
	// FOTO_PERFIL string
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

// struc para obtener la ruta de la imagen del perfil de un usuario
type username_usuario struct {
	USERNAME string
}
type imagen_usuario struct {
	FOTO_PERFIL string
}

// struct para devolver los paraemtros de la consulta de login
type dato_actualizado struct {
	USERNAME         string
	NOMBRE           string
	APELLIDO         string
	FECHA_NACIMIENTO string
	CORREO           string
	PASSWORD         string
	// FOTO_PERFIL string
}

// *******************************************
// struct para leer la data de la carga masiva

// struct para sacar la info de los usuario
type datos_usuario struct {
	NOMBRE     string
	APELLIDO   string
	PASSWORD   string
	USERNAME   string
	RESULTADOS []datos_temporadas
}

// struct para las temporadas
type datos_temporadas struct {
	TEMPORADA string
	TIER      string
	JORNADAS  []datos_jornadas
}

// struct para jornadas
type datos_jornadas struct {
	JORNADA      string
	PREDICCIONES []datos_deportes
}

// struct para deportes
type datos_deportes struct {
	DEPORTE    string
	FECHA      string
	VISITANTE  string
	LOCAL      string
	PREDICCION datos_prediccion
	RESULTADO  datos_resultado
}

// struct para prediccion
type datos_prediccion struct {
	VISITANTE int
	LOCAL     int
}

// struc para resultado del juego
type datos_resultado struct {
	VISITANTE int
	LOCAL     int
}

// struct para recibira la data
type data_cargaMasiva struct {
	DATA string
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

// consulta para saber la imagen de un usuario
func consultar_imagen_perfil(userName string) ([]imagen_usuario, error) {
	image := []imagen_usuario{}
	db, err := obtenerConeccion()

	if err != nil {
		return nil, err
	}
	defer db.Close()

	consulta, err := db.Query("select usuario.foto_perfil where usuario.usarname = '" + userName + "'")

	if err != nil {
		log.Fatal("Error \n", err)
	}
	defer consulta.Close()

	var resultado_consulta imagen_usuario

	for consulta.Next() {
		// guardar resultados de cosulta
		err = consulta.Scan(&resultado_consulta.FOTO_PERFIL)
		//
		if err != nil {
			return nil, err
		}
		//
		image = append(image, resultado_consulta)
	}
	return image, nil
}

//

// consulta para un usuario en concreto = login
func consultar_usuario(user_name, password_usuario string) ([]session, error) {

	usuario := []session{}
	db, err := obtenerConeccion()

	if err != nil {
		return nil, err
	}
	defer db.Close()

	rows, err := db.Query("select usuario.id_usuario,usuario.usarname,usuario.nombre_usuario,usuario.apellido_usuario,usuario.fecha_nacimiento,usuario.correo_electronico,usuario.fk_id_rol,usuario.password from usuario where usuario.usarname = '" + user_name + "' and usuario.password = '" + password_usuario + "' ")

	if err != nil {
		log.Fatal("Error \n", err)
	}
	defer rows.Close()

	var resultado_session session

	for rows.Next() {

		// insert de los resultados de la consulta
		err = rows.Scan(&resultado_session.ID, &resultado_session.USERNAME, &resultado_session.NOMBRE, &resultado_session.APELLIDO, &resultado_session.FECHA_NACIMIENTO, &resultado_session.CORREO, &resultado_session.TIPO, &resultado_session.PASSWORD)
		// prueba para el retorno de la imgaen de usuario ingreso
		// resultado_session.FOTO_PERFIL = get_image(user_name)

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

// consulta para actualizar datos de un usuario
func actualizar(usuario dato_actualizado) error {
	// obtener coneccion
	db, error := obtenerConeccion()
	if error != nil {
		fmt.Println("Error al obtner la conexion con DB")
		return error
	}
	defer db.Close()

	// consulta := "update usuario set nombre_usuario='" + usuario.NOMBRE + "', apellido_usuario='" + usuario.APELLIDO + "', fecha_nacimiento = TO_DATE('" + usuario.FECHA_NACIMIENTO + "','YYYY-MM-DD'), correo_electronico='" + usuario.CORREO + "', password='" + usuario.PASSWORD + "' where usarname='" + usuario.USERNAME + "' "

	// fmt.Println(consulta)

	_, error = db.Exec("update usuario set  nombre_usuario='" + usuario.NOMBRE + "', apellido_usuario='" + usuario.APELLIDO + "', fecha_nacimiento = TO_DATE('" + usuario.FECHA_NACIMIENTO + "','YYYY-MM-DD'), correo_electronico='" + usuario.CORREO + "', password='" + usuario.PASSWORD + "' where usarname='" + usuario.USERNAME + "' ")

	return error
}

// consulta para insertar los usuario de la tabla temporal a la base de datos
func usuariosCargaMasiva() error {
	db, error := obtenerConeccion()
	if error != nil {
		fmt.Println("Error al obtener conexion con la DB")
		return error
	}
	defer db.Close()
	// consulta para hacer el filtrado en la base de datos
	var sqlQuery = "insert into usuario(usuario.id_interno,usuario.usarname,usuario.nombre_usuario,usuario.apellido_usuario,usuario.correo_electronico,usuario.password,usuario.fecha_nacimiento,usuario.fecha_registro,usuario.fk_id_rol) " +
		"select distinct id_interno_usr,correo_usuario,nombre_usuario,apellido_usuario,correo_usuario,password_usuario,SYSDATE,SYSDATE,rol.id_rol from temporal " +
		"inner join rol on rol.id_rol = 2"
	_, error = db.Exec(sqlQuery)
	fmt.Println("insert usuario")
	return error
}

// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************
// ***********************************************************************************************

// API - SET para actualizar datos de los usuario en la base datos
func actualizar_usuario(w http.ResponseWriter, r *http.Request) {
	var usuario dato_actualizado
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &usuario)
	json.Unmarshal(reqBody, &usuario)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	//
	error := actualizar(usuario)
	fmt.Println(error)
	if error != nil {
		// mensaje de retorno  erroneo
		var mensajeError confirmacion
		mensajeError.MENSAJE = "Error no se ha podido actualizar los datos"
		mensajeError.TIPO = 0
		// conversion a json  para enviar
		json.NewEncoder(w).Encode(mensajeError)
		fmt.Println("No se han actualizados los datos")
	} else {
		// mesaje de exito en la actualizacion
		var mensajeCofirmacion confirmacion
		mensajeCofirmacion.MENSAJE = "Datos Actualizados"
		mensajeCofirmacion.TIPO = 1
		// conversion a json para enviar
		json.NewEncoder(w).Encode(mensajeCofirmacion)
		fmt.Println("Datos Actualizados")
	}
}

// API - SET para insertar usuario nuevos en la base de datos
func set_usuarioNuevo(w http.ResponseWriter, r *http.Request) {
	today := time.Now()
	var usuario nuevo_usuario
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &usuario)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	// concatenacion para imagen de perfil del usuario
	var imagenUsuario = "./image/" + usuario.USERNAME + ".png"
	// conversion de imagen
	imagen(usuario.FOTO_PERFIL, usuario.USERNAME)
	// fmt.Println(imagenUsuario)
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

	//
	usuario.FECHA_REGISTRO = today.Format("2006-01-02 15:04:05")
	// guarda la ruta de la imagen del usuario
	usuario.FOTO_PERFIL = imagenUsuario
	//
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
	// fmt.Println(datos.USERNAME)
	// fmt.Println(datos.PASSWORD)
	usuario, err := consultar_usuario(datos.USERNAME, datos.PASSWORD)
	if err != nil {
		fmt.Printf("Error en la consulta del inicio de sesion")
		// ----------------------------------------------------
		//
		var usuario_no_econtrado [1]session
		usuario_no_econtrado[0].ID = 0
		usuario_no_econtrado[0].NOMBRE = "No Econtrado"
		usuario_no_econtrado[0].USERNAME = "No Econtrado"
		usuario_no_econtrado[0].TIPO = 0
		//
		json.NewEncoder(w).Encode(usuario_no_econtrado)
	} else {
		//
		var usuario_no_econtrado [1]session
		usuario_no_econtrado[0].ID = 0
		usuario_no_econtrado[0].NOMBRE = "No Econtrado"
		usuario_no_econtrado[0].USERNAME = "No Econtrado"
		usuario_no_econtrado[0].TIPO = 0
		//
		if len(usuario) == 0 {
			json.NewEncoder(w).Encode(usuario_no_econtrado)
		} else {
			// fmt.Println(usuario)
			json.NewEncoder(w).Encode(usuario)
		}
	}
}

// funcion para consultar la imagen de perfil de un usuario
func get_image_profile(w http.ResponseWriter, r *http.Request) {
	var username username_usuario
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &username)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	// resultado de la consulta
	// imagen, err := consultar_imagen_perfil(username.USERNAME)
	// if err != nil {
	// 	fmt.Println("Error en la consulta de la imagen de perfil")
	// } else {
	// retorno del imgaen gen base64
	var imagen64 imagen_usuario
	imagen64.FOTO_PERFIL = get_image(username.USERNAME)
	//
	json.NewEncoder(w).Encode(imagen64)

}

// api para realizar una prueba post
func prueba_post(w http.ResponseWriter, r *http.Request) {
	var datos usuario_logeado
	reqBody, _ := ioutil.ReadAll(r.Body)
	// datos resividos desde react
	json.Unmarshal(reqBody, &datos)
	println(datos.USERNAME)
	println(datos.PASSWORD)
	println(datos.FOTO_PERFIL)
	//
	// contenedor
	var imagen = "./image/" + datos.USERNAME + ".png"
	//
	bytes, err := ioutil.ReadFile(imagen)
	if err != nil {
		log.Fatal(err)
	}
	var base64Encoding string

	mimeType := http.DetectContentType(bytes)
	switch mimeType {
	case "image/png":
		base64Encoding += "data:image/png;base64,"
	}
	base64Encoding += toBase64(bytes)
	fmt.Println(base64Encoding)
	//
	var datos2 usuario_logeado
	datos2.USERNAME = datos.USERNAME
	datos2.PASSWORD = datos.PASSWORD
	datos2.FOTO_PERFIL = base64Encoding
	//
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(datos2)
}

func cargaDatos(w http.ResponseWriter, r *http.Request) {
	var datos data_cargaMasiva
	reqBody, _ := ioutil.ReadAll(r.Body)
	json.Unmarshal(reqBody, &datos)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusOK)
	// -----------------------------------
	mapearDatos(datos.DATA)
	// ------------------------------------
	// cargar usuario de la tabla temporal
	error := usuariosCargaMasiva()
	if error != nil {
		fmt.Println("Error en el registro de los usuarios", error)
	} else {
		fmt.Println("Usuarios registrados en la base de datos")
	}
	// ------------------------------------
	var mensajeRespuesta confirmacion
	mensajeRespuesta.MENSAJE = "Datos Recibidos"
	mensajeRespuesta.TIPO = 1
	json.NewEncoder(w).Encode(mensajeRespuesta)
}

// ****************************************************************************
// ****************************************************************************
// ****************************************************************************
// ****************************************************************************
// ****************************************************************************
// ****************************************************************************
// **** funcion main

// funcion prinsipal
func main() {
	fmt.Println("Server on Port:4000")

	// inicializacion de lor router
	router := mux.NewRouter().StrictSlash(true)

	// router.HandleFunc("/estado", get_estadosEventos)

	router.HandleFunc("/usuarios", get_usuarios)

	router.HandleFunc("/prueba", prueba_post).Methods("POST")

	// router para hacer la consuta del login
	router.HandleFunc("/login", get_login).Methods("POST")

	// router para obtener la imagen del usuario logeado
	router.HandleFunc("/image_perfil", get_image_profile).Methods("POST")

	// router para registar un usuario nuevo
	router.HandleFunc("/registro_usuario", set_usuarioNuevo).Methods("POST")

	// router para actualizar datos de un usuario
	router.HandleFunc("/actualizar_datos", actualizar_usuario).Methods("POST")

	// carga masiva de datos
	router.HandleFunc("/carga_masiva", cargaDatos).Methods("POST")

	// puerto principal para la escucha
	log.Fatal(http.ListenAndServe(":4000", router))

}

package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

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

// **** enrutadores
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

func get_estadosEventos(w http.ResponseWriter, r *http.Request) {
	estados, err := consultar_estadoEvento()
	if err != nil {
		fmt.Printf("Error al obtener los estados")
	} else {
		json.NewEncoder(w).Encode(estados)
	}
}

func main() {

	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/estado", get_estadosEventos)

	log.Fatal(http.ListenAndServe(":3000", router))

	// log.Fatal(http.ListenAndServe(":8080", nil))
}

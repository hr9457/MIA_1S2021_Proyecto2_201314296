-- Tabla principales 

-- tabla para estados de las temporadas
CREATE TABLE estado_temporada(
    id_estado_temporada NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    nombre_estado_temporada VARCHAR2(20) NOT NULL,
    CONSTRAINT pk_estado_temporada PRIMARY KEY (id_estado_temporada)
);



--- tabla para tipo de fases
CREATE TABLE fase(
    id_fase NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    nombre_fase VARCHAR2(20) NOT NULL,
    CONSTRAINT pk_fase PRIMARY KEY (id_fase)
);


-- tabla para estado de los eventos
CREATE TABLE estado_evento(
    id_estado_evento NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    nombre_estado_evento VARCHAR2(20) NOT NULL,
    color_evento VARCHAR2(20) NOT NULL,
    CONSTRAINT pk_estado_evento PRIMARY KEY (id_estado_evento)
);


-- tabla para guardar los deportes
CREATE TABLE deporte(
    id_deporte NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    nombre_deporte VARCHAR2(20) NOT NULL,
    imagen_deporte VARCHAR2(200) NOT NULL,
    color_deporte VARCHAR2(20) NOT NULL,
    CONSTRAINT pk_deporte PRIMARY KEY (id_deporte)
);


-- tabla para guardar equipo o jugadores
CREATE TABLE equipo_jugador(
    id_equipo_jugador NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    nombre_equipo_jugador VARCHAR2(30) NOT NULL,
    CONSTRAINT pk_equipo_deporte PRIMARY KEY (id_equipo_jugador)
);


-- tabla para juardar los tipo de usuarios
CREATE TABLE rol(
    id_rol NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    nombre_rol VARCHAR2(20) NOT NULL,
    CONSTRAINT pk_rol PRIMARY KEY (id_rol)
);


-- tabla para guardar los tipo de membresias 
CREATE TABLE membresia(
    id_membresia NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    tipo_membresia VARCHAR2(20) NOT NULL,
    valor_membresia NUMBER NOT NULL,
    CONSTRAINT pk_membresia PRIMARY KEY (id_membresia)
);




--- TABLAS SECUNDARIOS


-- tabla para guardar las temporadas
CREATE TABLE temporada(
    id_temporada NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    nombre_temporada VARCHAR2(20) NOT NULL,
    fecha_incio_temporada TIMESTAMP NOT NULL, 
    fecha_finalizacion_temporada TIMESTAMP NOT NULL, 
    puntuacion_temporada NUMBER(*,2) NOT NULL, 
    fk_id_estado_temporada NUMBER NOT NULL,
    CONSTRAINT pk_temporada PRIMARY KEY (id_temporada),
    CONSTRAINT fk_estado_temporada FOREIGN KEY (fk_id_estado_temporada) REFERENCES estado_temporada(id_estado_temporada)
);


-- tabla para guardar las jornadas
CREATE TABLE jornada(
    id_jornada NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    nombre_jornada VARCHAR2(20) NOT NULL,
    fecha_inicio_jornada TIMESTAMP NOT NULL,
    fecha_finalizacion_jornada TIMESTAMP NOT NULL,
    fk_id_fase NUMBER NOT NULL,
    fk_id_temporada NUMBER NOT NULL,
    CONSTRAINT pk_jornada PRIMARY KEY (id_jornada),
    CONSTRAINT fk_fase_jornada FOREIGN KEY (fk_id_fase) REFERENCES fase(id_fase),
    CONSTRAINT fk_temporada_jornada FOREIGN KEY (fk_id_temporada) REFERENCES temporada(id_temporada)
);


-- fase para guardar los eventos deportivos
CREATE TABLE evento_deportivo(
    id_evento_deportivo NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    fecha_evento TIMESTAMP NOT NULL,
    marcador_local NUMBER NOT NULL,
    marcador_visitante NUMBER NOT NULL,
    fk_id_estado_evento NUMBER NOT NULL,
    fk_id_deporte NUMBER NOT NULL,
    fk_id_equipo_jugador_local NUMBER NOT NULL,
    fk_id_equipo_jugador_visitante NUMBER NOT NULL,
    fk_id_jornada NUMBER NOT NULL,
    CONSTRAINT pk_evento_deportivo PRIMARY KEY (id_evento_deportivo),
    CONSTRAINT fk_estado_evento FOREIGN KEY (fk_id_estado_evento) REFERENCES estado_evento(id_estado_evento),
    CONSTRAINT fk_deporte FOREIGN KEY (fk_id_deporte) REFERENCES deporte(id_deporte),
    CONSTRAINT fk_equip_local FOREIGN KEY (fk_id_equipo_jugador_local) REFERENCES equipo_jugador(id_equipo_jugador),
    CONSTRAINT fk_equipo_visitante FOREIGN KEY (fk_id_equipo_jugador_visitante) REFERENCES equipo_jugador(id_equipo_jugador),
    CONSTRAINT fk_jornada_evento_deportivo FOREIGN KEY (fk_id_jornada) REFERENCES jornada(id_jornada)
);






-- tabla para guardar los usuarios 
CREATE TABLE usuario(
    id_usuario NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    usarname VARCHAR2(20) NOT NULL,    
    nombre_usuario VARCHAR2(30) NOT NULL,
    apellido_usuario VARCHAR2(30) NOT NULL,
    fecha_nacimiento TIMESTAMP NOT NULL,
    fecha_registro TIMESTAMP NOT NULL,
    correo_electronico VARCHAR2(30) NOT NULL ,
    foto_perfil VARCHAR2(200) NOT NULL ,
    fk_id_rol NUMBER NOT NULL,
    password VARCHAR2(100) NOT NULL,
    CONSTRAINT pk_usuario PRIMARY KEY (id_usuario),
    CONSTRAINT fk_usuario_rol FOREIGN KEY (fk_id_rol) REFERENCES rol(id_rol) 
);




-- Tabla para guardar todas la predicciones 
CREATE TABLE prediccion(
    id_prediccion NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    prediccion_local NUMBER NOT NULL,
    prediccion_visitante NUMBER NOT NULL,
    puntaje_prediccion NUMBER NOT NULL ,
    fk_id_usuario NUMBER NOT NULL,
    fk_id_evento_deportivo NUMBER NOT NULL,
    CONSTRAINT pk_prediccion PRIMARY KEY (id_prediccion),
    CONSTRAINT fk_usuario FOREIGN KEY (fk_id_usuario) REFERENCES usuario(id_usuario),
    CONSTRAINT fk_evento_deportivo FOREIGN KEY (fk_id_evento_deportivo) REFERENCES evento_deportivo(id_evento_deportivo)
);




-- tabla para relacionar el usuario con membresia 
CREATE TABLE usuario_membresia(
    id_usuario_membresia NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    fk_id_membresia NUMBER NOT NULL,
    fk_id_usuario NUMBER NOT NULL,
    fk_id_temporada NUMBER NOT NULL,
    CONSTRAINT pk_usuario_membresia PRIMARY KEY (id_usuario_membresia),
    CONSTRAINT fk_usuario_usuario_membresia FOREIGN KEY (fk_id_usuario) REFERENCES usuario(id_usuario),
    CONSTRAINT fk_membresia_usuario_membresia FOREIGN KEY (fk_id_membresia) REFERENCES membresia(id_membresia),
    CONSTRAINT fk_temporada_usuario_membresia FOREIGN KEY (fk_id_temporada) REFERENCES temporada(id_temporada)
);



-- tabla par registara las puntuaciones
CREATE TABLE puntuacion(
    id_puntuacion NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    p10 NUMBER NOT NULL,
    P5 NUMBER NOT NULL,
    P3 NUMBER NOT NULL,
    P0 NUMBER NOT NULL,
    puntaje NUMBER NOT NULL,
    incremento NUMBER NOT NULL,
    fk_id_temporada NUMBER NOT NULL,
    fk_id_usuario_membresia NUMBER NOT NULL,
    CONSTRAINT pk_puntuacion PRIMARY KEY (id_puntuacion),
    CONSTRAINT fk_temporada_puntuacion FOREIGN KEY (fk_id_temporada) REFERENCES temporada(id_temporada),
    CONSTRAINT fk_usuario_membresia_puntuacion FOREIGN KEY (fk_id_usuario_membresia) REFERENCES usuario_membresia(id_usuario_membresia)
);




-- tabla pra guardar recompesas
CREATE TABLE recompesa(
    id_recompesa NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    total_recompesa NUMBER(*,2),
    fk_id_puntuacion NUMBER NOT NULL,
    fk_id_usuario NUMBER NOT NULL,
    CONSTRAINT pk_recompesa PRIMARY KEY (id_recompesa),
    CONSTRAINT fk_puntuacion_recompesa FOREIGN KEY (fk_id_puntuacion) REFERENCES puntuacion(id_puntuacion),
    CONSTRAINT fk_usuario_recompesa FOREIGN KEY (fk_id_usuario) REFERENCES usuario(id_usuario)
);



-- taba para almacenar los chat 
CREATE TABLE chat(
    id_chat NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    fk_id_usuario NUMBER NOT NULL,
    fk_id_usuario2 NUMBER NOT NULL,
    CONSTRAINT pk_char PRIMARY KEY (id_chat),
    CONSTRAINT fk_usuario_chat FOREIGN KEY (fk_id_usuario) REFERENCES usuario (id_usuario) ,
    CONSTRAINT fk_usuario2_chat FOREIGN KEY (fk_id_usuario2) REFERENCES usuario (id_usuario) 
);


-- tabla para guardar los mensajes
CREATE TABLE mensaje(
    id_mensaje NUMBER GENERATED ALWAYS AS IDENTITY START WITH 1 INCREMENT BY 1,
    fecha_mensaje TIMESTAMP NOT NULL,
    contenido_mensaje VARCHAR2(200),
    fk_id_chat NUMBER NOT NULL,
    CONSTRAINT pk_mensaje PRIMARY KEY (id_mensaje),
    CONSTRAINT fk_chat_mensaje FOREIGN KEY (fk_id_chat) REFERENCES chat (id_chat)
);
-- Tabla principales 

-- tabla para estados de las temporadas
CREATE TABLE estado_temporada(
    id_estado_temporada NUMBER,
    nombre_estado_temporada VARCHAR2(20) NOT NULL,
    CONSTRAINT pk_estado_temporada PRIMARY KEY (id_estado_temporada)
);

CREATE SEQUENCE aumento_estado_temporada
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_estado_temporada
BEFORE INSERT ON estado_temporada
FOR EACH ROW 
BEGIN 
    select aumento_estado_temporada.nextval into :new.id_estado_temporada from dual;
END;



--- tabla para tipo de fases
CREATE TABLE fase(
    id_fase NUMBER,
    nombre_fase VARCHAR2(20) NOT NULL,
    CONSTRAINT pk_fase PRIMARY KEY (id_fase)
);

CREATE SEQUENCE aumento_fase
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_fase
BEFORE INSERT ON fase
FOR EACH ROW
BEGIN
    select aumento_fase.nextval into :new.id_fase from dual;
END;



-- tabla para estado de los eventos
CREATE TABLE estado_evento(
    id_estado_evento NUMBER,
    nombre_estado_evento VARCHAR2(20) NOT NULL,
    color_evento VARCHAR2(20) NOT NULL,
    CONSTRAINT pk_estado_evento PRIMARY KEY (id_estado_evento)
);


CREATE SEQUENCE aumento_estado_evento
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_estado_evento
BEFORE INSERT ON estado_evento
FOR EACH ROW
BEGIN
    select aumento_estado_evento.nextval into :new.id_estado_evento from dual;
END;



-- tabla para guardar los deportes
CREATE TABLE deporte(
    id_deporte NUMBER,
    nombre_deporte VARCHAR2(20) NOT NULL,
    imagen_deporte VARCHAR2(200) NOT NULL,
    color_deporte VARCHAR2(20) NOT NULL,
    CONSTRAINT pk_deporte PRIMARY KEY (id_deporte)
);

CREATE SEQUENCE aumento_deporte
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_deporte
BEFORE INSERT ON deporte
FOR EACH ROW
BEGIN
    select aumento_deporte.nextval into :new.id_deporte from dual;
END;


-- tabla para guardar equipo o jugadores
CREATE TABLE equipo_jugador(
    id_equipo_jugador NUMBER,
    nombre_equipo_jugador VARCHAR2(30) NOT NULL,
    CONSTRAINT pk_equipo_deporte PRIMARY KEY (id_equipo_jugador)
);

CREATE SEQUENCE aumento_equipo_jugador
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_equipo_jugador
BEFORE INSERT ON equipo_jugador
FOR EACH ROW
BEGIN
    select aumento_equipo_jugador.nextval into :new.id_equipo_jugador from dual;
END;


-- tabla para juardar los tipo de usuarios
CREATE TABLE rol(
    id_rol NUMBER,
    nombre_rol VARCHAR2(20) NOT NULL,
    CONSTRAINT pk_rol PRIMARY KEY (id_rol)
);


CREATE SEQUENCE aumento_rol
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_rol
BEFORE INSERT ON rol
FOR EACH ROW
BEGIN
    select aumento_rol.nextval into :new.id_rol from dual;
END;


-- tabla para guardar los tipo de membresias 
CREATE TABLE membresia(
    id_membresia NUMBER,
    tipo_membresia VARCHAR2(20) NOT NULL,
    valor_membresia NUMBER NOT NULL,
    CONSTRAINT pk_membresia PRIMARY KEY (id_membresia)
);


CREATE SEQUENCE aumento_membresia
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_membresia
BEFORE INSERT ON membresia
FOR EACH ROW
BEGIN
    select aumento_membresia.nextval into :new.id_membresia from dual;
END;



--- TABLAS SECUNDARIOS


-- tabla para guardar las temporadas
CREATE TABLE temporada(
    id_temporada NUMBER,
    nombre_temporada VARCHAR2(20) NOT NULL,
    fecha_incio_temporada TIMESTAMP NOT NULL, 
    fecha_finalizacion_temporada TIMESTAMP NOT NULL, 
    puntuacion_temporada NUMBER(*,2) NOT NULL, 
    fk_id_estado_temporada NUMBER NOT NULL,
    CONSTRAINT pk_temporada PRIMARY KEY (id_temporada),
    CONSTRAINT fk_estado_temporada FOREIGN KEY (fk_id_estado_temporada) REFERENCES estado_temporada(id_estado_temporada)
);

CREATE SEQUENCE aumento_temporada
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_temporada
BEFORE INSERT ON temporada
FOR EACH ROW
BEGIN
    select aumento_temporada.nextval into :new.id_temporada from dual;
END;


-- tabla para guardar las jornadas
CREATE TABLE jornada(
    id_jornada NUMBER,
    nombre_jornada VARCHAR2(20) NOT NULL,
    fecha_inicio_jornada TIMESTAMP NOT NULL,
    fecha_finalizacion_jornada TIMESTAMP NOT NULL,
    fk_id_fase NUMBER NOT NULL,
    fk_id_temporada NUMBER NOT NULL,
    CONSTRAINT pk_jornada PRIMARY KEY (id_jornada),
    CONSTRAINT fk_fase_jornada FOREIGN KEY (fk_id_fase) REFERENCES fase(id_fase),
    CONSTRAINT fk_temporada_jornada FOREIGN KEY (fk_id_temporada) REFERENCES temporada(id_temporada)
);


CREATE SEQUENCE aumento_jornada
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_jornada
BEFORE INSERT ON jornada
FOR EACH ROW
BEGIN
    select aumento_jornada.nextval into :new.id_jornada from dual;
END;


-- fase para guardar los eventos deportivos
CREATE TABLE evento_deportivo(
    id_evento_deportivo NUMBER,
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


CREATE SEQUENCE aumento_evento_deportivo
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_evento_deportivo
BEFORE INSERT ON evento_deportivo
FOR EACH ROW
BEGIN
    select aumento_evento_deportivo.nextval into :new.id_evento_deportivo from dual;
END;






-- tabla para guardar los usuarios 
CREATE TABLE usuario(
    id_usuario NUMBER,
    usarname VARCHAR2(20) NULL,    
    nombre_usuario VARCHAR2(30) NULL,
    apellido_usuario VARCHAR2(30) NULL,
    fecha_nacimiento TIMESTAMP NULL,
    fecha_registro TIMESTAMP NULL,
    correo_electronico VARCHAR2(30) NULL ,
    foto_perfil VARCHAR2(200) NULL ,
    fk_id_rol NUMBER NULL,
    password VARCHAR2(100) NULL,
    id_interno VARCHAR2(50) NULL,
    CONSTRAINT pk_usuario PRIMARY KEY (id_usuario),
    CONSTRAINT fk_usuario_rol FOREIGN KEY (fk_id_rol) REFERENCES rol(id_rol) 
);


CREATE SEQUENCE aumento_usuario
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_usuario
BEFORE INSERT ON usuario 
FOR EACH ROW
BEGIN
    select aumento_usuario.nextval into :new.id_usuario from dual;
END;



-- Tabla para guardar todas la predicciones 
CREATE TABLE prediccion(
    id_prediccion NUMBER,
    prediccion_local NUMBER NOT NULL,
    prediccion_visitante NUMBER NOT NULL,
    puntaje_prediccion NUMBER NOT NULL ,
    fk_id_usuario NUMBER NOT NULL,
    fk_id_evento_deportivo NUMBER NOT NULL,
    CONSTRAINT pk_prediccion PRIMARY KEY (id_prediccion),
    CONSTRAINT fk_usuario FOREIGN KEY (fk_id_usuario) REFERENCES usuario(id_usuario),
    CONSTRAINT fk_evento_deportivo FOREIGN KEY (fk_id_evento_deportivo) REFERENCES evento_deportivo(id_evento_deportivo)
);


CREATE SEQUENCE aumento_prediccion
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_prediccion
BEFORE INSERT ON prediccion 
FOR EACH ROW
BEGIN
    select aumento_prediccion.nextval into :new.id_prediccion from dual;
END;




-- tabla para relacionar el usuario con membresia 
CREATE TABLE usuario_membresia(
    id_usuario_membresia NUMBER,
    fk_id_membresia NUMBER NOT NULL,
    fk_id_usuario NUMBER NOT NULL,
    fk_id_temporada NUMBER NOT NULL,
    CONSTRAINT pk_usuario_membresia PRIMARY KEY (id_usuario_membresia),
    CONSTRAINT fk_usuario_usuario_membresia FOREIGN KEY (fk_id_usuario) REFERENCES usuario(id_usuario),
    CONSTRAINT fk_membresia_usuario_membresia FOREIGN KEY (fk_id_membresia) REFERENCES membresia(id_membresia),
    CONSTRAINT fk_temporada_usuario_membresia FOREIGN KEY (fk_id_temporada) REFERENCES temporada(id_temporada)
);

CREATE SEQUENCE aumento_usuario_memebresia
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_usuario_memebresia
BEFORE INSERT ON usuario_membresia 
FOR EACH ROW
BEGIN
    select aumento_usuario_memebresia.nextval into :new.id_usuario_membresia from dual;
END;



-- tabla par registara las puntuaciones
CREATE TABLE puntuacion(
    id_puntuacion NUMBER,
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

CREATE SEQUENCE aumento_puntuacion
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_puntuacion
BEFORE INSERT ON puntuacion 
FOR EACH ROW
BEGIN
    select aumento_puntuacion.nextval into :new.id_puntuacion from dual;
END;




-- tabla pra guardar recompesas
CREATE TABLE recompesa(
    id_recompesa NUMBER,
    total_recompesa NUMBER(*,2),
    fk_id_puntuacion NUMBER NOT NULL,
    fk_id_usuario NUMBER NOT NULL,
    CONSTRAINT pk_recompesa PRIMARY KEY (id_recompesa),
    CONSTRAINT fk_puntuacion_recompesa FOREIGN KEY (fk_id_puntuacion) REFERENCES puntuacion(id_puntuacion),
    CONSTRAINT fk_usuario_recompesa FOREIGN KEY (fk_id_usuario) REFERENCES usuario(id_usuario)
);

CREATE SEQUENCE aumento_recompesa
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_recompesa
BEFORE INSERT ON recompesa 
FOR EACH ROW
BEGIN
    select aumento_recompesa.nextval into :new.id_recompesa from dual;
END;



-- taba para almacenar los chat 
CREATE TABLE chat(
    id_chat NUMBER,
    fk_id_usuario NUMBER NOT NULL,
    fk_id_usuario2 NUMBER NOT NULL,
    CONSTRAINT pk_char PRIMARY KEY (id_chat),
    CONSTRAINT fk_usuario_chat FOREIGN KEY (fk_id_usuario) REFERENCES usuario (id_usuario) ,
    CONSTRAINT fk_usuario2_chat FOREIGN KEY (fk_id_usuario2) REFERENCES usuario (id_usuario) 
);


CREATE SEQUENCE aumento_chat
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_chat
BEFORE INSERT ON chat 
FOR EACH ROW
BEGIN
    select aumento_chat.nextval into :new.id_chat from dual;
END;


-- tabla para guardar los mensajes
CREATE TABLE mensaje(
    id_mensaje NUMBER,
    fecha_mensaje TIMESTAMP NOT NULL,
    contenido_mensaje VARCHAR2(200),
    fk_id_chat NUMBER NOT NULL,
    CONSTRAINT pk_mensaje PRIMARY KEY (id_mensaje),
    CONSTRAINT fk_chat_mensaje FOREIGN KEY (fk_id_chat) REFERENCES chat (id_chat)
);

CREATE SEQUENCE aumento_mensaje
START WITH 1
INCREMENT BY 1;

CREATE OR REPLACE TRIGGER incremento_mensaje
BEFORE INSERT ON mensaje
FOR EACH ROW
BEGIN
    select aumento_mensaje.nextval into :new.id_mensaje from dual;
END;
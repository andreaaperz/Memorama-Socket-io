CREATE DATABASE DBMemorama;

CREATE TABLE tbl_Juegos(
Nombre VARCHAR(50) NOT NULL,
fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

INSERT INTO tbl_Juegos VALUES ('Cheto');
INSERT INTO tbl_Juegos VALUES ('Martin');

SELECT * FROM tbl_Juegos;

SELECT Juegos FROM tbl_Juegos WHERE NombreUsuario = 'Shareni';

DROP TABLE tbl_Juegos;
DROP DATABASE DBMemorama;

UPDATE tbl_Juegos SET Juegos = 2 WHERE NombreUsuario = 'Shareni';

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345'
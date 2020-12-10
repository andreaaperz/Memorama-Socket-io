CREATE DATABASE DBMemorama;

CREATE TABLE tbl_Juegos(
NombreUsuario VARCHAR(50) NOT NULL,
Juegos INT NOT NULL);

INSERT INTO tbl_Juegos VALUES ('Shareni', 10);

SELECT * FROM tbl_Juegos;

SELECT Juegos FROM tbl_Juegos WHERE NombreUsuario = 'Shareni';
SELECT Juegos FROM tbl_Juegos WHERE NombreUsuario = 'Shareni';

UPDATE tbl_Juegos SET Juegos = 2 WHERE NombreUsuario = 'Shareni';

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '12345'
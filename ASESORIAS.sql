-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: asesorias
-- ------------------------------------------------------
-- Server version	8.0.25

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asesorias`
--

DROP TABLE IF EXISTS `asesorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asesorias` (
  `id_asesoria` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre_asesoria` varchar(100) NOT NULL,
  `descripcion` text,
  `horario` varchar(45) DEFAULT NULL,
  `asesor` int unsigned NOT NULL,
  `division` int unsigned NOT NULL,
  `categoria` int unsigned NOT NULL,
  `estatus` tinyint unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_asesoria`),
  KEY `fk_division_idx` (`division`),
  KEY `fk_categoria_idx` (`categoria`),
  KEY `fk_usuario_idx` (`asesor`),
  CONSTRAINT `fk_categoria` FOREIGN KEY (`categoria`) REFERENCES `categorias` (`id_categoria`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_division` FOREIGN KEY (`division`) REFERENCES `divisiones` (`id_division`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_usuario` FOREIGN KEY (`asesor`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

USE asesorias;

CREATE VIEW VW_Obtener_Divisiones AS
SELECT * FROM divisiones WHERE estatus = 1;

SELECT * FROM VW_Obtener_Divisiones;

CREATE VIEW VW_Obtener_Categorias AS
SELECT c.nombre_categoria, division, c.portada FROM asesorias INNER JOIN categorias as c ON id_categoria = categoria;

SELECT * FROM VW_Obtener_Categorias;

CREATE VIEW VW_Obtener_Asesorias AS
SELECT * FROM asesorias;

SELECT * FROM VW_Obtener_Asesorias;

SELECT * FROM asesorias WHERE division = 1;
SELECT * FROM asesorias INNER JOIN categorias ON id_categoria = categoria WHERE division = 2;

SELECT * FROM asesorias INNER JOIN division ON 
--
-- Dumping data for table `asesorias`
--

LOCK TABLES `asesorias` WRITE;
/*!40000 ALTER TABLE `asesorias` DISABLE KEYS */;
INSERT INTO `asesorias` VALUES (1,'Cálculo Integral','Bases del álculo integral aplicado al turismo','12pm',2,2,1,1),(2,'Base de datos para aplicaciones','Se trabajará en proyectos de base de datos ','2:30pm',1,1,2,1);
/*!40000 ALTER TABLE `asesorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id_categoria` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(60) NOT NULL,
  `estatus` tinyint(1) DEFAULT '1' COMMENT 'Categorias de Asesorias',
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Fisico - Matemático',1),(2,'Tecnología',1);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `divisiones`
--

DROP TABLE IF EXISTS `divisiones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `divisiones` (
  `id_division` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre_division` varchar(45) NOT NULL,
  `portada` varchar(45) DEFAULT 'sin-portada.jpg',
  `estatus` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_division`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

USE asesorias;
ALTER TABLE `categorias` ADD COLUMN portada VARCHAR(30);
ALTER TABLE `asesorias` ADD COLUMN portada VARCHAR(30);
SELECT * FROM categorias;
--
-- Dumping data for table `divisiones`
--

LOCK TABLES `divisiones` WRITE;
/*!40000 ALTER TABLE `divisiones` DISABLE KEYS */;
INSERT INTO `divisiones` VALUES (1,'División de Ingeniería y Tecnología','sin-portada.jpg',1),(2,'División de Turismo','sin-portada.jpg',1);
/*!40000 ALTER TABLE `divisiones` ENABLE KEYS */;
UNLOCK TABLES;
INSERT INTO `divisiones` VALUES (3,'División de Fisioterapia','sin-portada.jpg',1, 2, 'La mejor division de masajes')

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(45) NOT NULL,
  `apellidos_usuario` varchar(45) DEFAULT NULL,
  `correo_electronico` varchar(80) NOT NULL,
  `contrasenia` varchar(100) NOT NULL,
  `tipo_usuario` tinyint unsigned NOT NULL COMMENT 'Administrador, Asesor, etc',
  `estatus` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


DELIMITER //

CREATE PROCEDURE SP_RegistrarUsuarios(nombre varchar(45), apellidos varchar(45), correo varchar(80), contrasenia varchar(100))
BEGIN
INSERT INTO `usuarios` (nombre_usuario, apellidos_usuario, correo_electronico, contrasenia, tipo_usuario) VALUES (nombre, apellidos, correo, contrasenia, 2);
END //

DELIMITER ;

DROP PROCEDURE SP_RegistrarUsuarios;

call SP_RegistrarUsuarios("Juan", "Mendoza", "juanmen1404@gmail.com", "macaco66?");

SELECT * FROM Usuarios;

CREATE VIEW VW_Obtener_Usuarios AS
SELECT * FROM Usuarios;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Rafael','Villegas','rvillegas@utcancun.edu.mx','123',2,1),(2,'Miguel','Ruiz','mruiz@utcancun.edu.mx','123',2,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-23 12:51:51

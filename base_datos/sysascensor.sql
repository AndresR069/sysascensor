-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: sysascensor
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `ascensor`
--

DROP TABLE IF EXISTS `ascensor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ascensor` (
  `id_ascensor` int NOT NULL AUTO_INCREMENT,
  `nombre_lugar` varchar(90) DEFAULT NULL,
  `descripcion_ascensor` varchar(200) DEFAULT NULL,
  `observacion` varchar(500) DEFAULT NULL,
  `id_persona` int DEFAULT NULL,
  `id_sector` int DEFAULT NULL,
  `id_asignacion` int DEFAULT NULL,
  PRIMARY KEY (`id_ascensor`),
  KEY `fk_id_persona_idx` (`id_persona`),
  KEY `fk_id_asignacion_fallo_idx` (`id_asignacion`),
  KEY `fk_id_sector_idx` (`id_sector`),
  CONSTRAINT `fk_id_asignacion_fallo` FOREIGN KEY (`id_asignacion`) REFERENCES `asignacion_fallos` (`id_asignacion_fallos`),
  CONSTRAINT `fk_id_persona` FOREIGN KEY (`id_persona`) REFERENCES `persona` (`id_persona`),
  CONSTRAINT `fk_id_sector` FOREIGN KEY (`id_sector`) REFERENCES `sector` (`id_sector`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ascensor`
--

LOCK TABLES `ascensor` WRITE;
/*!40000 ALTER TABLE `ascensor` DISABLE KEYS */;
/*!40000 ALTER TABLE `ascensor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignacion_fallos`
--

DROP TABLE IF EXISTS `asignacion_fallos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignacion_fallos` (
  `id_asignacion_fallos` int NOT NULL AUTO_INCREMENT,
  `fecha_asignacion` date DEFAULT NULL,
  `id_estado` int DEFAULT NULL,
  KEY `id_asignacion_idx` (`id_asignacion_fallos`),
  KEY `fk_estado_idx` (`id_estado`),
  CONSTRAINT `fk_estado` FOREIGN KEY (`id_estado`) REFERENCES `estado_fallos` (`id_estado_fallos`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignacion_fallos`
--

LOCK TABLES `asignacion_fallos` WRITE;
/*!40000 ALTER TABLE `asignacion_fallos` DISABLE KEYS */;
/*!40000 ALTER TABLE `asignacion_fallos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_fallos`
--

DROP TABLE IF EXISTS `estado_fallos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_fallos` (
  `id_estado_fallos` int NOT NULL AUTO_INCREMENT,
  `nombre_estado` varchar(45) DEFAULT NULL,
  UNIQUE KEY `id_estado_fallos_UNIQUE` (`id_estado_fallos`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_fallos`
--

LOCK TABLES `estado_fallos` WRITE;
/*!40000 ALTER TABLE `estado_fallos` DISABLE KEYS */;
INSERT INTO `estado_fallos` VALUES (1,'Por Definir'),(2,'En curso'),(3,'Finalizado');
/*!40000 ALTER TABLE `estado_fallos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `id_persona` int NOT NULL AUTO_INCREMENT,
  `nombres` varchar(55) DEFAULT NULL,
  `apellidos` varchar(55) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `direccion` varchar(60) DEFAULT NULL,
  `pass` varchar(100) DEFAULT NULL,
  `estado_logeo` tinyint DEFAULT '0',
  `id_rol` int DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id_persona`),
  KEY `fk_rol_idx` (`id_rol`),
  CONSTRAINT `fk_rol` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (23,'Kevin David','Bautista','kevinrocha239@gmial.com','carrera','$2a$08$nCMftEMALFuADj0i8ZmBNucYn4OkoMHXbGeX8iKfl8g6y9lNhbc0e',0,1,'(310) 818-0061'),(26,'andres','torres','andres@gmail.com','carrera','$2a$08$ru.mCl5RkQ.2LWADkI/f6OrdW4wexrsM9OyIUTxV4x/86dAnhxAry',0,2,'3012330022'),(29,'camilo','rodri','camilo@gmail.com','carrera','$2a$08$e/VtR2E7QZZHPplBCaBhcuHCRm0iE7w4J5uqr5Wf2lQiv.5i6mM5u',0,3,'(310) 818-0061');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'administrador'),(2,'tecnico'),(3,'usuario');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sector`
--

DROP TABLE IF EXISTS `sector`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sector` (
  `id_sector` int NOT NULL AUTO_INCREMENT,
  `nombre_sector` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_sector`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sector`
--

LOCK TABLES `sector` WRITE;
/*!40000 ALTER TABLE `sector` DISABLE KEYS */;
INSERT INTO `sector` VALUES (1,'Norte'),(2,'Sur'),(3,'Este'),(4,'Oeste'),(5,'Centro');
/*!40000 ALTER TABLE `sector` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-23 21:20:34

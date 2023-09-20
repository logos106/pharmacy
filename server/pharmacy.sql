-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.28-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.5.0.6677
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table pharmacy.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table pharmacy.sequelizemeta: ~4 rows (approximately)
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20230905165706-create-user.js'),
	('20230905171441-alter-user.js'),
	('20230907172154-create-token.js'),
	('20230915153230-alter-token.js');

-- Dumping structure for table pharmacy.tokens
CREATE TABLE IF NOT EXISTS `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `type` enum('access','refresh','resetPassword','verifyemail') DEFAULT NULL,
  `expires` datetime DEFAULT NULL,
  `blacklisted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table pharmacy.tokens: ~2 rows (approximately)
INSERT INTO `tokens` (`id`, `userID`, `token`, `createdAt`, `updatedAt`, `type`, `expires`, `blacklisted`) VALUES
	(1, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEyLCJpYXQiOjE2OTUwNTg2MzIsImV4cCI6MTY5NTA1ODYzMiwidHlwZSI6InJlZnJlc2gifQ.VjjW6g-APxG4UOoQx4wgD3RV4u1e_l3cGwDR8CI9Zqo', '2023-09-18 17:37:12', '2023-09-18 17:37:12', 'refresh', NULL, NULL),
	(2, NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTUwODgxNzYsImV4cCI6MTY5NTA4ODE3NiwidHlwZSI6InZlcmlmeUVtYWlsIn0.mFUohTrbPTzFBdd4deB6vgaWO9jmm4BBrhrJPw-oaMQ', '2023-09-19 01:49:36', '2023-09-19 01:49:36', '', NULL, NULL);

-- Dumping structure for table pharmacy.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `token` varchar(500) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Dumping data for table pharmacy.users: ~1 rows (approximately)
INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `createdAt`, `updatedAt`, `password`, `role`, `token`, `isActive`) VALUES
	(12, 'Seok', 'Joe', 'kimyoonsoo111@outlook.com', '2023-09-18 17:37:12', '2023-09-18 17:37:12', 'glowGlow1', 'user', NULL, 0);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

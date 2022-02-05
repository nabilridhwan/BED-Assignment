-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: sp_it
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `imageid` int NOT NULL AUTO_INCREMENT,
  `productid` int NOT NULL,
  `url` text NOT NULL,
  `public_id` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`imageid`),
  KEY `fk_productid_image_idx` (`productid`),
  CONSTRAINT `fk_productid_img` FOREIGN KEY (`productid`) REFERENCES `products` (`productid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (45,1,'https://res.cloudinary.com/dqxawxewb/image/upload/v1643033678/product_images/v7pkddsywq7mv4krdcyi.jpg','product_images/v7pkddsywq7mv4krdcyi','2022-01-24 14:14:39'),(46,1,'https://res.cloudinary.com/dqxawxewb/image/upload/v1643033678/product_images/ryyhwutbidm9d6svseal.png','product_images/ryyhwutbidm9d6svseal','2022-01-24 14:14:39'),(47,1,'https://res.cloudinary.com/dqxawxewb/image/upload/v1643033679/product_images/htyd06k7vneddopwbe72.png','product_images/htyd06k7vneddopwbe72','2022-01-24 14:14:39'),(48,3,'https://res.cloudinary.com/dqxawxewb/image/upload/v1643192140/product_images/bchqr1gbpmm0rvf4sjmh.png','product_images/bchqr1gbpmm0rvf4sjmh','2022-01-26 10:15:39'),(49,3,'https://res.cloudinary.com/dqxawxewb/image/upload/v1643192140/product_images/exmofryex4rwjjir6xve.jpg','product_images/exmofryex4rwjjir6xve','2022-01-26 10:15:39'),(56,36,'https://res.cloudinary.com/dqxawxewb/image/upload/v1643722542/product_images/xjpbrbjjk7drtdrbcsxr.jpg','product_images/xjpbrbjjk7drtdrbcsxr','2022-02-01 13:35:42'),(57,36,'https://res.cloudinary.com/dqxawxewb/image/upload/v1643722541/product_images/mynnqgtfksdzf3hpceur.jpg','product_images/mynnqgtfksdzf3hpceur','2022-02-01 13:35:42'),(58,35,'https://res.cloudinary.com/dqxawxewb/image/upload/v1643956586/product_images/jzqkuwqn3lvj1agz09rt.jpg','product_images/jzqkuwqn3lvj1agz09rt','2022-02-04 06:36:25'),(59,35,'https://res.cloudinary.com/dqxawxewb/image/upload/v1643956586/product_images/unvfiu4k8jhxtwahpotr.jpg','product_images/unvfiu4k8jhxtwahpotr','2022-02-04 06:36:25'),(60,37,'https://res.cloudinary.com/dqxawxewb/image/upload/v1644053432/product_images/deyptecp3lhjczrmcth0.jpg','product_images/deyptecp3lhjczrmcth0','2022-02-05 09:30:32');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-05 18:06:46

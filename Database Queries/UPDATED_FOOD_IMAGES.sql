-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: web_food
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `apply_for`
--

DROP TABLE IF EXISTS `apply_for`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apply_for` (
  `VoucherID` bigint NOT NULL,
  `ComboID` bigint NOT NULL,
  `FoodID` bigint NOT NULL,
  `SalePercent` bigint DEFAULT NULL,
  PRIMARY KEY (`VoucherID`,`FoodID`,`ComboID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apply_for`
--

LOCK TABLES `apply_for` WRITE;
/*!40000 ALTER TABLE `apply_for` DISABLE KEYS */;
INSERT INTO `apply_for` VALUES (1,2,0,20),(2,1,0,20),(3,2,0,30),(4,1,0,10),(5,1,0,20),(6,0,2,20),(7,0,1,20),(8,0,1,30),(9,0,2,10),(10,0,3,20);
/*!40000 ALTER TABLE `apply_for` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank_account`
--

DROP TABLE IF EXISTS `bank_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank_account` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `bank_account_number` varchar(256) DEFAULT NULL,
  `bank_account_owner` varchar(256) DEFAULT NULL,
  `bank_account_type` varchar(256) DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `valid_start` date DEFAULT NULL,
  `valid_end` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_account`
--

LOCK TABLES `bank_account` WRITE;
/*!40000 ALTER TABLE `bank_account` DISABLE KEYS */;
INSERT INTO `bank_account` VALUES (1,1,'900119775222544','Nguyen Hoang THinh','OCB',150000,'2000-01-01','2025-10-01'),(2,2,'900119771114','Thinh Nguyen Hoang','Vietcombank',2250000,'2000-01-01','2025-10-01'),(3,3,'900148974454','Hoang THinh Nguyen','BIDV',150000,'2000-01-01','2025-10-01'),(4,4,'80119775222544','Thinh Thinh Thinh','Algribank',1150000,'2000-01-01','2025-10-01');
/*!40000 ALTER TABLE `bank_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `FoodID` bigint NOT NULL,
  `ComboID` bigint NOT NULL,
  `UserID` bigint NOT NULL,
  `Quantity` int DEFAULT NULL,
  PRIMARY KEY (`FoodID`,`ComboID`,`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (0,1,4,1),(0,3,4,2),(0,5,4,1),(1,0,2,2),(2,0,4,2),(3,0,1,1),(3,0,2,2),(4,0,4,1),(5,0,2,1);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cartfood`
--

DROP TABLE IF EXISTS `cartfood`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cartfood` (
  `FoodID` bigint NOT NULL,
  `UserID` bigint NOT NULL,
  `Quantity` int DEFAULT NULL,
  PRIMARY KEY (`FoodID`,`UserID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartfood`
--

LOCK TABLES `cartfood` WRITE;
/*!40000 ALTER TABLE `cartfood` DISABLE KEYS */;
INSERT INTO `cartfood` VALUES (11,1,1),(12,4,2),(13,2,2),(14,3,1),(15,4,1);
/*!40000 ALTER TABLE `cartfood` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_tag`
--

DROP TABLE IF EXISTS `category_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_tag` (
  `TagID` bigint NOT NULL,
  `FoodID` bigint NOT NULL,
  `ComboID` bigint NOT NULL,
  PRIMARY KEY (`TagID`,`FoodID`,`ComboID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_tag`
--

LOCK TABLES `category_tag` WRITE;
/*!40000 ALTER TABLE `category_tag` DISABLE KEYS */;
INSERT INTO `category_tag` VALUES (1,0,3),(2,0,4),(3,0,2),(3,0,4),(4,0,2),(4,0,5),(5,0,3),(5,0,5);
/*!40000 ALTER TABLE `category_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `combo`
--

DROP TABLE IF EXISTS `combo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `combo` (
  `ComboID` bigint NOT NULL AUTO_INCREMENT,
  `ComboName` varchar(255) NOT NULL,
  `ComboDescrip` text,
  `Price` int NOT NULL,
  PRIMARY KEY (`ComboID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `combo`
--

LOCK TABLES `combo` WRITE;
/*!40000 ALTER TABLE `combo` DISABLE KEYS */;
INSERT INTO `combo` VALUES (1,'Combo th??? 2','Th???t l???n rim ti??u + Tr???ng ????c th???t',150000),(2,'Combo th??? 3','Th???t l???n rim ti??u + Canh chua th???t',120000),(3,'Combo th??? 4','Th???t l???n rim ti??u + ?????u s???t c?? chua + Canh chua th???t',180000),(4,'Combo th??? 5','?????u s???t c?? chua + Canh chua th???t',100000),(5,'Combo cu???i tu???n','B?? n?????ng l?? l???t + Canh chua th???t ',300000);
/*!40000 ALTER TABLE `combo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_for`
--

DROP TABLE IF EXISTS `comment_for`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_for` (
  `FoodID` bigint DEFAULT NULL,
  `ComboID` bigint DEFAULT NULL,
  `CommentID` bigint NOT NULL,
  PRIMARY KEY (`CommentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_for`
--

LOCK TABLES `comment_for` WRITE;
/*!40000 ALTER TABLE `comment_for` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment_for` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contains`
--

DROP TABLE IF EXISTS `contains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contains` (
  `ComboID` bigint NOT NULL,
  `FoodID` bigint NOT NULL,
  `OrderID` bigint NOT NULL,
  PRIMARY KEY (`OrderID`,`FoodID`,`ComboID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contains`
--

LOCK TABLES `contains` WRITE;
/*!40000 ALTER TABLE `contains` DISABLE KEYS */;
INSERT INTO `contains` VALUES (119284,3,109182),(123478,1,129932),(627394,2,319292),(829385,5,590122),(729019,8,627129),(192094,7,678129),(928341,4,819232),(918384,6,891203);
/*!40000 ALTER TABLE `contains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `evaluation`
--

DROP TABLE IF EXISTS `evaluation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `evaluation` (
  `CommentID` bigint NOT NULL,
  `UserID` bigint NOT NULL,
  `Comment` text NOT NULL,
  `Rating` int NOT NULL,
  PRIMARY KEY (`CommentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `evaluation`
--

LOCK TABLES `evaluation` WRITE;
/*!40000 ALTER TABLE `evaluation` DISABLE KEYS */;
/*!40000 ALTER TABLE `evaluation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `food`
--

DROP TABLE IF EXISTS `food`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `food` (
  `FoodID` bigint NOT NULL AUTO_INCREMENT,
  `FoodName` varchar(255) NOT NULL,
  `Picture` text,
  `Price` int NOT NULL,
  `Description` text,
  `Instruct` text,
  `Sale` bigint DEFAULT NULL,
  PRIMARY KEY (`FoodID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `food`
--

LOCK TABLES `food` WRITE;
/*!40000 ALTER TABLE `food` DISABLE KEYS */;
INSERT INTO `food` VALUES (1,'Th???t l???n rim ti??u','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2F7ttta31593350374.jpg?alt=media&token=3273e990-5d69-4773-a9cf-9dd71c5fad09',120000,'Th???t kho l?? m??n m???n d??ng ch??nh trong b???a c??m c???a ng?????i Vi???t, b??n c???nh m??n canh v?? m??n rau. H??m nay b???p kho qu???t s??? gi???i thi???u ?????n c??c b???n m??n th???t kho ti??u, c??ng l?? m??n ???????c c??c ch??? em th?????ng xuy??n ch??? bi???n, nh??ng ????? l??m ????ng chu???n v??? m??u s???c v?? m??i v??? th?? ch???c h???n nhi???u ng?????i c??n b??? ng???. N??o, c??n ch??? g?? n???a, ch??ng ta b???t tay v??o l??m m??n th???t kho ti??u cho k???p b???a c??m chi???u nh??!','',0),(2,'Tr???ng ????c th???t','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2Frc2.jpg?alt=media&token=344ef6ab-53ce-4ca4-93f5-1d7245f17f14',80000,'M??n tr???ng ????c th???t l?? m???t m??n d??? l??m, d??? ??n. ?????c bi???t l?? tr??? em, g???n nh?? b?? n??o c??ng th??ch ??n tr???ng nh??ng ????i khi l???i kh??ng th??ch ??n th???t v?? dai. V???i c??ch l??m tr???ng ????c th???t n??y, th???t m???m v?? ngon, tr???ng r??n v??ng th??m l???ng kh???p c??? nh??, h????ng v??? r???t k??ch th??ch v???i c??c b??. H??n n???a v??o nh???ng ng??y b???n r???n B???n ch??? c???n m???t v??i ph??t l?? ???? c?? ngay m???t m??n ??n th??m ngon m?? v???n ?????y ????? ch???t dinh d?????ng cho c??? nh?? r???i.','',0),(3,'?????u s???t c?? chua','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2F1529442316.jpg?alt=media&token=c95c7a15-e7f6-49ca-a388-e7aac79182a9',60000,'?????u s???t c?? chua ????ng nh?? t??n g???i, ????y l?? m??n ??n v???i th??nh ph???n ch??nh v???i ?????u ph??? ???????c r??n gi??n sau ???? ??em s???t v???i c?? chua. B???ng vi???c ??em s???t v???i c?? chua, t???ng mi???ng ?????u ???????c kho??c th??m l???p ??o ????? ?????p m???t v???i h????ng v??? ?????m ???? h??n.','',0),(4,'Canh chua th???t','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2Fmit-thai-cai-be-2-800x800.jpg?alt=media&token=f521c714-d881-4d5a-9dc5-b0f5065136e0',60000,'M??n canh c?? chua th???t b???m l?? m???t trong nh???ng m??n ??n ph??? bi???n v?? d??? l??m nh???t trong c??c b???a ??n h??ng ng??y. M??n ??n n??y s??? mang l???i h????ng v??? th??m ngon, ??n m??i kh??ng ch??n b???t k??? tr???i n??ng hay l???nh cho ng?????i th??n c???a b???n. B???n c?? th??? ??n k??m m??n canh n??y c??ng v???i m??n t??m chi??n gi??n cho b???a ??n th??m tr??n v???.','',0),(5,'B?? n?????ng l?? l???t','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2Fxrptpq1483909204.jpg?alt=media&token=c17810b8-5ffe-4d95-bcb5-d8b335421240',270000,'B?? n?????ng l?? l???t hay c??n g???i l?? b?? l?? l???t ho???c l?? th???t b?? l?? l???t hay b?? cu???n l?? l???t l?? m???t m??n ??n trong ???m th???c Vi???t Nam, th???nh h??nh ??? v??ng Nam b???, nguy??n li???u ch??nh l?? th???t b?? v?? l?? l???t ???????c ch??? bi???n theo ph????ng ph??p n?????ng, c?? th??? k??m theo m??? ch??i. C??c lo???i rau s???ng ??n k??m r???t phong ph?? nh??: x?? l??ch, h??ng qu???, di???p c??, chu???i ch??t, d??a leo, kh??? v?? ch???m m???m n??m. M??n n??y ?????c tr??ng b???i v??? h???p d???n v???i v??? ngon c???a th???t b?? n?????ng l?? l???t, b??o c???a ?????u ph???ng h??a chung v??? ch??t c???a chu???i, chua c???a kh???, v??? thanh thanh c???a nhi???u lo???i rau gi??n m??t, c??ng h????ng m???m n??m cay cay','',0);
/*!40000 ALTER TABLE `food` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `includes`
--

DROP TABLE IF EXISTS `includes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `includes` (
  `FoodID` bigint NOT NULL,
  `ComboID` bigint NOT NULL,
  PRIMARY KEY (`ComboID`,`FoodID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `includes`
--

LOCK TABLES `includes` WRITE;
/*!40000 ALTER TABLE `includes` DISABLE KEYS */;
INSERT INTO `includes` VALUES (1,1),(2,1),(3,1),(5,1),(1,2),(4,2),(1,3),(3,3),(4,3),(3,4),(4,4),(4,5),(5,5);
/*!40000 ALTER TABLE `includes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `makeby`
--

DROP TABLE IF EXISTS `makeby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `makeby` (
  `MaterialID` bigint NOT NULL AUTO_INCREMENT,
  `FoodID` bigint NOT NULL,
  PRIMARY KEY (`MaterialID`,`FoodID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `makeby`
--

LOCK TABLES `makeby` WRITE;
/*!40000 ALTER TABLE `makeby` DISABLE KEYS */;
INSERT INTO `makeby` VALUES (1,1),(1,4),(2,1),(2,2),(2,5),(3,3),(5,1),(5,4),(5,5),(6,2),(7,3);
/*!40000 ALTER TABLE `makeby` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `material` (
  `MaterialID` bigint NOT NULL AUTO_INCREMENT,
  `MaterialName` varchar(255) DEFAULT NULL,
  `Picture` text,
  PRIMARY KEY (`MaterialID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (10,'Tr???ng','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FEgg.png?alt=media&token=afe1561d-fb54-47f1-9b35-10deeaa06080'),(11,'Th???t heo ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FHam.png?alt=media&token=4004a1a1-a5f3-4f70-bbd2-b05ce2d47e37'),(12,'C???i xanh ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FLettuce.png?alt=media&token=e6bc5dd7-3b3f-4e58-86a9-429c41e3c91b'),(13,'T???i ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FGarlic.png?alt=media&token=47a7ec01-bff7-42a1-8690-0654d40df85b'),(14,'???t b???m','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FRed%20Chilli.png?alt=media&token=2aed6787-4dd7-4fa0-aa71-69f6373c57ab'),(15,'C?? chua ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FTomato.png?alt=media&token=5f6b7ace-6316-4535-bf38-ad7bb79221a3');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `NewsID` bigint NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) DEFAULT NULL,
  `Picture` text,
  `Highlight` text,
  `Content` text,
  `Author` text,
  PRIMARY KEY (`NewsID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'B?????c chuy???n m??nh c???a gia ????nh c?? truy???n th???ng n???u th???ch su???t 35 n??m t???i ?????t H?? th??nh','','','Qu??? kh??ng ngoa khi n??i th???ch ??en l?? m??n ??n truy???n th???ng ?????t Kinh K???, ai sinh ra v?? l???n l??n ??? n??i ????y m?? l???i ch??a t???ng qua m???t th???i m?? m???n th???c qu?? ch??? n??y. C??n nh??? nh???ng chi???u ng???i ng??ng ti???ng rao: \"Ai t??o ph??? ????... Ai t??o ph??? n??o...\", l?? c??? ????m con n??t ch???y ??o ra xo?? nh???ng ?????ng ti???n l??? t??ch g??p m???y ng??y tr???i ch??? ????? th?????ng th???c \"c???c ph???m\" m??a h?? - t??o ph??? n?????c ???????ng c??ng th???ch ??en. Ng?????i ta n??i: D??n H?? th??nh s??nh ??n b???c nh???t qu??? l?? kh??ng ch??t sai l???ch! C??i v??? nh???t nh???t, m???t ch??t ng???y ng???y, m???m m???m c???a t??o ph??? k???t h???p v???i v??? ng???t thanh c???a n?????c ???????ng r???i ??i???m th??m ch??t th???ch ??en dai gi??n s???n s???t, c??i m??i ?????c tr??ng kh??ng l???n v??o ????u ???????c th?? qu??? th???t l?? tuy???t c??. Ngh?? th??i c??ng mu???n ch???y n?????c mi???ng lu??n ???y! C?? th??? n??i, ????? l??m m???i m??nh sau h??n 35 n??m l?? ??i???u kh?? kh??n v?? l?? nhi???m v??? m?? Chiko lu??n n??? l???c theo ??u???i ????? mang t???i nh???ng s???n ph???m t???t nh???t ?????n tay kh??ch h??ng.',''),(2,'C??ch l??m b??nh h??nh qu??? t??o','','','L??c r???nh r???i b???n c?? th??? th??? l??m chi???c b??nh h??nh tr??i t??o v???a xinh x???n l???i th??m ngon, kh??ng c???n qu?? nhi???u hoa tay l???i c?? th??? g??y b???t ng??? v???i m???i ng?????i trong gia ????nh.',''),(3,'C??ch l??m b??nh h??nh qu??? t??o','','','L??c r???nh r???i b???n c?? th??? th??? l??m chi???c b??nh h??nh tr??i t??o v???a xinh x???n l???i th??m ngon, kh??ng c???n qu?? nhi???u hoa tay l???i c?? th??? g??y b???t ng??? v???i m???i ng?????i trong gia ????nh.',''),(4,'B?????c chuy???n m??nh c???a gia ????nh c?? truy???n th???ng n???u th???ch su???t 35 n??m t???i ?????t H?? th??nh','','','t??o ph??? n??o...\", l?? c??? ????m con n??t ch???y ??o ra xo?? nh???ng ?????ng ti???n l??? t??ch g??p m???y ng??y tr???i ch??? ????? th?????ng th???c \"c???c ph???m\" m??a h?? - t??o ph??? n?????c ???????ng c??ng th???ch ??en. Ng?????i ta n??i: D??n H?? th??nh s??nh ??n b???c nh???t qu??? l?? kh??ng ch??t sai l???ch! C??i v??? nh???t nh???t, m???t ch??t ng???y ng???y, m???m m???m c???a t??o ph??? k???t h???p v???i v??? ng???t thanh c???a n?????c ???????ng r???i ??i???m th??m ch??t th???ch ??en dai gi??n s???n s???t, c??i m??i ?????c tr??ng kh??ng l???n v??o ????u ???????c th?? qu??? th???t l?? tuy???t c??. Ngh?? th??i c??ng mu???n ch???y n?????c mi???ng lu??n ???y! C?? th??? n??i, ????? l??m m???i m??nh sau h??n 35 n??m l?? ??i???u kh?? kh??n v?? l?? nhi???m v??? m?? Chiko lu??n n??? l???c theo ??u???i ????? mang t???i nh???ng s???n ph???m t???t nh???t ?????n tay kh??ch h??ng.','');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderbill`
--

DROP TABLE IF EXISTS `orderbill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderbill` (
  `OrderID` bigint NOT NULL,
  `Price` int NOT NULL,
  `OrderStatus` varchar(255) DEFAULT NULL,
  `UserID` bigint NOT NULL,
  PRIMARY KEY (`OrderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderbill`
--

LOCK TABLES `orderbill` WRITE;
/*!40000 ALTER TABLE `orderbill` DISABLE KEYS */;
INSERT INTO `orderbill` VALUES (119284,200000,'PROCESSING',829334),(123478,200000,'PROCESSING',151234),(192094,200000,'PROCESSING',819932),(627394,200000,'PROCESSING',151234),(729019,200000,'PROCESSING',124512),(829385,200000,'PROCESSING',827484),(918384,200000,'PROCESSING',819932),(928341,200000,'PROCESSING',124512);
/*!40000 ALTER TABLE `orderbill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `ServiceID` bigint NOT NULL,
  `ServiceInfo` text NOT NULL,
  `ServiceName` varchar(255) DEFAULT NULL,
  `BannerImage` text,
  PRIMARY KEY (`ServiceID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (819292,'Service Info 1','ServiceName 1','BannerImage 1'),(819293,'Service Info 3','ServiceName 3','BannerImage 3'),(819294,'Service Info 4','ServiceName 4','BannerImage 4'),(819295,'Service Info 2','ServiceName 2','BannerImage 2'),(819296,'Service Info 5','ServiceName 5','BannerImage 5');
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tag` (
  `TagID` bigint NOT NULL AUTO_INCREMENT,
  `TagName` text,
  PRIMARY KEY (`TagID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (1,'Cay'),(2,'Chua'),(3,'M??n n?????c'),(4,'M??n chay'),(5,'???????ng ph???');
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `time` timestamp NULL DEFAULT NULL,
  `description` text,
  `amount` bigint DEFAULT NULL,
  `orderID` bigint DEFAULT NULL,
  `userID` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,'2020-12-31 17:00:01','Tra tien cho nguoi choi',3000000,1,2),(2,'2018-05-02 17:00:01','Tra tien cho nguoi choi',6000000,1,2),(3,'2019-10-31 17:00:01','Tra tien cho nguoi choi',5000000,1,2),(4,'2020-10-31 17:00:01','Tra tien cho nguoi choi',4000000,1,2),(5,'2021-12-31 17:00:01','Tra tien cho nguoi choi',3000000,1,2),(6,'2020-12-31 17:00:01','Tra tien cho nguoi choi',3000000,1,4),(7,'2018-05-02 17:00:01','Tra tien cho nguoi choi',6000000,1,4),(8,'2019-10-31 17:00:01','Tra tien cho nguoi choi',5000000,1,4),(9,'2020-10-31 17:00:01','Tra tien cho nguoi choi',4000000,1,4),(10,'2021-12-31 17:00:01','Tra tien cho nguoi choi',3000000,1,4);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_account`
--

DROP TABLE IF EXISTS `user_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_account` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_account`
--

LOCK TABLES `user_account` WRITE;
/*!40000 ALTER TABLE `user_account` DISABLE KEYS */;
INSERT INTO `user_account` VALUES (1,'zxcvzxcvzxcv','$2y$10$MXYHr/kmXibWR9mNtKMcIe0FQO9DOHyFXnrQFj/wBk7K331v60QTi','ADMIN'),(2,'asdfasdfasdf','$2y$10$nW6P2JVt2VYNYvXoZ5Vzp.pTChzMgOifg1Si3pyFymdgdtpp9AUMO','CUSTOMER'),(3,'admin','$2y$10$wM.ULD391HU3QTHVcacpt.MyplIDjGIb3tuWi6A4ZTf/dUwp4QRdC','ADMIN'),(4,'customer','$2y$10$vSETY0yhweJ9Mo6SkTHIF.3x0fLwjmyrefl9.1WF0sv3M2js2MPA2','CUSTOMER');
/*!40000 ALTER TABLE `user_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profile` (
  `Id` bigint NOT NULL AUTO_INCREMENT,
  `AccountID` bigint DEFAULT NULL,
  `AvatarURI` text,
  `FullName` varchar(255) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Point` bigint DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `PhoneNumber` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES (1,1,'','Nguyen Hoang Thinh','2000-01-01','thinh@gmail.com',13,'S??? 85-87 Tr???n H??ng ?????o, Ho??n Ki???m, TP. H?? N???i','099761235'),(2,2,'','Tran Hoang Khoi','2012-01-01','khoi@gmail.com',13,'S??? 268 Tr???n H??ng ?????o, P. Nguy???n C?? Trinh, Q.1, TP. HCM','099761235'),(3,3,'','Hua Phuoc Thuan','2011-01-01','thuan@gmail.com',14,'S??? 80 L?? L???i - Th??nh ph??? ???? N???ng','099761235'),(4,4,'','Khong Manh Quyen','2002-01-01','quyen@gmail.com',12,'S??? 9A Tr???n Ph??, P. C??i Kh???, Q. Ninh Ki???u, TP. C???n Th??','099761235'),(5,5,'','Le Huu Hieu','2011-01-01','hieu@gmail.com',16,'S??? 2 Th???ng Nh???t, P.1, Tp. V??ng T??u','099761235'),(6,6,'','Huu Hieu','2011-01-12','hieu@gmail.com',16,'S??? 2 Th???ng Nh???t, P.1, Tp. V??ng T??u','099761235'),(7,7,'','Huu HieASDu','2011-01-12','hieu@gmail.com',16,'S??? 2 Th???ng Nh???t, P.1, Tp. V??ng T??u','099761235');
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_ref_tag`
--

DROP TABLE IF EXISTS `user_ref_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_ref_tag` (
  `TagID` bigint NOT NULL,
  `UserID` bigint NOT NULL,
  `Count` bigint DEFAULT NULL,
  PRIMARY KEY (`UserID`,`TagID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_ref_tag`
--

LOCK TABLES `user_ref_tag` WRITE;
/*!40000 ALTER TABLE `user_ref_tag` DISABLE KEYS */;
INSERT INTO `user_ref_tag` VALUES (1,1,0),(2,1,0),(3,1,0),(4,1,0),(5,1,0),(1,2,0),(2,2,0),(3,2,0),(4,2,0),(5,2,0),(1,7,0),(2,7,1),(3,7,2),(4,7,1),(5,7,1),(6,7,3);
/*!40000 ALTER TABLE `user_ref_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `voucher`
--

DROP TABLE IF EXISTS `voucher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `voucher` (
  `VoucherID` bigint NOT NULL AUTO_INCREMENT,
  `ExpirationDate` date DEFAULT NULL,
  `Description` text,
  `VoucherName` varchar(255) DEFAULT NULL,
  `UserID` bigint DEFAULT NULL,
  PRIMARY KEY (`VoucherID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `voucher`
--

LOCK TABLES `voucher` WRITE;
/*!40000 ALTER TABLE `voucher` DISABLE KEYS */;
INSERT INTO `voucher` VALUES (1,'2021-01-01','Voucher description ID 1','Weeken Voucher',2),(2,'2020-01-01','Voucher description ID 2','Wednesday Voucher',4),(3,'2020-11-11','Voucher description ID 3','Tuesday Voucher',2),(4,'2019-01-09','Voucher description ID 4','Thursday Voucher',4),(5,'2021-03-07','Voucher description ID 5','Friday Voucher',2),(6,'2021-01-01','Voucher description ID 1','Weeken Voucher',4),(7,'2020-01-01','Voucher description ID 2','Wednesday Voucher',2),(8,'2020-11-11','Voucher description ID 3','Tuesday Voucher',4),(9,'2019-01-09','Voucher description ID 4','Thursday Voucher',2),(10,'2021-03-07','Voucher description ID 5','Friday Voucher',4);
/*!40000 ALTER TABLE `voucher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wish_list`
--

DROP TABLE IF EXISTS `wish_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wish_list` (
  `WishListID` bigint NOT NULL AUTO_INCREMENT,
  `UserID` bigint NOT NULL,
  `ComboID` bigint NOT NULL,
  `FoodID` bigint NOT NULL,
  PRIMARY KEY (`WishListID`,`UserID`,`FoodID`,`ComboID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wish_list`
--

LOCK TABLES `wish_list` WRITE;
/*!40000 ALTER TABLE `wish_list` DISABLE KEYS */;
INSERT INTO `wish_list` VALUES (1,2,0,1),(2,2,0,2),(3,2,0,3),(4,2,0,4),(5,2,0,5),(6,2,0,1),(7,2,0,2),(8,2,0,3),(9,2,0,4),(10,4,1,0),(11,4,2,0),(12,4,3,0),(13,4,4,0),(14,4,5,0),(15,4,1,0),(16,4,2,0),(17,4,3,0),(18,4,4,0),(19,4,5,0);
/*!40000 ALTER TABLE `wish_list` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-28 19:07:25

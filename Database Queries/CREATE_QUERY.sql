DROP TABLE IF EXISTS VOUCHER; 
CREATE TABLE VOUCHER (
	VoucherID BIGINT(8) NOT NULL AUTO_INCREMENT,
    ExpirationDate DATE, 
    Description TEXT, 
    VoucherName VARCHAR(255), 
    UserID BIGINT(8), 
    SalePercent BIGINT(8),
    PRIMARY KEY(VoucherID)
);
INSERT INTO VOUCHER(ExpirationDate, Description, VoucherName, UserID, SalePercent) VALUES ('2021-01-01','Voucher description ID 1', 'Weeken Voucher', 2, 10);
INSERT INTO VOUCHER(ExpirationDate, Description, VoucherName, UserID, SalePercent) VALUES ('2020-01-01','Voucher description ID 2', 'Wednesday Voucher', 4, 20);
INSERT INTO VOUCHER(ExpirationDate, Description, VoucherName, UserID, SalePercent) VALUES ('2020-11-11','Voucher description ID 3', 'Tuesday Voucher', 2, 30);
INSERT INTO VOUCHER(ExpirationDate, Description, VoucherName, UserID, SalePercent) VALUES ('2019-01-09','Voucher description ID 4', 'Thursday Voucher', 4, 25);
INSERT INTO VOUCHER(ExpirationDate, Description, VoucherName, UserID, SalePercent) VALUES ('2021-03-07','Voucher description ID 5' , 'Friday Voucher',2, 35);
INSERT INTO VOUCHER(ExpirationDate, Description, VoucherName, UserID, SalePercent) VALUES ('2021-01-01','Voucher description ID 1', 'Weeken Voucher',4, 25);
INSERT INTO VOUCHER(ExpirationDate, Description, VoucherName, UserID, SalePercent) VALUES ('2020-01-01','Voucher description ID 2', 'Wednesday Voucher',2, 50);
INSERT INTO VOUCHER(ExpirationDate, Description, VoucherName, UserID, SalePercent) VALUES ('2020-11-11','Voucher description ID 3', 'Tuesday Voucher',4, 10);
INSERT INTO VOUCHER(ExpirationDate, Description, VoucherName, UserID, SalePercent) VALUES ('2019-01-09','Voucher description ID 4', 'Thursday Voucher',2, 75);
INSERT INTO VOUCHER(ExpirationDate, Description, VoucherName, UserID, SalePercent) VALUES ('2021-03-07','Voucher description ID 5' , 'Friday Voucher',4, 80);




DROP TABLE IF EXISTS USER_PROFILE; 
DROP TABLE IF EXISTS USER_PROFILE; 
CREATE TABLE USER_PROFILE(Id BIGINT(8) NOT NULL auto_increment,AccountID BIGINT(8),AvatarURI TEXT, FullName VARCHAR(255), UserName VARCHAR(255), DOB DATE, Email VARCHAR(255), Point BIGINT(8),BankAccountID BIGINT(8) ,Address VARCHAR(255), PhoneNumber VARCHAR(255), PRIMARY KEY (Id)); 
INSERT INTO USER_PROFILE(AccountID , FullName, UserName, AvatarURI, DOB, Email, Point, BankAccountID, Address, PhoneNumber) VALUES(1,'Nguyen Hoang Thinh', 'thinhhaha13','','2000-01-01', 'thinh@gmail.com', 13, 3,'S??? 85-87 Tr???n H??ng ?????o, Ho??n Ki???m, TP. H?? N???i','099761235');
INSERT INTO USER_PROFILE(AccountID , FullName, UserName,  AvatarURI, DOB, Email, Point, BankAccountID, Address, PhoneNumber) VALUES(2,'Tran Hoang Khoi', 'khoi1213','','2012-01-01', 'khoi@gmail.com', 13, 3,'S??? 268 Tr???n H??ng ?????o, P. Nguy???n C?? Trinh, Q.1, TP. HCM','099761235');
INSERT INTO USER_PROFILE(AccountID , FullName, UserName, AvatarURI, DOB, Email, Point, BankAccountID, Address, PhoneNumber) VALUES(3,'Hua Phuoc Thuan', 'thuan33','','2011-01-01', 'thuan@gmail.com', 14, 3,'S??? 80 L?? L???i - Th??nh ph??? ???? N???ng','099761235');
INSERT INTO USER_PROFILE(AccountID , FullName, UserName,  AvatarURI,DOB, Email, Point, BankAccountID, Address, PhoneNumber) VALUES(4,'Khong Manh Quyen', 'quyenhaha13','','2002-01-01', 'quyen@gmail.com', 12, 3,'S??? 9A Tr???n Ph??, P. C??i Kh???, Q. Ninh Ki???u, TP. C???n Th??','099761235');
INSERT INTO USER_PROFILE(AccountID , FullName, UserName, AvatarURI, DOB, Email, Point, BankAccountID, Address, PhoneNumber) VALUES(5,'Le Huu Hieu', 'hieuhaha13','','2011-01-01', 'hieu@gmail.com', 16, 3,'S??? 2 Th???ng Nh???t, P.1, Tp. V??ng T??u','099761235');
INSERT INTO USER_PROFILE(AccountID , FullName, UserName, AvatarURI, DOB, Email, Point, BankAccountID, Address, PhoneNumber) VALUES(6,'Huu Hieu', 'asdhaha13','','2011-01-12', 'hieu@gmail.com', 16, 3,'S??? 2 Th???ng Nh???t, P.1, Tp. V??ng T??u','099761235');
INSERT INTO USER_PROFILE(AccountID , FullName, UserName, AvatarURI, DOB, Email, Point, BankAccountID, Address, PhoneNumber) VALUES(7,'Huu HieASDu', 'asfdasdhaha13','','2011-01-12', 'hieu@gmail.com', 16, 3,'S??? 2 Th???ng Nh???t, P.1, Tp. V??ng T??u','099761235');
ALTER TABLE user_profile drop BankAccountID;
ALTER TABLE user_profile drop UserName;
-- User Profile: UserID --> UserAccounservicet: UserId 
DROP TABLE IF EXISTS USER_ACCOUNT; 
CREATE TABLE USER_ACCOUNT(Id BIGINT(8) NOT NULL auto_increment, Username VARCHAR(255), Password Varchar(255),Role Varchar(255), PRIMARY KEY (Id)); 
INSERT INTO USER_ACCOUNT(Username,Password,Role) VALUES('zxcvzxcvzxcv','$2y$10$MXYHr/kmXibWR9mNtKMcIe0FQO9DOHyFXnrQFj/wBk7K331v60QTi','ADMIN');
INSERT INTO USER_ACCOUNT(Username,Password,Role) VALUES('asdfasdfasdf','$2y$10$nW6P2JVt2VYNYvXoZ5Vzp.pTChzMgOifg1Si3pyFymdgdtpp9AUMO','CUSTOMER');
INSERT INTO USER_ACCOUNT(Username,Password,Role) VALUES('admin','$2y$10$wM.ULD391HU3QTHVcacpt.MyplIDjGIb3tuWi6A4ZTf/dUwp4QRdC','ADMIN');
INSERT INTO USER_ACCOUNT(Username,Password,Role) VALUES('customer','$2y$10$vSETY0yhweJ9Mo6SkTHIF.3x0fLwjmyrefl9.1WF0sv3M2js2MPA2','CUSTOMER');

-- DROP TABLE IF EXISTS USER_OWNS_BANK_ACCOUNT; 
-- CREATE TABLE USER_OWNS_BANK_ACCOUNT(Id BIGINT(8) NOT NULL auto_increment, UserID BIGINT(8), BankAccountID BIGINT(8), PRIMARY KEY (Id)); 
-- INSERT INTO USER_OWNS_BANK_ACCOUNT(UserID,BankAccountID) VALUES(1,2);
-- INSERT INTO USER_OWNS_BANK_ACCOUNT(UserID,BankAccountID) VALUES(2,5);
-- INSERT INTO USER_OWNS_BANK_ACCOUNT(UserID,BankAccountID) VALUES(3,3);
-- INSERT INTO USER_OWNS_BANK_ACCOUNT(UserID,BankAccountID) VALUES(4,6);
-- INSERT INTO USER_OWNS_BANK_ACCOUNT(UserID,BankAccountID) VALUES(3,7);

DROP TABLE IF EXISTS BANK_ACCOUNT; 
CREATE TABLE BANK_ACCOUNT(
	id BIGINT(8) NOT NULL auto_increment,
    user_id BIGINT(8), 
    bank_account_number VARCHAR(256), 
    bank_account_owner VARCHAR(256),
    bank_account_type VARCHAR(256), 
    balance float, 
    valid_start DATE,
    valid_end DATE,
    PRIMARY KEY (Id)
); 
-- INSERT INTO BANK_ACCOUNT(user_id,bank_account_number, bank_account_owner, bank_account_type, balance, valid_start, valid_end) VALUES(1,'900119775222544','Nguyen Hoang THinh','OCB','150000','2000-01-01','2025-10-01');
-- INSERT INTO BANK_ACCOUNT(user_id,bank_account_number, bank_account_owner, bank_account_type, balance, valid_start, valid_end) VALUES(2,'900119771114','Thinh Nguyen Hoang','Vietcombank','2250000','2000-01-01','2025-10-01');
-- INSERT INTO BANK_ACCOUNT(user_id,bank_account_number, bank_account_owner, bank_account_type, balance, valid_start, valid_end) VALUES(3,'900148974454','Hoang THinh Nguyen','BIDV','150000','2000-01-01','2025-10-01');
-- INSERT INTO BANK_ACCOUNT(user_id,bank_account_number, bank_account_owner, bank_account_type, balance, valid_start, valid_end) VALUES(4,'80119775222544','Thinh Thinh Thinh','Algribank','1150000','2000-01-01','2025-10-01');
INSERT INTO `bank_account` VALUES (1,1,'900119775222544','Nguyen Hoang THinh','OCB',150000,'2000-01-01','2025-10-01'),(2,2,'900119771114','Thinh Nguyen Hoang','Vietcombank',2250000,'2000-01-01','2025-10-01'),(3,3,'900148974454','Hoang THinh Nguyen','BIDV',150000,'2000-01-01','2025-10-01'),(4,4,'80119775222544','Thinh Thinh Thinh','Algribank',1150000,'2000-01-01','2025-10-01');

/*
DROP TABLE IF EXISTS cart; 
CREATE TABLE Cart(
	UserID BIGINT(8),
	Total INT NOT NULL,
      PRIMARY KEY (UserID)
);

INSERT INTO `web_food`.`cart` (`UserID`, `Total`) VALUES ('1', '45000');
INSERT INTO `web_food`.`cart` (`UserID`, `Total`) VALUES ('2', '30000');
INSERT INTO `web_food`.`cart` (`UserID`, `Total`) VALUES ('3', '50000');
INSERT INTO `web_food`.`cart` (`UserID`, `Total`) VALUES ('4', '100000');
INSERT INTO `web_food`.`cart` (`UserID`, `Total`) VALUES ('5', '0');
*/

DROP TABLE IF EXISTS cart; 
CREATE TABLE cart(
    FoodID BIGINT(8),
    ComboID BIGINT(8),
    UserID BIGINT(8),
	Quantity INT,
    PRIMARY KEY (FoodID, ComboID, UserID)
);
INSERT INTO `web_food`.`cart` (`FoodID`, `ComboID`, `UserID`, `Quantity`) VALUES ( '1', 0, '2','2');
INSERT INTO `web_food`.`cart` (`FoodID`, `ComboID`, `UserID`, `Quantity`) VALUES ( '2', 0, '4','2');
INSERT INTO `web_food`.`cart` (`FoodID`, `ComboID`, `UserID`, `Quantity`) VALUES ( '3', 0, '2','2');
INSERT INTO `web_food`.`cart` (`FoodID`, `ComboID`, `UserID`, `Quantity`) VALUES ( '4', 0, '4','1');
INSERT INTO `web_food`.`cart` (`FoodID`, `ComboID`, `UserID`, `Quantity`) VALUES ( '5', 0, '2','1');
INSERT INTO `web_food`.`cart` (`FoodID`, `ComboID`, `UserID`, `Quantity`) VALUES ( '0', 1, '4','1');
INSERT INTO `web_food`.`cart` (`FoodID`, `ComboID`, `UserID`, `Quantity`) VALUES ( '0', 2, '2','2');
INSERT INTO `web_food`.`cart` (`FoodID`, `ComboID`, `UserID`, `Quantity`) VALUES ( '0', 3, '4','2');
INSERT INTO `web_food`.`cart` (`FoodID`, `ComboID`, `UserID`, `Quantity`) VALUES ( '0', 4, '2','1');
INSERT INTO `web_food`.`cart` (`FoodID`, `ComboID`, `UserID`, `Quantity`) VALUES ( '0', 5, '4','1');

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



DROP TABLE IF EXISTS Includes; 
create table Includes(
	FoodID bigint(8) not null,
    ComboID bigint(8)  NOT NULL ,
    primary key (ComboID,FoodID)
);
INSERT INTO `web_food`.`includes` (`FoodID`, `ComboID`) VALUES ('1', '1');
INSERT INTO `web_food`.`includes` (`FoodID`, `ComboID`) VALUES ('2', '1');
INSERT INTO `web_food`.`includes` (`FoodID`, `ComboID`) VALUES ('1', '2');
INSERT INTO `web_food`.`includes` (`FoodID`, `ComboID`) VALUES ('4', '2');
INSERT INTO `web_food`.`includes` (`FoodID`, `ComboID`) VALUES ('1', '3');
INSERT INTO `web_food`.`includes` (`FoodID`, `ComboID`) VALUES ('3', '3');
INSERT INTO `web_food`.`includes` (`FoodID`, `ComboID`) VALUES ('4', '3');
INSERT INTO `web_food`.`includes` (`FoodID`, `ComboID`) VALUES ('3', '4');
INSERT INTO `web_food`.`includes` (`FoodID`, `ComboID`) VALUES ('4', '4');
INSERT INTO `web_food`.`includes` (`FoodID`, `ComboID`) VALUES ('5', '5');
INSERT INTO `web_food`.`includes` (`FoodID`, `ComboID`) VALUES ('4', '5');


DROP TABLE IF EXISTS Combo; 
create table Combo(
    ComboID bigint(8)  NOT NULL AUTO_INCREMENT,
    ComboName varchar(255) NOT NULL,
    ComboDescrip text,
    Price int NOT NULL,
    primary key (ComboID)
);
INSERT INTO `web_food`.`combo` (`ComboID`,`ComboName`,`ComboDescrip`,`Price`) VALUES (1,'Combo th??? 2','Th???t l???n rim ti??u + Tr???ng ????c th???t',150000);
INSERT INTO `web_food`.`combo` (`ComboID`,`ComboName`,`ComboDescrip`,`Price`) VALUES (2,'Combo th??? 3','Th???t l???n rim ti??u + Canh chua th???t',120000);
INSERT INTO `web_food`.`combo` (`ComboID`,`ComboName`,`ComboDescrip`,`Price`) VALUES (3,'Combo th??? 4','Th???t l???n rim ti??u + ?????u s???t c?? chua + Canh chua th???t',180000);
INSERT INTO `web_food`.`combo` (`ComboID`,`ComboName`,`ComboDescrip`,`Price`) VALUES (4,'Combo th??? 5','?????u s???t c?? chua + Canh chua th???t',100000);
INSERT INTO `web_food`.`combo` (`ComboID`,`ComboName`,`ComboDescrip`,`Price`) VALUES (5,'Combo cu???i tu???n','B?? n?????ng l?? l???t + Canh chua th???t ',300000);




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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
INSERT INTO `material` VALUES (10,'Tr???ng','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FEgg.png?alt=media&token=afe1561d-fb54-47f1-9b35-10deeaa06080'),(11,'Th???t heo ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FHam.png?alt=media&token=4004a1a1-a5f3-4f70-bbd2-b05ce2d47e37'),(12,'C???i xanh ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FLettuce.png?alt=media&token=e6bc5dd7-3b3f-4e58-86a9-429c41e3c91b'),(13,'T???i ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FGarlic.png?alt=media&token=47a7ec01-bff7-42a1-8690-0654d40df85b'),(14,'???t b???m','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FRed%20Chilli.png?alt=media&token=2aed6787-4dd7-4fa0-aa71-69f6373c57ab'),(15,'C?? chua ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FTomato.png?alt=media&token=5f6b7ace-6316-4535-bf38-ad7bb79221a3'),(16,'Chanh ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2Flemons.png?alt=media&token=a8b7ad38-66cf-4713-8671-b5113c4fe159'),(17,'???t xanh  ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FGreen%20Chilli.png?alt=media&token=4c669a1a-1102-425f-9a28-726f4498806f'),(18,'D???u ??-liu  ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FOlive%20Oil.png?alt=media&token=b69add91-5a69-4e60-a8ab-3706ea10a1e3'),(19,'Th???t d?? ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FGoat%20Meat.png?alt=media&token=2be6d76e-eaed-43b7-810d-58d5ab53ac93'),(20,'S???a chua ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FGreek%20yogurt.png?alt=media&token=d15108d4-c708-4777-88ab-68e3827e9cd0'),(23,'C?? t??m  ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FAubergine.png?alt=media&token=27db63f7-9667-4c86-890c-85481277411c'),(24,'H??nh ????? ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2Fred%20onions.png?alt=media&token=6ac4876f-ec5d-4a91-afa2-16f40751ad40');
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;




DROP TABLE IF EXISTS `makeby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `makeby` (
  `MaterialID` bigint NOT NULL AUTO_INCREMENT,
  `FoodID` bigint NOT NULL,
  PRIMARY KEY (`MaterialID`,`FoodID`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `makeby`
--

LOCK TABLES `makeby` WRITE;
/*!40000 ALTER TABLE `makeby` DISABLE KEYS */;
INSERT INTO `makeby` VALUES (1,1),(1,4),(2,1),(2,2),(2,5),(5,1),(5,4),(5,5),(6,2),(10,3),(14,3),(15,3),(24,3);
/*!40000 ALTER TABLE `makeby` ENABLE KEYS */;
UNLOCK TABLES;


DROP TABLE IF EXISTS service; 
CREATE TABLE SERVICE (
      ServiceID BIGINT(8) NOT NULL,
	ServiceInfo TEXT NOT NULL,
	ServiceName VARCHAR(255),
	BannerImage text,
      PRIMARY KEY (ServiceID)
);
INSERT INTO SERVICE VALUES ( 819292, 'Service Info 1', 'ServiceName 1', 'BannerImage 1');
INSERT INTO SERVICE VALUES ( 819293, 'Service Info 3', 'ServiceName 3', 'BannerImage 3');
INSERT INTO SERVICE VALUES ( 819294, 'Service Info 4', 'ServiceName 4', 'BannerImage 4');
INSERT INTO SERVICE VALUES ( 819295, 'Service Info 2', 'ServiceName 2', 'BannerImage 2');
INSERT INTO SERVICE VALUES ( 819296, 'Service Info 5', 'ServiceName 5', 'BannerImage 5');

DROP TABLE IF EXISTS news; 
CREATE TABLE news (
	NewsID BIGINT(8) NOT NULL AUTO_INCREMENT,
	Title VARCHAR(255),
    Picture  TEXT,
    Highlight TEXT,
	Content TEXT,
	Author TEXT,
	PRIMARY KEY (NewsID)
);
INSERT INTO news (`Title`, `Picture`, `Highlight`, `Content`, `Author`) VALUES ('B?????c chuy???n m??nh c???a gia ????nh c?? truy???n th???ng n???u th???ch su???t 35 n??m t???i ?????t H?? th??nh','','','Qu??? kh??ng ngoa khi n??i th???ch ??en l?? m??n ??n truy???n th???ng ?????t Kinh K???, ai sinh ra v?? l???n l??n ??? n??i ????y m?? l???i ch??a t???ng qua m???t th???i m?? m???n th???c qu?? ch??? n??y. C??n nh??? nh???ng chi???u ng???i ng??ng ti???ng rao: "Ai t??o ph??? ????... Ai t??o ph??? n??o...", l?? c??? ????m con n??t ch???y ??o ra xo?? nh???ng ?????ng ti???n l??? t??ch g??p m???y ng??y tr???i ch??? ????? th?????ng th???c "c???c ph???m" m??a h?? - t??o ph??? n?????c ???????ng c??ng th???ch ??en. Ng?????i ta n??i: D??n H?? th??nh s??nh ??n b???c nh???t qu??? l?? kh??ng ch??t sai l???ch! C??i v??? nh???t nh???t, m???t ch??t ng???y ng???y, m???m m???m c???a t??o ph??? k???t h???p v???i v??? ng???t thanh c???a n?????c ???????ng r???i ??i???m th??m ch??t th???ch ??en dai gi??n s???n s???t, c??i m??i ?????c tr??ng kh??ng l???n v??o ????u ???????c th?? qu??? th???t l?? tuy???t c??. Ngh?? th??i c??ng mu???n ch???y n?????c mi???ng lu??n ???y! C?? th??? n??i, ????? l??m m???i m??nh sau h??n 35 n??m l?? ??i???u kh?? kh??n v?? l?? nhi???m v??? m?? Chiko lu??n n??? l???c theo ??u???i ????? mang t???i nh???ng s???n ph???m t???t nh???t ?????n tay kh??ch h??ng.','');
INSERT INTO news (`Title`, `Picture`, `Highlight`, `Content`, `Author`) VALUES ('C??ch l??m b??nh h??nh qu??? t??o', '', '', 'L??c r???nh r???i b???n c?? th??? th??? l??m chi???c b??nh h??nh tr??i t??o v???a xinh x???n l???i th??m ngon, kh??ng c???n qu?? nhi???u hoa tay l???i c?? th??? g??y b???t ng??? v???i m???i ng?????i trong gia ????nh.', '');
INSERT INTO news (`Title`, `Picture`, `Highlight`, `Content`, `Author`) VALUES ('C??ch l??m b??nh h??nh qu??? t??o', '', '', 'L??c r???nh r???i b???n c?? th??? th??? l??m chi???c b??nh h??nh tr??i t??o v???a xinh x???n l???i th??m ngon, kh??ng c???n qu?? nhi???u hoa tay l???i c?? th??? g??y b???t ng??? v???i m???i ng?????i trong gia ????nh.', '');
INSERT INTO news (`Title`, `Picture`, `Highlight`, `Content`, `Author`) VALUES ('B?????c chuy???n m??nh c???a gia ????nh c?? truy???n th???ng n???u th???ch su???t 35 n??m t???i ?????t H?? th??nh','','','t??o ph??? n??o...", l?? c??? ????m con n??t ch???y ??o ra xo?? nh???ng ?????ng ti???n l??? t??ch g??p m???y ng??y tr???i ch??? ????? th?????ng th???c "c???c ph???m" m??a h?? - t??o ph??? n?????c ???????ng c??ng th???ch ??en. Ng?????i ta n??i: D??n H?? th??nh s??nh ??n b???c nh???t qu??? l?? kh??ng ch??t sai l???ch! C??i v??? nh???t nh???t, m???t ch??t ng???y ng???y, m???m m???m c???a t??o ph??? k???t h???p v???i v??? ng???t thanh c???a n?????c ???????ng r???i ??i???m th??m ch??t th???ch ??en dai gi??n s???n s???t, c??i m??i ?????c tr??ng kh??ng l???n v??o ????u ???????c th?? qu??? th???t l?? tuy???t c??. Ngh?? th??i c??ng mu???n ch???y n?????c mi???ng lu??n ???y! C?? th??? n??i, ????? l??m m???i m??nh sau h??n 35 n??m l?? ??i???u kh?? kh??n v?? l?? nhi???m v??? m?? Chiko lu??n n??? l???c theo ??u???i ????? mang t???i nh???ng s???n ph???m t???t nh???t ?????n tay kh??ch h??ng.','');


DROP TABLE IF EXISTS TRANSACTION; 
CREATE TABLE TRANSACTION (
	id BIGINT(8) NOT NULL AUTO_INCREMENT, 
    time TIMESTAMP, 
    description TEXT, 
    amount BIGINT(8), 
    user_id BIGINT(8), 
    sale_percent BIGINT(8),
    PRIMARY KEY (id)
); 
INSERT INTO TRANSACTION (time, description, amount, user_id, sale_percent) VALUES ('2021-01-01 00:00:01', 'Tra tien cho nguoi choi', 3000000, 2, 10); 
INSERT INTO TRANSACTION (time, description, amount, user_id, sale_percent) VALUES ('2018-05-03 00:00:01', 'Tra tien cho nguoi choi', 6000000, 2, 20); 
INSERT INTO TRANSACTION (time, description, amount, user_id, sale_percent) VALUES ('2019-11-01 00:00:01', 'Tra tien cho nguoi choi', 5000000, 2, 30); 
INSERT INTO TRANSACTION (time, description, amount, user_id, sale_percent) VALUES ('2019-11-01 00:00:01', 'Tra tien cho nguoi choi', 5000000, 4, 15); 
INSERT INTO TRANSACTION (time, description, amount, user_id, sale_percent) VALUES ('2020-11-01 00:00:01', 'Tra tien cho nguoi choi', 4000000, 4, 50); 
INSERT INTO TRANSACTION (time, description, amount, user_id, sale_percent) VALUES ('2022-01-01 00:00:01', 'Tra tien cho nguoi choi', 3000000, 4, 45); 


DROP TABLE IF EXISTS contains; 
CREATE TABLE CONTAINS (
	TransactionID BIGINT(8) NOT NULL,
	ComboID BIGINT(8),
	FoodID BIGINT (8),
	Quantity BIGINT,
	PRIMARY KEY (TransactionID, FoodID, ComboID)
);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID, Quantity) VALUES ( 1, 1, 0, 1);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID, Quantity) VALUES ( 2, 2, 0, 2);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID, Quantity) VALUES ( 3, 3, 0, 3);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID, Quantity) VALUES ( 4, 4, 0, 1);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID, Quantity) VALUES ( 5, 5, 0, 1);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID, Quantity) VALUES ( 6, 0, 2, 1);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID, Quantity) VALUES ( 1, 0, 1, 2);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID, Quantity) VALUES ( 2, 0, 2, 2);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID, Quantity) VALUES ( 3, 0, 3, 2);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID, Quantity) VALUES ( 4, 0, 4, 2);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID, Quantity) VALUES ( 5, 0, 5, 2);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID, Quantity) VALUES ( 6, 4, 0, 2);


DROP TABLE IF EXISTS tag;
CREATE TABLE tag (
	TagID BIGINT(8) NOT NULL AUTO_INCREMENT,
    TagName TEXT,
    PRIMARY KEY (TagID)
);

INSERT INTO tag VALUES (1, "Cay");
INSERT INTO tag VALUES (2, "Chua");
INSERT INTO tag VALUES (3, "M??n n?????c");
INSERT INTO tag VALUES (4, "M??n chay");
INSERT INTO tag VALUES (5, "???????ng ph???");

DROP TABLE IF EXISTS user_ref_tag;
CREATE TABLE user_ref_tag (
	TagID BIGINT(8),
    UserID BIGINT(8),
    Count BIGINT(8),
    PRIMARY KEY (UserID, TagID)
);

INSERT INTO user_ref_tag VALUES (1, 7, 0);
INSERT INTO user_ref_tag VALUES (2, 7, 1);
INSERT INTO user_ref_tag VALUES (3, 7, 2);
INSERT INTO user_ref_tag VALUES (4, 7, 1);
INSERT INTO user_ref_tag VALUES (5, 7, 1);
INSERT INTO user_ref_tag VALUES (6, 7, 3);

DROP TABLE IF EXISTS category_tag;
CREATE TABLE category_tag (
	TagID BIGINT(8) NOT NULL,
    FoodID BIGINT(8),
    ComboID BIGINT(8),
    PRIMARY KEY (TagID, FoodID, ComboID)
);

INSERT INTO category_tag VALUES (1,1,0);
INSERT INTO category_tag VALUES (2,1,0);
INSERT INTO category_tag VALUES (3,2,0);
INSERT INTO category_tag VALUES (4,2,0);
INSERT INTO category_tag VALUES (5,3,0);
INSERT INTO category_tag VALUES (1,3,0);
INSERT INTO category_tag VALUES (2,4,0);
INSERT INTO category_tag VALUES (3,4,0);
INSERT INTO category_tag VALUES (4,5,0);
INSERT INTO category_tag VALUES (5,5,0);
INSERT INTO category_tag VALUES (1,0,1);
INSERT INTO category_tag VALUES (2,0,1);
INSERT INTO category_tag VALUES (3,0,2);
INSERT INTO category_tag VALUES (4,0,2);
INSERT INTO category_tag VALUES (5,0,3);
INSERT INTO category_tag VALUES (1,0,3);
INSERT INTO category_tag VALUES (2,0,4);
INSERT INTO category_tag VALUES (3,0,4);
INSERT INTO category_tag VALUES (4,0,5);
INSERT INTO category_tag VALUES (5,0,5);


DROP TABLE IF EXISTS wish_list;
CREATE TABLE wish_list (
    WishListID BIGINT(8) NOT NULL AUTO_INCREMENT,
    UserID BIGINT(8) NOT NULL,
    ComboID BIGINT(8),
    FoodID BIGINT(8),
    PRIMARY KEY (WishListID, UserID, FoodID, ComboID)
);

INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (2,1,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (2,2,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (2,3,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (2,4,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (2,5,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (2,1,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (2,2,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (2,3,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (2,4,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (4,0,1);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (4,0,2);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (4,0,3);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (4,0,4);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (4,0,5);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (4,0,1);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (4,0,2);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (4,0,3);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (4,0,4);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (4,0,5);


DROP TABLE IF EXISTS comment; 
CREATE TABLE comment (
    CommentID BIGINT(8) NOT NULL AUTO_INCREMENT,
    UserID BIGINT(8) NOT NULL,
    Content TEXT NOT NULL,
	FoodID BIGINT(8),
    NewsID BIGINT(8),
    PRIMARY KEY(CommentID)
);

INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (2, "Bai nay chill phet", 1, 0);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (4, "Chuan tung centimet", 2, 0);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (2, "Comment_test3", 3, 0);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (4, "Comment_test4", 4, 0);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (2, "Comment_test5", 1, 0);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (4, "Comment_test6", 2, 0);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (2, "Comment_test7", 3, 0);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (4, "Comment_test8", 4, 0);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (2, "Comment_test9", 0, 1);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (4, "Comment_test10", 0, 2);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (2, "Comment_test11", 0, 3);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (4, "Comment_test12", 0, 4);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (2, "Comment_test13", 0, 5);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (4, "Comment_test14", 0, 1);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (2, "Comment_test15", 0, 2);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (4, "Comment_test16", 0, 3);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (2, "Comment_test17", 0, 4);
INSERT INTO comment (UserID, Content, NewsID, FoodID) VALUES (4, "Comment_test18", 0, 5);


DROP TABLE IF EXISTS comment_image;
CREATE TABLE comment_image (
	CommentID BIGINT(8) NOT NULL,
    Image TEXT
);

INSERT INTO comment_image (CommentID, Image) VALUES (1, "");
INSERT INTO comment_image (CommentID, Image) VALUES (2, "");
INSERT INTO comment_image (CommentID, Image) VALUES (3, "");
INSERT INTO comment_image (CommentID, Image) VALUES (4, "");
INSERT INTO comment_image (CommentID, Image) VALUES (5, "");
INSERT INTO comment_image (CommentID, Image) VALUES (4, "");
INSERT INTO comment_image (CommentID, Image) VALUES (5, "");
INSERT INTO comment_image (CommentID, Image) VALUES (6, "");
INSERT INTO comment_image (CommentID, Image) VALUES (5, "");
INSERT INTO comment_image (CommentID, Image) VALUES (4, "");
INSERT INTO comment_image (CommentID, Image) VALUES (5, "");
INSERT INTO comment_image (CommentID, Image) VALUES (6, "");
INSERT INTO comment_image (CommentID, Image) VALUES (7, "");
INSERT INTO comment_image (CommentID, Image) VALUES (8, "");
INSERT INTO comment_image (CommentID, Image) VALUES (9, "");
INSERT INTO comment_image (CommentID, Image) VALUES (10, "");
INSERT INTO comment_image (CommentID, Image) VALUES (11, "");
INSERT INTO comment_image (CommentID, Image) VALUES (12, "");
INSERT INTO comment_image (CommentID, Image) VALUES (13, "");
INSERT INTO comment_image (CommentID, Image) VALUES (14, "");
INSERT INTO comment_image (CommentID, Image) VALUES (9, "");
INSERT INTO comment_image (CommentID, Image) VALUES (10, "");
INSERT INTO comment_image (CommentID, Image) VALUES (11, "");
INSERT INTO comment_image (CommentID, Image) VALUES (12, "");
INSERT INTO comment_image (CommentID, Image) VALUES (13, "");
INSERT INTO comment_image (CommentID, Image) VALUES (14, "");
INSERT INTO comment_image (CommentID, Image) VALUES (15, "");

DROP TABLE IF EXISTS reply_comment;
CREATE TABLE reply_comment (
	ReplyID BIGINT(8) NOT NULL AUTO_INCREMENT,
	CommentID BIGINT(8),
    UserID BIGINT(8),
    Content TEXT
);

INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (1, 2, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (2, 4, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (3, 2, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (4, 4, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (5, 2, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (6, 4, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (7, 2, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (8, 4, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (9, 2, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (10, 4, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (11, 2, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (2, 4, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (3, 2, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (4, 4, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (5, 2, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (8, 4, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (6, 2, "reply_comment_1");
INSERT INTO reply_comment (CommentID, UserID, Content) VALUES (5, 4, "reply_comment_1");


DROP TABLE IF EXISTS page_setting;
CREATE TABLE page_setting(
	banner TEXT,
    logo TEXT,
    name TEXT,
    phone TEXT,
    slogan TEXT,
    address TEXT,
    description TEXT,
    color TEXT,
    length TEXT,
    lat TEXT,
    facebook TEXT,
    mail TEXT,
    twitter TEXT
);

INSERT INTO page_setting (banner, logo, name, phone, slogan, address, description, color, length, lat, facebook, mail, twitter)
VALUES ("test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "test", "tets");

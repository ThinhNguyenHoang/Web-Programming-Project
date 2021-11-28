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
INSERT INTO USER_PROFILE(AccountID , FullName, UserName, AvatarURI, DOB, Email, Point, BankAccountID, Address, PhoneNumber) VALUES(1,'Nguyen Hoang Thinh', 'thinhhaha13','','2000-01-01', 'thinh@gmail.com', 13, 3,'Số 85-87 Trần Hưng Đạo, Hoàn Kiếm, TP. Hà Nội','099761235');
INSERT INTO USER_PROFILE(AccountID , FullName, UserName,  AvatarURI, DOB, Email, Point, BankAccountID, Address, PhoneNumber) VALUES(2,'Tran Hoang Khoi', 'khoi1213','','2012-01-01', 'khoi@gmail.com', 13, 3,'Số 268 Trần Hưng Đạo, P. Nguyễn Cư Trinh, Q.1, TP. HCM','099761235');
INSERT INTO USER_PROFILE(AccountID , FullName, UserName, AvatarURI, DOB, Email, Point, BankAccountID, Address, PhoneNumber) VALUES(3,'Hua Phuoc Thuan', 'thuan33','','2011-01-01', 'thuan@gmail.com', 14, 3,'Số 80 Lê Lợi - Thành phố Đà Nẵng','099761235');
INSERT INTO USER_PROFILE(AccountID , FullName, UserName,  AvatarURI,DOB, Email, Point, BankAccountID, Address, PhoneNumber) VALUES(4,'Khong Manh Quyen', 'quyenhaha13','','2002-01-01', 'quyen@gmail.com', 12, 3,'Số 9A Trần Phú, P. Cái Khế, Q. Ninh Kiều, TP. Cần Thơ','099761235');
INSERT INTO USER_PROFILE(AccountID , FullName, UserName, AvatarURI, DOB, Email, Point, BankAccountID, Address, PhoneNumber) VALUES(5,'Le Huu Hieu', 'hieuhaha13','','2011-01-01', 'hieu@gmail.com', 16, 3,'Số 2 Thống Nhất, P.1, Tp. Vũng Tàu','099761235');
INSERT INTO USER_PROFILE(AccountID , FullName, UserName, AvatarURI, DOB, Email, Point, BankAccountID, Address, PhoneNumber) VALUES(6,'Huu Hieu', 'asdhaha13','','2011-01-12', 'hieu@gmail.com', 16, 3,'Số 2 Thống Nhất, P.1, Tp. Vũng Tàu','099761235');
INSERT INTO USER_PROFILE(AccountID , FullName, UserName, AvatarURI, DOB, Email, Point, BankAccountID, Address, PhoneNumber) VALUES(7,'Huu HieASDu', 'asfdasdhaha13','','2011-01-12', 'hieu@gmail.com', 16, 3,'Số 2 Thống Nhất, P.1, Tp. Vũng Tàu','099761235');
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
INSERT INTO `food` VALUES (1,'Thịt lợn rim tiêu','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2F7ttta31593350374.jpg?alt=media&token=3273e990-5d69-4773-a9cf-9dd71c5fad09',120000,'Thịt kho là món mặn dùng chính trong bữa cơm của người Việt, bên cạnh món canh và món rau. Hôm nay bếp kho quẹt sẽ giới thiệu đến các bạn món thịt kho tiêu, cũng là món được các chị em thường xuyên chế biến, nhưng để làm đúng chuẩn về màu sắc và mùi vị thì chắc hẳn nhiều người còn bỏ ngỏ. Nào, còn chờ gì nữa, chúng ta bắt tay vào làm món thịt kho tiêu cho kịp bữa cơm chiều nhé!','',0),(2,'Trứng đúc thịt','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2Frc2.jpg?alt=media&token=344ef6ab-53ce-4ca4-93f5-1d7245f17f14',80000,'Món trứng đúc thịt là một món dễ làm, dễ ăn. Đặc biệt là trẻ em, gần như bé nào cũng thích ăn trứng nhưng đôi khi lại không thích ăn thịt vì dai. Với cách làm trứng đúc thịt này, thịt mềm và ngon, trứng rán vàng thơm lừng khắp cả nhà, hương vị rất kích thích với các bé. Hơn nữa vào những ngày bận rộn Bạn chỉ cần mất vài phút là đã có ngay một món ăn thơm ngon mà vẫn đầy đủ chất dinh dưỡng cho cả nhà rồi.','',0),(3,'Đậu sốt cà chua','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2F1529442316.jpg?alt=media&token=c95c7a15-e7f6-49ca-a388-e7aac79182a9',60000,'Đậu sốt cà chua đúng như tên gọi, đây là món ăn với thành phần chính với đậu phụ được rán giòn sau đó đem sốt với cà chua. Bằng việc đem sốt với cà chua, từng miếng đậu được khoác thêm lớp áo đỏ đẹp mắt với hương vị đậm đà hơn.','',0),(4,'Canh chua thịt','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2Fmit-thai-cai-be-2-800x800.jpg?alt=media&token=f521c714-d881-4d5a-9dc5-b0f5065136e0',60000,'Món canh cà chua thịt bằm là một trong những món ăn phổ biến và dễ làm nhất trong các bữa ăn hàng ngày. Món ăn này sẽ mang lại hương vị thơm ngon, ăn mãi không chán bất kể trời nóng hay lạnh cho người thân của bạn. Bạn có thể ăn kèm món canh này cùng với món tôm chiên giòn cho bữa ăn thêm tròn vị.','',0),(5,'Bò nướng lá lốt','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2Fxrptpq1483909204.jpg?alt=media&token=c17810b8-5ffe-4d95-bcb5-d8b335421240',270000,'Bò nướng lá lốt hay còn gọi là bò lá lốt hoặc là thịt bò lá lốt hay bò cuốn lá lốt là một món ăn trong ẩm thực Việt Nam, thịnh hành ở vùng Nam bộ, nguyên liệu chính là thịt bò và lá lốt được chế biến theo phương pháp nướng, có thể kèm theo mỡ chài. Các loại rau sống ăn kèm rất phong phú như: xà lách, húng quế, diếp cá, chuối chát, dưa leo, khế và chấm mắm nêm. Món này đặc trưng bởi vị hấp dẫn với vị ngon của thịt bò nướng lá lốt, béo của đậu phộng hòa chung vị chát của chuối, chua của khế, vị thanh thanh của nhiều loại rau giòn mát, cùng hương mắm nêm cay cay','',0);
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
INSERT INTO `web_food`.`combo` (`ComboID`,`ComboName`,`ComboDescrip`,`Price`) VALUES (1,'Combo thứ 2','Thịt lợn rim tiêu + Trứng đúc thịt',150000);
INSERT INTO `web_food`.`combo` (`ComboID`,`ComboName`,`ComboDescrip`,`Price`) VALUES (2,'Combo thứ 3','Thịt lợn rim tiêu + Canh chua thịt',120000);
INSERT INTO `web_food`.`combo` (`ComboID`,`ComboName`,`ComboDescrip`,`Price`) VALUES (3,'Combo thứ 4','Thịt lợn rim tiêu + Đậu sốt cà chua + Canh chua thịt',180000);
INSERT INTO `web_food`.`combo` (`ComboID`,`ComboName`,`ComboDescrip`,`Price`) VALUES (4,'Combo thứ 5','Đậu sốt cà chua + Canh chua thịt',100000);
INSERT INTO `web_food`.`combo` (`ComboID`,`ComboName`,`ComboDescrip`,`Price`) VALUES (5,'Combo cuối tuần','Bò nướng lá lốt + Canh chua thịt ',300000);




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
INSERT INTO `material` VALUES (10,'Trứng','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FEgg.png?alt=media&token=afe1561d-fb54-47f1-9b35-10deeaa06080'),(11,'Thịt heo ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FHam.png?alt=media&token=4004a1a1-a5f3-4f70-bbd2-b05ce2d47e37'),(12,'Cải xanh ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FLettuce.png?alt=media&token=e6bc5dd7-3b3f-4e58-86a9-429c41e3c91b'),(13,'Tỏi ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FGarlic.png?alt=media&token=47a7ec01-bff7-42a1-8690-0654d40df85b'),(14,'Ớt bầm','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FRed%20Chilli.png?alt=media&token=2aed6787-4dd7-4fa0-aa71-69f6373c57ab'),(15,'Cà chua ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FTomato.png?alt=media&token=5f6b7ace-6316-4535-bf38-ad7bb79221a3'),(16,'Chanh ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2Flemons.png?alt=media&token=a8b7ad38-66cf-4713-8671-b5113c4fe159'),(17,'Ớt xanh  ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FGreen%20Chilli.png?alt=media&token=4c669a1a-1102-425f-9a28-726f4498806f'),(18,'Dầu ô-liu  ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FOlive%20Oil.png?alt=media&token=b69add91-5a69-4e60-a8ab-3706ea10a1e3'),(19,'Thịt dê ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FGoat%20Meat.png?alt=media&token=2be6d76e-eaed-43b7-810d-58d5ab53ac93'),(20,'Sửa chua ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FGreek%20yogurt.png?alt=media&token=d15108d4-c708-4777-88ab-68e3827e9cd0'),(23,'Cà tím  ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2FAubergine.png?alt=media&token=27db63f7-9667-4c86-890c-85481277411c'),(24,'Hành đỏ ','https://firebasestorage.googleapis.com/v0/b/bk-food-sale.appspot.com/o/images%2Fzxcvzxcvzxcv%2Fred%20onions.png?alt=media&token=6ac4876f-ec5d-4a91-afa2-16f40751ad40');
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
INSERT INTO news (`Title`, `Picture`, `Highlight`, `Content`, `Author`) VALUES ('Bước chuyển mình của gia đình có truyền thống nấu thạch suốt 35 năm tại đất Hà thành','','','Quả không ngoa khi nói thạch đen là món ăn truyền thống đất Kinh Kỳ, ai sinh ra và lớn lên ở nơi đây mà lại chưa từng qua một thời mê mẩn thức quà chợ này. Còn nhớ những chiều ngồi ngóng tiếng rao: "Ai tào phớ đê... Ai tào phớ nào...", là cả đám con nít chạy ào ra xoè những đồng tiền lẻ tích góp mấy ngày trời chỉ để thưởng thức "cực phẩm" mùa hè - tào phớ nước đường cùng thạch đen. Người ta nói: Dân Hà thành sành ăn bậc nhất quả là không chút sai lệch! Cái vị nhạt nhạt, một chút ngầy ngậy, mềm mềm của tào phớ kết hợp với vị ngọt thanh của nước đường rồi điểm thêm chút thạch đen dai giòn sần sật, cái mùi đặc trưng không lẫn vào đâu được thì quả thật là tuyệt cú. Nghĩ thôi cũng muốn chảy nước miếng luôn ấy! Có thể nói, để làm mới mình sau hơn 35 năm là điều khó khăn và là nhiệm vụ mà Chiko luôn nỗ lực theo đuổi để mang tới những sản phẩm tốt nhất đến tay khách hàng.','');
INSERT INTO news (`Title`, `Picture`, `Highlight`, `Content`, `Author`) VALUES ('Cách làm bánh hình quả táo', '', '', 'Lúc rảnh rỗi bạn có thể thử làm chiếc bánh hình trái táo vừa xinh xắn lại thơm ngon, không cần quá nhiều hoa tay lại có thể gây bất ngờ với mọi người trong gia đình.', '');
INSERT INTO news (`Title`, `Picture`, `Highlight`, `Content`, `Author`) VALUES ('Cách làm bánh hình quả táo', '', '', 'Lúc rảnh rỗi bạn có thể thử làm chiếc bánh hình trái táo vừa xinh xắn lại thơm ngon, không cần quá nhiều hoa tay lại có thể gây bất ngờ với mọi người trong gia đình.', '');
INSERT INTO news (`Title`, `Picture`, `Highlight`, `Content`, `Author`) VALUES ('Bước chuyển mình của gia đình có truyền thống nấu thạch suốt 35 năm tại đất Hà thành','','','tào phớ nào...", là cả đám con nít chạy ào ra xoè những đồng tiền lẻ tích góp mấy ngày trời chỉ để thưởng thức "cực phẩm" mùa hè - tào phớ nước đường cùng thạch đen. Người ta nói: Dân Hà thành sành ăn bậc nhất quả là không chút sai lệch! Cái vị nhạt nhạt, một chút ngầy ngậy, mềm mềm của tào phớ kết hợp với vị ngọt thanh của nước đường rồi điểm thêm chút thạch đen dai giòn sần sật, cái mùi đặc trưng không lẫn vào đâu được thì quả thật là tuyệt cú. Nghĩ thôi cũng muốn chảy nước miếng luôn ấy! Có thể nói, để làm mới mình sau hơn 35 năm là điều khó khăn và là nhiệm vụ mà Chiko luôn nỗ lực theo đuổi để mang tới những sản phẩm tốt nhất đến tay khách hàng.','');


DROP TABLE IF EXISTS TRANSACTION; 
CREATE TABLE TRANSACTION (
	id BIGINT(8) NOT NULL AUTO_INCREMENT, 
    time TIMESTAMP, 
    description TEXT, 
    amount BIGINT(8), 
    user_id BIGINT(8), 
    voucher_id BIGINT(8),
    PRIMARY KEY (id)
); 
INSERT INTO TRANSACTION (time, description, amount, user_id, voucher_id) VALUES ('2021-01-01 00:00:01', 'Tra tien cho nguoi choi', 3000000, 2, 1); 
INSERT INTO TRANSACTION (time, description, amount, user_id, voucher_id) VALUES ('2018-05-03 00:00:01', 'Tra tien cho nguoi choi', 6000000, 2, 2); 
INSERT INTO TRANSACTION (time, description, amount, user_id, voucher_id) VALUES ('2019-11-01 00:00:01', 'Tra tien cho nguoi choi', 5000000, 2, 0); 
INSERT INTO TRANSACTION (time, description, amount, user_id, voucher_id) VALUES ('2019-11-01 00:00:01', 'Tra tien cho nguoi choi', 5000000, 4, 1); 
INSERT INTO TRANSACTION (time, description, amount, user_id, voucher_id) VALUES ('2020-11-01 00:00:01', 'Tra tien cho nguoi choi', 4000000, 4, 0); 
INSERT INTO TRANSACTION (time, description, amount, user_id, voucher_id) VALUES ('2022-01-01 00:00:01', 'Tra tien cho nguoi choi', 3000000, 4, 4); 


DROP TABLE IF EXISTS contains; 
CREATE TABLE CONTAINS (
	TransactionID BIGINT(8) NOT NULL,
	ComboID BIGINT(8),
	FoodID BIGINT (8),
	PRIMARY KEY (TransactionID, FoodID, ComboID)
);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID) VALUES ( 1, 1, 0);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID) VALUES ( 2, 2, 0);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID) VALUES ( 3, 3, 0);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID) VALUES ( 4, 4, 0);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID) VALUES ( 5, 5, 0);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID) VALUES ( 6, 0, 2);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID) VALUES ( 1, 0, 1);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID) VALUES ( 2, 0, 2);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID) VALUES ( 3, 0, 3);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID) VALUES ( 4, 0, 4);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID) VALUES ( 5, 0, 5);
INSERT INTO CONTAINS (TransactionID, FoodID, ComboID) VALUES ( 6, 4, 0);


DROP TABLE IF EXISTS tag;
CREATE TABLE tag (
	TagID BIGINT(8) NOT NULL AUTO_INCREMENT,
    TagName TEXT,
    PRIMARY KEY (TagID)
);

INSERT INTO tag VALUES (1, "Cay");
INSERT INTO tag VALUES (2, "Chua");
INSERT INTO tag VALUES (3, "Món nước");
INSERT INTO tag VALUES (4, "Món chay");
INSERT INTO tag VALUES (5, "Đường phố");

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
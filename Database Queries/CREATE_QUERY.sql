DROP TABLE IF EXISTS VOUCHER; 
CREATE TABLE VOUCHER (
	VoucherID BIGINT(8) NOT NULL AUTO_INCREMENT,
    ExpirationDate DATE, 
    Description TEXT, 
    VoucherName VARCHAR(255), 
    UserID BIGINT(8), 
    PRIMARY KEY(VoucherID)
);
INSERT INTO VOUCHER(VoucherID, ExpirationDate, Description, VoucherName, UserID) VALUES (1,'2021-01-01','Voucher description ID 1', 'Weeken Voucher',1);
INSERT INTO VOUCHER(VoucherID, ExpirationDate, Description, VoucherName, UserID) VALUES (2,'2020-01-01','Voucher description ID 2', 'Wednesday Voucher',1);
INSERT INTO VOUCHER(VoucherID, ExpirationDate, Description, VoucherName, UserID) VALUES (3,'2020-11-11','Voucher description ID 3', 'Tuesday Voucher',1);
INSERT INTO VOUCHER(VoucherID, ExpirationDate, Description, VoucherName, UserID) VALUES (4,'2019-01-09','Voucher description ID 4', 'Thursday Voucher',1);
INSERT INTO VOUCHER(VoucherID, ExpirationDate, Description, VoucherName, UserID) VALUES (5,'2021-03-07','Voucher description ID 5' , 'Friday Voucher',1);

DROP TABLE IF EXISTS APPLY_FOR;
CREATE TABLE APPLY_FOR (VoucherID BIGINT(8), ComboID BIGINT(8), FoodID BIGINT(8), SalePercent BIGINT(8), PRIMARY KEY(VoucherID, FoodID, ComboID)); 
INSERT INTO APPLY_FOR (VoucherID, ComboID, FoodID, SalePercent) VALUES (1,2,2, 20); 
INSERT INTO APPLY_FOR (VoucherID, ComboID, FoodID, SalePercent) VALUES (3,1,1, 20); 
INSERT INTO APPLY_FOR (VoucherID, ComboID, FoodID, SalePercent) VALUES (2,2,1, 30); 
INSERT INTO APPLY_FOR (VoucherID, ComboID, FoodID, SalePercent) VALUES (3,1,2, 10); 
INSERT INTO APPLY_FOR (VoucherID, ComboID, FoodID, SalePercent) VALUES (3,1,3, 20); 

DROP TABLE IF EXISTS TRANSACTION; 
CREATE TABLE TRANSACTION (
	id BIGINT(8) NOT NULL AUTO_INCREMENT, 
    time TIMESTAMP, 
    description TEXT, 
    amount BIGINT(8), 
    orderID BIGINT(8), 
    userID BIGINT(8), 
    PRIMARY KEY (id)
); 
INSERT INTO TRANSACTION (time, description, amount, orderID, userID) VALUES ('2021-01-01 00:00:01', 'Tra tien cho nguoi choi', 3000000, 1,2); 
INSERT INTO TRANSACTION (time, description, amount, orderID, userID) VALUES ('2018-05-03 00:00:01', 'Tra tien cho nguoi choi', 6000000, 1,2); 
INSERT INTO TRANSACTION (time, description, amount, orderID, userID) VALUES ('2019-11-01 00:00:01', 'Tra tien cho nguoi choi', 5000000, 1,2); 
INSERT INTO TRANSACTION (time, description, amount, orderID, userID) VALUES ('2020-11-01 00:00:01', 'Tra tien cho nguoi choi', 4000000, 1,2); 
INSERT INTO TRANSACTION (time, description, amount, orderID, userID) VALUES ('2022-01-01 00:00:01', 'Tra tien cho nguoi choi', 3000000, 1,2); 
INSERT INTO TRANSACTION (time, description, amount, orderID, userID) VALUES ('2021-01-01 00:00:01', 'Tra tien cho nguoi choi', 3000000, 1,4); 
INSERT INTO TRANSACTION (time, description, amount, orderID, userID) VALUES ('2018-05-03 00:00:01', 'Tra tien cho nguoi choi', 6000000, 1,4); 
INSERT INTO TRANSACTION (time, description, amount, orderID, userID) VALUES ('2019-11-01 00:00:01', 'Tra tien cho nguoi choi', 5000000, 1,4); 
INSERT INTO TRANSACTION (time, description, amount, orderID, userID) VALUES ('2020-11-01 00:00:01', 'Tra tien cho nguoi choi', 4000000, 1,4); 
INSERT INTO TRANSACTION (time, description, amount, orderID, userID) VALUES ('2022-01-01 00:00:01', 'Tra tien cho nguoi choi', 3000000, 1,4); 


DROP TABLE IF EXISTS USER; 
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
INSERT INTO BANK_ACCOUNT(user_id,bank_account_number, bank_account_owner, bank_account_type, balance, valid_start, valid_end) VALUES(1,'900119775222544','Nguyen Hoang THinh','OCB','150000','2000-01-01','2025-10-01');
INSERT INTO BANK_ACCOUNT(user_id,bank_account_number, bank_account_owner, bank_account_type, balance, valid_start, valid_end) VALUES(2,'900119771114','Thinh Nguyen Hoang','Vietcombank','2250000','2000-01-01','2025-10-01');
INSERT INTO BANK_ACCOUNT(user_id,bank_account_number, bank_account_owner, bank_account_type, balance, valid_start, valid_end) VALUES(3,'900148974454','Hoang THinh Nguyen','BIDV','150000','2000-01-01','2025-10-01');
INSERT INTO BANK_ACCOUNT(user_id,bank_account_number, bank_account_owner, bank_account_type, balance, valid_start, valid_end) VALUES(4,'80119775222544','Thinh Thinh Thinh','Algribank','1150000','2000-01-01','2025-10-01');

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

DROP TABLE IF EXISTS cartfood; 
CREATE TABLE CartFood(
      FoodID BIGINT(8),
      UserID BIGINT(8),
	Quantity INT,
      PRIMARY KEY (FoodID,UserID)
);
INSERT INTO `web_food`.`cartfood` ( `FoodID`, `UserID`, `Quantity`) VALUES ( '11', '1','1');
INSERT INTO `web_food`.`cartfood` ( `FoodID`, `UserID`, `Quantity`) VALUES ( '12', '4','2');
INSERT INTO `web_food`.`cartfood` (`FoodID`, `UserID`, `Quantity`) VALUES ( '13', '2','2');
INSERT INTO `web_food`.`cartfood` (`FoodID`, `UserID`, `Quantity`) VALUES ( '15', '4','1');
INSERT INTO `web_food`.`cartfood` ( `FoodID`, `UserID`, `Quantity`) VALUES ( '14', '3','1');



DROP TABLE IF EXISTS food; 
create table Food(
    FoodID bigint(8) NOT NULL AUTO_INCREMENT,
    FoodName varchar(255) NOT NULL,
    Picture text ,
    Price int NOT NULL,
    Description text,
    Instruct text,
    primary key (FoodID)
);
INSERT INTO `web_food`.`food` (`FoodID`,`FoodName`,`Picture`,`Price`,`Description`) VALUES (1,'Thịt lợn rim tiêu',NULL,120000,'Thịt kho là món mặn dùng chính trong bữa cơm của người Việt, bên cạnh món canh và món rau. Hôm nay bếp kho quẹt sẽ giới thiệu đến các bạn món thịt kho tiêu, cũng là món được các chị em thường xuyên chế biến, nhưng để làm đúng chuẩn về màu sắc và mùi vị thì chắc hẳn nhiều người còn bỏ ngỏ. Nào, còn chờ gì nữa, chúng ta bắt tay vào làm món thịt kho tiêu cho kịp bữa cơm chiều nhé!');
INSERT INTO `web_food`.`food` (`FoodID`,`FoodName`,`Picture`,`Price`,`Description`) VALUES (2,'Trứng đúc thịt',NULL,80000,'Món trứng đúc thịt là một món dễ làm, dễ ăn. Đặc biệt là trẻ em, gần như bé nào cũng thích ăn trứng nhưng đôi khi lại không thích ăn thịt vì dai. Với cách làm trứng đúc thịt này, thịt mềm và ngon, trứng rán vàng thơm lừng khắp cả nhà, hương vị rất kích thích với các bé. Hơn nữa vào những ngày bận rộn Bạn chỉ cần mất vài phút là đã có ngay một món ăn thơm ngon mà vẫn đầy đủ chất dinh dưỡng cho cả nhà rồi.');
INSERT INTO `web_food`.`food` (`FoodID`,`FoodName`,`Picture`,`Price`,`Description`) VALUES (3,'Đậu sốt cà chua',NULL,60000,'Đậu sốt cà chua đúng như tên gọi, đây là món ăn với thành phần chính với đậu phụ được rán giòn sau đó đem sốt với cà chua. Bằng việc đem sốt với cà chua, từng miếng đậu được khoác thêm lớp áo đỏ đẹp mắt với hương vị đậm đà hơn.');
INSERT INTO `web_food`.`food` (`FoodID`,`FoodName`,`Picture`,`Price`,`Description`) VALUES (4,'Canh chua thịt',NULL,60000,'Món canh cà chua thịt bằm là một trong những món ăn phổ biến và dễ làm nhất trong các bữa ăn hàng ngày. Món ăn này sẽ mang lại hương vị thơm ngon, ăn mãi không chán bất kể trời nóng hay lạnh cho người thân của bạn. Bạn có thể ăn kèm món canh này cùng với món tôm chiên giòn cho bữa ăn thêm tròn vị.');
INSERT INTO `web_food`.`food` (`FoodID`,`FoodName`,`Picture`,`Price`,`Description`) VALUES (5,'Bò nướng lá lốt',NULL,270000,'Bò nướng lá lốt hay còn gọi là bò lá lốt hoặc là thịt bò lá lốt hay bò cuốn lá lốt là một món ăn trong ẩm thực Việt Nam, thịnh hành ở vùng Nam bộ, nguyên liệu chính là thịt bò và lá lốt được chế biến theo phương pháp nướng, có thể kèm theo mỡ chài. Các loại rau sống ăn kèm rất phong phú như: xà lách, húng quế, diếp cá, chuối chát, dưa leo, khế và chấm mắm nêm. Món này đặc trưng bởi vị hấp dẫn với vị ngon của thịt bò nướng lá lốt, béo của đậu phộng hòa chung vị chát của chuối, chua của khế, vị thanh thanh của nhiều loại rau giòn mát, cùng hương mắm nêm cay cay');

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




drop table if exists Material;
create table Material(
    MaterialID bigint(8) NOT NULL AUTO_INCREMENT,
    MaterialName varchar(255),
    Picture text,
    Primary key (MaterialID)
);
INSERT INTO `web_food`.`material` (`MaterialID`, `MaterialName`) VALUES ('1', 'Hành');
INSERT INTO `web_food`.`material` (`MaterialID`, `MaterialName`) VALUES ('2', 'Tỏi');
INSERT INTO `web_food`.`material` (`MaterialID`, `MaterialName`) VALUES ('3', 'Rượu');
INSERT INTO `web_food`.`material` (`MaterialID`, `MaterialName`) VALUES ('4', 'Giấm');
INSERT INTO `web_food`.`material` (`MaterialID`, `MaterialName`) VALUES ('5', 'Thịt heo');
INSERT INTO `web_food`.`material` (`MaterialID`, `MaterialName`) VALUES ('6', 'Trứng');
INSERT INTO `web_food`.`material` (`MaterialID`, `MaterialName`) VALUES ('7', 'Cà chua');



Drop table if exists Makeby;
create table Makeby(
    MaterialID bigint(8) NOT NULL AUTO_INCREMENT,
    FoodID bigint(8),
    primary key (MaterialID,FoodID)
);
INSERT INTO `web_food`.`makeby` (`MaterialID`, `FoodID`) VALUES ('5', '1');
INSERT INTO `web_food`.`makeby` (`MaterialID`, `FoodID`) VALUES ('2', '1');
INSERT INTO `web_food`.`makeby` (`MaterialID`, `FoodID`) VALUES ('1', '1');
INSERT INTO `web_food`.`makeby` (`MaterialID`, `FoodID`) VALUES ('2', '2');
INSERT INTO `web_food`.`makeby` (`MaterialID`, `FoodID`) VALUES ('6', '2');
INSERT INTO `web_food`.`makeby` (`MaterialID`, `FoodID`) VALUES ('7', '3');
INSERT INTO `web_food`.`makeby` (`MaterialID`, `FoodID`) VALUES ('3', '3');
INSERT INTO `web_food`.`makeby` (`MaterialID`, `FoodID`) VALUES ('1', '4');
INSERT INTO `web_food`.`makeby` (`MaterialID`, `FoodID`) VALUES ('5', '4');
INSERT INTO `web_food`.`makeby` (`MaterialID`, `FoodID`) VALUES ('2', '5');
INSERT INTO `web_food`.`makeby` (`MaterialID`, `FoodID`) VALUES ('5', '5');

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
CREATE TABLE NEWS (
      NewID BIGINT(8) NOT NULL,
	Title VARCHAR(255),
	Body TEXT NOT NULL,
	Summary TEXT,
	Keyword VARCHAR(255),
      PRIMARY KEY (NewID)
);
INSERT INTO NEWS VALUES (819284, 'Bước chuyển mình của gia đình có truyền thống nấu thạch suốt 35 năm tại đất Hà thành', 'Quả không ngoa khi nói thạch đen là món ăn truyền thống đất Kinh Kỳ, ai sinh ra và lớn lên ở nơi đây mà lại chưa từng qua một thời mê mẩn thức quà chợ này. Còn nhớ những chiều ngồi ngóng tiếng rao: "Ai tào phớ đê... Ai tào phớ nào...", là cả đám con nít chạy ào ra xoè những đồng tiền lẻ tích góp mấy ngày trời chỉ để thưởng thức "cực phẩm" mùa hè - tào phớ nước đường cùng thạch đen. Người ta nói: Dân Hà thành sành ăn bậc nhất quả là không chút sai lệch! Cái vị nhạt nhạt, một chút ngầy ngậy, mềm mềm của tào phớ kết hợp với vị ngọt thanh của nước đường rồi điểm thêm chút thạch đen dai giòn sần sật, cái mùi đặc trưng không lẫn vào đâu được thì quả thật là tuyệt cú. Nghĩ thôi cũng muốn chảy nước miếng luôn ấy!', 'Có thể nói, để làm mới mình sau hơn 35 năm là điều khó khăn và là nhiệm vụ mà Chiko luôn nỗ lực theo đuổi để mang tới những sản phẩm tốt nhất đến tay khách hàng.','TRADITONAL, FOOD, MON AN, TRUYEN THONG');
INSERT INTO NEWS VALUES (819285, 'Cách làm bánh hình quả táo', 'Lúc rảnh rỗi bạn có thể thử làm chiếc bánh hình trái táo vừa xinh xắn lại thơm ngon, không cần quá nhiều hoa tay lại có thể gây bất ngờ với mọi người trong gia đình.', '','CAKE, APPLE, BANH, TAO');



DROP TABLE IF EXISTS orderbill; 
CREATE TABLE ORDERBILL (
      OrderID BIGINT(8) NOT NULL,
	Price INT NOT NULL,
	OrderStatus VARCHAR(255),
	UserID BIGINT(8) NOT NULL,
      PRIMARY KEY (OrderID)
);
INSERT INTO ORDERBILL VALUES  (123478, 200000, 'PROCESSING', 151234);
INSERT INTO ORDERBILL VALUES  (627394, 200000, 'PROCESSING', 151234);
INSERT INTO ORDERBILL VALUES  (119284, 200000, 'PROCESSING', 829334);
INSERT INTO ORDERBILL VALUES  (928341, 200000, 'PROCESSING', 124512);
INSERT INTO ORDERBILL VALUES  (829385, 200000, 'PROCESSING', 827484);
INSERT INTO ORDERBILL VALUES  (918384, 200000, 'PROCESSING', 819932);
INSERT INTO ORDERBILL VALUES  (192094, 200000, 'PROCESSING', 819932);
INSERT INTO ORDERBILL VALUES  (729019, 200000, 'PROCESSING', 124512);

DROP TABLE IF EXISTS contains; 
CREATE TABLE CONTAINS (
	ComboID BIGINT(8),
	FoodID BIGINT (8),
	OrderID BIGINT(8) NOT NULL,
      PRIMARY KEY (OrderID, FoodID, ComboID)
);
INSERT INTO CONTAINS VALUES ( 123478, 1, 129932 );
INSERT INTO CONTAINS VALUES ( 627394, 2, 319292 );
INSERT INTO CONTAINS VALUES ( 119284, 3, 109182 );
INSERT INTO CONTAINS VALUES ( 928341, 4, 819232 );
INSERT INTO CONTAINS VALUES ( 829385, 5, 590122 );
INSERT INTO CONTAINS VALUES ( 918384, 6, 891203);
INSERT INTO CONTAINS VALUES ( 192094, 7, 678129 );
INSERT INTO CONTAINS VALUES ( 729019, 8, 627129 );


DROP TABLE IF EXISTS EVALUATION; 
CREATE TABLE EVALUATION (
    CommentID BIGINT(8) NOT NULL,
    UserID BIGINT(8) NOT NULL,
    Comment TEXT NOT NULL,
    Rating INT NOT NULL,
    PRIMARY KEY(CommentID)
);
	
DROP TABLE IF EXISTS COMMENT_FOR; 
CREATE TABLE COMMENT_FOR  (
    FoodID BIGINT(8),
    ComboID BIGINT(8),
    CommentID BIGINT(8) NOT NULL,
    PRIMARY KEY(CommentID)
);

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
	TagID BIGINT(8) NOT NULL,
    UserID BIGINT(8) NOT NULL,
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
<<<<<<< HEAD
<<<<<<< HEAD
    FoodID BIGINT(8),
    ComboID BIGINT(8),
=======
    FoodID BIGINT(8) NOT NULL,
    ComboID BIGINT(8) ,
>>>>>>> test3
=======
    FoodID BIGINT(8),
    ComboID BIGINT(8),
>>>>>>> 21755423fb19812f05f8726603019f6b79559dd3
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

INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (7,1,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (7,2,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (7,3,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (7,4,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (7,5,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (8,1,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (8,2,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (8,3,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (8,4,0);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (7,0,1);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (7,0,2);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (7,0,3);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (7,0,4);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (7,0,5);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (8,0,1);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (8,0,2);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (8,0,3);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (8,0,4);
INSERT INTO wish_list (UserID, FoodID, ComboID) VALUES (8,0,5);


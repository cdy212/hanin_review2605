-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 10.5.11.176    Database: twone
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `id` int NOT NULL,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`my_row_id`),
  KEY `catregory_idx` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='카테고리';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`my_row_id`, `id`, `code`, `name`) VALUES (1,1,'partner','제휴'),(2,2,'all','전체'),(3,3,'food','한식당'),(4,4,'hospital','병원'),(5,5,'beauty','미용'),(6,6,'parenting','육아');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon`
--

DROP TABLE IF EXISTS `coupon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `expiration_date` datetime NOT NULL,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `user_id` bigint NOT NULL,
  `target_user_id` bigint DEFAULT NULL,
  `max_usage_count` int DEFAULT NULL,
  `current_usage_count` int DEFAULT '0',
  `hidden` tinyint(1) DEFAULT '0',
  `is_delete` tinyint(1) DEFAULT '0',
  `date_created` datetime NOT NULL,
  `last_updated` datetime NOT NULL,
  `place_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `code` (`code`) USING BTREE,
  KEY `fk_coupon_user` (`user_id`),
  KEY `fk_coupon_target` (`target_user_id`),
  KEY `fk_coupon_place` (`place_id`),
  CONSTRAINT `fk_coupon_place` FOREIGN KEY (`place_id`) REFERENCES `place` (`id`),
  CONSTRAINT `fk_coupon_target` FOREIGN KEY (`target_user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_coupon_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='쿠폰테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon`
--

LOCK TABLES `coupon` WRITE;
/*!40000 ALTER TABLE `coupon` DISABLE KEYS */;
INSERT INTO `coupon` VALUES (1,'BBA75AE6-B65','아메리카노 1234','맛있는 커피를 드세요','1111','2026-06-22 17:18:00','UNIVERSAL',1,NULL,NULL,NULL,0,0,'2026-05-22 16:19:55','2026-06-08 14:04:12',1),(2,'CA17F1FA-498','식사1회 무료 쿠폰','아무거나 1회 메뉴 한정','2113','2026-06-22 17:20:00','UNIVERSAL',56,NULL,NULL,0,0,0,'2026-05-22 16:21:59','2026-05-22 16:21:59',NULL),(3,'77CCC74E-A7F','★★★ 한인회 업체 선점 기념 커피 믹스 쿠폰 발행 ★★★','커피쿠폰은 1인 1매 한정합니다. \n다른쿠폰과 중복사용 불가능합니다.\n\n사용기간이 지난 쿠폰은 재사용 불가능합니다.\n\n쿠폰은 양도불가능합니다.\n\n감사합니다.','1111','2026-12-31 12:00:00','UNIVERSAL',1,NULL,NULL,NULL,0,0,'2026-05-28 13:42:43','2026-05-28 13:43:29',NULL),(4,'8C176C27-0DB','★★★ 한인회 업체 선점 기념 대상자 대상 커피 1+1 쿠폰 발행 ★★★','비번 9999','9999','2026-06-28 14:50:00','PERSONAL',1,NULL,NULL,NULL,0,0,'2026-05-28 13:51:17','2026-05-28 13:52:00',NULL),(5,'55F031E4-F1F','고기 1kg 무한 제공','누구나 고기를 마음껏 드실 수 있는 쿠폰','1234','2026-06-28 16:07:00','UNIVERSAL',1,NULL,NULL,NULL,0,0,'2026-05-28 15:08:16','2026-06-05 13:39:59',2),(6,'2026SUMMER_Happytuk','★★★여름맞이6월음료쿠폰★★★','1. 1인 1메뉴 구매시 사용가능합니다.\n2. 쿠폰 중복사용이 불가합니다.\n3. 쿠폰유효기간까지 사용가능합니다.','1111','2026-06-05 12:12:00','UNIVERSAL',58,NULL,NULL,0,0,0,'2026-06-05 11:14:42','2026-06-05 11:14:42',NULL),(7,'ABFAA22A-933','테스트','11111','1111','2026-07-30 15:48:00','PERSONAL',55,NULL,NULL,NULL,0,0,'2026-06-30 14:49:39','2026-06-30 14:53:50',NULL);
/*!40000 ALTER TABLE `coupon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon_target_user`
--

DROP TABLE IF EXISTS `coupon_target_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon_target_user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '고유 식별자(PK)',
  `coupon_id` bigint NOT NULL COMMENT '쿠폰 ID (FK)',
  `target_user_id` bigint NOT NULL COMMENT '지정 대상 유저 ID (FK)',
  PRIMARY KEY (`id`),
  KEY `idx_coupon_target_coupon_id` (`coupon_id`),
  KEY `idx_coupon_target_user_id` (`target_user_id`),
  CONSTRAINT `fk_coupon_target_to_coupon` FOREIGN KEY (`coupon_id`) REFERENCES `coupon` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_coupon_target_to_user` FOREIGN KEY (`target_user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='지정 쿠폰 유저매핑';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon_target_user`
--

LOCK TABLES `coupon_target_user` WRITE;
/*!40000 ALTER TABLE `coupon_target_user` DISABLE KEYS */;
INSERT INTO `coupon_target_user` VALUES (1,4,36),(2,4,34),(3,7,50),(4,7,49);
/*!40000 ALTER TABLE `coupon_target_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon_user`
--

DROP TABLE IF EXISTS `coupon_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon_user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '유저 쿠폰 고유 ID',
  `coupon_id` bigint NOT NULL COMMENT '쿠폰 마스터 ID (FK)',
  `user_id` bigint NOT NULL COMMENT '다운로드 받은 유저 ID (FK)',
  `is_used` tinyint(1) NOT NULL DEFAULT '0' COMMENT '사용 여부 (0: 미사용, 1: 사용완료)',
  `download_date` datetime NOT NULL COMMENT '쿠폰 다운로드 일시',
  `use_date` datetime DEFAULT NULL COMMENT '실제 사용 처리된 일시 (미사용 시 NULL)',
  PRIMARY KEY (`id`),
  KEY `fk_coupon_user_coupon_id` (`coupon_id`),
  KEY `fk_coupon_user_user_id` (`user_id`),
  CONSTRAINT `fk_coupon_user_coupon_id` FOREIGN KEY (`coupon_id`) REFERENCES `coupon` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_coupon_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='유저별 쿠폰 발급 및 보관함';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon_user`
--

LOCK TABLES `coupon_user` WRITE;
/*!40000 ALTER TABLE `coupon_user` DISABLE KEYS */;
INSERT INTO `coupon_user` VALUES (1,2,1,1,'2026-05-22 16:22:21','2026-05-22 16:24:04'),(2,2,56,1,'2026-05-22 16:22:26','2026-05-22 16:22:44'),(3,1,39,1,'2026-05-27 10:47:04','2026-05-27 10:47:14'),(4,2,39,0,'2026-05-28 13:14:11',NULL),(5,3,27,0,'2026-05-28 13:45:08',NULL),(6,4,34,0,'2026-05-28 13:52:01',NULL),(7,3,34,1,'2026-05-28 13:53:02','2026-05-28 13:53:22'),(8,4,36,0,'2026-06-05 11:12:54',NULL),(9,1,1,0,'2026-06-12 19:51:52',NULL),(11,7,49,0,'2026-06-30 14:53:50',NULL),(12,7,50,0,'2026-06-30 14:53:50',NULL);
/*!40000 ALTER TABLE `coupon_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupon_user_history`
--

DROP TABLE IF EXISTS `coupon_user_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupon_user_history` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '쿠폰 사용 이력 고유 ID',
  `coupon_id` bigint NOT NULL COMMENT '사용한 쿠폰 마스터 ID (FK)',
  `user_id` bigint NOT NULL COMMENT '사용한 유저 ID (FK)',
  `use_date` datetime NOT NULL COMMENT '실제 쿠폰을 사용한 일시',
  PRIMARY KEY (`id`),
  KEY `fk_coupon_history_coupon_id` (`coupon_id`),
  KEY `fk_coupon_history_user_id` (`user_id`),
  CONSTRAINT `fk_coupon_history_coupon_id` FOREIGN KEY (`coupon_id`) REFERENCES `coupon` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_coupon_history_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='쿠폰 사용 기록 로그';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupon_user_history`
--

LOCK TABLES `coupon_user_history` WRITE;
/*!40000 ALTER TABLE `coupon_user_history` DISABLE KEYS */;
INSERT INTO `coupon_user_history` VALUES (1,2,56,'2026-05-22 16:22:44'),(2,2,1,'2026-05-22 16:24:04'),(3,1,39,'2026-05-27 10:47:14'),(4,3,34,'2026-05-28 13:53:22');
/*!40000 ALTER TABLE `coupon_user_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_upload`
--

DROP TABLE IF EXISTS `file_upload`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file_upload` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `original_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '파일 원본명',
  `saved_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '파일명',
  `saved_path` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '파일저장경로',
  `file_type` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '파일 MIME 타입',
  `file_size` bigint DEFAULT NULL COMMENT '파일 사이즈',
  `memo` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '관리자 메모',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일자',
  `last_updated` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '수정일자',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='파일 업로드 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_upload`
--

LOCK TABLES `file_upload` WRITE;
/*!40000 ALTER TABLE `file_upload` DISABLE KEYS */;
INSERT INTO `file_upload` VALUES (3,'closers_sample1.jpg',NULL,'image/20260624/36b01dbb-1ff0-4d26-869f-7a0eeded1e20.jpg','image/jpeg',275414,'샘플1','2026-06-24 15:03:42','2026-06-24 15:03:42'),(4,'du_명령어.txt',NULL,'file/20260624/6ae706f8-55ff-4e19-961d-effb565022af.txt','text/plain',11,'텍스트 샘플','2026-06-24 15:08:55','2026-06-24 15:08:55'),(5,'fox.ico',NULL,'file/20260624/4040921f-e9b8-47ef-a171-64e194c753d3.ico','image/x-icon',14538,'','2026-06-24 15:18:53','2026-06-24 15:18:53'),(6,'輸贏.url',NULL,'file/20260624/eaf753f8-5d87-4ab8-9fa0-c535b645a64f.url','application/octet-stream',240,'','2026-06-24 15:49:26','2026-06-24 15:49:26'),(7,'bandicam_2020-01-05_13-28-08-290.jpg',NULL,'image/20260624/2d6e93b0-3091-4ce1-b42d-3b4ea517dda8.jpg','image/jpeg',58262,'','2026-06-24 15:49:52','2026-06-24 15:49:52');
/*!40000 ALTER TABLE `file_upload` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `place`
--

DROP TABLE IF EXISTS `place`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `place` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL COMMENT 'FK to category.id',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '업체명',
  `address` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '상세 주소',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '간단한 설명 (혜택 등)',
  `is_korean_service` tinyint(1) NOT NULL DEFAULT '0' COMMENT '한국어 가능 여부',
  `is_partner` tinyint(1) NOT NULL DEFAULT '0' COMMENT '제휴 업체 여부',
  `weight` int NOT NULL DEFAULT '0' COMMENT '노출 가중치 (우선순위)',
  `latitude` double NOT NULL COMMENT '위도',
  `longitude` double NOT NULL COMMENT '경도',
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` bigint DEFAULT NULL,
  `google_map_id` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_place_category` (`category_id`),
  KEY `fk_place_user` (`user_id`),
  KEY `idx_place_google_map_id` (`google_map_id`),
  CONSTRAINT `fk_place_category` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_place_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='장소/업체 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `place`
--

LOCK TABLES `place` WRITE;
/*!40000 ALTER TABLE `place` DISABLE KEYS */;
INSERT INTO `place` VALUES (1,4,'타이베이 연세 소아과','타이베이시 다안구 충효동로 123','',1,0,0,25.035,121.545,'2026-05-21 16:07:18','2026-05-27 13:43:40',1,NULL),(2,1,'서울 뚝배기 (본점)','타이베이시 신의구 송인로 45','10% 할인',1,1,100,25.041,121.565,'2026-05-21 16:07:18','2026-05-27 13:43:40',1,NULL),(3,5,'강남 헤어 살롱','타이베이시 신의구 기륭로 1가 333','',1,0,0,25.033,121.56,'2026-05-21 16:07:19','2026-05-27 13:43:40',1,NULL),(4,3,'부산 돼지국밥','타이베이시 다안구 신이로 4가','',1,0,0,25.03,121.55,'2026-05-21 16:07:19','2026-05-27 13:43:40',1,NULL),(5,1,'韓菜100','타이베이 101, 7, 信義路五段, 西村里, 신이구, 信義商圈, 타이베이시, 11049, 대만','시먼딩 근처에 위치한 가성비 좋고 유명한 한국 요리 전문점',1,0,0,25.0338352,121.5644995,'2026-05-28 15:07:23','2026-05-28 15:07:23',38,NULL),(6,1,'asdfsadf','타이베이 101, 7, 信義路五段, 西村里, 신이구, 信義商圈, 타이베이시, 11049, 대만','asdfds',1,0,0,25.0338352,121.5644995,'2026-06-02 14:09:21','2026-06-02 14:09:21',1,NULL),(7,1,'타이페이넘버원 만두나라','타이베이시, 대만','Only On Taipei city',0,0,0,25.0375198,121.5636796,'2026-06-05 11:17:47','2026-06-05 11:17:47',1,NULL),(8,1,'은화동','108 대만 타이베이 완화 구','대만 맛집 술집',1,0,0,25.039992,121.506089,'2026-06-10 14:15:37','2026-06-25 10:28:05',1,'ChIJSZSxfaepQjQRRac_sY_GJyQ'),(9,1,'해피툭 만두지','103 대만 타이베이 다퉁 구','만두집 맛있어여',0,0,0,25.0646679,121.5135884,'2026-06-23 09:35:42','2026-06-25 10:28:05',1,'ChIJoXsMUT-pQjQRcxVGUKTCuXk'),(10,1,'테스트 맵','대만 타이베이','dsfsdfsd',1,0,0,25.0329694,121.5654177,'2026-06-25 12:40:27','2026-06-25 12:40:27',1,'ChIJmQrivHKsQjQR4MIK3c41aj8'),(11,4,'해피툭 병원','대만 타이베이','해피해피해피',0,0,0,25.0329694,121.5654177,'2026-06-26 15:37:43','2026-06-26 15:37:43',1,'ChIJmQrivHKsQjQR4MIK3c41aj8');
/*!40000 ALTER TABLE `place` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regions`
--

DROP TABLE IF EXISTS `regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'City/County Name (e.g., Taipei City, Yilan County)',
  `district_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'District/Township Name (e.g., Daan District, Jiaoxi Township)',
  `name_kr` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'Korean Name (e.g., 타이베이시 다안구)',
  `name_en` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'English Name (e.g., Daan Dist, Taipei City)',
  `latitude` double NOT NULL DEFAULT '0' COMMENT 'Latitude',
  `longitude` double NOT NULL DEFAULT '0' COMMENT 'Longitude',
  `place_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT 'Google Place ID',
  `formatted_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=367 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regions`
--

LOCK TABLES `regions` WRITE;
/*!40000 ALTER TABLE `regions` DISABLE KEYS */;
INSERT INTO `regions` VALUES (1,'Taipei City','Songshan District','타이베이시 쑹산구','Songshan Dist',0,0,NULL,NULL),(2,'Taipei City','Xinyi District','타이베이시 신이구','Xinyi Dist',0,0,NULL,NULL),(3,'Taipei City','Daan District','타이베이시 다안구','Daan Dist',0,0,NULL,NULL),(4,'Taipei City','Zhongshan District','타이베이시 중산구','Zhongshan Dist',0,0,NULL,NULL),(5,'Taipei City','Zhongzheng District','타이베이시 중정구','Zhongzheng Dist',0,0,NULL,NULL),(6,'Taipei City','Datong District','타이베이시 다퉁구','Datong Dist',0,0,NULL,NULL),(7,'Taipei City','Wanhua District','타이베이시 완화구','Wanhua Dist',0,0,NULL,NULL),(8,'Taipei City','Wenshan District','타이베이시 원산구','Wenshan Dist',0,0,NULL,NULL),(9,'Taipei City','Nangang District','타이베이시 난강구','Nangang Dist',0,0,NULL,NULL),(10,'Taipei City','Neihu District','타이베이시 네이후구','Neihu Dist',0,0,NULL,NULL),(11,'Taipei City','Shilin District','타이베이시 스린구','Shilin Dist',0,0,NULL,NULL),(12,'Taipei City','Beitou District','타이베이시 베itou구','Beitou Dist',0,0,NULL,NULL),(13,'New Taipei City','Banqiao District','신베이시 반차오구','Banqiao Dist',0,0,NULL,NULL),(14,'New Taipei City','Sanchong District','신베이시 싼충구','Sanchong Dist',0,0,NULL,NULL),(15,'New Taipei City','Zhonghe District','신베이시 중허구','Zhonghe Dist',0,0,NULL,NULL),(16,'New Taipei City','Yonghe District','신베이시 융허구','Yonghe Dist',0,0,NULL,NULL),(17,'New Taipei City','Xinzhuang District','신베이시 신좡구','Xinzhuang Dist',0,0,NULL,NULL),(18,'New Taipei City','Xindian District','신베이시 신뎬구','Xindian Dist',0,0,NULL,NULL),(19,'New Taipei City','Shulin District','신베이시 수린구','Shulin Dist',0,0,NULL,NULL),(20,'New Taipei City','Yingge District','신베이시 잉거구','Yingge Dist',0,0,NULL,NULL),(21,'New Taipei City','Sanxia District','신베이시 싼샤구','Sanxia Dist',0,0,NULL,NULL),(22,'New Taipei City','Tamsui District','신베이시 단수이구','Tamsui Dist',0,0,NULL,NULL),(23,'New Taipei City','Xizhi District','신베이시 시즈구','Xizhi Dist',0,0,NULL,NULL),(24,'New Taipei City','Ruifang District','신베이시 루이팡구','Ruifang Dist',0,0,NULL,NULL),(25,'New Taipei City','Tucheng District','신베이시 투청구','Tucheng Dist',0,0,NULL,NULL),(26,'New Taipei City','Luzhou District','신베이시 루저우구','Luzhou Dist',0,0,NULL,NULL),(27,'New Taipei City','Wugu District','신베이시 우구구','Wugu Dist',0,0,NULL,NULL),(28,'New Taipei City','Taishan District','신베이시 타이산구','Taishan Dist',0,0,NULL,NULL),(29,'New Taipei City','Linkou District','신베이시 린커우구','Linkou Dist',0,0,NULL,NULL),(30,'New Taipei City','Shenkeng District','신베이시 선컹구','Shenkeng Dist',0,0,NULL,NULL),(31,'New Taipei City','Shiding District','신베이시 스딩구','Shiding Dist',0,0,NULL,NULL),(32,'New Taipei City','Pinglin District','신베이시 핑린구','Pinglin Dist',0,0,NULL,NULL),(33,'New Taipei City','Sanzhi District','신베이시 싼즈구','Sanzhi Dist',0,0,NULL,NULL),(34,'New Taipei City','Shimen District','신베이시 스먼구','Shimen Dist',0,0,NULL,NULL),(35,'New Taipei City','Bali District','신베이시 바리구','Bali Dist',0,0,NULL,NULL),(36,'New Taipei City','Pingxi District','신베이시 핑시구','Pingxi Dist',0,0,NULL,NULL),(37,'New Taipei City','Shuangxi District','신베이시 솽시구','Shuangxi Dist',0,0,NULL,NULL),(38,'New Taipei City','Gongliao District','신베이시 궁랴오구','Gongliao Dist',0,0,NULL,NULL),(39,'New Taipei City','Jinshan District','신베이시 진산구','Jinshan Dist',0,0,NULL,NULL),(40,'New Taipei City','Wanli District','신베이시 완리구','Wanli Dist',0,0,NULL,NULL),(41,'New Taipei City','Wulai District','신베이시 우라이구','Wulai Dist',0,0,NULL,NULL),(42,'Taoyuan City','Taoyuan District','타오위안시 타오위안구','Taoyuan Dist',0,0,NULL,NULL),(43,'Taoyuan City','Zhongli District','타오위안시 중리구','Zhongli Dist',0,0,NULL,NULL),(44,'Taoyuan City','Daxi District','타오위안시 도시구','Daxi Dist',0,0,NULL,NULL),(45,'Taoyuan City','Yangmei District','타오위안시 양메이구','Yangmei Dist',0,0,NULL,NULL),(46,'Taoyuan City','Luzhu District','타오위안시 루주구','Luzhu Dist',0,0,NULL,NULL),(47,'Taoyuan City','Dayuan District','타오위안시 다위안구','Dayuan Dist',0,0,NULL,NULL),(48,'Taoyuan City','Guishan District','타오위안시 구이산구','Guishan Dist',0,0,NULL,NULL),(49,'Taoyuan City','Bade District','타오위안시 바더구','Bade Dist',0,0,NULL,NULL),(50,'Taoyuan City','Longtan District','타오위안시 룽탄구','Longtan Dist',0,0,NULL,NULL),(51,'Taoyuan City','Pingzhen District','타오위안시 핑전구','Pingzhen Dist',0,0,NULL,NULL),(52,'Taoyuan City','Xinwu District','타오위안시 신우구','Xinwu Dist',0,0,NULL,NULL),(53,'Taoyuan City','Guanyin District','타오위안시 관인구','Guanyin Dist',0,0,NULL,NULL),(54,'Taoyuan City','Fuxing District','타오위안시 푸싱구','Fuxing Dist',0,0,NULL,NULL),(55,'Taichung City','Central District','타이중시 중구','Central Dist',0,0,NULL,NULL),(56,'Taichung City','East District','타이중시 동구','East Dist',0,0,NULL,NULL),(57,'Taichung City','South District','타이중시 남구','South Dist',0,0,NULL,NULL),(58,'Taichung City','West District','타이중시 서구','West Dist',0,0,NULL,NULL),(59,'Taichung City','North District','타이중시 북구','North Dist',0,0,NULL,NULL),(60,'Taichung City','Xitun District','타이중시 시툰구','Xitun Dist',0,0,NULL,NULL),(61,'Taichung City','Nantun District','타이중시 난툰구','Nantun Dist',0,0,NULL,NULL),(62,'Taichung City','Beitun District','타이중시 베이툰구','Beitun Dist',0,0,NULL,NULL),(63,'Taichung City','Fengyuan District','타이중시 펑위안구','Fengyuan Dist',0,0,NULL,NULL),(64,'Taichung City','Dali District','타이중시 다리구','Dali Dist',0,0,NULL,NULL),(65,'Taichung City','Taiping District','타이중시 타이핑구','Taiping Dist',0,0,NULL,NULL),(66,'Taichung City','Dongshi District','타이중시 둥스구','Dongshi Dist',0,0,NULL,NULL),(67,'Taichung City','Dajia District','타이중시 다자구','Dajia Dist',0,0,NULL,NULL),(68,'Taichung City','Qingshui District','타이중시 칭수이구','Qingshui Dist',0,0,NULL,NULL),(69,'Taichung City','Shalu District','타이중시 사루구','Shalu Dist',0,0,NULL,NULL),(70,'Taichung City','Wuqi District','타이중시 우치구','Wuqi Dist',0,0,NULL,NULL),(71,'Taichung City','Houli District','타이중시 허우리구','Houli Dist',0,0,NULL,NULL),(72,'Taichung City','Shengang District','타이중시 선강구','Shengang Dist',0,0,NULL,NULL),(73,'Taichung City','Tanzi District','타이중시 탄쯔구','Tanzi Dist',0,0,NULL,NULL),(74,'Taichung City','Daya District','타이중시 다야구','Daya Dist',0,0,NULL,NULL),(75,'Taichung City','Xinshe District','타이중시 신서구','Xinshe Dist',0,0,NULL,NULL),(76,'Taichung City','Shigang District','타이중시 스강구','Shigang Dist',0,0,NULL,NULL),(77,'Taichung City','Waipu District','타이중시 와이푸구','Waipu Dist',0,0,NULL,NULL),(78,'Taichung City','Daan District','타이중시 다안구','Daan Dist',0,0,NULL,NULL),(79,'Taichung City','Wuri District','타이중시 우르구','Wuri Dist',0,0,NULL,NULL),(80,'Taichung City','Dadu District','타이중시 다두구','Dadu Dist',0,0,NULL,NULL),(81,'Taichung City','Longjing District','타이중시 룽징구','Longjing Dist',0,0,NULL,NULL),(82,'Taichung City','Wufeng District','타이중시 우펑구','Wufeng Dist',0,0,NULL,NULL),(83,'Taichung City','Heping District','타이중시 허핑구','Heping Dist',0,0,NULL,NULL),(84,'Tainan City','East District','타이난시 동구','East Dist',0,0,NULL,NULL),(85,'Tainan City','South District','타이난시 남구','South Dist',0,0,NULL,NULL),(86,'Tainan City','North District','타이난시 북구','North Dist',0,0,NULL,NULL),(87,'Tainan City','Anping District','타이난시 안핑구','Anping Dist',0,0,NULL,NULL),(88,'Tainan City','Annan District','타이난시 안난구','Annan Dist',0,0,NULL,NULL),(89,'Tainan City','Yongkang District','타이난시 융캉구','Yongkang Dist',0,0,NULL,NULL),(90,'Tainan City','Xinhua District','타이난시 신화구','Xinhua Dist',0,0,NULL,NULL),(91,'Tainan City','Xinshi District','타이난시 신스구','Xinshi Dist',0,0,NULL,NULL),(92,'Tainan City','Shanhua District','타이난시 산화구','Shanhua Dist',0,0,NULL,NULL),(93,'Tainan City','Anding District','타이난시 안딩구','Anding Dist',0,0,NULL,NULL),(94,'Tainan City','Xinying District','타이난시 신잉구','Xinying Dist',0,0,NULL,NULL),(95,'Tainan City','Yanshui District','타이난시 옌수이구','Yanshui Dist',0,0,NULL,NULL),(96,'Tainan City','Baihe District','타이난시 바이허구','Baihe Dist',0,0,NULL,NULL),(97,'Tainan City','Liuying District','타이난시 류잉구','Liuying Dist',0,0,NULL,NULL),(98,'Tainan City','Houbi District','타이난시 허우비구','Houbi Dist',0,0,NULL,NULL),(99,'Tainan City','Dongshan District','타이난시 둥산구','Dongshan Dist',0,0,NULL,NULL),(100,'Tainan City','Madou District','타이난시 마더우구','Madou Dist',0,0,NULL,NULL),(101,'Tainan City','Xiaying District','타이난시 샤잉구','Xiaying Dist',0,0,NULL,NULL),(102,'Tainan City','Liujia District','타이난시 류자구','Liujia Dist',0,0,NULL,NULL),(103,'Tainan City','Guantian District','타이난시 관톈구','Guantian Dist',0,0,NULL,NULL),(104,'Tainan City','Danei District','타이난시 다네이구','Danei Dist',0,0,NULL,NULL),(105,'Tainan City','Jiali District','타이난시 자리구','Jiali Dist',0,0,NULL,NULL),(106,'Tainan City','Xuejia District','타이난시 쉐자구','Xuejia Dist',0,0,NULL,NULL),(107,'Tainan City','Xigang District','타이난시 시강구','Xigang Dist',0,0,NULL,NULL),(108,'Tainan City','Qigu District','타이난시 치구구','Qigu Dist',0,0,NULL,NULL),(109,'Tainan City','Jiangjun District','타이난시 장쥔구','Jiangjun Dist',0,0,NULL,NULL),(110,'Tainan City','Beimen District','타이난시 베이먼구','Beimen Dist',0,0,NULL,NULL),(111,'Tainan City','Yujing District','타이난시 위징구','Yujing Dist',0,0,NULL,NULL),(112,'Tainan City','Nanxi District','타이난시 난시구','Nanxi Dist',0,0,NULL,NULL),(113,'Tainan City','Nanhua District','타이난시 난화구','Nanhua Dist',0,0,NULL,NULL),(114,'Tainan City','Zuozhen District','타이난시 쭤전구','Zuozhen Dist',0,0,NULL,NULL),(115,'Tainan City','Rende District','타이난시 런더구','Rende Dist',0,0,NULL,NULL),(116,'Tainan City','Guiren District','타이난시 구이런구','Guiren Dist',0,0,NULL,NULL),(117,'Tainan City','Guanmiao District','타이난시 관먀오구','Guanmiao Dist',0,0,NULL,NULL),(118,'Tainan City','Longqi District','타이난시 룽치구','Longqi Dist',0,0,NULL,NULL),(119,'Tainan City','West Central District','타이난시 중시구','West Central Dist',0,0,NULL,NULL),(120,'Kaohsiung City','Yancheng District','가오슝시 옌청구','Yancheng Dist',0,0,NULL,NULL),(121,'Kaohsiung City','Gushan District','가오슝시 구산구','Gushan Dist',0,0,NULL,NULL),(122,'Kaohsiung City','Zuoying District','가오슝시 쭤잉구','Zuoying Dist',0,0,NULL,NULL),(123,'Kaohsiung City','Nanzih District','가오슝시 난쯔구','Nanzih Dist',0,0,NULL,NULL),(124,'Kaohsiung City','Sanmin District','가오슝시 싼민구','Sanmin Dist',0,0,NULL,NULL),(125,'Kaohsiung City','Xinxing District','가오슝시 신싱구','Xinxing Dist',0,0,NULL,NULL),(126,'Kaohsiung City','Qianjin District','가오슝시 첸진구','Qianjin Dist',0,0,NULL,NULL),(127,'Kaohsiung City','Lingya District','가오슝시 링야구','Lingya Dist',0,0,NULL,NULL),(128,'Kaohsiung City','Qianzhen District','가오슝시 첸전구','Qianzhen Dist',0,0,NULL,NULL),(129,'Kaohsiung City','Qijin District','가오슝시 치진구','Qijin Dist',0,0,NULL,NULL),(130,'Kaohsiung City','Xiaogang District','가오슝시 샤오강구','Xiaogang Dist',0,0,NULL,NULL),(131,'Kaohsiung City','Fengshan District','가오슝시 펑산구','Fengshan Dist',0,0,NULL,NULL),(132,'Kaohsiung City','Linyuan District','가오슝시 린위안구','Linyuan Dist',0,0,NULL,NULL),(133,'Kaohsiung City','Daliao District','가오슝시 다랴오구','Daliao Dist',0,0,NULL,NULL),(134,'Kaohsiung City','Dashu District','가오슝시 다수구','Dashu Dist',0,0,NULL,NULL),(135,'Kaohsiung City','Dashe District','가오슝시 다서구','Dashe Dist',0,0,NULL,NULL),(136,'Kaohsiung City','Renwu District','가오슝시 런우구','Renwu Dist',0,0,NULL,NULL),(137,'Kaohsiung City','Niaosong District','가오슝시 냐오쑹구','Niaosong Dist',0,0,NULL,NULL),(138,'Kaohsiung City','Gangshan District','가오슝시 강산구','Gangshan Dist',0,0,NULL,NULL),(139,'Kaohsiung City','Qiaotou District','가오슝시 차오터우구','Qiaotou Dist',0,0,NULL,NULL),(140,'Kaohsiung City','Yanchao District','가오슝시 옌차오구','Yanchao Dist',0,0,NULL,NULL),(141,'Kaohsiung City','Tianliao District','가오슝시 톈랴오구','Tianliao Dist',0,0,NULL,NULL),(142,'Kaohsiung City','Alian District','가오슝시 아롄구','Alian Dist',0,0,NULL,NULL),(143,'Kaohsiung City','Lujhu District','가오슝시 루주구','Lujhu Dist',0,0,NULL,NULL),(144,'Kaohsiung City','Hunei District','가오슝시 후네이구','Hunei Dist',0,0,NULL,NULL),(145,'Kaohsiung City','Qiding District','가오슝시 치딩구','Qiding Dist',0,0,NULL,NULL),(146,'Kaohsiung City','Yong\'an District','가오슝시 융안구','Yong\'an Dist',0,0,NULL,NULL),(147,'Kaohsiung City','Ziguan District','가오슝시 쯔관구','Ziguan Dist',0,0,NULL,NULL),(148,'Kaohsiung City','Mituo District','가오슝시 미퉈구','Mituo Dist',0,0,NULL,NULL),(149,'Kaohsiung City','Liugui District','가오슝시 류구이구','Liugui Dist',0,0,NULL,NULL),(150,'Kaohsiung City','Jiaxian District','가오슝시 자셴구','Jiaxian Dist',0,0,NULL,NULL),(151,'Kaohsiung City','Shanlin District','가오슝시 산린구','Shanlin Dist',0,0,NULL,NULL),(152,'Kaohsiung City','Neimen District','가오슝시 네이먼구','Neimen Dist',0,0,NULL,NULL),(153,'Kaohsiung City','Maolin District','가오슝시 마오린구','Maolin Dist',0,0,NULL,NULL),(154,'Kaohsiung City','Taoyuan District','가오슝시 타오위안구','Taoyuan Dist',0,0,NULL,NULL),(155,'Kaohsiung City','Namaxia District','가오슝시 나마샤구','Namaxia Dist',0,0,NULL,NULL),(156,'Kaohsiung City','Qishan District','가오슝시 치산구','Qishan Dist',0,0,NULL,NULL),(157,'Kaohsiung City','Meinong District','가오슝시 메이눙구','Meinong Dist',0,0,NULL,NULL),(158,'Keelung City','Zhongzheng District','지룽시 중정구','Zhongzheng Dist',0,0,NULL,NULL),(159,'Keelung City','Qidu District','지룽시 치두구','Qidu Dist',0,0,NULL,NULL),(160,'Keelung City','Nuannuan District','지룽시 놘놘구','Nuannuan Dist',0,0,NULL,NULL),(161,'Keelung City','Renai District','지룽시 런아이구','Renai Dist',0,0,NULL,NULL),(162,'Keelung City','Zhongshan District','지룽시 중산구','Zhongshan Dist',0,0,NULL,NULL),(163,'Keelung City','Anle District','지룽시 안러구','Anle Dist',0,0,NULL,NULL),(164,'Keelung City','Xinyi District','지룽시 신이구','Xinyi Dist',0,0,NULL,NULL),(165,'Hsinchu City','East District','신주시 동구','East Dist',0,0,NULL,NULL),(166,'Hsinchu City','North District','신주시 북구','North Dist',0,0,NULL,NULL),(167,'Hsinchu City','Xiangshan District','신주시 샹산구','Xiangshan Dist',0,0,NULL,NULL),(168,'Chiayi City','East District','자이시 동구','East Dist',0,0,NULL,NULL),(169,'Chiayi City','West District','자이시 서구','West Dist',0,0,NULL,NULL),(170,'Yilan County','Yilan City','이란현 이란시','Yilan City',0,0,NULL,NULL),(171,'Yilan County','Luodong Township','이란현 뤄둥진','Luodong Township',0,0,NULL,NULL),(172,'Yilan County','Su\'ao Township','이란현 쑤아오진','Su\'ao Township',0,0,NULL,NULL),(173,'Yilan County','Toucheng Township','이란현 터우청진','Toucheng Township',0,0,NULL,NULL),(174,'Yilan County','Jiaoxi Township','이란현 자오시향','Jiaoxi Township',0,0,NULL,NULL),(175,'Yilan County','Zhuangwei Township','이란현 좡웨이향','Zhuangwei Township',0,0,NULL,NULL),(176,'Yilan County','Yuanshan Township','이란현 위안산향','Yuanshan Township',0,0,NULL,NULL),(177,'Yilan County','Dongshan Township','이란현 둥산향','Dongshan Township',0,0,NULL,NULL),(178,'Yilan County','Wujie Township','이란현 우제향','Wujie Township',0,0,NULL,NULL),(179,'Yilan County','Sanxing Township','이란현 싼싱향','Sanxing Township',0,0,NULL,NULL),(180,'Yilan County','Datong Township','이란현 다퉁향','Datong Township',0,0,NULL,NULL),(181,'Yilan County','Nan\'ao Township','이란현 난아오향','Nan\'ao Township',0,0,NULL,NULL),(182,'Hsinchu County','Zhubei City','신주현 주베이시','Zhubei City',0,0,NULL,NULL),(183,'Hsinchu County','Zhudong Township','신주현 주둥진','Zhudong Township',0,0,NULL,NULL),(184,'Hsinchu County','Xinpu Township','신주현 신푸진','Xinpu Township',0,0,NULL,NULL),(185,'Hsinchu County','Guanxi Township','신주현 관시진','Guanxi Township',0,0,NULL,NULL),(186,'Hsinchu County','Hukou Township','신주현 후커우향','Hukou Township',0,0,NULL,NULL),(187,'Hsinchu County','Xinfeng Township','신주현 신펑향','Xinfeng Township',0,0,NULL,NULL),(188,'Hsinchu County','Qionglin Township','신주현 충린향','Qionglin Township',0,0,NULL,NULL),(189,'Hsinchu County','Hengshan Township','신주현 헝산향','Hengshan Township',0,0,NULL,NULL),(190,'Hsinchu County','Beipu Township','신주현 베이푸향','Beipu Township',0,0,NULL,NULL),(191,'Hsinchu County','Baoshan Township','신주현 바오산향','Baoshan Township',0,0,NULL,NULL),(192,'Hsinchu County','Emei Township','신주현 어메이향','Emei Township',0,0,NULL,NULL),(193,'Hsinchu County','Jianshi Township','신주현 젠스향','Jianshi Township',0,0,NULL,NULL),(194,'Hsinchu County','Wufeng Township','신주현 우펑향','Wufeng Township',0,0,NULL,NULL),(195,'Miaoli County','Miaoli City','먀오리현 먀오리시','Miaoli City',0,0,NULL,NULL),(196,'Miaoli County','Toufen City','먀오리현 터우펀시','Toufen City',0,0,NULL,NULL),(197,'Miaoli County','Yuanli Township','먀오리현 위안리진','Yuanli Township',0,0,NULL,NULL),(198,'Miaoli County','Tongxiao Township','먀오리현 퉁샤오진','Tongxiao Township',0,0,NULL,NULL),(199,'Miaoli County','Zhunan Township','먀오리현 주난진','Zhunan Township',0,0,NULL,NULL),(200,'Miaoli County','Houlong Township','먀오리현 허우룽진','Houlong Township',0,0,NULL,NULL),(201,'Miaoli County','Zhuolan Township','먀오리현 줘란진','Zhuolan Township',0,0,NULL,NULL),(202,'Miaoli County','Dahu Township','먀오리현 다후향','Dahu Township',0,0,NULL,NULL),(203,'Miaoli County','Gongguan Township','먀오리현 궁관향','Gongguan Township',0,0,NULL,NULL),(204,'Miaoli County','Tongluo Township','먀오리현 퉁뤄향','Tongluo Township',0,0,NULL,NULL),(205,'Miaoli County','Nanzhuang Township','먀오리현 난좡향','Nanzhuang Township',0,0,NULL,NULL),(206,'Miaoli County','Touwu Township','먀오리현 터우우향','Touwu Township',0,0,NULL,NULL),(207,'Miaoli County','Sanyi Township','먀오리현 싼이향','Sanyi Township',0,0,NULL,NULL),(208,'Miaoli County','Xihu Township','먀오리현 시후향','Xihu Township',0,0,NULL,NULL),(209,'Miaoli County','Zaoqiao Township','먀오리현 짜오차오향','Zaoqiao Township',0,0,NULL,NULL),(210,'Miaoli County','Sanwan Township','먀오리현 싼완향','Sanwan Township',0,0,NULL,NULL),(211,'Miaoli County','Shitan Township','먀오리현 스탄향','Shitan Township',0,0,NULL,NULL),(212,'Miaoli County','Tai\'an Township','먀오리현 타이안향','Tai\'an Township',0,0,NULL,NULL),(213,'Changhua County','Changhua City','장화현 장화시','Changhua City',0,0,NULL,NULL),(214,'Changhua County','Yuanlin City','장화현 위안린시','Yuanlin City',0,0,NULL,NULL),(215,'Changhua County','Lugang Township','장화현 루강진','Lugang Township',0,0,NULL,NULL),(216,'Changhua County','Hemei Township','장화현 허메이진','Hemei Township',0,0,NULL,NULL),(217,'Changhua County','Beidou Township','장화현 베이더우진','Beidou Township',0,0,NULL,NULL),(218,'Changhua County','Xihu Township','장화현 시후진','Xihu Township',0,0,NULL,NULL),(219,'Changhua County','Tianzhong Township','장화현 톈중진','Tianzhong Township',0,0,NULL,NULL),(220,'Changhua County','Erlin Township','장화현 얼린진','Erlin Township',0,0,NULL,NULL),(221,'Changhua County','Xianxi Township','장화현 셴시향','Xianxi Township',0,0,NULL,NULL),(222,'Changhua County','Shengang Township','장화현 선강향','Shengang Township',0,0,NULL,NULL),(223,'Changhua County','Fuxing Township','장화현 푸싱향','Fuxing Township',0,0,NULL,NULL),(224,'Changhua County','Xiushui Township','장화현 슈수이향','Xiushui Township',0,0,NULL,NULL),(225,'Changhua County','Huatan Township','장화현 화탄향','Huatan Township',0,0,NULL,NULL),(226,'Changhua County','Fenyuan Township','장화현 펀위안향','Fenyuan Township',0,0,NULL,NULL),(227,'Changhua County','Dacun Township','장화현 다춘향','Dacun Township',0,0,NULL,NULL),(228,'Changhua County','Puyan Township','장화현 푸옌향','Puyan Township',0,0,NULL,NULL),(229,'Changhua County','Puxin Township','장화현 푸신향','Puxin Township',0,0,NULL,NULL),(230,'Changhua County','Yongjing Township','장화현 융징향','Yongjing Township',0,0,NULL,NULL),(231,'Changhua County','Shetou Township','장화현 서터우향','Shetou Township',0,0,NULL,NULL),(232,'Changhua County','Ershui Township','장화현 얼수이향','Ershui Township',0,0,NULL,NULL),(233,'Changhua County','Tianwei Township','장화현 톈웨이향','Tianwei Township',0,0,NULL,NULL),(234,'Changhua County','Pitou Township','장화현 피터우향','Pitou Township',0,0,NULL,NULL),(235,'Changhua County','Fangyuan Township','장화현 팡위안향','Fangyuan Township',0,0,NULL,NULL),(236,'Changhua County','Dacheng Township','장화현 다청향','Dacheng Township',0,0,NULL,NULL),(237,'Changhua County','Zhutang Township','장화현 주탕향','Zhutang Township',0,0,NULL,NULL),(238,'Changhua County','Xizhou Township','장화현 시저우향','Xizhou Township',0,0,NULL,NULL),(239,'Nantou County','Nantou City','난터우현 난터우시','Nantou City',0,0,NULL,NULL),(240,'Nantou County','Puli Township','난터우현 푸리진','Puli Township',0,0,NULL,NULL),(241,'Nantou County','Caotun Township','난터우현 차오툰진','Caotun Township',0,0,NULL,NULL),(242,'Nantou County','Zhushan Township','난터우현 주산진','Zhushan Township',0,0,NULL,NULL),(243,'Nantou County','Jiji Township','난터우현 지지진','Jiji Township',0,0,NULL,NULL),(244,'Nantou County','Mingjian Township','난터우현 밍젠향','Mingjian Township',0,0,NULL,NULL),(245,'Nantou County','Lugu Township','난터우현 루구향','Lugu Township',0,0,NULL,NULL),(246,'Nantou County','Zhongliao Township','난터우현 중랴오향','Zhongliao Township',0,0,NULL,NULL),(247,'Nantou County','Yuchi Township','난터우현 위츠향','Yuchi Township',0,0,NULL,NULL),(248,'Nantou County','Guoxing Township','난터우현 궈싱향','Guoxing Township',0,0,NULL,NULL),(249,'Nantou County','Shuili Township','난터우현 수이리향','Shuili Township',0,0,NULL,NULL),(250,'Nantou County','Xinyi Township','난터우현 신이향','Xinyi Township',0,0,NULL,NULL),(251,'Nantou County','Ren\'ai Township','난터우현 런아이향','Ren\'ai Township',0,0,NULL,NULL),(252,'Yunlin County','Douliu City','윈린현 더우류시','Douliu City',0,0,NULL,NULL),(253,'Yunlin County','Huwei Township','윈린현 후웨이진','Huwei Township',0,0,NULL,NULL),(254,'Yunlin County','Xiluo Township','윈린현 시뤄진','Xiluo Township',0,0,NULL,NULL),(255,'Yunlin County','Tuku Township','윈린현 투쿠진','Tuku Township',0,0,NULL,NULL),(256,'Yunlin County','Beigang Township','윈린현 베이강진','Beigang Township',0,0,NULL,NULL),(257,'Yunlin County','Gukeng Township','윈린현 구컹향','Gukeng Township',0,0,NULL,NULL),(258,'Yunlin County','Dapi Township','윈린현 다피향','Dapi Township',0,0,NULL,NULL),(259,'Yunlin County','CiTong Township','윈린현 츠퉁향','CiTong Township',0,0,NULL,NULL),(260,'Yunlin County','Linnei Township','윈린현 린네이향','Linnei Township',0,0,NULL,NULL),(261,'Yunlin County','Erlun Township','윈린현 얼룬향','Erlun Township',0,0,NULL,NULL),(262,'Yunlin County','Lunbei Township','윈린현 룬베이향','Lunbei Township',0,0,NULL,NULL),(263,'Yunlin County','Mailiao Township','윈린현 마이랴오향','Mailiao Township',0,0,NULL,NULL),(264,'Yunlin County','Dongshi Township','윈린현 둥스향','Dongshi Township',0,0,NULL,NULL),(265,'Yunlin County','Baozhong Township','윈린현 바오중향','Baozhong Township',0,0,NULL,NULL),(266,'Yunlin County','Taixi Township','윈린현 타이시향','Taixi Township',0,0,NULL,NULL),(267,'Yunlin County','Yuanchang Township','윈린현 위안장향','Yuanchang Township',0,0,NULL,NULL),(268,'Yunlin County','Sihu Township','윈린현 Sihu향','Sihu Township',0,0,NULL,NULL),(269,'Yunlin County','Kouhu Township','윈린현 커우후향','Kouhu Township',0,0,NULL,NULL),(270,'Yunlin County','Shuilin Township','윈린현 수이린향','Shuilin Township',0,0,NULL,NULL),(271,'Chiayi County','Taibao City','자이현 타이바오시','Taibao City',0,0,NULL,NULL),(272,'Chiayi County','Puzi City','자이현 푸쯔시','Puzi City',0,0,NULL,NULL),(273,'Chiayi County','Budai Township','자이현 부다이진','Budai Township',0,0,NULL,NULL),(274,'Chiayi County','Dalin Township','자이현 다린진','Dalin Township',0,0,NULL,NULL),(275,'Chiayi County','Minxiong Township','자이현 민슝향','Minxiong Township',0,0,NULL,NULL),(276,'Chiayi County','Xikou Township','자이현 시커우향','Xikou Township',0,0,NULL,NULL),(277,'Chiayi County','Xingang Township','자이현 신강향','Xingang Township',0,0,NULL,NULL),(278,'Chiayi County','Liujiao Township','자이현 류자오향','Liujiao Township',0,0,NULL,NULL),(279,'Chiayi County','Dongshi Township','자이현 둥스향','Dongshi Township',0,0,NULL,NULL),(280,'Chiayi County','Yizhu Township','자이현 이주향','Yizhu Township',0,0,NULL,NULL),(281,'Chiayi County','Lucao Township','자이현 루차오향','Lucao Township',0,0,NULL,NULL),(282,'Chiayi County','Shuishang Township','자이현 수이상향','Shuishang Township',0,0,NULL,NULL),(283,'Chiayi County','Zhongpu Township','자이현 중푸향','Zhongpu Township',0,0,NULL,NULL),(284,'Chiayi County','Zhuqi Township','자이현 주치향','Zhuqi Township',0,0,NULL,NULL),(285,'Chiayi County','Meishan Township','자이현 메이산향','Meishan Township',0,0,NULL,NULL),(286,'Chiayi County','Fanlu Township','자이현 판루향','Fanlu Township',0,0,NULL,NULL),(287,'Chiayi County','Dapu Township','자이현 다푸향','Dapu Township',0,0,NULL,NULL),(288,'Chiayi County','Alishan Township','자이현 아리산향','Alishan Township',0,0,NULL,NULL),(289,'Pingtung County','Pingtung City','핑둥현 핑둥시','Pingtung City',0,0,NULL,NULL),(290,'Pingtung County','Chaozhou Township','핑둥현 차오저우진','Chaozhou Township',0,0,NULL,NULL),(291,'Pingtung County','Donggang Township','핑둥현 둥강진','Donggang Township',0,0,NULL,NULL),(292,'Pingtung County','Hengchun Township','핑둥현 헝춘진','Hengchun Township',0,0,NULL,NULL),(293,'Pingtung County','Wandan Township','핑둥현 완단향','Wandan Township',0,0,NULL,NULL),(294,'Pingtung County','Changzhi Township','핑둥현 창즈향','Changzhi Township',0,0,NULL,NULL),(295,'Pingtung County','Linluo Township','핑둥현 린뤄향','Linluo Township',0,0,NULL,NULL),(296,'Pingtung County','Jiuru Township','핑둥현 주루향','Jiuru Township',0,0,NULL,NULL),(297,'Pingtung County','Ligang Township','핑둥현 리강향','Ligang Township',0,0,NULL,NULL),(298,'Pingtung County','Yanpu Township','핑둥현 옌푸향','Yanpu Township',0,0,NULL,NULL),(299,'Pingtung County','Gaoshu Township','핑둥현 가오수향','Gaoshu Township',0,0,NULL,NULL),(300,'Pingtung County','Wanluan Township','핑둥현 완 luan향','Wanluan Township',0,0,NULL,NULL),(301,'Pingtung County','Neipu Township','핑둥현 네이푸향','Neipu Township',0,0,NULL,NULL),(302,'Pingtung County','Zhutian Township','핑둥현 주톈향','Zhutian Township',0,0,NULL,NULL),(303,'Pingtung County','Xinpi Township','핑둥현 신피향','Xinpi Township',0,0,NULL,NULL),(304,'Pingtung County','Fangliao Township','핑둥현 팡랴오향','Fangliao Township',0,0,NULL,NULL),(305,'Pingtung County','Xinyuan Township','핑둥현 신위안향','Xinyuan Township',0,0,NULL,NULL),(306,'Pingtung County','Kanding Township','핑둥현 칸딩향','Kanding Township',0,0,NULL,NULL),(307,'Pingtung County','Linbian Township','핑둥현 린볜향','Linbian Township',0,0,NULL,NULL),(308,'Pingtung County','Nanzhou Township','핑둥현 난저우향','Nanzhou Township',0,0,NULL,NULL),(309,'Pingtung County','Jiadong Township','핑둥현 자둥향','Jiadong Township',0,0,NULL,NULL),(310,'Pingtung County','Liuqiu Township','핑둥현 류추향','Liuqiu Township',0,0,NULL,NULL),(311,'Pingtung County','Checheng Township','핑둥현 처청향','Checheng Township',0,0,NULL,NULL),(312,'Pingtung County','Manzhou Township','핑둥현 만저우향','Manzhou Township',0,0,NULL,NULL),(313,'Pingtung County','Fangshan Township','핑둥현 팡산향','Fangshan Township',0,0,NULL,NULL),(314,'Pingtung County','Sandimen Township','핑둥현 산디먼향','Sandimen Township',0,0,NULL,NULL),(315,'Pingtung County','Wutai Township','핑둥현 우타이향','Wutai Township',0,0,NULL,NULL),(316,'Pingtung County','Majia Township','핑둥현 마자향','Majia Township',0,0,NULL,NULL),(317,'Pingtung County','Taiwu Township','핑둥현 타이우향','Taiwu Township',0,0,NULL,NULL),(318,'Pingtung County','Laiyi Township','핑둥현 라이이향','Laiyi Township',0,0,NULL,NULL),(319,'Pingtung County','Chunri Township','핑둥현 춘르향','Chunri Township',0,0,NULL,NULL),(320,'Pingtung County','Shizi Township','핑둥현 스쯔향','Shizi Township',0,0,NULL,NULL),(321,'Pingtung County','Mudan Township','핑둥현 무단향','Mudan Township',0,0,NULL,NULL),(322,'Taitung County','Taitung City','타이둥현 타이둥시','Taitung City',0,0,NULL,NULL),(323,'Taitung County','Chenggong Township','타이둥현 청궁진','Chenggong Township',0,0,NULL,NULL),(324,'Taitung County','Guanshan Township','타이둥현 관산진','Guanshan Township',0,0,NULL,NULL),(325,'Taitung County','Beinan Township','타이둥현 베이난향','Beinan Township',0,0,NULL,NULL),(326,'Taitung County','Luye Township','타이둥현 루예향','Luye Township',0,0,NULL,NULL),(327,'Taitung County','Chishang Township','타이둥현 츠상향','Chishang Township',0,0,NULL,NULL),(328,'Taitung County','Donghe Township','타이둥현 둥허향','Donghe Township',0,0,NULL,NULL),(329,'Taitung County','Changbin Township','타이둥현 창빈향','Changbin Township',0,0,NULL,NULL),(330,'Taitung County','Taimali Township','타이둥현 타이마리향','Taimali Township',0,0,NULL,NULL),(331,'Taitung County','Dawu Township','타이둥현 다우향','Dawu Township',0,0,NULL,NULL),(332,'Taitung County','Ludao Township','타이둥현 뤼다오향','Ludao Township',0,0,NULL,NULL),(333,'Taitung County','Haiduan Township','타이둥현 하이돤향','Haiduan Township',0,0,NULL,NULL),(334,'Taitung County','Yanping Township','타이둥현 옌핑향','Yanping Township',0,0,NULL,NULL),(335,'Taitung County','Jinfeng Township','타이둥현 진펑향','Jinfeng Township',0,0,NULL,NULL),(336,'Taitung County','Daren Township','타이둥현 다런향','Daren Township',0,0,NULL,NULL),(337,'Taitung County','Lanyu Township','타이둥현 란위향','Lanyu Township',0,0,NULL,NULL),(338,'Hualien County','Hualien City','화롄현 화롄시','Hualien City',0,0,NULL,NULL),(339,'Hualien County','Fenglin Township','화롄현 펑린진','Fenglin Township',0,0,NULL,NULL),(340,'Hualien County','Yuli Township','화롄현 위리진','Yuli Township',0,0,NULL,NULL),(341,'Hualien County','Xincheng Township','화롄현 신청향','Xincheng Township',0,0,NULL,NULL),(342,'Hualien County','Ji\'an Township','화롄현 지안향','Ji\'an Township',0,0,NULL,NULL),(343,'Hualien County','Shoufeng Township','화롄현 서우펑향','Shoufeng Township',0,0,NULL,NULL),(344,'Hualien County','Guangfu Township','화롄현 광푸향','Guangfu Township',0,0,NULL,NULL),(345,'Hualien County','Fengbin Township','화롄현 펑빈향','Fengbin Township',0,0,NULL,NULL),(346,'Hualien County','Ruisui Township','화롄현 루이수이향','Ruisui Township',0,0,NULL,NULL),(347,'Hualien County','Fuli Township','화롄현 푸리향','Fuli Township',0,0,NULL,NULL),(348,'Hualien County','Xiulin Township','화롄현 시우린향','Xiulin Township',0,0,NULL,NULL),(349,'Hualien County','Wanrong Township','화롄현 완룽향','Wanrong Township',0,0,NULL,NULL),(350,'Hualien County','Zhuoxi Township','화롄현 줘시향','Zhuoxi Township',0,0,NULL,NULL),(351,'Penghu County','Magong City','펑후현 마궁시','Magong City',0,0,NULL,NULL),(352,'Penghu County','Huxi Township','펑후현 후시향','Huxi Township',0,0,NULL,NULL),(353,'Penghu County','Baisha Township','펑후현 바이사향','Baisha Township',0,0,NULL,NULL),(354,'Penghu County','Xiyu Township','펑후현 시위향','Xiyu Township',0,0,NULL,NULL),(355,'Penghu County','Wang\'an Township','펑후현 왕안향','Wang\'an Township',0,0,NULL,NULL),(356,'Penghu County','Qimei Township','펑후현 치메이향','Qimei Township',0,0,NULL,NULL),(357,'Kinmen County','Jincheng Township','진먼현 진청진','Jincheng Township',0,0,NULL,NULL),(358,'Kinmen County','Jinhu Township','진먼현 진후진','Jinhu Township',0,0,NULL,NULL),(359,'Kinmen County','Jinsha Township','진먼현 진사진','Jinsha Township',0,0,NULL,NULL),(360,'Kinmen County','Jinning Township','진먼현 진닝향','Jinning Township',0,0,NULL,NULL),(361,'Kinmen County','Lieyu Township','진먼현 례위향','Lieyu Township',0,0,NULL,NULL),(362,'Kinmen County','Wuqiu Township','진먼현 우추향','Wuqiu Township',0,0,NULL,NULL),(363,'Lienchiang County','Nangan Township','롄장현 난간향','Nangan Township',0,0,NULL,NULL),(364,'Lienchiang County','Beigan Township','롄장현 베이간향','Beigan Township',0,0,NULL,NULL),(365,'Lienchiang County','JuGuang Township','롄장현 쥐광향','JuGuang Township',0,0,NULL,NULL),(366,'Lienchiang County','Dongyin Township','롄장현 둥인향','Dongyin Township',0,0,NULL,NULL);
/*!40000 ALTER TABLE `regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_USER');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sample`
--

DROP TABLE IF EXISTS `sample`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sample` (
  `my_row_id` bigint unsigned NOT NULL AUTO_INCREMENT /*!80023 INVISIBLE */,
  `id` int NOT NULL,
  `category` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `address` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `position_x` decimal(20,6) DEFAULT NULL,
  `position_y` decimal(20,6) DEFAULT NULL,
  PRIMARY KEY (`my_row_id`),
  KEY `sample_id` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='REST_API SAMPLE TABLE';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sample`
--

LOCK TABLES `sample` WRITE;
/*!40000 ALTER TABLE `sample` DISABLE KEYS */;
/*!40000 ALTER TABLE `sample` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profile_name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `profile_image` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '프로필이미지',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `provider` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '휴대폰 번호',
  `address` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '주소',
  `birthday` date DEFAULT NULL COMMENT '생년월일',
  `account_status` varchar(20) COLLATE utf8mb4_general_ci DEFAULT 'ACTIVE',
  `partner_approval_status` varchar(20) COLLATE utf8mb4_general_ci DEFAULT 'NONE',
  `admin_memo` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_username` (`username`),
  UNIQUE KEY `uk_user_email` (`email`),
  KEY `idx_user_admin_search` (`username`,`email`,`profile_name`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'leekun','$2a$10$78aMaL1Hd6V9A.Ue1mBNlu29TavDDJvYmOLbZjTmDzNs9BPGApi9S','카자마진','/user/profile/20260701/1_29e6c6cd-0878-4996-98d0-c85fee652d36.jpg','lee21137@2nate.com',NULL,'','111',NULL,'ACTIVE','NONE',NULL),(19,'YEONSANG','$2a$10$iqwMODmcvRLpjxKTYkeJAe9QxWbzO15dJkXAJLkFfe4Df0aJ2nCH.','연상연상',NULL,'YEONSANG@123.123',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(20,'leekun2','$2a$10$iqwMODmcvRLpjxKTYkeJAe9QxWbzO15dJkXAJLkFfe4Df0aJ2nCH.','당당한 다람쥐',NULL,'leekun2@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(21,'leekun3','$2a$10$UaYeoGtITLJPM7UPa1N0I.wwXI9Xf9dLmwnNNKd5w8kdT36/8JJjK','미끈한 도롱뇽',NULL,'leekun3@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(22,'leekun4','$2a$10$0atBf3E6T2kLcLuQNtWG6eCdTC..eRDixtEWmZwW390P8MSFLxp46','오똑한 상추',NULL,'leekun4@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(23,'leekun5','$2a$10$qal.oNfySTOfK3fxfPF5Qult8XwUnpvqgfmsz9n9AvbXbzKLQXLBO','뻔뻔한 악어',NULL,'leekun5@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(24,'leekun6','$2a$10$e0AHMEMqvx.yPgxN4h08AuuoJKYJQUwG9wxTbP8kIxuTF7PmIyP4e','나긋한 파파야',NULL,'leekun6@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(25,'leekun7','$2a$10$peDZxHeTb7ccF67A4V3B.esnlqSLx2yqtLi2CDdL3nmt5L.pZ9QgK','치사한 푸들',NULL,'leekun7@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(26,'leekun8','$2a$10$7./8UP7lJ.bQp0dyj1mqD.nHvPOeLuvnLfjiqlNeAx6uO9k16T6dS','똘똘한 라임',NULL,'leekun8@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(27,'leekun9','$2a$10$2WeF3jz/XjbongYebKtPvOAOOWcQEWe14hnAvWc6XcOulcrWyziqG','한인회 초대회장',NULL,'leekun9@test.com',NULL,'','',NULL,'ACTIVE','NONE',NULL),(28,'leekun10','$2a$10$PdmjxkiH600CXFCJFEjHq.QBmlGigwaaqJQKnFhulopTDc2UAU9OK','통쾌한 광어',NULL,'leekun10@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(29,'leekun11','$2a$10$EIxMO4SN3rWu11ajvrZ5Ku8twgR43U5xUjROFXg4hX3HA55d1meiq','유쾌한 갈매기',NULL,'leekun11@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(30,'leekun12','$2a$10$BfBuu0u4mgryz0lQOXN/5OoqlHE4BMfYiwWz2aeR/SC0y6koh0jHK','무례한 개미핥기',NULL,'leekun12@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(31,'leeku7','$2a$10$QHYySDuNFtY2mvhl0j1qXOnlRCDTtx6hL0oKCW1i3h/h.KX6I9/jS','나긋한 뮬리',NULL,'leeku7@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(32,'asdf','$2a$10$BKLmRvQn/AAYgbYqSA07oedHgCTqK/WHpUkctfztxZPeKvYKxJaJq','난잡한 넙치',NULL,'asdf@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(34,'leekun22','$2a$10$t7wk6hghhf7soSzOngdEgOCqFkylJZLYPYwcfF3l6hNBAHSh7k2Ei','정당한 미어캣',NULL,'leekun22@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(35,'test','$2a$10$U./c7Oh0xMwafwt7P0zkE.mCpmbmu8W49z82hzJ5.0PtPyaMeUFZe','해피툭운영자',NULL,'test@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(36,'cdy212','$2a$10$Xw5e0yhUge1081nlUW2JZO4lYBaQ/4Jtr3q5OfCkUBh9v3sLVAE.a','귀한 장미1',NULL,'cdy212@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(37,'admin','$2b$12$dU0QMEuZxJacZtV6Uk/6t.nbTJEaYOpGyqGlkhwOSX1MWc3KvLbLG','관리자',NULL,'admin@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(38,'davidpark','$2a$10$1FA1a5nF54knNS26DBnF2eE4qnjey1Ll00F8jHWHu0IGseuESoVwG','압구정호랑이',NULL,'davidpark@mangot5.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(39,'yeri','$2a$10$sXzS3T9uioZbwuR69jnxkupGyiQWY0ewjlO3dRHQ1.f3/spWauJfa','말랑한 도마뱀',NULL,'yeri@test.com',NULL,'','','1980-01-01','ACTIVE','NONE',NULL),(40,'leekun33','$2a$10$jc4GFp0g6ZR9VHsKXtP0XOCOQKcN2g.djnlu3VzEbGT4lM4ht/Niy','경박한 야자나무',NULL,'leekun33@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(41,'jeffkang','$2a$10$/4zqOPfnxzruMnUmaNa9A.ZQc/MoN/cM5xPx5piRriCkpqfWaccrq','경박한 백합',NULL,'jeffkang@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(42,'leekun30','$2a$10$ZDn1xr8izoB9P4WFOp8bfuYUs.xD/pcxIsByL30waXU2FEArdNLlu','얼큰한 다시마',NULL,'leekun30@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(43,'kuina6z','$2a$10$ctxbFnSvytCgtcH/PYEk8.T/QxjieUKLelyVaDAbY7EDO7JuoyFKm','승짱',NULL,'kuina6z@gmail.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(44,'leekun98','$2a$10$9MumGBPBHNWoL7Tnn2TZAOlgNBy/sy4h5hA7GKDMhX5ZCpeEzIOHW','용맹한 염소',NULL,'leekun98@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(45,'testtest','$2a$10$0y9lwzXRVHVWfO/P5zeYOucnmvDVnOgilJXghDP0a.GfD7KbrD34m','찌질한 병아리',NULL,'testtest@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(46,'davidtest','$2a$10$v3fc5eoTiV8OKfhnTdDbRetUZAUbQD8xI0gF8u0ozF0zSaRsAFpxG','팔팔한 코코넛',NULL,'davidtest@test.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(47,'kakao_4669798136','$2a$10$R4wJBR4rh8JpwV9Pm0qw3uGa3uFELrVmU9tnHrZyE.m8dnu8bUitq','이승민',NULL,'lee21137@kakao.com','kakao',NULL,NULL,NULL,'ACTIVE','NONE',NULL),(48,'google_107396847378404576442','$2a$10$pYwjkMDsFyCdFq89jtGbiukvu7gw8E8lcppKAPtixjH90o50vaHEq','utilman84',NULL,'lee21137@gmail.com','google',NULL,NULL,NULL,'ACTIVE','NONE',NULL),(49,'google_106017702339322436815','$2a$10$IkzP/yzBxYY8LymcRMm.euHhPp5x/UU3/9iIi8EwIU0rubWzeJjMu','이승민',NULL,'lee21137@knou.ac.kr','google',NULL,NULL,NULL,'ACTIVE','NONE',NULL),(50,'google_109524556020971699659','$2a$10$PorUuIhQPS90qzFKSaDocuJU.GVSu51VMjmaiTxEd0R4U9X7FLXY.','이인표',NULL,'rwmkleeyd@gmail.com','google',NULL,NULL,NULL,'ACTIVE','NONE',NULL),(51,'kakao_4810164503','$2a$10$ohay.rX9dUkDrsARaIcRhuCQuwbLIMz8S5USt5TCWw2R9c/DZ1hCC','정연상',NULL,'kakao_4810164503@kakao.com','kakao',NULL,NULL,NULL,'ACTIVE','NONE',NULL),(52,'kakao_4810164643','$2a$10$LnqANmSxQAJ2l.mo.4W3su8eHdx5MpE71BGUipg0f5e6jRFOPkgI2','이인표',NULL,'kakao_4810164643@kakao.com','kakao',NULL,NULL,NULL,'ACTIVE','NONE',NULL),(53,'kakao_4810700874','$2a$10$XdtruC.q/j8m.Y.u6Wo6iOGx6tWgNmwHpUWvIsh5CkORDx8Y9z8T.','정재식',NULL,'kakao_4810700874@kakao.com','kakao',NULL,NULL,NULL,'ACTIVE','NONE',NULL),(54,'n_gCo-3kVp8pPOzp_Z76','$2a$10$Gnik./9PcINAKdnZkG3VFeoHGFI6TmjYK1a.4LhQmdcMlC/OWmNxe','이승민',NULL,'lee21137@nate.com','naver',NULL,NULL,NULL,'ACTIVE','NONE',NULL),(55,'google_113240844621243628428','$2a$10$U/paZ7fxVc0Nl49mwWUh/e19zXsYR6Ou6Nv18GXn.BWqgvFxpLEqe','최대열 (삼공팔팔)',NULL,'cdy3088@gmail.com','google',NULL,NULL,NULL,'ACTIVE','NONE',NULL),(56,'google_107226787888491879892','$2a$10$u0s.2y5pU4lJvFk1Jxa46OP08ibONK0iWc4ZDe2ip8hySe1TsLc8m','랑하',NULL,'cdy7488@gmail.com','google',NULL,NULL,NULL,'ACTIVE','NONE',NULL),(57,'google_106989961992096333369','$2a$10$1JhTbRbRVaho1jgpyBDP.OOn/OWyBZpijWyUqJ5gqj18C1PabJTR2','ri ye',NULL,'yeri042924@gmail.com','google',NULL,NULL,NULL,'ACTIVE','NONE',NULL),(58,'happytuk','$2b$10$uf1P8eR/WETslqu8q75F6O51UG0FgvdcNddtto2oQ2KRvzZAveiw2','happytuk',NULL,'happytuk@admin.com',NULL,NULL,NULL,NULL,'ACTIVE','NONE',NULL),(59,'yeri2','$2a$10$O/156uwyLEAL5rWCye1Q4uOp2cZU1Z92JmxYjcmbxQikjvLapoWmu','한인회_심각가지67',NULL,'yeri2@test.com',NULL,'','','1968-12-31','ACTIVE','NONE',NULL),(61,'leekun34','$2a$10$ET6KgB0F3s9lrpcvJ68vIeBXXd8ssBN36wyZshwUhBFv3FzIDJ7iu','한인회_다양파랑새98','/user/profile/20260701/61_2100f0be-3fc4-4436-a9d9-17850409c110.jpg','leekun34@test.com',NULL,'','',NULL,'ACTIVE','NONE',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_posts`
--

DROP TABLE IF EXISTS `user_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_posts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_posts_category_id` bigint NOT NULL,
  `content_title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `view_count` bigint DEFAULT '0',
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `like_count` bigint DEFAULT '0',
  `user_id` bigint NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `important` bit(1) DEFAULT b'0',
  `media_url` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `link_url` varchar(1000) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `button_text` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `display_order` int DEFAULT NULL,
  `active` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_posts_category` (`user_posts_category_id`),
  KEY `fk_posts_user` (`user_id`),
  KEY `idx_user_posts_main_content` (`user_posts_category_id`,`deleted`,`active`,`display_order`),
  KEY `idx_user_posts_category_deleted_created` (`user_posts_category_id`,`deleted`,`date_created`),
  KEY `idx_user_posts_deleted_created` (`deleted`,`date_created`),
  KEY `idx_user_posts_content_title` (`content_title`),
  CONSTRAINT `fk_posts_category` FOREIGN KEY (`user_posts_category_id`) REFERENCES `user_posts_category` (`id`),
  CONSTRAINT `fk_posts_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_posts`
--

LOCK TABLES `user_posts` WRITE;
/*!40000 ALTER TABLE `user_posts` DISABLE KEYS */;
INSERT INTO `user_posts` VALUES (1,1,'대만 한인회에 오신걸 환영합니다.',0,'2026-02-04 13:21:58','2026-03-20 12:59:14','안녕하세요. ',0,1,0,_binary '\0',NULL,NULL,NULL,NULL,1),(2,1,'test',0,'2026-02-04 13:29:25','2026-02-04 13:29:25','test',0,35,0,_binary '\0',NULL,NULL,NULL,NULL,1),(3,6,'긴급 공지입니다 .',0,'2026-02-04 14:42:40','2026-02-04 14:42:40','내용 필독!!',0,1,0,_binary '\0',NULL,NULL,NULL,NULL,1),(4,5,'뉴스-헬로월드',0,'2026-02-04 14:43:22','2026-02-04 14:43:22','Good Morning',0,1,0,_binary '\0',NULL,NULL,NULL,NULL,1),(5,6,'공지사항 제목 테스트입니다.',0,'2026-02-04 14:43:26','2026-02-04 14:43:26','공지사항 내용 테스트입니다.',0,37,0,_binary '\0',NULL,NULL,NULL,NULL,1),(6,1,'우리동네 자랑 ',0,'2026-03-19 14:10:18','2026-03-19 14:10:18','1234',0,1,0,_binary '',NULL,NULL,NULL,NULL,1),(7,6,'2026.3월 공지사항',0,'2026-03-19 14:29:28','2026-03-19 14:29:28','1',0,1,0,_binary '\0',NULL,NULL,NULL,NULL,1),(8,1,'게시글 프록시 테스트12345',0,'2026-03-20 15:49:24','2026-03-20 15:49:41','1234',0,44,0,_binary '\0',NULL,NULL,NULL,NULL,1),(9,1,'인사',0,'2026-03-23 21:59:22','2026-03-23 21:59:22','안녕하세요.',0,53,0,_binary '\0',NULL,NULL,NULL,NULL,1),(10,6,'공지사항 테스트입니다.',0,'2026-05-12 16:38:49','2026-05-12 16:38:49','테스트',0,56,0,_binary '\0',NULL,NULL,NULL,NULL,1),(11,1,'안녕하세요.',0,'2026-05-12 16:39:25','2026-05-12 16:39:25','테스트 입니다.',0,56,0,_binary '\0',NULL,NULL,NULL,NULL,1),(12,7,'100년을 잇고,미래를 연결합니다',0,'2026-05-22 10:58:05','2026-05-28 14:43:29','대만 한인의 삶이 더 편리하고\n더 풍요로워지도록',0,37,0,_binary '\0','https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=1200&q=80','/community/detail/10','100년 역사 보러가기',1,1),(13,7,'타이베이 제휴점 혜택을 누리세요.',0,'2026-05-22 10:58:05','2026-05-28 14:45:00','함께 하는 제휴 업체의 정보 및 쿠폰 확인이 가능합니다.',0,37,0,_binary '\0','https://images.unsplash.com/photo-1505069190533-da1c9af13346?auto=format&fit=crop&w=1200&q=80','/store','생활 정보 찾기',2,1),(14,7,'교민 소식과 공지,놓치지 않게',0,'2026-05-22 10:58:06','2026-05-28 14:48:10','중요 공지와 News를 모아\n필요한 순간 바로 보여드립니다',0,37,0,_binary '\0','https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80','/community','공지 News 보기',3,1),(15,7,'믿을 수 있는한인 네트워크',0,'2026-05-22 10:58:07','2026-05-28 14:47:07','신뢰할 수 있는 업체와 혜택을\n교민 생활 가까이에 연결합니다',0,37,0,_binary '\0','https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80','/(views)/store','한인업체 보기',4,0),(16,7,'함께 나누는커뮤니티 공간',0,'2026-05-22 10:58:07','2026-07-01 14:45:36','동네 소식과 질문, 나눔을\n교민들과 편하게 주고받으세요',0,37,1,_binary '\0','/upload/image/20260701/Main_top_5_5f747f8c-bfa2-45f4-92cb-dbae7558c29c.jpg','/(views)/community','커뮤니티 가기',5,0),(17,8,'행정·비자',0,'2026-05-22 10:58:08','2026-05-28 14:56:53','비자·체류·행정 정보',0,37,0,_binary '\0','https://img.icons8.com/96/passport.png','/community/detail/20',NULL,1,1),(18,8,'교육·육아',0,'2026-05-22 10:58:09','2026-05-28 14:57:16','학교·학원·육아 정보',0,37,0,_binary '\0','https://img.icons8.com/96/open-book.png','/community/detail/11',NULL,2,1),(19,8,'커뮤니티',0,'2026-05-22 10:58:09','2026-05-28 14:57:28','교민 소식·나눔 공간',0,37,0,_binary '\0','https://img.icons8.com/96/conference-call.png','/community',NULL,3,1),(20,6,'[공지]대만행정 비자 테스트',0,'2026-05-28 14:56:23','2026-05-28 14:56:23','테스트',0,56,0,_binary '\0',NULL,NULL,NULL,NULL,1),(21,8,'유학생활',0,'2026-05-28 16:05:12','2026-05-28 16:05:12','유학생활 꿀팁정보',0,58,0,_binary '\0','https://img.icons8.com/?size=100&id=37801&format=png&color=000000','/main',NULL,4,1),(22,3,'123',0,'2026-06-09 14:45:54','2026-06-09 14:45:54','213213213',0,1,0,_binary '\0',NULL,NULL,NULL,NULL,1),(23,5,'안녕하세요.',0,'2026-06-19 14:40:29','2026-06-19 14:40:29','싸이, 김연아, 박지성 레츠고',0,35,0,_binary '\0',NULL,NULL,NULL,NULL,1),(24,8,'test',0,'2026-07-01 09:53:27','2026-07-01 14:40:18','test',0,37,0,_binary '\0','/upload/image/20260701/Main_middle_5_ced2038e-b384-42e3-85e7-4ba20381a3ef.jpg','1',NULL,5,0),(25,8,'test',0,'2026-07-01 09:53:42','2026-07-01 09:54:15','test',0,37,1,_binary '\0','https://img.icons8.com/?size=100&id=37801&format=png&color=000000','1',NULL,6,0);
/*!40000 ALTER TABLE `user_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_posts_actions`
--

DROP TABLE IF EXISTS `user_posts_actions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_posts_actions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_posts_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `action_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_created` datetime NOT NULL,
  `last_updated` datetime NOT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `version` bigint NOT NULL,
  `action_flag` bit(1) NOT NULL,
  `like_count` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `user_posts_id` (`user_posts_id`),
  CONSTRAINT `user_posts_actions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_posts_actions_ibfk_2` FOREIGN KEY (`user_posts_id`) REFERENCES `user_posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_posts_actions`
--

LOCK TABLES `user_posts_actions` WRITE;
/*!40000 ALTER TABLE `user_posts_actions` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_posts_actions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_posts_bookmark`
--

DROP TABLE IF EXISTS `user_posts_bookmark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_posts_bookmark` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `user_posts_id` bigint NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_bookmark_user` (`user_id`),
  KEY `fk_bookmark_post` (`user_posts_id`),
  CONSTRAINT `fk_bookmark_post` FOREIGN KEY (`user_posts_id`) REFERENCES `user_posts` (`id`),
  CONSTRAINT `fk_bookmark_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_posts_bookmark`
--

LOCK TABLES `user_posts_bookmark` WRITE;
/*!40000 ALTER TABLE `user_posts_bookmark` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_posts_bookmark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_posts_category`
--

DROP TABLE IF EXISTS `user_posts_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_posts_category` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `category_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_community` tinyint(1) NOT NULL DEFAULT '0',
  `display_order` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `category_code` (`category_code`),
  KEY `idx_upc_community_code` (`is_community`,`category_code`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_posts_category`
--

LOCK TABLES `user_posts_category` WRITE;
/*!40000 ALTER TABLE `user_posts_category` DISABLE KEYS */;
INSERT INTO `user_posts_category` VALUES (1,'free','자유게시판','2026-01-12 15:06:05','2026-01-12 15:06:05',1,NULL),(3,'market','중고장터','2026-01-12 15:06:05','2026-01-12 15:06:05',1,NULL),(4,'job','구인구직','2026-01-12 15:06:05','2026-01-12 15:06:05',1,NULL),(5,'news','뉴스','2026-01-12 15:06:05','2026-01-12 15:06:05',1,NULL),(6,'notice','공지사항','2026-01-12 15:06:05','2026-01-12 15:06:05',1,NULL),(7,'Main_Top_banner','메인 상단 배너','2026-05-21 16:38:27','2026-05-22 10:58:04',0,NULL),(8,'Main_Middle_Icon','메인 중앙 아이콘','2026-05-21 16:38:27','2026-05-22 10:58:08',0,NULL);
/*!40000 ALTER TABLE `user_posts_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_posts_comment`
--

DROP TABLE IF EXISTS `user_posts_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_posts_comment` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `user_posts_id` bigint NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `like_count` bigint DEFAULT '0',
  `parent_id` bigint DEFAULT NULL,
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `fk_comment_user` (`user_id`),
  KEY `fk_comment_post` (`user_posts_id`),
  KEY `fk_comment_parent` (`parent_id`),
  CONSTRAINT `fk_comment_parent` FOREIGN KEY (`parent_id`) REFERENCES `user_posts_comment` (`id`),
  CONSTRAINT `fk_comment_post` FOREIGN KEY (`user_posts_id`) REFERENCES `user_posts` (`id`),
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_posts_comment`
--

LOCK TABLES `user_posts_comment` WRITE;
/*!40000 ALTER TABLE `user_posts_comment` DISABLE KEYS */;
INSERT INTO `user_posts_comment` VALUES (1,1,9,'안녕하세요~',0,NULL,'2026-03-25 14:22:41','2026-03-25 14:22:41',0),(2,1,22,'댓글맨',0,NULL,'2026-06-09 14:48:35','2026-06-09 15:10:34',1),(3,1,22,'ㅁㅁㅁㅁ',0,NULL,'2026-06-09 15:10:22','2026-06-09 15:10:36',1),(4,1,22,'2222',0,NULL,'2026-06-09 15:10:31','2026-06-09 15:10:38',1);
/*!40000 ALTER TABLE `user_posts_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_push`
--

DROP TABLE IF EXISTS `user_push`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_push` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `user_id` bigint DEFAULT NULL COMMENT '사용자ID',
  `push_type` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'push type',
  `device_type` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'device type',
  `device_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'browser name',
  `push_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '사용자 토큰',
  `status` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT 'ACTIVE' COMMENT '토큰 상태 (ACTIVE, EXPIRED)',
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '생성일자',
  `last_updated` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '업데이트일자',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_push_token` (`push_token`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='사용자푸쉬_토큰테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_push`
--

LOCK TABLES `user_push` WRITE;
/*!40000 ALTER TABLE `user_push` DISABLE KEYS */;
INSERT INTO `user_push` VALUES (36,1,'FCM','web','Chrome/149.0.0.0 Safari/537.36','ffetI2nv3MzAyPiwJHwjSQ:APA91bEbsZAYCe8Q92XNsTnDaNFhglopP3USRZuKyDqsXghJPMKnMOsENEhXA7YgZ6Lkdea9fVa7gtgIXe40VpojWhBRa_E6qeW9RHQoZRmNnZPLuGYMwmw','ACTIVE','2026-06-30 11:29:49','2026-06-30 11:29:49'),(37,55,'FCM','web','Mobile Safari/537.36','cbh5uAoYX-NOW7Na-2Xa-9:APA91bHk0r9lLtBZgz4FeJ0cjDqbNdYgFWxSOXKnj3oq0rqf5ePdl1ChaGtL7j8y3d3fTS7NaGImskiYp2aPrkfTOyFFBHyo-i7wsfnnVjbMIwU4Cg_cWj0','ACTIVE','2026-06-30 12:31:36','2026-06-30 12:31:36'),(41,1,'FCM','web','Chrome/150.0.0.0 Safari/537.36','c0CcVA9hOkyKO4-nSWbDPW:APA91bG_NyXh4EgsPvma6QGDXtV3CKsZt7qUg4RQG-UDUIMxWgLq0xqbtzqavjF_5jghDAwn9iIBnuZSlTu6IaYszl8cm4yYj-DKraE51_4y3wZJnWwWS40','ACTIVE','2026-07-01 10:36:13','2026-07-01 10:36:13'),(42,45,'FCM','web','Chrome/149.0.0.0 Safari/537.36','eaSd1Byj_koe86BCIUhNqT:APA91bHPrtljYbIa3WagVYi1c871uTJEHCYHxeF21efL_Ilpa4IT-s7P8T-xWUVmzLDt91x1hves74h_FAPdftVx7SMNgvMV_hWNqRsIbqyl11qJmiETyYY','ACTIVE','2026-07-01 10:59:42','2026-07-01 10:59:42'),(44,56,'FCM','web','Chrome/149.0.0.0 Safari/537.36','dHuZklcXOWNLdXUykdriXf:APA91bHEAafE4fARibQiRds2ea5PiS2qPAW2P85ws4VW5ol816z5J-NBCLh3nR7Vq1TYP6H1ikd4G_bH-3XnDoOGNZkyi4Off6bjgzGUB7nsfMaWY6yUbQA','ACTIVE','2026-07-01 11:10:25','2026-07-01 11:10:25');
/*!40000 ALTER TABLE `user_push` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_push_history`
--

DROP TABLE IF EXISTS `user_push_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_push_history` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '알림 제목',
  `body` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '알림 내용',
  `link` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '이동 링크 URL',
  `image_url` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '이미지URL',
  `user_id` bigint DEFAULT NULL COMMENT '수신 유저 ID',
  `push_token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '발송 당시 토큰 정보',
  `date_created` datetime DEFAULT (now()) COMMENT '발송 일자',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_history_user` (`user_id`) USING BTREE,
  CONSTRAINT `fk_history_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='푸쉬발송이력';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_push_history`
--

LOCK TABLES `user_push_history` WRITE;
/*!40000 ALTER TABLE `user_push_history` DISABLE KEYS */;
INSERT INTO `user_push_history` VALUES (15,'테스트','111','','',55,'cbh5uAoYX-NOW7Na-2Xa-9:APA91bHk0r9lLtBZgz4FeJ0cjDqbNdYgFWxSOXKnj3oq0rqf5ePdl1ChaGtL7j8y3d3fTS7NaGImskiYp2aPrkfTOyFFBHyo-i7wsfnnVjbMIwU4Cg_cWj0','2026-06-30 14:56:23');
/*!40000 ALTER TABLE `user_push_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_regions`
--

DROP TABLE IF EXISTS `user_regions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_regions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `region_id` int NOT NULL COMMENT 'FK to regions.id',
  `region_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT 'MAIN, INTEREST',
  `osm_id` bigint DEFAULT NULL,
  `display_name` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_user_region` (`user_id`,`region_id`),
  UNIQUE KEY `UKb2ku4vywb533wadfytjwvo88y` (`user_id`,`region_id`),
  KEY `region_id` (`region_id`),
  CONSTRAINT `user_regions_ibfk_1` FOREIGN KEY (`region_id`) REFERENCES `regions` (`id`),
  CONSTRAINT `user_regions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_regions`
--

LOCK TABLES `user_regions` WRITE;
/*!40000 ALTER TABLE `user_regions` DISABLE KEYS */;
INSERT INTO `user_regions` VALUES (3,36,1,'MAIN',NULL,'타이베이시 쑹산구 (Songshan District)',0,0,'2026-02-02 10:08:16'),(4,36,3,'INTEREST',NULL,'타이베이시 다안구 (Daan District)',0,0,'2026-02-02 10:08:30'),(5,40,1,'MAIN',NULL,'타이베이시 쑹산구 (Songshan District)',0,0,'2026-02-04 11:54:40'),(7,44,2,'INTEREST',NULL,'타이베이시 신이구 (Xinyi District)',0,0,'2026-03-20 15:50:23'),(8,36,19,'INTEREST',NULL,'신베이시 수린구 (Shulin District)',0,0,'2026-03-20 15:51:05'),(9,55,103,'INTEREST',NULL,'타이난시 관톈구 (Guantian District)',0,0,'2026-05-04 09:20:52'),(10,55,15,'INTEREST',NULL,'신베이시 중허구 (Zhonghe District)',0,0,'2026-05-04 09:21:14');
/*!40000 ALTER TABLE `user_regions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKrhfovtciq1l558cw6udg0h0d3` (`role_id`),
  CONSTRAINT `FK55itppkw3i07do3h7qoclqd4k` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKrhfovtciq1l558cw6udg0h0d3` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1),(37,1),(41,1),(53,1),(58,1),(20,2),(21,2),(22,2),(23,2),(24,2),(25,2),(26,2),(27,2),(28,2),(29,2),(30,2),(31,2),(32,2),(34,2),(35,2),(36,2),(37,2),(38,2),(39,2),(40,2),(41,2),(42,2),(43,2),(44,2),(45,2),(46,2),(47,2),(48,2),(49,2),(50,2),(51,2),(52,2),(53,2),(54,2),(55,2),(56,2),(57,2),(58,2),(59,2),(61,2);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'twone'
--

--
-- Dumping routines for database 'twone'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-02  9:10:59

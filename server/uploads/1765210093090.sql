-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: vm3_cms
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `role_id` int NOT NULL DEFAULT '1',
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `email` (`email`),
  KEY `admin_role_fk` (`role_id`),
  CONSTRAINT `admin_role_fk` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,1,'Mahesh','maheshtambe5112@gmail.com','$2b$10$VaRQVMuX/JlngB6ii53cOeg/IpGrbjIeRcuLPBATZyCQmMkj3biBC','2025-11-18 14:45:59'),(2,1,'Mahesh Tambe','maheshtambe@gmail.com','$2b$10$ytKJo0/zAIpmKD4TmvQoaORnj5OSXnwFmETVk3cocfRs9Tx40RDiW','2025-11-18 14:57:32'),(3,1,'Mahesh Tambe','maheshtambe512@gmail.com','$2b$10$G27lOjO213nVsNFFRUZlMuVbelNxrtSpiVx65yA4TLTxUcWxpPAMq','2025-11-18 14:57:55'),(4,1,'Mahesh Tambe','maheshtambe1512@gmail.com','$2b$10$VOOJ4M7gXDOuutbBTsy1N.7T7E56s0EV1bQAMaGnNQmd.ZsJl38aa','2025-11-18 15:00:19'),(5,1,'Mahesh Tambe','mahesh@gmail.com','$2b$10$dhq0QpwH.eTOeJARFcrFSOe2pTLyQZQFDcMFoYr4Sy4z/Uu7odKm6','2025-11-18 16:22:44'),(6,1,'Admin','admin@gmail.com','$2b$10$x4giW20ATZINfkIN6G.ANebrKujNuzKVHY1Oj4o00bTnsl7N.5ao6','2025-11-18 16:41:20'),(8,1,'Devyani Anandgaonkar','devyani@gmail.com','$2b$10$LZB1mSoTVTaMfxj1hbSRze/P8i3hn7P6YHYDE6vaW68gmvp6498nm','2025-11-26 17:41:30');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `associate_partners`
--

DROP TABLE IF EXISTS `associate_partners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `associate_partners` (
  `partner_id` int NOT NULL AUTO_INCREMENT,
  `partner_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` text,
  `status` varchar(50) DEFAULT 'Active',
  PRIMARY KEY (`partner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `associate_partners`
--

LOCK TABLES `associate_partners` WRITE;
/*!40000 ALTER TABLE `associate_partners` DISABLE KEYS */;
/*!40000 ALTER TABLE `associate_partners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `image_url` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Website Development','Custom-built websites that combine stunning design with performance, security, and user experience to help you grow your business online.',NULL,'2025-08-20 11:21:14','2025-08-20 11:23:43'),(2,'Website Maintenance','Keep your website running smoothly, securely, and up-to-date with our comprehensive maintenance services.',NULL,'2025-08-20 11:22:59','2025-08-20 11:23:43'),(3,'Social Media Marketing','Build a strong digital presence, connect with your audience, and grow your brand through impactful social media strategies and content.',NULL,'2025-08-20 11:25:14','2025-08-20 11:25:35'),(4,'Digital Marketing Ads','Boost your brand visibility, drive qualified leads, and achieve measurable growth with targeted digital ad campaigns across Google, Meta, and more.',NULL,'2025-08-20 11:26:57','2025-08-20 11:31:12'),(5,'SEO','Drive consistent traffic, climb search rankings, and grow your online visibility with our comprehensive SEO strategy.',NULL,'2025-08-20 11:28:22','2025-08-20 11:31:12'),(6,'Branding Material Design Only','Create a consistent, compelling brand identity across all customer touchpoints. From logos to marketing materials, we design with purpose and style.',NULL,'2025-08-20 11:29:34','2025-08-20 11:31:12'),(7,'Market Places','Expand your reach across top online marketplaces like Amazon, Flipkart, and more. We handle product listing, catalog optimization, inventory sync, pricing updates, and order management.',NULL,'2025-08-20 11:32:12','2025-08-20 11:34:05'),(8,'Enterprise Plan','All-in-one solution for businesses ready to scale. Includes custom Web & Mobile App Development, SaaS solutions, ERP & CRM systems, Business Automation, and Secure Data Migration.',NULL,'2025-08-20 11:33:23','2025-08-20 11:34:05'),(9,'CRM','Simple, cost-effective CRM to capture and manage leads, track tasks, and grow client relationships. Ideal for small teams, no technical setup required.',NULL,'2025-08-20 11:33:26','2025-08-20 11:34:05');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client_profile`
--

DROP TABLE IF EXISTS `client_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client_profile` (
  `client_profile_id` int NOT NULL AUTO_INCREMENT,
  `client_id` int DEFAULT NULL,
  `company_name` varchar(150) DEFAULT NULL,
  `contact_person` varchar(100) DEFAULT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` text,
  `projects_count` int DEFAULT '0',
  `status` varchar(50) DEFAULT 'Active',
  PRIMARY KEY (`client_profile_id`),
  UNIQUE KEY `unique_client` (`client_id`),
  CONSTRAINT `client_profile_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client_profile`
--

LOCK TABLES `client_profile` WRITE;
/*!40000 ALTER TABLE `client_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `client_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `client_id` int NOT NULL AUTO_INCREMENT,
  `client_name` varchar(100) NOT NULL,
  `category_id` int DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` text,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  `document_type` enum('Aadhar','PAN') DEFAULT NULL,
  `document_file` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `email` (`email`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (1,'Mahesh Tambe',NULL,'mahesh@example.com','$2b$10$fWnUnPOF8gYCSaoYVchelOTRabHS0hfKmp7RzKENv3eEWtz051fPW','9876543210','Pune, Maharashtra','Active','Aadhar','aadhar123.pdf'),(2,'Mahesh Tambe',NULL,'maheshtambe5112@gmail.com','$2b$10$P9F2vpURLwe7Eax3i.CefOfomHC7aKX5oVyKAj4.BJPU30HlkL./y','9322527620','Pune, Maharashtra','Active','Aadhar','aadhar123.pdf');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(100) NOT NULL,
  `description` text,
  `status` enum('Active','Inactive') DEFAULT 'Active',
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'development ',NULL,'Active'),(2,'digital marketing ',NULL,'Active'),(3,'sales',NULL,'Active'),(4,'design',NULL,'Active'),(5,'HR',NULL,'Active'),(6,'Account',NULL,'Active'),(7,'Legal',NULL,'Active'),(8,'Managment',NULL,'Active'),(9,'Devops',NULL,'Active'),(10,'Testing',NULL,'Active'),(11,'Market Research',NULL,'Active');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designation`
--

DROP TABLE IF EXISTS `designation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designation` (
  `designation_id` int NOT NULL AUTO_INCREMENT,
  `designation_name` varchar(100) NOT NULL,
  `department_id` int DEFAULT NULL,
  PRIMARY KEY (`designation_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `designation_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designation`
--

LOCK TABLES `designation` WRITE;
/*!40000 ALTER TABLE `designation` DISABLE KEYS */;
INSERT INTO `designation` VALUES (1,'Software Engineer',NULL);
/*!40000 ALTER TABLE `designation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doc_verification`
--

DROP TABLE IF EXISTS `doc_verification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doc_verification` (
  `doc_id` int NOT NULL AUTO_INCREMENT,
  `entity_type` enum('client','employee','associate_Partner') NOT NULL,
  `entity_id` int NOT NULL,
  `document_type` enum('Aadhar','PAN','Passport','Driving License','Other') NOT NULL,
  `document_number` varchar(100) DEFAULT NULL,
  `document_file` varchar(255) NOT NULL,
  `verification_status` enum('Pending','Verified','Rejected') DEFAULT 'Pending',
  `remarks` text,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`doc_id`),
  KEY `idx_entity` (`entity_type`,`entity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doc_verification`
--

LOCK TABLES `doc_verification` WRITE;
/*!40000 ALTER TABLE `doc_verification` DISABLE KEYS */;
/*!40000 ALTER TABLE `doc_verification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emp_profile`
--

DROP TABLE IF EXISTS `emp_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emp_profile` (
  `emp_profile_id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `designation_id` int DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `contact_no` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `address` text,
  `skills` text,
  `status` varchar(50) DEFAULT 'Active',
  PRIMARY KEY (`emp_profile_id`),
  UNIQUE KEY `unique_emp` (`emp_id`),
  KEY `department_id` (`department_id`),
  KEY `designation_id` (`designation_id`),
  CONSTRAINT `emp_profile_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employees` (`emp_id`),
  CONSTRAINT `emp_profile_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  CONSTRAINT `emp_profile_ibfk_3` FOREIGN KEY (`designation_id`) REFERENCES `designation` (`designation_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emp_profile`
--

LOCK TABLES `emp_profile` WRITE;
/*!40000 ALTER TABLE `emp_profile` DISABLE KEYS */;
/*!40000 ALTER TABLE `emp_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `emp_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` varchar(50) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `designation_id` int DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `status` enum('Active','Inactive','Resigned') DEFAULT 'Active',
  `pf_number` varchar(50) DEFAULT 'NA',
  `dob` date DEFAULT NULL,
  `document_type` enum('Aadhar','PAN') DEFAULT NULL,
  `document_file` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`emp_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `employee_id_UNIQUE` (`employee_id`),
  KEY `department_id` (`department_id`),
  KEY `role_id` (`role_id`),
  KEY `designation_id` (`designation_id`),
  CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  CONSTRAINT `employees_ibfk_3` FOREIGN KEY (`designation_id`) REFERENCES `designation` (`designation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (2,'0',1,3,1,'Mahesh Tambe','mahesh@example.com','$2a$10$lTaj05iJN7z4Pwd4SEC7jO0c7a0xYxBhpNJKpESI2K2iR3.NlN0lG','9322527620','2024-11-01','Active','PF12345','2002-10-10','Aadhar','uploads/documents/aadhar.pdf');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packages`
--

DROP TABLE IF EXISTS `packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `packages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text,
  `details` json DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration_days` int DEFAULT NULL,
  `is_recurring` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `packages_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packages`
--

LOCK TABLES `packages` WRITE;
/*!40000 ALTER TABLE `packages` DISABLE KEYS */;
INSERT INTO `packages` VALUES (1,1,'Starter Plan','Static Website (HTML or Basic WordPress) with essential features and up to 5 pages.','{\"features\": [\"Pages: 1 – 5\", \"Mobile Responsive\", \"Basic SEO\", \"Contact Form\", \"Social Links\", \"1 Update/month\", \"Estimated Delivery Time: 7 Days\"], \"recommended_addons\": [{\"name\": \"Domain\", \"price\": 1000}, {\"name\": \"Hosting\", \"price\": 3000}, {\"name\": \"SSL\", \"price\": 5000}, {\"name\": \"Maintenance\", \"price\": 5000}, {\"name\": \"Additional Pages\", \"price\": 2000}]}',14999.00,0,0,'2025-08-20 11:53:57','2025-08-20 12:54:28'),(2,1,'Business Website','Static Website (WordPress) with template design, blog, and essential features for small businesses.','{\"features\": [\"Pages: 5 – 10\", \"Template Design\", \"Basic SEO\", \"Blog Section\", \"WhatsApp Chat\", \"Google Maps\", \"2 Updates/month\", \"Estimated Delivery Time: 12 Days\"], \"recommended_addons\": [{\"name\": \"Domain\", \"price\": 1000}, {\"name\": \"Hosting\", \"price\": 6500}, {\"name\": \"SSL\", \"price\": 5000}, {\"name\": \"Maintenance\", \"price\": 10000}, {\"name\": \"Additional Pages\", \"price\": 2000}]}',29999.00,0,0,'2025-08-20 11:57:36','2025-08-20 12:54:28'),(3,1,'Business Website (React / Next.js)','High-performance static website built with React/Next.js, offering excellent SEO, fast speed, and full customization.','{\"features\": [\"Pages: 5 – 10\", \"Speed - Very fast (static content, optimized)\", \"SEO - Excellent (with SSR via Next.js)\", \"Design Customization - Fully custom, no design limits\", \"Scalability - Very high – easy to add advanced features later\", \"Blog Section\", \"WhatsApp Chat\", \"Google Maps\", \"2 Updates/month\", \"Recurring Costs - None (once built and hosted)\", \"Estimated Delivery Time: 15 - 20 Days\"], \"recommended_addons\": [{\"name\": \"Domain\", \"price\": 1000}, {\"name\": \"Hosting\", \"price\": 6500}, {\"name\": \"SSL\", \"price\": 5000}, {\"name\": \"Maintenance\", \"price\": 15000}, {\"name\": \"Additional Pages\", \"price\": 3000}]}',44999.00,0,0,'2025-08-20 11:58:14','2025-08-20 12:54:28'),(4,1,'Business Professional Website (Dynamic React/Next.js)','Dynamic and professional-grade website built with React/Next.js. Includes responsive UI/UX, dynamic pages, optimized performance, and advanced security features.','{\"features\": [\"Pages: 15 – 20\", \"Responsive UI/UX\", \"Basic SEO\", \"Blog Section\", \"WhatsApp Chat\", \"Google Maps\", \"2 Updates/month\", \"Dynamic Pages\", \"Additional Security Features\", \"Optimize Loading Speed\", \"Estimated Delivery Time: 45 - 50 Days\"], \"recommended_addons\": [{\"name\": \"Domain\", \"price\": 1000}, {\"name\": \"Hosting\", \"price\": 15000}, {\"name\": \"SSL\", \"price\": 5000}, {\"name\": \"Maintenance\", \"price\": 30000}, {\"name\": \"Additional Pages\", \"price\": 3000}]}',89999.00,0,0,'2025-08-20 11:58:58','2025-08-20 12:54:28'),(5,1,'E-Commerce Starter Plan (WordPress)','Starter E-Commerce website built on WordPress. Includes product listings, cart & checkout, payment gateway, inventory panel, and basic invoice generation.','{\"features\": [\"Products: Up to 25\", \"Template Design\", \"Product Listings\", \"Cart & Checkout\", \"Payment Gateway\", \"Order/Inventory Panel\", \"2 Updates/month\", \"Maintenance Support - 1 Month\", \"Invoice Generation\", \"Estimated Delivery Time: 7 Days\"], \"recommended_addons\": [{\"name\": \"Domain\", \"price\": 1000}, {\"name\": \"Hosting\", \"price\": 15000}, {\"name\": \"SSL\", \"price\": 5000}, {\"name\": \"Maintenance\", \"price\": 20000}, {\"name\": \"Additional Products\", \"price\": 200}]}',59999.00,0,0,'2025-08-20 11:59:55','2025-08-20 12:54:28'),(6,1,'E-Commerce Professional Plan (React / NextJs)','Professional e-commerce website built with React/NextJs. Includes advanced features like dynamic filtering, logistics integration, order tracking, and security enhancements.','{\"features\": [\"Products: Up to 50\", \"Responsive UI/UX\", \"Product Listings\", \"Cart & Checkout\", \"Payment Gateway\", \"Order/Inventory Panel\", \"2 Updates/month\", \"Maintenance Support - 2 Months\", \"Dynamic Filtering & Search\", \"Logistics Integration\", \"Order Tracking\", \"Additional Security Features\", \"Optimize Loading Speed\", \"Invoice Generation\", \"Estimated Delivery Time: 20 - 25 Days\"], \"recommended_addons\": [{\"name\": \"Domain\", \"price\": 1000}, {\"name\": \"Hosting\", \"price\": 15000}, {\"name\": \"SSL\", \"price\": 5000}, {\"name\": \"Maintenance\", \"price\": 30000}, {\"name\": \"Additional Products\", \"price\": 200}]}',99999.00,0,0,'2025-08-20 12:01:56','2025-08-20 12:54:28'),(7,2,'Basic Website Maintenance','Static Website (HTML or Basic WordPress)','{\"pages\": \"1 – 5\", \"features\": [\"Mobile Responsive\", \"Website Audit\", \"1 Update/month\", \"Monthly Backup\", \"Estimated Delivery Time: 2 Days\"], \"recommended_addons\": [{\"name\": \"Domain\", \"price\": 1000}, {\"name\": \"Hosting\", \"price\": 3000}, {\"name\": \"SSL\", \"price\": 5000}, {\"name\": \"Page Builder\", \"price\": 5000}, {\"name\": \"Additional Pages\", \"price\": 2000}]}',5000.00,0,0,'2025-08-20 12:21:55','2025-08-20 12:27:39'),(8,2,'Business Website Maintenance','Static Website (WordPress)','{\"pages\": \"5 – 10\", \"features\": [\"Mobile Responsive\", \"Website Audit\", \"1 Update/month\", \"Monthly Backup\", \"Basic SEO\", \"Estimated Delivery Time: 3 Days\"], \"recommended_addons\": [{\"name\": \"Domain\", \"price\": 1000}, {\"name\": \"Hosting\", \"price\": 6500}, {\"name\": \"SSL\", \"price\": 5000}, {\"name\": \"Page Builder\", \"price\": 5000}, {\"name\": \"Additional Pages\", \"price\": 2000}]}',10000.00,0,0,'2025-08-20 12:23:16','2025-08-20 12:27:39'),(9,2,'Business Professional Website Maintenance','Dynamic Website (React)','{\"pages\": \"15 – 20\", \"features\": [\"Responsive UI/UX\", \"Website Audit\", \"2 Updates/month\", \"Monthly Backup\", \"Basic SEO\", \"Additional Security Features\", \"SEO Tools Integration\", \"Enhance Security System\", \"Optimize Loading Speed\", \"Monthly Maintenance Activity Report\", \"Estimated Delivery Time: 3 - 5 Days\"], \"recommended_addons\": [{\"name\": \"Domain\", \"price\": 1000}, {\"name\": \"Hosting\", \"price\": 15000}, {\"name\": \"SSL\", \"price\": 5000}, {\"name\": \"Additional Pages\", \"price\": 3000}]}',30000.00,0,0,'2025-08-20 12:24:15','2025-08-20 12:27:39'),(10,2,'Basic E-Commerce Maintenance','E-Commerce Website (WordPress)','{\"features\": [\"Mobile Responsive\", \"Website Audit\", \"1 Update/month\", \"Monthly Backup\", \"Basic SEO\", \"Enhance Security System\", \"Yearly 10 Products Listing\", \"Estimated Delivery Time: 3 - 5 Days\"], \"products\": \"Up to 25\", \"recommended_addons\": [{\"name\": \"Domain\", \"price\": 1000}, {\"name\": \"Hosting\", \"price\": 15000}, {\"name\": \"SSL\", \"price\": 5000}, {\"name\": \"Page Builder\", \"price\": 5000}, {\"name\": \"Additional Product\", \"price\": 200}]}',20000.00,0,0,'2025-08-20 12:25:08','2025-08-20 12:27:39'),(11,2,'E-Commerce Professional Maintenance','E-Commerce Website (React)','{\"features\": [\"Responsive UI/UX\", \"Website Audit\", \"2 Updates/month\", \"Monthly Backup\", \"Basic SEO\", \"Additional Security Features\", \"SEO Tools Integration\", \"Enhance Security System\", \"Optimize Loading Speed\", \"Payment Gateway Integration\", \"Yearly 20 Products Listing\", \"Monthly Maintenance Activity Report\", \"Estimated Delivery Time: 3 - 5 Days\"], \"products\": \"Up to 50\", \"recommended_addons\": [{\"name\": \"Domain\", \"price\": 1000}, {\"name\": \"Hosting\", \"price\": 15000}, {\"name\": \"SSL\", \"price\": 5000}, {\"name\": \"Additional Product\", \"price\": 200}]}',30000.00,0,0,'2025-08-20 12:26:21','2025-08-20 12:27:39'),(12,3,'1 Month Plan','Social Media Marketing Monthly Plan','{\"recommended_addons\": [{\"name\": \"No. of Posts\", \"price\": 600}, {\"name\": \"No. of Blogs\", \"price\": 1000}, {\"name\": \"Case Studies\", \"price\": 1500}, {\"name\": \"Videos/Reels\", \"price\": 1500}, {\"name\": \"Job Posts\", \"price\": 1000}], \"social_media_platforms\": [{\"name\": \"Facebook\", \"price\": 4000}, {\"name\": \"Instagram\", \"price\": 4000}, {\"name\": \"LinkedIn\", \"price\": 4000}, {\"name\": \"Google\", \"price\": 4000}, {\"name\": \"YouTube\", \"price\": 4000}, {\"name\": \"Twitter\", \"price\": 4000}]}',0.00,30,0,'2025-08-20 12:52:19','2025-08-20 12:55:11'),(13,3,'3 Month Plan','Social Media Marketing Quarterly Plan','{\"recommended_addons\": [{\"name\": \"No. of Posts\", \"price\": 600}, {\"name\": \"No. of Blogs\", \"price\": 1000}, {\"name\": \"Case Studies\", \"price\": 1500}, {\"name\": \"Videos/Reels\", \"price\": 1500}, {\"name\": \"Job Posts\", \"price\": 1000}], \"social_media_platforms\": [{\"name\": \"Facebook\", \"price\": 4000}, {\"name\": \"Instagram\", \"price\": 4000}, {\"name\": \"LinkedIn\", \"price\": 4000}, {\"name\": \"Google\", \"price\": 4000}, {\"name\": \"YouTube\", \"price\": 4000}, {\"name\": \"Twitter\", \"price\": 4000}]}',0.00,90,1,'2025-08-20 12:52:19','2025-08-20 12:55:11'),(14,3,'6 Month Plan','Social Media Marketing Half-Yearly Plan','{\"recommended_addons\": [{\"name\": \"No. of Posts\", \"price\": 600}, {\"name\": \"No. of Blogs\", \"price\": 1000}, {\"name\": \"Case Studies\", \"price\": 1500}, {\"name\": \"Videos/Reels\", \"price\": 1500}, {\"name\": \"Job Posts\", \"price\": 1000}], \"social_media_platforms\": [{\"name\": \"Facebook\", \"price\": 4000}, {\"name\": \"Instagram\", \"price\": 4000}, {\"name\": \"LinkedIn\", \"price\": 4000}, {\"name\": \"Google\", \"price\": 4000}, {\"name\": \"YouTube\", \"price\": 4000}, {\"name\": \"Twitter\", \"price\": 4000}]}',0.00,180,1,'2025-08-20 12:52:19','2025-08-20 12:55:11'),(15,3,'12 Month Plan','Social Media Marketing Yearly Plan','{\"recommended_addons\": [{\"name\": \"No. of Posts\", \"price\": 600}, {\"name\": \"No. of Blogs\", \"price\": 1000}, {\"name\": \"Case Studies\", \"price\": 1500}, {\"name\": \"Videos/Reels\", \"price\": 1500}, {\"name\": \"Job Posts\", \"price\": 1000}], \"social_media_platforms\": [{\"name\": \"Facebook\", \"price\": 4000}, {\"name\": \"Instagram\", \"price\": 4000}, {\"name\": \"LinkedIn\", \"price\": 4000}, {\"name\": \"Google\", \"price\": 4000}, {\"name\": \"YouTube\", \"price\": 4000}, {\"name\": \"Twitter\", \"price\": 4000}]}',0.00,360,1,'2025-08-20 12:52:19','2025-09-10 07:06:59'),(36,4,'Monthly Plan','1 Month','{\"base_cost\": 5000, \"platforms\": [{\"name\": \"Facebook\", \"budget_options\": [5000, 10000]}, {\"name\": \"Instagram\", \"budget_options\": [5000, 10000]}, {\"name\": \"LinkedIn\", \"budget_options\": [5000, 10000]}, {\"name\": \"Google\", \"budget_options\": [5000, 10000]}], \"user_keywords\": [\"Keyword1\", \"Keyword2\", \"Keyword3\", \"Keyword4\", \"Keyword5\"], \"keywords_required\": 5, \"Social Media Platforms\": [\"1 Ad Set Per Platform\", \"2 Creatives\", \"Google Ads\", \"Facebook Ads\", \"Instagram Ads\", \"LinkedIn Ads\"]}',0.00,30,0,'2025-09-10 11:00:12','2025-09-10 11:00:12'),(37,4,'Quaterly Plan','3 Months','{\"base_cost\": 5000, \"platforms\": [{\"name\": \"Facebook\", \"budget_options\": [5000, 10000]}, {\"name\": \"Instagram\", \"budget_options\": [5000, 10000]}, {\"name\": \"LinkedIn\", \"budget_options\": [5000, 10000]}, {\"name\": \"Google\", \"budget_options\": [5000, 10000]}], \"user_keywords\": [\"Keyword1\", \"Keyword2\", \"Keyword3\", \"Keyword4\", \"Keyword5\"], \"keywords_required\": 5, \"Social Media Platforms\": [\"1 Ad Set Per Platform\", \"4 Creatives\", \"Google Ads\", \"Facebook Ads\", \"Instagram Ads\", \"LinkedIn Ads\"]}',0.00,90,1,'2025-09-10 11:03:58','2025-09-10 11:03:58'),(38,4,'Half-Yearly Plan','6 Month','{\"base_cost\": 5000, \"platforms\": [{\"name\": \"Facebook\", \"budget_options\": [5000, 10000]}, {\"name\": \"Instagram\", \"budget_options\": [5000, 10000]}, {\"name\": \"LinkedIn\", \"budget_options\": [5000, 10000]}, {\"name\": \"Google\", \"budget_options\": [5000, 10000]}], \"user_keywords\": [\"Keyword1\", \"Keyword2\", \"Keyword3\", \"Keyword4\", \"Keyword5\"], \"keywords_required\": 5, \"Social Media Platforms\": [\"1 Ad Set Per Platform\", \"4 Creatives\", \"Google Ads\", \"Facebook Ads\", \"Instagram Ads\", \"LinkedIn Ads\"]}',0.00,180,1,'2025-09-10 11:05:53','2025-09-10 11:05:53'),(39,4,'Yearly Plan','12 Months','{\"base_cost\": 5000, \"platforms\": [{\"name\": \"Facebook\", \"budget_options\": [5000, 10000]}, {\"name\": \"Instagram\", \"budget_options\": [5000, 10000]}, {\"name\": \"LinkedIn\", \"budget_options\": [5000, 10000]}, {\"name\": \"Google\", \"budget_options\": [5000, 10000]}], \"user_keywords\": [\"Keyword1\", \"Keyword2\", \"Keyword3\", \"Keyword4\", \"Keyword5\"], \"keywords_required\": 5, \"Social Media Platforms\": [\"1 Ad Set Per Platform\", \"4 Creatives\", \"Google Ads\", \"Facebook Ads\", \"Instagram Ads\", \"LinkedIn Ads\"]}',0.00,360,1,'2025-09-10 11:07:07','2025-09-10 11:07:07'),(40,4,'Monthly Plan','1 Month','{\"base_cost\": 10000, \"platforms\": [{\"name\": \"Facebook\", \"budget_options\": [15000, 20000, 25000, 30000]}, {\"name\": \"Instagram\", \"budget_options\": [15000, 20000, 25000, 30000]}, {\"name\": \"LinkedIn\", \"budget_options\": [15000, 20000, 25000, 30000]}, {\"name\": \"Google\", \"budget_options\": [15000, 20000, 25000, 30000]}], \"user_keywords\": [\"Keyword1\", \"Keyword2\", \"Keyword3\", \"Keyword4\", \"Keyword5\"], \"keywords_required\": 5, \"Social Media Platforms\": [\"3 Ads Set As Per Requirement\", \"1 Ad Set Per Platform\", \"4 Creatives\", \"Google Ads\", \"Facebook Ads\", \"Instagram Ads\", \"LinkedIn Ads\"]}',0.00,30,0,'2025-09-10 11:12:46','2025-09-10 11:12:46'),(41,4,'Quaterly Plan','3 Months','{\"base_cost\": 10000, \"platforms\": [{\"name\": \"Facebook\", \"budget_options\": [15000, 20000, 25000, 30000]}, {\"name\": \"Instagram\", \"budget_options\": [15000, 20000, 25000, 30000]}, {\"name\": \"LinkedIn\", \"budget_options\": [15000, 20000, 25000, 30000]}, {\"name\": \"Google\", \"budget_options\": [15000, 20000, 25000, 30000]}], \"user_keywords\": [\"Keyword1\", \"Keyword2\", \"Keyword3\", \"Keyword4\", \"Keyword5\"], \"keywords_required\": 5, \"Social Media Platforms\": [\"3 Ads Set As Per Requirement\", \"1 Ad Set Per Platform\", \"4 Creatives\", \"Google Ads\", \"Facebook Ads\", \"Instagram Ads\", \"LinkedIn Ads\"]}',0.00,90,1,'2025-09-10 11:14:35','2025-09-10 11:14:35'),(42,4,'Half-Yearly Plan','6 Months','{\"base_cost\": 10000, \"platforms\": [{\"name\": \"Facebook\", \"budget_options\": [15000, 20000, 25000, 30000]}, {\"name\": \"Instagram\", \"budget_options\": [15000, 20000, 25000, 30000]}, {\"name\": \"LinkedIn\", \"budget_options\": [15000, 20000, 25000, 30000]}, {\"name\": \"Google\", \"budget_options\": [15000, 20000, 25000, 30000]}], \"user_keywords\": [\"Keyword1\", \"Keyword2\", \"Keyword3\", \"Keyword4\", \"Keyword5\"], \"keywords_required\": 5, \"Social Media Platforms\": [\"3 Ads Set As Per Requirement\", \"1 Ad Set Per Platform\", \"4 Creatives\", \"Google Ads\", \"Facebook Ads\", \"Instagram Ads\", \"LinkedIn Ads\"]}',0.00,180,1,'2025-09-10 11:15:36','2025-09-10 11:15:36'),(43,4,'Yearly Plan','12 Months','{\"base_cost\": 10000, \"platforms\": [{\"name\": \"Facebook\", \"budget_options\": [15000, 20000, 25000, 30000]}, {\"name\": \"Instagram\", \"budget_options\": [15000, 20000, 25000, 30000]}, {\"name\": \"LinkedIn\", \"budget_options\": [15000, 20000, 25000, 30000]}, {\"name\": \"Google\", \"budget_options\": [15000, 20000, 25000, 30000]}], \"user_keywords\": [\"Keyword1\", \"Keyword2\", \"Keyword3\", \"Keyword4\", \"Keyword5\"], \"keywords_required\": 5, \"Social Media Platforms\": [\"3 Ads Set As Per Requirement\", \"1 Ad Set Per Platform\", \"4 Creatives\", \"Google Ads\", \"Facebook Ads\", \"Instagram Ads\", \"LinkedIn Ads\"]}',0.00,360,1,'2025-09-10 11:16:33','2025-09-10 11:16:33'),(44,5,'Basic SEO','Additional Note:- SEO services under this plan will be customized using the competitor website you provide as a reference.','{\"Features\": [\"500 Target Keywords\", \"On & Off-Page SEO\", \"Meta Tag Setup\", \"Google Search Console Setup\", \"1 Report/Month\", \"Technical Audit\", \"1 Competitor Analysis\", \"Local SEO\"], \"user_keywords\": [\"Keyword1\", \"Keyword2\", \"Keyword3\", \"Keyword4\", \"Keyword5\"], \"competitor_url\": \"https://www.example.com\", \"target_location\": {\"city\": \"Pune\", \"state\": \"Maharashtra\", \"country\": \"India\"}, \"keywords_required\": 5}',10000.00,0,0,'2025-09-10 23:07:02','2025-09-10 23:40:25'),(45,5,'Advanced SEO','For growing businesses ready to scale and dominate search results.This plan delivers a powerful combination of strategy, content, and technical excellence to drive long-term SEO success across multiple devices and platforms.','{\"Features\": [\"2000 Target Keywords\", \"Comprehensive SEO Statergy\", \"Content Marketing\", \"Local + Technical SEO\", \"2 Progress Reports\", \"100 Keywords Resources\", \"5 Competitor Analysis\", \"Social Media Integration\", \"Monthly Performance Review\", \"Backlink Building\", \"Technical SEO Fixes\", \"Content Optimization\", \"GMB Management\", \"Blog Optimization\", \"Landing Page Optimization\"], \"user_keywords\": [\"Keyword1\", \"Keyword2\", \"Keyword3\", \"Keyword4\", \"Keyword5\", \"Keyword6\", \"Keyword7\", \"Keyword8\", \"Keyword9\", \"Keyword10\"], \"competitor_urls\": [\"https://www.example1.com\", \"https://www.example2.com\", \"https://www.example3.com\", \"https://www.example4.com\", \"https://www.example5.com\"], \"target_location\": {\"city\": \"City Name\", \"state\": \"State Name\", \"country\": \"Country Name\"}, \"keywords_required\": 7}',15000.00,0,0,'2025-09-10 23:22:19','2025-09-10 23:41:49');
/*!40000 ALTER TABLE `packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_department_history`
--

DROP TABLE IF EXISTS `project_department_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_department_history` (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int DEFAULT NULL,
  `from_department_id` int DEFAULT NULL,
  `to_department_id` int DEFAULT NULL,
  `transfer_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `remarks` text,
  PRIMARY KEY (`history_id`),
  KEY `project_id` (`project_id`),
  KEY `from_department_id` (`from_department_id`),
  KEY `to_department_id` (`to_department_id`),
  CONSTRAINT `project_department_history_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`),
  CONSTRAINT `project_department_history_ibfk_2` FOREIGN KEY (`from_department_id`) REFERENCES `departments` (`department_id`),
  CONSTRAINT `project_department_history_ibfk_3` FOREIGN KEY (`to_department_id`) REFERENCES `departments` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_department_history`
--

LOCK TABLES `project_department_history` WRITE;
/*!40000 ALTER TABLE `project_department_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_department_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_department_mapping`
--

DROP TABLE IF EXISTS `project_department_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project_department_mapping` (
  `mapping_id` int NOT NULL AUTO_INCREMENT,
  `project_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `status` enum('Pending','Assigned','Completed') DEFAULT 'Pending',
  `assigned_date` datetime DEFAULT NULL,
  `completion_date` datetime DEFAULT NULL,
  PRIMARY KEY (`mapping_id`),
  KEY `project_id` (`project_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `project_department_mapping_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`),
  CONSTRAINT `project_department_mapping_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_department_mapping`
--

LOCK TABLES `project_department_mapping` WRITE;
/*!40000 ALTER TABLE `project_department_mapping` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_department_mapping` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `project_id` int NOT NULL AUTO_INCREMENT,
  `project_name` varchar(150) DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `package_id` int DEFAULT NULL,
  `description` text,
  `client_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `assigned_to` int DEFAULT NULL,
  `status` enum('New Project','Working','On Hold','Completed') DEFAULT 'New Project',
  `created_by` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`project_id`),
  KEY `department_id` (`department_id`),
  KEY `created_by` (`created_by`),
  KEY `projects_ibfk_1` (`client_id`),
  KEY `projects_ibfk_3` (`assigned_to`),
  KEY `category_id` (`category_id`),
  KEY `package_id` (`package_id`),
  CONSTRAINT `projects_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `projects_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  CONSTRAINT `projects_ibfk_3` FOREIGN KEY (`assigned_to`) REFERENCES `employees` (`emp_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `projects_ibfk_4` FOREIGN KEY (`created_by`) REFERENCES `admin` (`admin_id`),
  CONSTRAINT `projects_ibfk_5` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `projects_ibfk_6` FOREIGN KEY (`package_id`) REFERENCES `packages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (1,'Vm3',NULL,NULL,'Website Development',1,1,2,'New Project',NULL,'2025-11-20 19:40:57'),(2,'Internscope',NULL,NULL,'Development',2,1,2,'Completed',NULL,'2025-11-20 19:48:15');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(2,'associate partner'),(3,'employee'),(4,'client');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-26 22:55:05

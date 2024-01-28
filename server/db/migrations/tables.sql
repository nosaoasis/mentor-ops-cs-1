USE project_nodes;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS users_email_confirm;
DROP TABLE IF EXISTS users_reset_password;
DROP TABLE IF EXISTS posts;

CREATE TABLE IF NOT EXISTS users (
  id INT(11) NOT NULL AUTO_INCREMENT,
  gen_id VARCHAR(30) NOT NULL,
  username VARCHAR(30) NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  login_status ENUM('online', 'offline') NOT NULL,
  verified ENUM('true', 'false') DEFAULT 'false',
  birthday date DEFAULT NULL,
  gender VARCHAR(20) DEFAULT NULL,
  profile_image VARCHAR(512) DEFAULT NULL,
  background_image TEXT,
  profession VARCHAR(100) DEFAULT NULL,
  state VARCHAR(100) DEFAULT NULL,
  country VARCHAR(100) DEFAULT NULL,
  phone_number VARCHAR(20) DEFAULT NULL,
  marital_status VARCHAR(20) DEFAULT NULL,
  university VARCHAR(100) DEFAULT NULL,
  high_school VARCHAR(100) DEFAULT NULL,
  work_company VARCHAR(100) DEFAULT NULL,
  work_position VARCHAR(100) DEFAULT NULL,
  suspended BOOLEAN DEFAULT false,
  time_stamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  update_time_stamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY email (email),
  UNIQUE KEY username (username),
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;



CREATE TABLE IF NOT EXISTS users_email_confirm (
  id INT(11) NOT NULL AUTO_INCREMENT,
  gen_id VARCHAR(50) NOT NULL,
  pnu_uuid VARCHAR(100) NOT NULL,
  q VARCHAR(300) NOT NULL,
  c VARCHAR(300) NOT NULL,
  expired ENUM('true', 'false') DEFAULT 'false',
  time_stamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY gen_id (gen_id),
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;



CREATE TABLE IF NOT EXISTS users_reset_password (
  id INT(11) NOT NULL AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL,
  token VARCHAR(300) NOT NULL,
  time_stamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY token (token),
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;


CREATE TABLE IF NOT EXISTS posts (
  id int(11) NOT NULL AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  profile_image VARCHAR(512) DEFAULT NULL,
  type ENUM('user','project') NOT NULL DEFAULT 'user',
  shared_post ENUM('yes','no') NOT NULL DEFAULT 'no',
  post_id int(11) NOT NULL DEFAULT 0,
  project_id int(11) NOT NULL DEFAULT 0,
  content TEXT,
  upload TEXT,
  likes int(11) DEFAULT 0,
  shares int(11) DEFAULT 0,
  comments_count int(11) DEFAULT 0,
  flags int(11) DEFAULT 0,
  username_of_original_post VARCHAR(50) DEFAULT NULL,
  firstname_of_original_post VARCHAR(50) DEFAULT NULL,
  lastname_of_original_post VARCHAR(50) DEFAULT NULL,
  profile_image_of_original_post VARCHAR(50) DEFAULT NULL,
  time_of_original_post timestamp NULL DEFAULT NULL,
  time_of_post timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;


TRUNCATE TABLE users;
TRUNCATE TABLE users_email_confirm;
TRUNCATE TABLE users_reset_password;
TRUNCATE TABLE posts;

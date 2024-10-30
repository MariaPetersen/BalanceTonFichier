DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS File;
DROP TABLE IF EXISTS ShareLink;

CREATE TABLE User (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    occupied_space BIGINT(20) NOT NULL default 0,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY unique_email (email)
);

CREATE TABLE File (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    user_id BIGINT(20) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    user_file_name VARCHAR(255) NOT NULL,
    file_size BIGINT(20) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    INDEX idx_user_id (user_id),
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE ShareLink (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    file_id BIGINT(20) NOT NULL,
    link VARCHAR(255) NOT NULL,
    expiration_date DATETIME NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (file_id) REFERENCES File(id)
)

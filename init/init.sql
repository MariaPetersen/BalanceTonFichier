CREATE TABLE User (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY unique_email (email)
);

CREATE TABLE File (
    id BIGINT(20) NOT NULL AUTO_INCREMENT,
    user_id BIGINT(20) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT(20) NOT NULL,
    PRIMARY KEY (id),
    INDEX idx_user_id (user_id),
    FOREIGN KEY (user_id) REFERENCES User(id)
);

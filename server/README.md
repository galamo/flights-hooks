## create users table
CREATE TABLE `northwind`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(45) NULL,
  `first_name` NCHAR(10) NULL,
  `last_name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));

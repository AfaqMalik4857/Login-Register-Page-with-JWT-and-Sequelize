# Register-Login-Page
This is authentication and user management functionalities for a Node.js web application using Express.js. It includes user registration, login, logout, and profile update features. The application uses JWT (JSON Web Tokens) for session management and bcrypt for password hashing. User data is managed using a Sequelize model named User.

# MySQL Database
 I am using MySQL Workbench tool for the database.
 Here I am providing you my database:
 
 create database reg;
 use reg;

 CREATE TABLE Users (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
 );

 INSERT INTO Users(id, name, email, password)
 VALUES
 (1, "Ali Raza", "ali@gmail.com", "1234"),
 (2, "Ahmad Raza", "ahmad@gmail.com", "2345"),
 (3, "Mohsin Ahmad", "mohsin@gmail.com", "3456");

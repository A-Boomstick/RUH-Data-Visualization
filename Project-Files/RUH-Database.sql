DROP DATABASE IF EXISTS RUHData;
CREATE DATABASE RUHData;
USE RUHData;

CREATE TABLE StaffLogin (
    StaffID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(30) NOT NULL,
    Password VARCHAR(30) NOT NULL,
    AccessLevel INT,
    Department VARCHAR(30)
);


CREATE TABLE Task (
    TaskID INT AUTO_INCREMENT PRIMARY KEY,
    TaskName VARCHAR(50),
    Description TEXT,
    SetDate DATE,
    DueDate DATE,
    CompletionStatus VARCHAR(20)
);

CREATE TABLE Comment (
    CommentID INT AUTO_INCREMENT PRIMARY KEY,
    StaffID INT,
    TaskID INT,
    CommentText VARCHAR(255),

    FOREIGN KEY (StaffID) REFERENCES StaffLogin(StaffID),
    FOREIGN KEY (TaskID) REFERENCES Task(TaskID)
);

CREATE TABLE RUH (
    RUHID INT AUTO_INCREMENT PRIMARY KEY,
    StaffID INT,
    TaskID INT,
    CommentID INT,

    FOREIGN KEY (StaffID) REFERENCES StaffLogin(StaffID),
    FOREIGN KEY (TaskID) REFERENCES Task(TaskID),
    FOREIGN KEY (CommentID) REFERENCES Comment(CommentID)
);

INSERT into StaffLogin (Username, Password, AccessLevel, Department) VALUES ('Testing', 'bweh', 'Low-Level', 'Cringe')
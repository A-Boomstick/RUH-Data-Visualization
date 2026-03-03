DROP DATABASE IF EXISTS RUHData;
CREATE DATABASE RUHData;
USE RUHData;

CREATE TABLE RUH(
RUHStaff integer NOT NULL AUTO_INCREMENT,
RUHTaskSecID integer NOT NULL AUTO_INCREMENT,
RUHCommentID integer NOT NULL AUTO_INCREMENT,
primary key(RUHStaff, RUHTaskSecID, RUHCommentID)
);

CREATE TABLE STAFFRUH(
StaffID integer,
RUHStaff integer,
foreign key(RUHStaff) REFERENCES RUH(RUHStaff),
foreign key(StaffID) REFERENCES StaffLogin(StaffID)
);

CREATE TABLE COMMENTRUH(
CommentID integer,
RUHCommentID integer,
foreign key(RUHCommentID) REFERENCES RUH(RUHCommentID),
foreign key(CommentID) REFERENCES Comment(CommentID)
);

CREATE TABLE TASKRUH(
TaskConID integer,
RUHTaskSecID integer,
foreign key(RUHTaskSecID) REFERENCES RUH(RUHTaskSecID),
foreign key(TaskConID) REFERENCES task(TaskConID)
);

CREATE TABLE StaffLogin(
StaffID integer,
UsernameID integer,
PassID integer,
AccessID integer,
DepartmentID integer,
primary key(StaffID, UsernameID, PassID, AccessID, DepartmentID)
);

CREATE TABLE username(
UsernameID integer,
Username varchar(30),
foreign key(UsernameID) REFERENCES StaffLogin(UsernameID)
);

CREATE TABLE password(
PassID integer,
Password varchar(30),
foreign key(PassID) REFERENCES StaffLogin(PassID)
);

CREATE TABLE accessLevel(
AccessID integer,
AccessLevel varchar(30),
foreign key(AccessID) REFERENCES StaffLogin(AccessID)
);

CREATE TABLE department(
DepartmentID integer,
Department varchar(30),
foreign key(DepartmentID) REFERENCES StaffLogin(DepartmentID)
);

CREATE TABLE Comment(
CommentID integer,
CommID integer,
UserID integer
);

CREATE TABLE comm(
CommID integer,
staffComm varchar(100),
foreign key(CommID) REFERENCES Comment(CommID)
);

CREATE TABLE userComm(
UserID integer,
username varchar(30),
foreign key(UserID) REFERENCES Comment(UserID)
);

CREATE TABLE task(
TaskConID integer,
TaskID integer,
DescID integer,
DateID integer,
DueID integer,
CompletionID integer
);

CREATE TABLE taskName(
TaskID integer,
TaskName varchar(30),
foreign key(TaskID) REFERENCES task(TaskID)
);

CREATE TABLE Description(
DescID integer,
descrip varchar(30),
foreign key(DescID) REFERENCES task(DescID)
);

CREATE TABLE DATE(
DateID integer,
setDate varchar(30),
foreign key(DateID) REFERENCES task(DateID)
);

CREATE TABLE DDate(
DueID integer,
DueDate varchar(30),
foreign key(DueID) REFERENCES task(DueID)
);

CREATE TABLE Comp(
CompletionID integer,
Complete varchar(30),
foreign key(CompletionID) REFERENCES task(CompletionID)
);


DROP DATABASE IF EXISTS TestSet;
CREATE DATABASE TestSet;
USE TestSet;

CREATE TABLE TestData(
Name varchar(10),
Number float,
Something varchar(10)
);

INSERT INTO TestData VALUES('Barry', 63, 'Old Git');
INSERT INTO TestData VALUES('Samantha', 56, 'Old Grump');
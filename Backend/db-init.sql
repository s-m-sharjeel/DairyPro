CREATE TABLE users (
    email VARCHAR2(255) PRIMARY KEY,
    password VARCHAR2(255) NOT NULL
);

select * from users;

select * from EMPLOYEES where email = 'sharjeel@gmail.com';

INSERT INTO Cattle (cattle_ID, age, weight, breed, feed, feedConsumption) VALUES (1, 2, 120, 'American', 'Maxvita', 25);

DELETE FROM Cattle WHERE cattle_ID=1;
DELETE FROM Cattle WHERE cattle_ID=100;

SELECT * FROM Cattle ORDER BY cattle_ID;
SELECT * FROM Cow;
SELECT * FROM BreedingRecord;

DESCRIBE VeterinaryRecord;

/*
    UPDATE EMPLOYEES
    SET MANAGER_ID = (SELECT MANAGER_ID FROM employees WHERE EMPLOYEE_ID = 201)
    WHERE MANAGER_ID = 201;

    UPDATE DEPARTMENTS
    SET MANAGER_ID = (SELECT MANAGER_ID FROM employees WHERE EMPLOYEE_ID = 201)
    WHERE MANAGER_ID = 201;

    DELETE FROM EMPLOYEES WHERE EMPLOYEE_ID = 201;
*/
USE company_db;
INSERT INTO department (name)
VALUES  ("Owners"),
        ("Engineering"),
        ("Accounting"),
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("President", 200000, 1),
("Vice-President", 180000, 1),
("Engineering Manager", 120000, 2),
("Accounting Manager", 120000, 3),
("Sales Manager", 80000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ryan", "Walker", 1, null);
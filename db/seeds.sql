INSERT INTO departments (name)
VALUES
    ('Internal/External Audit'),
    ('IT Risk Assurance'),
    ('Core Assurance'),
    ('Corporate Tax'),
    ('Cybersecurity');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Intern', 69000.00, 1),
    ('Associate', 70000.00, 1),
    ('Experienced Associate', 75000.00, 1),
    ('Senior Associate', 85000.00, 1),
    ('Manager', 95000.00, 1),
    ('Director', 120000.00, 1),
    ('Partner', 200000.00, 1),
    ('Intern', 69000.00, 2),
    ('Associate', 70000.00, 2),
    ('Experienced Associate', 75000.00, 2),
    ('Senior Associate', 85000.00, 2),
    ('Manager', 95000.00, 2),
    ('Director', 120000.00, 2),
    ('Partner', 200000.00, 2),
    ('Intern', 69000.00, 3),
    ('Associate', 70000.00, 3),
    ('Experienced Associate', 75000.00, 3),
    ('Senior Associate', 85000.00, 3),
    ('Manager', 95000.00, 3),
    ('Director', 120000.00, 3),
    ('Partner', 200000.00, 3),
    ('Intern', 69000.00, 4),
    ('Associate', 70000.00, 4),
    ('Experienced Associate', 75000.00, 4),
    ('Senior Associate', 85000.00, 4),
    ('Manager', 95000.00, 4),
    ('Director', 120000.00, 4),
    ('Partner', 200000.00, 4),
    ('Intern', 69000.00, 5),
    ('Associate', 70000.00, 5),
    ('Experienced Associate', 75000.00, 5),
    ('Senior Associate', 85000.00, 5),
    ('Manager', 95000.00, 5),
    ('Director', 120000.00, 5),
    ('Partner', 200000.00, 5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES
    ('Rook', 'Sfi', 35, 1),
    ('Ohm', 'Ksm', 34, 1),
    ('Strong', 'Bch', 33, 2),
    ('Auto', 'Gno', 32, 3),
    ('Klima', 'Lobi', 31, 3),
    ('Paxg', 'Time', 30, 3),
    ('Xpunk', 'Mkr', 29, 3),
    ('Rook', 'Sfi', 28, 8),
    ('Ohm', 'Ksm', 27, 8),
    ('Strong', 'Bch', 26, 9),
    ('Auto', 'Gno', 25, 10),
    ('Klima', 'Lobi', 24, 10),
    ('Paxg', 'Time', 23, 10),
    ('Xpunk', 'Mkr', 22, 10),
    ('Aave', 'Ach', 21, 15),
    ('Ltc', '1inch', 20, 15),
    ('Btc', 'Xrp', 19, 16),
    ('Btr', 'Eth', 18, 17),
    ('Kind', 'Son', 17, 17),
    ('Realm', 'Kine', 16, 17),
    ('Shiba', 'Yfi', 15, 17),
    ('Solo', 'Dead', 14, 22),
    ('Bitcoin', 'Usa', 13, 22),
    ('Bnb', 'Chia', 12, 23),
    ('Sia', 'Cryp', 11, 24),
    ('Que', 'Sghfd', 10, 24),
    ('Xela', 'Ngu', 9, 24),
    ('Asg', 'Rsfd', 8, 24),
    ('Rachel', 'Stup', 7, 29),
    ('Mia', 'Rud', 6, 29),
    ('Bianca', 'Ma', 5, 30),
    ('Monica', 'Nevar', 4, 31),
    ('Nelson', 'Moni', 3, 31),
    ('Xela', 'Ngu', 2, 31),
    ('Kim', 'La', 1, 31);
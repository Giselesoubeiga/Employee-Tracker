use employee_db;

INSERT INTO `employee` (`id`, `first_name`, `last_name`, `role_id`, `manager_id`) VALUES
(1, 'Thomas ', 'Hill', 1, 2),
(2, 'helene', ' White', 3, 1),
(3, 'alex', 'Hodo', 4, 2),
(4, 'Alexander', 'Queen', 5, 3),
(5, 'Francois', 'Var', 6, 4);

INSERT INTO `role` (`id`, `title`, `salary`, `departement_id`) VALUES
(1, 'Manager', '80000', 1),
(2, 'Accountant', '100000', 2),
(3, 'Office Manager', '200000', 3),
(4, 'Marketing manager', '180000', 4);


INSERT INTO `departement` (`id`, `name`) VALUES
(1, 'Accounts '),
(2, 'H&R'),
(3, 'Sales'),
(4, 'Product developpent'),
(5, 'Finance');




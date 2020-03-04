use employee_db;

CREATE TABLE `departement` (
  `id` int NOT NULL,
  `name` varchar(30) DEFAULT NULL
);


CREATE TABLE `role` (
  `id` int NOT NULL,
  `title` varchar(30) DEFAULT NULL,
  `salary` decimal(30,0) DEFAULT NULL,
  `departement_id` int DEFAULT NULL
);


CREATE TABLE `employee` (
  `id` int NOT NULL,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `manager_id` int DEFAULT NULL
);



ALTER TABLE `employee`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

ALTER TABLE `role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

ALTER TABLE `departement`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;
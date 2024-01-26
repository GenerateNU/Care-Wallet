DROP TABLE IF EXISTS medication;
DROP TABLE IF EXISTS files;


CREATE TYPE role AS ENUM ('PATIENT', 'PRIMARY', 'SECONDARY');
CREATE TYPE status AS ENUM ('ACCEPTED', 'DECLINED', 'NOTIFIED');

CREATE TABLE IF NOT EXISTS medication (
    medication_id integer NOT NULL UNIQUE,
    medication_name varchar NOT NULL,
    PRIMARY KEY (medication_id)
);

CREATE TABLE IF NOT EXISTS files (
    --file_id varchar NOT NULL,
    group_id varchar NOT NULL,
    upload_by varchar NOT NULL,
    upload_date varchar NOT NULL,
    task_id varchar,
    PRIMARY KEY (group_id)
);

-- Insert sample data into "medication" table
INSERT INTO medication (medication_id, medication_name)
VALUES
  (1, 'Medication A'),
  (2, 'Medication B'),
  (3, 'Medication C'),
  (4, 'Medication D'),
  (5, 'Medication E')
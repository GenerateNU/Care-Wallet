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
    file_id serial NOT NULL UNIQUE,
    file_name varchar NOT NULL,
    group_id varchar NOT NULL,
    upload_by varchar NOT NULL,
    upload_date timestamp,
    file_size integer NOT NULL,
    task_id varchar,
    PRIMARY KEY (file_id)
    -- add group id, upload by, task id foreign keys
);

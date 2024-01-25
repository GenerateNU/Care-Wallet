DROP TABLE IF EXISTS medication;
DROP TABLE IF EXISTS care_group;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS group_roles;
DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS task_assignees;
DROP TABLE IF EXISTS label;
DROP TABLE IF EXISTS task_labels;
DROP TABLE IF EXISTS file;

CREATE TYPE role AS ENUM ('PATIENT', 'PRIMARY', 'SECONDARY');
CREATE TYPE status AS ENUM ('ACCEPTED', 'DECLINED', 'NOTIFIED');
CREATE TYPE progress AS ENUM ('TODO', 'INPROGRESS', 'DONE');

CREATE TABLE IF NOT EXISTS medication (
    medication_id integer NOT NULL UNIQUE,
    medication_name varchar NOT NULL,
    PRIMARY KEY (medication_id)
);

CREATE TABLE IF NOT EXISTS care_group (
    group_id varchar NOT NULL UNIQUE,
    group_name varchar NOT NULL,
    date_created timestamp NOT NULL, --do we default current time?
    PRIMARY KEY (group_id)
);

CREATE TABLE IF NOT EXISTS users (
    user_id varchar NOT NULL UNIQUE,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    email varchar NOT NULL,
    phone varchar NOT NULL,
    address varchar NOT NULL,
    pfp_s3_url varchar,
    device_id varchar,
    push_notification_enabled BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS group_roles (
    group_id varchar NOT NULL,
    user_id varchar NOT NULL,
    role role NOT NULL,
    PRIMARY KEY (group_id, user_id),
    FOREIGN KEY (group_id) REFERENCES care_group (group_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS task (
    task_id varchar NOT NULL,
    group_id varchar NOT NULL,
    created_by varchar NOT NULL,
    created_date timestamp NOT NULL, -- add default val with current timestamp?
    description varchar,
    start_date timestamp,
    end_date timestamp,
    progress progress NOT NULL,
    PRIMARY KEY (task_id),
    FOREIGN KEY (group_id) REFERENCES care_group (group_id),
    FOREIGN KEY (created_by) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS task_assignees (
    task_id varchar NOT NULL,
    user_id varchar NOT NULL,
    status status NOT NULL,
    assigned_by varchar NOT NULL,
    assigned_date timestamp NOT NULL, -- add default val with current timestamp?
    last_notified timestamp,
    PRIMARY KEY (task_id, user_id),
    FOREIGN KEY (task_id) REFERENCES task (task_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (assigned_by) REFERENCES users (user_id)
);

    -- A label should remain, even when task is removed.
  CREATE TABLE If NOT EXISTS task_label (
    task_id varchar,
    group_id varchar NOT NULL,
    label_name varchar NOT NULL,
    FOREIGN KEY (task_id) REFERENCES task (task_id)
);

-- TODO: Add different tables for different types of tasks

CREATE TABLE IF NOT EXISTS file (
    file_id varchar NOT NULL UNIQUE,
    group_id varchar NOT NULL,
    upload_by varchar NOT NULL,
    upload_date timestamp NOT NULL,
    task_id varchar,
    PRIMARY KEY (file_id),
    FOREIGN KEY (group_id) REFERENCES care_group (group_id),
    FOREIGN KEY (upload_by) REFERENCES users (user_id),
    FOREIGN KEY (task_id) REFERENCES task (task_id)
    );

-- Insert sample data into "medication" table
INSERT INTO medication (medication_id, medication_name)
VALUES
  (1, 'Medication A'),
  (2, 'Medication B'),
  (3, 'Medication C'),
  (4, 'Medication D'),
  (5, 'Medication E')

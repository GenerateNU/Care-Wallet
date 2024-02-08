DROP TABLE IF EXISTS medication;
DROP TABLE IF EXISTS care_group;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS group_roles;
DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS task_assignees;
DROP TABLE IF EXISTS label;
DROP TABLE IF EXISTS task_labels;
DROP TABLE IF EXISTS files;


CREATE TYPE role AS ENUM ('PATIENT', 'PRIMARY', 'SECONDARY');
CREATE TYPE task_assignment_status AS ENUM ('ACCEPTED', 'DECLINED', 'NOTIFIED');
CREATE TYPE task_status AS ENUM ('INCOMPLETE', 'COMPLETE', 'PARTIAL');
CREATE TYPE task_type AS ENUM ('med_mgmt', 'dr_appt', 'financial', 'other');

CREATE TABLE IF NOT EXISTS medication (
    medication_id integer NOT NULL UNIQUE,
    medication_name varchar NOT NULL,
    PRIMARY KEY (medication_id)
);


CREATE TABLE IF NOT EXISTS care_group (
    group_id serial NOT NULL UNIQUE,
    group_name varchar NOT NULL,
    date_created timestamp NOT NULL, --do we default current time?
    PRIMARY KEY (group_id)
);

CREATE TABLE IF NOT EXISTS users (
    user_id varchar NOT NULL UNIQUE,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    email varchar NOT NULL,
    phone varchar, --potentially make phone/address required (NOT NULL)
    address varchar,
    pfp_s3_url varchar, --for profile picture if we implement that
    device_id varchar, --expoPushToken for push notifications
    push_notification_enabled BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS group_roles (
    group_id integer NOT NULL,
    user_id varchar NOT NULL,
    role role NOT NULL,
    PRIMARY KEY (group_id, user_id),
    FOREIGN KEY (group_id) REFERENCES care_group (group_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS task (
    task_id serial NOT NULL,
    group_id integer NOT NULL,
    created_by varchar NOT NULL,
    created_date timestamp NOT NULL, -- add default val with current timestamp?
    start_date timestamp,
    end_date timestamp,
    notes varchar,
    repeating BOOLEAN,
    repeating_interval varchar,
    repeating_end_date timestamp,
    task_status task_status NOT NULL,
    task_type task_type NOT NULL, -- (eg. medication management, dr appointment, etc.)
    task_info json,
    PRIMARY KEY (task_id),
    FOREIGN KEY (group_id) REFERENCES care_group (group_id),
    FOREIGN KEY (created_by) REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS task_assignees (
    task_id integer NOT NULL,
    user_id varchar NOT NULL,
    assignment_status task_assignment_status NOT NULL,
    assigned_by varchar NOT NULL,
    assigned_date timestamp NOT NULL, -- add default val with current timestamp?
    last_notified timestamp,
    PRIMARY KEY (task_id, user_id),
    FOREIGN KEY (task_id) REFERENCES task (task_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (assigned_by) REFERENCES users (user_id)
);

  CREATE TABLE If NOT EXISTS label (
    group_id integer NOT NULL,
    label_name varchar NOT NULL,
    label_color varchar NOT NULL, -- TODO:figure out what form color should be ("rgba(12,2,1,0)", "#21292F", "red" etc.) or just
    PRIMARY KEY (group_id, label_name),
    FOREIGN KEY (group_id) REFERENCES care_group (group_id)
);

  CREATE TABLE If NOT EXISTS task_labels (
    task_id integer NOT NULL,
    group_id integer NOT NULL,
    label_name varchar NOT NULL,
    PRIMARY KEY (task_id, label_name),
    FOREIGN KEY (task_id) REFERENCES task (task_id),
    FOREIGN KEY (group_id, label_name) REFERENCES label (group_id, label_name) -- NOTE: unsure about label/task_labels table constraints, uncommenting this line is err
);

CREATE TABLE IF NOT EXISTS files (
    file_id serial NOT NULL UNIQUE,
    file_name varchar NOT NULL,
    group_id integer NOT NULL,
    upload_by varchar NOT NULL,
    upload_date timestamp,
    file_size integer NOT NULL,
    task_id integer,
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
  (5, 'Medication E');

-- Insert sample data into "users" table
INSERT INTO users (user_id, first_name, last_name, email, phone, address, pfp_s3_url, device_id, push_notification_enabled) VALUES
('user123', 'John', 'Doe', 'john.doe@example.com', '123-456-7890', '123 Main St, Anytown, USA', 'https://example.com/pfp/user123.jpg', 'device123', TRUE),
('user456', 'Jane', 'Smith', 'jane.smith@example.com', '987-654-3210', '456 Elm St, Anytown, USA', 'https://example.com/pfp/user456.jpg', 'device456', TRUE);

-- Insert sample data into "care_group" table
INSERT INTO care_group (group_name, date_created)
VALUES ('Sample Care Group', CURRENT_TIMESTAMP);

-- Insert sample data into "group_roles" table
INSERT INTO group_roles (group_id, user_id, role) VALUES
(1, 'user123', 'PATIENT'),
(1, 'user456', 'PRIMARY');
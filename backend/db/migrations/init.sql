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
    repeating BOOLEAN DEFAULT FALSE,
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

----------------- SAMPLE DATA :) -----------------------

-- Insert sample data into "medication" table
INSERT INTO medication (medication_id, medication_name)
VALUES
  (1, 'Medication A'),
  (2, 'Medication B'),
  (3, 'Medication C'),
  (4, 'Medication D'),
  (5, 'Medication E')
;

INSERT INTO care_group (group_name, date_created)
VALUES
  ('Smith Family', NOW()),
  ('Johnson Support Network', NOW()),
  ('Williams Care Team', NOW()),
  ('Brown Medical Group', NOW())
;

INSERT INTO users (user_id, first_name, last_name, email, phone, address)
VALUES
  ('user1', 'John', 'Smith', 'john.smith@example.com', '123-456-7890', '123 Main St'),
  ('user2', 'Jane', 'Doe', 'jane.doe@example.com', '987-654-3210', '456 Elm St'),
  ('user3', 'Bob', 'Johnson', 'bob.johnson@example.com', NULL, NULL),
  ('user4', 'Emily', 'Garcia', 'emily.garcia@example.com', '555-1212', '789 Oak Ave')
;

INSERT INTO group_roles (group_id, user_id, role)
VALUES
  (1, 'user1', 'PATIENT'),
  (1, 'user2', 'PRIMARY'),
  (2, 'user3', 'PRIMARY'),
  (2, 'user4', 'SECONDARY'),
  (3, 'user4', 'PATIENT'),
  (4, 'user1', 'SECONDARY'),
  (4, 'user3', 'SECONDARY')
;

INSERT INTO task (group_id, created_by, created_date, start_date, end_date, notes, task_status, task_type)
VALUES
  (1, 'user2', '2024-02-03 10:45:00', '2024-02-05 10:00:00', '2024-02-05 11:00:00', 'Pick up medication from pharmacy', 'INCOMPLETE', 'med_mgmt'),
  (2, 'user3', '2024-02-20 23:59:59', '2024-02-10 14:30:00', NULL, 'Schedule doctor appointment', 'INCOMPLETE', 'other'),
  (3, 'user4', '2020-02-05 11:00:00', NULL, '2024-02-20 23:59:59', 'Submit insurance claim', 'PARTIAL', 'financial'),
  (4, 'user1', '2006-01-02 15:04:05', NULL, NULL, 'Refill water pitcher', 'COMPLETE', 'other')
;

INSERT INTO task_assignees (task_id, user_id, assignment_status, assigned_by, assigned_date)
VALUES
  (1, 'user1', 'ACCEPTED', 'user2', NOW()),
  (2, 'user3', 'NOTIFIED', 'user3', NOW()),
  (3, 'user4', 'DECLINED', 'user4', NOW()),
  (4, 'user2', 'DECLINED', 'user1', NOW())
;

INSERT INTO label (group_id, label_name, label_color)
VALUES
  (1, 'Medication', 'blue'),
  (2, 'Appointments', 'green'),
  (3, 'Financial', 'orange'),
  (4, 'Household', 'purple')
;

INSERT INTO task_labels (task_id, group_id, label_name)
VALUES
  (1, 1, 'Medication'),
  (2, 2, 'Appointments'),
  (3, 3, 'Financial'),
  (4, 4, 'Household')
;

INSERT INTO files (file_id, file_name, group_id, upload_by, upload_date, file_size, task_id)
VALUES
  (1, 'Medication list.pdf', 1, 'user2', NOW(), 123456, 1),
  (2, 'Insurance form.docx', 3, 'user4', NOW(), 456789, 3),
  (3, 'Water pitcher instructions.txt', 4, 'user1', NOW(), 1234, 4)
;

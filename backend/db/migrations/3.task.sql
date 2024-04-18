DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS task_assignees;
DROP TABLE IF EXISTS task_labels;

CREATE TYPE task_assignment_status AS ENUM ('ACCEPTED', 'DECLINED', 'NOTIFIED');
CREATE TYPE task_status AS ENUM ('INCOMPLETE', 'COMPLETE', 'INPROGRESS',
'OVERDUE', 'TODO');
CREATE TYPE task_type AS ENUM ('med_mgmt', 'dr_appt', 'diet', 'grmg', 'fml_convos', 'shpping', 'activities', 'hlth_ins', 'financial', 'other');

CREATE TABLE IF NOT EXISTS task (
    task_id serial NOT NULL,
    task_title varchar NOT NULL,
    group_id integer NOT NULL,
    created_by varchar NOT NULL,
    created_date timestamp NOT NULL, -- add default val with current timestamp?
    start_date timestamp NOT NULL,
    end_date timestamp NOT NULL,
    quick_task BOOLEAN DEFAULT FALSE,
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

INSERT INTO task (task_title, group_id, created_by, created_date, start_date, end_date, notes, task_status, task_type, quick_task)
VALUES
  ('task 1', 1, 'user2', '2024-02-03 10:45:00', '2024-02-05 10:00:00', '2024-02-05 11:00:00', 'Pick up medication from pharmacy', 'INCOMPLETE', 'med_mgmt', FALSE),
  ('task 2', 2, 'user3', '2024-02-20 23:59:59', '2024-02-10 14:30:00', '2024-02-10 14:30:00', 'Schedule doctor appointment', 'TODO', 'other', FALSE),
  ('task 3', 3, 'user4', '2020-02-05 11:00:00', '2024-02-10 14:30:00', '2024-02-20 23:59:59', 'Submit insurance claim', 'INPROGRESS', 'financial', FALSE),
  ('task 4', 4, 'user1', '2006-01-02 15:04:05', '2024-02-10 14:30:00', '2024-02-10 14:30:00', 'Refill water pitcher', 'COMPLETE', 'other', TRUE),
  ('task 1 - NO LABEL', 1, 'user2', '2024-02-03 10:45:00', '2024-02-05 10:00:00', '2024-02-05 11:00:00', 'Pick up medication from pharmacy', 'INCOMPLETE', 'med_mgmt', FALSE),
  ('task 5', 5, 'user1', '2024-03-19 11:00:00', '2024-03-19 15:00:00', '2024-03-19 19:00:00', 'Get medications', 'INCOMPLETE', 'dr_appt', TRUE),
  ('task 6', 5, 'user2', '2024-03-19 11:00:00', '2024-03-19 11:00:00', '2024-03-19 13:00:00', 'File Papers', 'INCOMPLETE', 'med_mgmt', TRUE),
  ('task 7', 5, 'user3', '2024-03-19 11:00:00', '2024-03-19 07:00:00', '2024-03-19 09:00:00', 'Send check to Drs', 'INCOMPLETE', 'financial', TRUE),
  ('task 8', 5, 'user1', '2024-03-19 11:00:00', '2024-03-19 15:00:00', '2024-03-19 19:00:00', 'Get medications', 'INCOMPLETE', 'dr_appt', FALSE),
  ('task 9', 5, 'user2', '2024-03-19 11:00:00', '2024-03-19 11:00:00', '2024-03-19 13:00:00', 'File Papers', 'INCOMPLETE', 'med_mgmt', FALSE),
  ('task 10', 5, 'user3', '2024-03-19 11:00:00', '2024-03-19 07:00:00', '2024-03-19 09:00:00', 'Send check to Drs', 'INCOMPLETE', 'financial', FALSE),
  ('test tile', 5, 'P03ggWcw63N0RSY7ltbkeBoR6bd2', '2020-02-05 11:00:00', '2024-02-20 23:59:59', '2024-02-20 23:59:59', 'Submit insurance claim', 'INPROGRESS', 'financial', FALSE),
  ('test tile', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2024-02-20 23:59:59', '2024-03-29 07:00:00', '2024-03-29 08:00:00', 'Schedule doctor appointment', 'TODO', 'med_mgmt', TRUE),
  ('test tile', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2024-02-20 23:59:59', '2024-03-29 08:00:00', '2024-03-29 09:00:00', 'Schedule doctor appointment', 'INPROGRESS', 'med_mgmt', TRUE),
  ('test tile', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2024-02-20 23:59:59', '2024-03-29 09:00:00', '2024-03-29 10:00:00', 'Schedule doctor appointment', 'TODO', 'med_mgmt', TRUE),
  ('test tile', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2024-02-20 23:59:59', '2024-03-29 10:00:00', '2024-03-29 11:00:00', 'Schedule doctor appointment', 'TODO', 'med_mgmt', TRUE),
  ('test tile', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2024-02-20 23:59:59', '2024-03-29 11:00:00', '2024-03-29 12:00:00', 'Schedule doctor appointment', 'INCOMPLETE', 'med_mgmt', TRUE),
  ('test tile', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2024-02-20 23:59:59', '2024-03-29 12:00:00', '2024-03-29 13:00:00', 'Schedule doctor appointment', 'COMPLETE', 'med_mgmt', TRUE),
  ('test tile', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2024-02-20 23:59:59', '2024-03-29 13:00:00', '2024-03-29 14:00:00', 'Schedule doctor appointment', 'INPROGRESS', 'med_mgmt', TRUE),
  ('test tile', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2024-02-20 23:59:59', '2024-03-29 11:00:00', '2024-03-29 12:00:00', 'Schedule doctor appointment', 'INCOMPLETE', 'med_mgmt', FALSE),
  ('test tile', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2024-02-20 23:59:59', '2024-03-29 12:00:00', '2024-03-29 13:00:00', 'Schedule doctor appointment', 'COMPLETE', 'med_mgmt', FALSE),
  ('test tile', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2024-02-20 23:59:59', '2024-03-29 13:00:00', '2024-03-29 14:00:00', 'Schedule doctor appointment', 'INPROGRESS', 'med_mgmt', FALSE),
  ('test tile', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2024-02-20 23:59:59', '2024-03-29 11:00:00', '2024-03-29 11:00:00', 'Schedule doctor appointment', 'TODO', 'med_mgmt', FALSE),
  ('test tile', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2024-02-20 23:59:59', '2024-03-29 12:00:00', '2024-03-29 13:00:00', 'Schedule doctor appointment', 'TODO', 'med_mgmt', FALSE),
  ('test tile', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2024-02-20 23:59:59', '2024-03-29 13:00:00', '2024-03-29 13:00:00', 'Schedule doctor appointment', 'INPROGRESS', 'med_mgmt', FALSE),
  ('test tile', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2024-02-20 23:59:59', '2024-03-29 19:00:00', '2024-04-29 23:00:00', 'Schedule doctor appointment', 'TODO', 'med_mgmt', TRUE),
  ('test tile', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2024-02-20 23:59:59', '2024-04-10 13:00:00', '2024-04-10 13:00:00', 'Schedule doctor appointment', 'INPROGRESS', 'med_mgmt', FALSE),
  ('test tile', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2024-02-20 23:59:59', '2024-04-10 19:00:00', '2024-04-10 23:00:00', 'Schedule doctor appointment', 'TODO', 'med_mgmt', TRUE)
;

INSERT INTO task_assignees (task_id, user_id, assignment_status, assigned_by, assigned_date)
VALUES
  (1, 'user1', 'ACCEPTED', 'user2', NOW()),
  (2, 'user3', 'NOTIFIED', 'user3', NOW()),
  (3, 'user4', 'DECLINED', 'user4', NOW()),
  (4, 'user2', 'DECLINED', 'user1', NOW()),
  (13, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'ACCEPTED', 'user2', NOW()),
  (14, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'NOTIFIED', 'user3', NOW()),
  (15, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'DECLINED', 'user4', NOW()),
  (16, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'ACCEPTED', 'user2', NOW()),
  (17, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'NOTIFIED', 'user3', NOW()),
  (18, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'DECLINED', 'user4', NOW()),
  (19, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'ACCEPTED', 'user2', NOW()),
  (20, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'NOTIFIED', 'user3', NOW()),
  (27, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'ACCEPTED', 'user2', NOW()),
  (28, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'NOTIFIED', 'user3', NOW())
;

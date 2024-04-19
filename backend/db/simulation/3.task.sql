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

-- Insert tasks for Matt McCoy
INSERT INTO task (task_title, group_id, created_by, created_date, start_date, end_date, notes, task_status, task_type, quick_task)
VALUES
  ('Take Care of Grandpa', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2020-02-05 11:00:00', '2024-04-19 23:00:00', '2024-04-19 24:00:00', 'Grandpa Needs His Medicine', 'INPROGRESS', 'financial', FALSE),
  ('Grocery Shopping', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2020-02-06 09:00:00', '2024-04-20 14:00:00', '2024-04-20 15:00:00', 'Buy groceries for the week', 'TODO', 'other', FALSE),
  ('Prepare Presentation', 5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', '2020-02-07 13:00:00', '2024-04-21 10:00:00', '2024-04-21 12:00:00', 'Prepare slides for the team meeting', 'TODO', 'med_mgmt', FALSE)
;

-- Insert tasks for Andy Cap
INSERT INTO task (task_title, group_id, created_by, created_date, start_date, end_date, notes, task_status, task_type, quick_task)
VALUES
  ('Call Client', 5, 'JamnX6TZf0dt6juozMRzNG5LMQd2', '2020-02-08 10:00:00', '2024-04-19 09:30:00', '2024-04-19 10:00:00', 'Discuss project updates with the client', 'INPROGRESS', 'med_mgmt', FALSE),
  ('Review Report', 5, 'JamnX6TZf0dt6juozMRzNG5LMQd2', '2020-02-09 14:00:00', '2024-04-20 09:00:00', '2024-04-20 11:00:00', 'Review quarterly financial report', 'TODO', 'financial', FALSE),
  ('Send Email', 5, 'JamnX6TZf0dt6juozMRzNG5LMQd2', '2020-02-10 16:00:00', '2024-04-19 12:00:00', '2024-04-19 13:00:00', 'Send follow-up email to the team', 'TODO', 'dr_appt', FALSE)
;

-- Insert tasks for Ansh Patel
INSERT INTO task (task_title, group_id, created_by, created_date, start_date, end_date, notes, task_status, task_type, quick_task)
VALUES
  ('Attend Meeting', 5, 'BLq3MXk4rVg4RKuYiMd7aEmMhsz1', '2020-02-11 09:00:00', '2024-04-19 09:30:00', '2024-04-19 10:30:00', 'Attend weekly team meeting', 'TODO', 'dr_appt', FALSE),
  ('Exercise', 5, 'BLq3MXk4rVg4RKuYiMd7aEmMhsz1', '2020-02-12 07:00:00', '2024-04-20 07:30:00', '2024-04-20 08:30:00', 'Morning jog', 'TODO', 'financial', FALSE),
  ('Submit Expense Report', 5, 'BLq3MXk4rVg4RKuYiMd7aEmMhsz1', '2020-02-13 15:00:00', '2024-04-21 13:00:00', '2024-04-21 14:00:00', 'Submit expenses for reimbursement', 'TODO', 'financial', FALSE)
;

-- Insert tasks for Olivia Sedarski
INSERT INTO task (task_title, group_id, created_by, created_date, start_date, end_date, notes, task_status, task_type, quick_task)
VALUES
  ('Read Book', 5, 'mPeo3d3MiXfnpPJADWgFD9ZcB2M2', '2020-02-14 10:00:00', '2024-04-20 12:00:00', '2024-04-20 12:00:00', 'Read new novel', 'TODO', 'med_mgmt', FALSE),
  ('Attend Webinar', 5, 'mPeo3d3MiXfnpPJADWgFD9ZcB2M2', '2020-02-15 13:00:00', '2024-04-19 15:30:00', '2024-04-19 17:00:00', 'Attend webinar on project management', 'TODO', 'other', FALSE),
  ('Call Family', 5, 'mPeo3d3MiXfnpPJADWgFD9ZcB2M2', '2020-02-16 18:00:00', '2024-04-20 18:30:00', '2024-04-20 19:00:00', 'Catch up with family', 'TODO', 'financial', FALSE)
;

-- Insert tasks for Danny Rollo
INSERT INTO task (task_title, group_id, created_by, created_date, start_date, end_date, notes, task_status, task_type, quick_task)
VALUES
  ('Workout', 5, 'pTBhZsE9BaOxltkGUfoBAUDote43', '2020-02-17 08:00:00', '2024-04-19 08:30:00', '2024-04-19 09:30:00', 'Gym session', 'TODO', 'financial', FALSE),
  ('Update Resume', 5, 'pTBhZsE9BaOxltkGUfoBAUDote43', '2020-02-18 11:00:00', '2024-04-20 08:30:00', '2024-04-20 09:30:00', 'Add recent achievements', 'TODO', 'other', TRUE),
  ('Grocery Shopping', 5, 'pTBhZsE9BaOxltkGUfoBAUDote43', '2020-02-19 14:00:00', '2024-04-19 14:30:00', '2024-04-19 15:30:00', 'Buy groceries for the week', 'TODO', 'other', FALSE)
;

-- Insert tasks for Narayan Sharma
INSERT INTO task (task_title, group_id, created_by, created_date, start_date, end_date, notes, task_status, task_type, quick_task)
VALUES
  ('Sit with Grandpa', 5, '8Sy7xBkGiGQv4ZKphcQfY8PxAqw1', '2020-02-17 08:00:00', '2024-04-19 22:30:00', '2024-04-19 23:30:00', 'Gym session', 'TODO', 'financial', FALSE),
  ('Grandpas Sheets', 5, '8Sy7xBkGiGQv4ZKphcQfY8PxAqw1', '2020-02-18 11:00:00', '2024-04-20 10:00:00', '2024-04-20 12:00:00', 'Add recent achievements', 'TODO', 'med_mgmt', TRUE),
  ('Grandpa Laundry', 5, '8Sy7xBkGiGQv4ZKphcQfY8PxAqw1', '2020-02-19 14:00:00', '2024-04-20 14:30:00', '2024-04-20 15:30:00', 'Buy groceries for the week', 'TODO', 'other', FALSE)
;

-- Insert tasks for Caitlin Flynn
INSERT INTO task (task_title, group_id, created_by, created_date, start_date, end_date, notes, task_status, task_type, quick_task)
VALUES
  ('Eat with Grandpa', 5, 'iL7PnjS4axQffmlPceobjUUZ9DF2', '2020-02-17 08:00:00', '2024-04-19 10:30:00', '2024-04-19 11:30:00', 'Gym session', 'TODO', 'financial', FALSE),
  ('Take a walk with grandpa', 5, 'iL7PnjS4axQffmlPceobjUUZ9DF2', '2020-02-18 11:00:00', '2024-04-20 10:00:00', '2024-04-20 12:00:00', 'Add recent achievements', 'TODO', 'med_mgmt', FALSE),
  ('Grocery Shopping', 5, 'iL7PnjS4axQffmlPceobjUUZ9DF2', '2020-02-19 14:00:00', '2024-04-19 14:30:00', '2024-04-19 15:30:00', 'Buy groceries for the week', 'TODO', 'other', FALSE)
;

-- Insert tasks for Chris Wyatt
INSERT INTO task (task_title, group_id, created_by, created_date, start_date, end_date, notes, task_status, task_type, quick_task)
VALUES
  ('Take a walk', 5, 'P03ggWcw63N0RSY7ltbkeBoR6bd2', '2020-02-17 08:00:00', '2024-04-19 20:30:00', '2024-04-19 21:30:00', 'Gym session', 'TODO', 'financial', FALSE),
  ('Get medicine', 5, 'P03ggWcw63N0RSY7ltbkeBoR6bd2', '2020-02-18 11:00:00', '2024-04-19 10:00:00', '2024-04-19 12:00:00', 'Add recent achievements', 'TODO', 'med_mgmt', FALSE),
  ('Grocery Shopping', 5, 'P03ggWcw63N0RSY7ltbkeBoR6bd2', '2020-02-19 14:00:00', '2024-04-19 14:30:00', '2024-04-18 15:30:00', 'Buy groceries for the week', 'TODO', 'other', FALSE)
;

-- Insert tasks for Hayley Martin
INSERT INTO task (task_title, group_id, created_by, created_date, start_date, end_date, notes, task_status, task_type, quick_task)
VALUES
  ('Get a snack', 5, '9rIMSUo6qNf8ToTABkCfNqnByRv1', '2020-02-17 08:00:00', '2024-04-19 08:30:00', '2024-04-19 09:30:00', 'Gym session', 'TODO', 'financial', FALSE),
  ('listen to music with grandpa', 5, '9rIMSUo6qNf8ToTABkCfNqnByRv1', '2020-02-18 11:00:00', '2024-04-22 10:00:00', '2024-04-22 12:00:00', 'Add recent achievements', 'TODO', 'med_mgmt', FALSE),
  ('Grocery Shopping', 5, '9rIMSUo6qNf8ToTABkCfNqnByRv1', '2020-02-19 14:00:00', '2024-04-22 14:30:00', '2024-04-22 15:30:00', 'Buy groceries for the week', 'TODO', 'other', FALSE)
;


INSERT INTO task_assignees (task_id, user_id, assignment_status, assigned_by, assigned_date)
VALUES
  (1, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'ACCEPTED', 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', NOW()),
  (2, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'ACCEPTED', 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', NOW()),
  (3, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'ACCEPTED', 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', NOW()),

  (4, 'JamnX6TZf0dt6juozMRzNG5LMQd2', 'ACCEPTED', 'JamnX6TZf0dt6juozMRzNG5LMQd2', NOW()),
  (5, 'JamnX6TZf0dt6juozMRzNG5LMQd2', 'ACCEPTED', 'JamnX6TZf0dt6juozMRzNG5LMQd2', NOW()),
  (6, 'JamnX6TZf0dt6juozMRzNG5LMQd2', 'ACCEPTED', 'JamnX6TZf0dt6juozMRzNG5LMQd2', NOW()),

  (7, 'BLq3MXk4rVg4RKuYiMd7aEmMhsz1', 'ACCEPTED', 'BLq3MXk4rVg4RKuYiMd7aEmMhsz1', NOW()),
  (8, 'BLq3MXk4rVg4RKuYiMd7aEmMhsz1', 'ACCEPTED', 'BLq3MXk4rVg4RKuYiMd7aEmMhsz1', NOW()),
  (9, 'BLq3MXk4rVg4RKuYiMd7aEmMhsz1', 'ACCEPTED', 'BLq3MXk4rVg4RKuYiMd7aEmMhsz1', NOW()),

  (10, 'mPeo3d3MiXfnpPJADWgFD9ZcB2M2', 'ACCEPTED', 'mPeo3d3MiXfnpPJADWgFD9ZcB2M2', NOW()),
  (11, 'mPeo3d3MiXfnpPJADWgFD9ZcB2M2', 'ACCEPTED', 'mPeo3d3MiXfnpPJADWgFD9ZcB2M2', NOW()),
  (12, 'mPeo3d3MiXfnpPJADWgFD9ZcB2M2', 'ACCEPTED', 'mPeo3d3MiXfnpPJADWgFD9ZcB2M2', NOW()),

  (13, 'pTBhZsE9BaOxltkGUfoBAUDote43', 'ACCEPTED', 'pTBhZsE9BaOxltkGUfoBAUDote43', NOW()),
  (14, 'pTBhZsE9BaOxltkGUfoBAUDote43', 'ACCEPTED', 'pTBhZsE9BaOxltkGUfoBAUDote43', NOW()),
  (15, 'pTBhZsE9BaOxltkGUfoBAUDote43', 'ACCEPTED', 'pTBhZsE9BaOxltkGUfoBAUDote43', NOW()),

  (16, '8Sy7xBkGiGQv4ZKphcQfY8PxAqw1', 'ACCEPTED', '8Sy7xBkGiGQv4ZKphcQfY8PxAqw1', NOW()),
  (17, '8Sy7xBkGiGQv4ZKphcQfY8PxAqw1', 'ACCEPTED', '8Sy7xBkGiGQv4ZKphcQfY8PxAqw1', NOW()),
  (18, '8Sy7xBkGiGQv4ZKphcQfY8PxAqw1', 'ACCEPTED', '8Sy7xBkGiGQv4ZKphcQfY8PxAqw1', NOW()),

  (19, 'iL7PnjS4axQffmlPceobjUUZ9DF2', 'ACCEPTED', 'iL7PnjS4axQffmlPceobjUUZ9DF2', NOW()),
  (20, 'iL7PnjS4axQffmlPceobjUUZ9DF2', 'ACCEPTED', 'iL7PnjS4axQffmlPceobjUUZ9DF2', NOW()),
  (21, 'iL7PnjS4axQffmlPceobjUUZ9DF2', 'ACCEPTED', 'iL7PnjS4axQffmlPceobjUUZ9DF2', NOW()),

  (22, 'P03ggWcw63N0RSY7ltbkeBoR6bd2', 'ACCEPTED', 'P03ggWcw63N0RSY7ltbkeBoR6bd2', NOW()),
  (23, 'P03ggWcw63N0RSY7ltbkeBoR6bd2', 'ACCEPTED', 'P03ggWcw63N0RSY7ltbkeBoR6bd2', NOW()),
  (24, 'P03ggWcw63N0RSY7ltbkeBoR6bd2', 'ACCEPTED', 'P03ggWcw63N0RSY7ltbkeBoR6bd2', NOW()),

  (22, '9rIMSUo6qNf8ToTABkCfNqnByRv1', 'ACCEPTED', '9rIMSUo6qNf8ToTABkCfNqnByRv1', NOW()),
  (23, '9rIMSUo6qNf8ToTABkCfNqnByRv1', 'ACCEPTED', '9rIMSUo6qNf8ToTABkCfNqnByRv1', NOW()),
  (24, '9rIMSUo6qNf8ToTABkCfNqnByRv1', 'ACCEPTED', '9rIMSUo6qNf8ToTABkCfNqnByRv1', NOW())
;

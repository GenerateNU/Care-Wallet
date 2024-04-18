  DROP TABLE IF EXISTS label;

  CREATE TABLE If NOT EXISTS label (
    group_id integer NOT NULL,
    label_name varchar NOT NULL,
    label_color varchar NOT NULL,
    PRIMARY KEY (group_id, label_name),
    FOREIGN KEY (group_id) REFERENCES care_group (group_id)
);

  CREATE TABLE If NOT EXISTS task_labels (
    task_id integer NOT NULL,
    group_id integer NOT NULL,
    label_name varchar NOT NULL,
    PRIMARY KEY (task_id, label_name),
    FOREIGN KEY (task_id) REFERENCES task (task_id) ON UPDATE CASCADE,
    FOREIGN KEY (group_id, label_name) REFERENCES label (group_id, label_name) ON UPDATE CASCADE
);

INSERT INTO label (group_id, label_name, label_color)
VALUES
  (1, 'Medication', 'blue'),
  (2, 'Appointments', 'green'),
  (3, 'Financial', 'orange'),
  (4, 'Household', 'purple'),
  (1, 'Household', 'purple'),
  (5, 'Financial', 'orange'),
  (5, 'Appointments', 'green'),
  (5, 'Medication', 'red')
;

INSERT INTO task_labels (task_id, group_id, label_name)
VALUES
  (1, 1, 'Medication'),
  (2, 2, 'Appointments'),
  (3, 3, 'Financial'),
  (4, 4, 'Household'),
  (6, 5, 'Financial'),
  (7, 5, 'Appointments'),
  (8, 1, 'Medication'),
  (9, 2, 'Appointments'),
  (10, 3, 'Financial'),
  (11, 4, 'Household'),
  (12, 5, 'Financial'),
  (13, 5, 'Appointments'),
  (14, 1, 'Medication'),
  (15, 2, 'Appointments'),
  (16, 3, 'Financial'),
  (17, 4, 'Household'),
  (18, 5, 'Financial'),
  (19, 5, 'Appointments'),
  (20, 3, 'Financial'),
  (21, 4, 'Household'),
  (22, 5, 'Financial'),
  (23, 5, 'Appointments'),
  (24, 5, 'Financial')
;

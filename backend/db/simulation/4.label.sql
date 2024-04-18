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
  (5, 'Financial', 'orange'),
  (5, 'Appointments', 'green'),
  (5, 'Medication', 'red'),
  (5, 'Household', 'purple')
;

INSERT INTO task_labels (task_id, group_id, label_name)
VALUES
  (1, 5, 'Financial'),
  (2, 5, 'Appointments'),
  (3, 5, 'Medication'),
  (4, 5, 'Financial'),
  (5, 5, 'Appointments'),
  (6, 5, 'Financial'),
  (7, 5, 'Appointments'),
  (8, 5, 'Medication'),
  (9, 5, 'Appointments'),
  (10, 5, 'Financial'),
  (11, 5, 'Household'),
  (12, 5, 'Financial'),
  (13, 5, 'Appointments'),
  (14, 5, 'Medication'),
  (15, 5, 'Appointments'),
  (16, 5, 'Financial'),
  (17, 5, 'Household'),
  (18, 5, 'Financial'),
  (19, 5, 'Appointments'),
  (20, 5, 'Financial'),
  (21, 5, 'Household'),
  (22, 5, 'Financial'),
  (23, 5, 'Appointments'),
  (24, 5, 'Financial')
;

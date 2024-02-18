DROP TABLE IF EXISTS label;
DROP TABLE IF EXISTS task_labels;

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


INSERT INTO label (group_id, label_name, label_color)
VALUES
  (1, 'Medication', 'blue'),
  (2, 'Appointments', 'green'),
  (3, 'Financial', 'orange'),
  (4, 'Household', 'purple'),
  (1, 'Household', 'purple')
;

INSERT INTO task_labels (task_id, group_id, label_name)
VALUES
  (1, 1, 'Medication'),
  (2, 2, 'Appointments'),
  (3, 3, 'Financial'),
  (4, 4, 'Household')
;

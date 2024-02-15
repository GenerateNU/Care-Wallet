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

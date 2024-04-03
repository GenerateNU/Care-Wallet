DROP TABLE IF EXISTS files;

CREATE TABLE IF NOT EXISTS files (
    file_id serial NOT NULL UNIQUE,
    file_name varchar NOT NULL,
    group_id integer NOT NULL,
    upload_by varchar NOT NULL,
    upload_date timestamp,
    file_size integer NOT NULL,
    task_id integer,
    notes varchar,
    label_name varchar,
    PRIMARY KEY (file_id),
    FOREIGN KEY (group_id) REFERENCES care_group (group_id),
    FOREIGN KEY (upload_by) REFERENCES users (user_id),
    FOREIGN KEY (task_id) REFERENCES task (task_id)
);

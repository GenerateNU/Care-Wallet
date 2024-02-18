DROP TABLE IF EXISTS files;

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

INSERT INTO files (file_id, file_name, group_id, upload_by, upload_date, file_size, task_id)
VALUES
  (1, 'Medication list.pdf', 1, 'user2', NOW(), 123456, 1),
  (2, 'Insurance form.docx', 3, 'user4', NOW(), 456789, 3),
  (3, 'Water pitcher instructions.txt', 4, 'user1', NOW(), 1234, 4)
;

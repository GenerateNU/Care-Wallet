DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS task_assignees;

CREATE TYPE task_assignment_status AS ENUM ('ACCEPTED', 'DECLINED', 'NOTIFIED');
CREATE TYPE task_status AS ENUM ('INCOMPLETE', 'COMPLETE', 'PARTIAL');
CREATE TYPE task_type AS ENUM ('med_mgmt', 'dr_appt', 'financial', 'other');

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

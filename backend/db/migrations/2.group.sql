DROP TABLE IF EXISTS care_group;
DROP TABLE IF EXISTS group_roles;

CREATE TYPE role AS ENUM ('PATIENT', 'PRIMARY', 'SECONDARY');

CREATE TABLE IF NOT EXISTS care_group (
    group_id serial NOT NULL UNIQUE,
    group_name varchar NOT NULL,
    date_created timestamp NOT NULL, --do we default current time?
    PRIMARY KEY (group_id)
);

CREATE TABLE IF NOT EXISTS group_roles (
    group_id integer NOT NULL,
    user_id varchar NOT NULL,
    role role NOT NULL,
    PRIMARY KEY (group_id, user_id),
    FOREIGN KEY (group_id) REFERENCES care_group (group_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id)
);

INSERT INTO
    care_group (group_id, group_name, date_created)
VALUES
    (999, 'WE <3 OLD PEOPLE', NOW())
;

INSERT INTO
    group_roles (group_id, user_id, role)
VALUES
    (999, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'PRIMARY'),
    (999, 'BLq3MXk4rVg4RKuYiMd7aEmMhsz1', 'SECONDARY'),
    (999, 'mPeo3d3MiXfnpPJADWgFD9ZcB2M2', 'SECONDARY'),
    (999, 'onrQs8HVGBVMPNz4Fk1uE94bSxg1', 'SECONDARY')
;

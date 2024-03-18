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

INSERT INTO care_group (group_name, date_created)
VALUES
  ('Smith Family', NOW()),
  ('Johnson Support Network', NOW()),
  ('Williams Care Team', NOW()),
  ('Brown Medical Group', NOW()),

  -- Care-Wallet Team
  ('We <3 Old People', NOW())
  -- End Care-Wallet Team
;

INSERT INTO group_roles (group_id, user_id, role)
VALUES
  (1, 'user1', 'PATIENT'),
  (1, 'user2', 'PRIMARY'),
  (2, 'user3', 'PRIMARY'),
  (2, 'user4', 'SECONDARY'),
  (3, 'user4', 'PATIENT'),
  (4, 'user1', 'SECONDARY'),
  (4, 'user3', 'SECONDARY'),

  -- Care-Wallet Team
  (5, 'fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'PRIMARY'),
  (5, 'JamnX6TZf0dt6juozMRzNG5LMQd2', 'PRIMARY'),
  (5, '5JgN2PQxCRM9VoCiiFPlQPNqkL32', 'PATIENT'),
  (5, 'BLq3MXk4rVg4RKuYiMd7aEmMhsz1', 'SECONDARY'),
  (5, 'mPeo3d3MiXfnpPJADWgFD9ZcB2M2', 'SECONDARY'),
  (5, 'onrQs8HVGBVMPNz4Fk1uE94bSxg1', 'SECONDARY'),
  (5, '8Sy7xBkGiGQv4ZKphcQfY8PxAqw1', 'SECONDARY'),
  (5, 'iL7PnjS4axQffmlPceobjUUZ9DF2', 'SECONDARY')
  (5, '9rIMSUo6qNf8ToTABkCfNqnByRv1', 'SECONDARY')

  -- End Care-Wallet Team
;

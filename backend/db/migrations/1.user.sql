DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    user_id varchar NOT NULL UNIQUE,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    email varchar NOT NULL,
    phone varchar, --potentially make phone/address required (NOT NULL)
    address varchar,
    profile_picture varchar,
    device_id varchar, --expoPushToken for push notifications
    push_notification_enabled BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

INSERT INTO users (user_id, first_name, last_name, email, phone, address, profile_picture)
VALUES
  ('user1', 'John', 'Smith', 'john.smith@example.com', '123-456-7890', '123 Main St', NULL),
  ('user2', 'Jane', 'Doe', 'jane.doe@example.com', '987-654-3210', '456 Elm St', NULL),
  ('user3', 'Bob', 'Johnson', 'bob.johnson@example.com', NULL, NULL, NULL),
  ('user4', 'Emily', 'Garcia', 'emily.garcia@example.com', '555-1212', '789 Oak Ave', NULL),
  -- Care-Wallet Team
  ('fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'Matt', 'McCoy', 'mattcmccoy01@gmail.com', '', '', 'fIoFY26mJnYWH8sNdfuVoxpnVnr1-IMG_1384.jpeg'),
  ('JamnX6TZf0dt6juozMRzNG5LMQd2', 'Andy', 'Cap', 'caplan.and@northeastern.edu', '', '', 'JamnX6TZf0dt6juozMRzNG5LMQd2-IMG_0916.HEIC'),
  ('BLq3MXk4rVg4RKuYiMd7aEmMhsz1', 'Ansh', 'Patel', 'anshrpatel22@gmail.com', '', '', 'BLq3MXk4rVg4RKuYiMd7aEmMhsz1-IMG_0585.jpg'),
  ('mPeo3d3MiXfnpPJADWgFD9ZcB2M2', 'Olivia', 'Sedarski', 'olivia@gmail.com', '', '', 'mPeo3d3MiXfnpPJADWgFD9ZcB2M2-IMG_5068.jpeg'),
  ('onrQs8HVGBVMPNz4Fk1uE94bSxg1', 'Danny', 'Rollo', 'dannyrollo4@gmail.com', '', '', 'onrQs8HVGBVMPNz4Fk1uE94bSxg1-IMG_3341.jpg'),
  ('8Sy7xBkGiGQv4ZKphcQfY8PxAqw1', 'Narayan', 'Sharma', 'sharma.na@northeastern.edu', '', '', '8Sy7xBkGiGQv4ZKphcQfY8PxAqw1-IMG_1777.JPG'),
  ('iL7PnjS4axQffmlPceobjUUZ9DF2', 'Caitlin', 'Flynn', 'flynn.ca@northeastern.edu', '', '', NULL),
  ('5JgN2PQxCRM9VoCiiFPlQPNqkL32', 'Linwood', 'Blaisdell', 'blaisdell.l@northeastern.edu', '', '', '5JgN2PQxCRM9VoCiiFPlQPNqkL32-IMG_6884.jpg'),
  ('P03ggWcw63N0RSY7ltbkeBoR6bd2', 'Chris', 'Wyatt', 'wyatt.c@northeastern.edu', '', '', 'P03ggWcw63N0RSY7ltbkeBoR6bd2-IMG_1597.jpeg'),
  ('9rIMSUo6qNf8ToTABkCfNqnByRv1', 'Haley', 'Martin', 'martin.hal@northeastern.edu', '', '', NULL)
  -- End Care-Wallet Team
;

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    user_id varchar NOT NULL UNIQUE,
    first_name varchar NOT NULL,
    last_name varchar NOT NULL,
    email varchar NOT NULL,
    phone varchar, --potentially make phone/address required (NOT NULL)
    address varchar,
    pfp_s3_url varchar, --for profile picture if we implement that
    device_id varchar, --expoPushToken for push notifications
    push_notification_enabled BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id)
);

INSERT INTO
    users (user_id, first_name, last_name, email,phone, address, pfp_s3_url, device_id, push_notification_enabled)
VALUES
    ('user1', 'John', 'Smith', 'john.smith@example.com', '123-456-7890', '123 Main St'),
    ('user2', 'Jane', 'Doe', 'jane.doe@example.com', '987-654-3210', '456 Elm St'),
    ('user3', 'Bob', 'Johnson', 'bob.johnson@example.com', NULL, NULL),
    ('user4', 'Emily', 'Garcia', 'emily.garcia@example.com', '555-1212', '789 Oak Ave'),
    ('fIoFY26mJnYWH8sNdfuVoxpnVnr1', 'Matt', 'McCoy', 'mattcmccoy01@gmail.com', '', '', '', '', FALSE),
    ('BLq3MXk4rVg4RKuYiMd7aEmMhsz1', 'Ansh', 'Patel', 'anshrpatel22@gmail.com', '', '', '', '', FALSE),
    ('mPeo3d3MiXfnpPJADWgFD9ZcB2M2', 'Olivia', 'Sedarski', 'olivia@gmail.com', '', '', '', '', FALSE),
    ('onrQs8HVGBVMPNz4Fk1uE94bSxg1', 'Danny', 'Rollo', 'dannyrollo4@gmail.com', '', '', '', '', FALSE)
;

create table users (
	user_id serial primary key,
	username varchar unique,
	password varchar ,
    email varchar unique,
	created timestamptz default current_timestamp
);

create table pdf_lists (
	pdf_id serial primary key,
	user_id int references users(user_id) ON DELETE cascade,
	pdf_name text,
	pdf_file bytea,
	upload_time timestamptz default current_timestamp,
	summary text
);

INSERT INTO users (user_id, username, password, email, created) 
VALUES (0, 'admin', 'admin', 'admin@admin.com', '2021-01-01 00:00:00');

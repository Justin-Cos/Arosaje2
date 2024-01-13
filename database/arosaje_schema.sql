CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE IF NOT EXISTS "plants_type" (
	"plant_type_id"	INTEGER,
	"name"	INTEGER NOT NULL,
	PRIMARY KEY("plant_type_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "addresses" (
	"adress_id"	INTEGER,
	"owner"	INTEGER NOT NULL,
	"longitude"	NUMERIC NOT NULL,
	"latitude"	NUMERIC NOT NULL,
	"country"	TEXT NOT NULL,
	"city"	TEXT NOT NULL,
	"address"	TEXT NOT NULL,
	"zip_code"	INTEGER NOT NULL,
	FOREIGN KEY("owner") REFERENCES "users"("user_id"),
	PRIMARY KEY("adress_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "plants" (
	"plant_id"	INTEGER,
	"plant_type"	INTEGER NOT NULL,
	"owner"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"image"	TEXT,
	PRIMARY KEY("plant_id" AUTOINCREMENT),
	FOREIGN KEY("owner") REFERENCES "users"("user_id"),
	FOREIGN KEY("plant_type") REFERENCES "plants_type"("plant_type_id")
);
CREATE TABLE IF NOT EXISTS "careSessions" (
	"session_id"	INTEGER,
	"plant"	INTEGER NOT NULL,
	"caretaker"	INTEGER NOT NULL,
	"location"	INTEGER NOT NULL,
	"date_start"	INTEGER NOT NULL,
	"date_end"	INTEGER NOT NULL,
	FOREIGN KEY("caretaker") REFERENCES "users"("user_id"),
	FOREIGN KEY("plant") REFERENCES "plants"("plant_id"),
	FOREIGN KEY("location") REFERENCES "addresses"("adress_id"),
	PRIMARY KEY("session_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "users" (
	"user_id"	INTEGER,
	"username"	TEXT NOT NULL UNIQUE,
	"email"	TEXT NOT NULL UNIQUE,
	"password"	TEXT NOT NULL,
	"role"	TEXT NOT NULL,
	PRIMARY KEY("user_id" AUTOINCREMENT)
);
CREATE TABLE IF NOT EXISTS "comments" (
	"id_comment"	INTEGER,
	"author"	INTEGER,
	"author_role"	TEXT NOT NULL,
	"date"	INTEGER NOT NULL,
	"content"	TEXT,
	"image"	TEXT,
	FOREIGN KEY("author") REFERENCES "users"("user_id"),
	PRIMARY KEY("id_comment" AUTOINCREMENT)
);

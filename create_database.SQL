-- create_database.sql

BEGIN TRANSACTION;


CREATE TABLE IF NOT EXISTS "CareSessions" (
    "sessionID"   INTEGER,
    "plantID"     INTEGER,
    "caretakerID" INTEGER,
    "date"        DATETIME,
    "photoPath"   VARCHAR(255),
    "comments"    TEXT,
    "createdAt"   DATETIME NOT NULL,
    "updatedAt"   DATETIME NOT NULL,
    PRIMARY KEY("sessionID" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "BotanistTips" (
    "tipID"     INTEGER,
    "plantID"   INTEGER,
    "botanistID" INTEGER,
    "tip"       TEXT,
    "createdAt" DATETIME CURRENT_TIMESTAMP,
    "updatedAt" DATETIME CURRENT_TIMESTAMP,
    PRIMARY KEY("tipID" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "users" (
    "userID"    INTEGER,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName"  VARCHAR(255) NOT NULL,
    "createdAt" DATETIME CURRENT_TIMESTAMP,
    "updatedAt" DATETIME CURRENT_TIMESTAMP,
    PRIMARY KEY("userID" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "Plants" (
    "plantID"    INTEGER,
    "ownerID"    INTEGER,
    "plantName"  VARCHAR(255) NOT NULL,
    "location"   VARCHAR(255),
    "createdAt"  DATETIME CURRENT_TIMESTAMP,
    "updatedAt"  DATETIME CURRENT_TIMESTAMP,
    PRIMARY KEY("plantID" AUTOINCREMENT)
);

CREATE TABLE IF NOT EXISTS "Livres" (
    "Livre_ID"    INTEGER,
    "Titre"       VARCHAR(100) NOT NULL,
    "Auteur"      VARCHAR(100) NOT NULL,
    "Commentaires" TEXT,
    PRIMARY KEY("Livre_ID" AUTOINCREMENT)
);

INSERT INTO "Plants" VALUES (1, 1, 'Rose', 'Chambre', '', '');
INSERT INTO "Plants" VALUES (2, NULL, 'cactus', 'bureau', '', '');

INSERT INTO "CareSessions" VALUES (1, 1, 1, NULL, NULL, 'top', '', '');
INSERT INTO "CareSessions" VALUES (2, 2, 1, NULL, NULL, 'pas ouf', '', '');

INSERT INTO "BotanistTips" VALUES (1, 1, 1, 'c''est top comme plante', '', '');

INSERT INTO "users" VALUES (1, 'paul', 'test', '', '');
INSERT INTO "users" VALUES (2, 'Marc', 'de la test', '', '');
INSERT INTO "users" VALUES (3, 'fred', 'okay', '', '');
INSERT INTO "users" VALUES (4, 'Pierre', 'cailloux', '', '');

INSERT INTO "Livres" VALUES (1, 'Mrs. Bridge', 'Evan S. Connell', 'Premier de la série');
INSERT INTO "Livres" VALUES (2, 'Mr. Bridge', 'Evan S. Connell', 'Second de la série');
INSERT INTO "Livres" VALUES (3, 'L''ingénue libertine bla bla bla bla', 'Colette version2', 'Minne et Les égarements de Minne');
INSERT INTO "Livres" VALUES (6, 'fez', 'fez', 'ezfez');
INSERT INTO "Livres" VALUES (7, 'efzjafkjfzaeo', 'lnzfeb', 'jkzelfjelzfjzljkzelfjelzfjzljkzelfjelzfjzljkzelfjelzfjzljkzelfjelzfjzl');
INSERT INTO "Livres" VALUES (8, 'dezafe', ',klfezmfz', 'fezfz');

COMMIT;

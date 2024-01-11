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

COMMIT;

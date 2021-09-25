BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "SESSION" (
	"ID"	INTEGER NOT NULL UNIQUE,
	"START_DATE"	TEXT NOT NULL,
	"END_DATE"	TEXT NOT NULL,
	"PEDS"	INTEGER NOT NULL,
	"METERS"	INTEGER NOT NULL,
	"SCORE"	INTEGER DEFAULT 0,
	"VERSION"	INTEGER DEFAULT 0,
	"AVG_SPEED"	INTEGER DEFAULT 0,
	PRIMARY KEY("ID" AUTOINCREMENT)
);
INSERT INTO "SESSION" VALUES (63,'2021-09-23T16:18:08.185Z','2021-09-23T16:18:09.535Z',0,0,0,0,0);
COMMIT;
use marcopolo;

DROP TABLE FRIENDS;
DROP TABLE GAMER;

-- Create table
CREATE TABLE GAMER
(
  id BIGINT IDENTITY(100001, 1) PRIMARY KEY not null,
  username VARCHAR(128) not null unique,
  email VARCHAR(255) not null unique,
  id_credential VARCHAR(255),
  pass VARCHAR(255),
  gamer_nosql VARCHAR(255),
  reset_token VARCHAR(255)
);

CREATE TABLE FRIENDS (
  gamer_one_id BIGINT PRIMARY KEY not null,
  gamer_two_id BIGINT,
)

alter table FRIENDS
  add constraint GAMER_FRIENDS_ONE_FK foreign key (gamer_one_id) REFERENCES GAMER (id);
alter table FRIENDS
  add constraint GAMER_FRIENDS_TWO_FK foreign key (gamer_two_id) REFERENCES GAMER (id);

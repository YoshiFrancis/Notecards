## Database layout

#### Table 1 - Cards

CARD_ID  | FRONT_TEXT | BACK_TEXT | DECK_ID | USER_ID
SERIAL   |    TEXT    |   TEXT    |  SERIAL |  SERIAL

#### Table 2 - Decks

DECK_ID  |    TITLE     | USER_ID | CREATED_AT
SERIAL   | varchar(20)  | SERIAL  | TIMESTAMP

#### Table 3 - users

USER_ID |  USERNAME   | PASSWORD_HASH | CREATED_AT
SERIAL  | varchar(20) |     TEXT      |   TIMESTAMP


CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    passwords VARCHAR(50) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE decks (
  deck_id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER NOT NULL,
  CONSTRAINT fk_user_table
        FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE
);

CREATE TABLE cards (
  card_id SERIAL PRIMARY KEY,
  deck_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  front TEXT NOT NULL,
  back TEXT NOT NULL,
  CONSTRAINT fk_deck_table
        FOREIGN KEY (deck_id)
        REFERENCES decks (deck_id)
        ON DELETE CASCADE,
  CONSTRAINT fk_user_table
        FOREIGN KEY (user_id)
        REFERENCES users (user_id)
        ON DELETE CASCADE
);
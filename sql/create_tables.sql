
DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  secondname VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  email VARCHAR(50) NOT NULL UNIQUE,
  active BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TABLE IF EXISTS email_confirmation;

CREATE TABLE IF NOT EXISTS email_confirmation (
    hash_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    hash VARCHAR(60) NOT NULL,

    FOREIGN KEY(email) 
      REFERENCES users(email)
      ON DELETE CASCADE
);

DROP TABLE IF EXISTS list_to_do;
CREATE TABLE IF NOT EXISTS list_to_do (
  item_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  item_to_do TEXT,
  done BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(user_id)
);

DROP TABLE IF EXISTS list_done;
CREATE TABLE IF NOT EXISTS list_done (
  item_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  item_to_do TEXT,
  done BOOLEAN NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW() ,
  CONSTRAINT fk_user
    FOREIGN KEY(user_id)
      REFERENCES users(user_id)
);
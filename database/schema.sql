CREATE TABLE items (
  id INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
  description VARCHAR(50) NOT NULL,
  qty INTEGER NOT NULL DEFAULT 1,
  price FLOAT NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO items (id, description, qty, price) VALUES 
    (1, 'PS4', 1, 399.00),
    (2, 'Street Fight V', 2, 59.99);
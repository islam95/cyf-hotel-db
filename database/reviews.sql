DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
    id        INTEGER       PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER,
    foreign key (customer_id) references customers(id),
    rating    INTEGER(10),
    comment     VARCHAR(255),
    review_date DATETIME
);


INSERT INTO reviews (customer_id, rating, comment, review_date) VALUES (1, 5, 'My comment', '22-01-2018');

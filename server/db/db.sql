-- create database
CREATE DATABASE restaurantFinder; 

-- create restaurants table
CREATE TABLE Restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY, 
    name VARCHAR(100) NOT NULL, 
    location VARCHAR(100) NOT NULL, 
    price_range INT NOT NULL CHECK(price_range >= 1 AND price_range <= 5)
); 
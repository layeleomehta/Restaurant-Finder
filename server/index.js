require('dotenv').config(); 
const db = require('./db/db.js');
const express = require("express"); 
const cors = require("cors");
const app = express(); 
const port = process.env.PORT || 3001; 

// middleware
app.use(cors());
app.use(express.json());  

// routes
// retrieve all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const result = await db.query(
    "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating),1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id;"

        ); 

        console.log(result);

        res.status(200).json({
            status: "success", 
            length: result.rowCount,
            restaurantData: result.rows
        }); 
    } catch (err) {
        console.log(err.message); 
        
    }
}); 

// retrieve restaurant with specified id
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const restaurants = await db.query("SELECT * FROM restaurants WHERE id=$1", [req.params.id]); 
        const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id=$1", [req.params.id]); 

        res.status(200).json({
            status: "success", 
            restaurantData: restaurants.rows[0], 
            reviewData: reviews.rows
        })
    } catch (err) {
        console.log(err.message); 
    }
}); 

// create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    try {
        const result = await db.query("INSERT INTO restaurants(name, location, price_range) VALUES ($1, $2, $3) RETURNING *", [
            req.body.name, 
            req.body.location, 
            req.body.price_range
        ]); 

        res.status(200).json({
            status: "success", 
            restaurantData: result.rows[0]
        })
    } catch (err) {
        console.log(err.message); 
    }
}); 

// update a restaurant with specified id
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const result = await db.query("UPDATE restaurants SET name=$1, location=$2, price_range=$3  WHERE id=$4 RETURNING *", [
            req.body.name, 
            req.body.location, 
            req.body.price_range, 
            req.params.id
        ]); 

        res.status(200).json({
            status: "success", 
            restaurantData: result.rows[0]
        })
    } catch (err) {
        console.log(err.message); 
    }
}); 

// delete a restaurant with specified id
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const result = await db.query("DELETE FROM restaurants WHERE id=$1", [
            req.params.id
        ]); 

        res.status(200).json({
            status: "success"
        })
    } catch (err) {
        console.log(err.message); 
    }
}); 

// add a new review for a specific restaurant id
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    try {
        const result = await db.query("INSERT INTO reviews(restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *", [
            req.params.id, 
            req.body.name, 
            req.body.review, 
            req.body.rating
        ]); 

        res.status(201).json({
            status: "success", 
            name: result.rows[0].name, 
            review: result.rows[0].review, 
            rating: result.rows[0].rating
        }); 
    } catch (err) {
        console.error(err.message); 
    }
}); 

// starting up server
app.listen(port, () => {
    console.log(`Listening on port: ${port}`); 
})



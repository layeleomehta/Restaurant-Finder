require('dotenv').config(); 
const db = require('./db/db.js');
const express = require("express"); 
const app = express(); 
const port = process.env.PORT || 3001; 

// middleware
app.use(express.json()); 

// routes
// retrieve all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM restaurants"); 

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
        const result = await db.query("SELECT * FROM restaurants WHERE id=$1", [req.params.id]); 

        res.status(200).json({
            status: "success", 
            restaurantData: result.rows[0]
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

// starting up server
app.listen(port, () => {
    console.log(`Listening on port: ${port}`); 
})



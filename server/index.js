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
app.post("/api/v1/restaurants", (req, res) => {
    res.json("Create restaurants route")
}); 

// update a restaurant with specified id
app.put("/api/v1/restaurants/:id", (req, res) => {
    res.json(`Update route for particular restaurant with id: ${req.params.id}`); 
}); 

// delete a restaurant with specified id
app.delete("/api/v1/restaurants/:id", (req, res) => {
    res.json(`Delete route for particular restaurant with id: ${req.params.id}`); 
}); 

// starting up server
app.listen(port, () => {
    console.log(`Listening on port: ${port}`); 
})



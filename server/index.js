require('dotenv').config(); 
const express = require("express"); 
const app = express(); 
const port = process.env.PORT || 3001; 

// routes
// retrieve all restaurants
app.get("/api/v1/restaurants", (req, res) => {
    res.json("Get route for all restaurants")
}); 

// retrieve restaurant with specified id
app.get("/api/v1/restaurants/:id", (req, res) => {
    res.json(`Get route for particular restaurant with id: ${req.params.id}`); 
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



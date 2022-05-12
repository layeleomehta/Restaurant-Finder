import React, {useContext, useEffect} from 'react'; 
import { RestaurantsContext } from '../../context/RestaurantContext';
import {useNavigate} from "react-router-dom"; 
import StarRating from '../RestaurantReview/StarRating';

const ViewRestaurants = () => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext); 
    let navigate = useNavigate(); 

    // make GET request here to update global restaurants state from context
    useEffect(() => {
      const updateRestaurants = async () => {
          try {
            const response = await fetch("http://localhost:4000/api/v1/restaurants"); 
            const data = await response.json(); 
            if(data.status === "success"){
                const restaurantList = data.restaurantData;
                setRestaurants(restaurantList); 
            } 
  
          } catch (err) {
              console.error(err.message); 
          }

      }; 

      updateRestaurants(); 
    }, []); 

    const handleUpdate = (id) => {
        navigate(`/restaurants/${id}/update`); 
    }

    // make DELETE request here
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/restaurants/${id}`, {
                method: "DELETE"
            }); 
            const data = await response.json(); 
            setRestaurants(restaurants.filter(restaurant => restaurant.id !== id)); 
        } catch (err) {
            console.error(err.message); 
        }
    }

    const handleRestaurantClick = (id) => {
        navigate(`/restaurants/${id}`); 
    }

  return (
    <div className='mt-4'>
        <h2 className='fw-light text-start mb-3'>All current restaurants:</h2>
        <table className="table table-hover">
        <thead>
            <tr className='table-primary'>
            <th scope="col">Restaurant</th>
            <th scope="col">Location</th>
            <th scope="col">Price Range</th>
            <th scope="col">Rating</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
            {restaurants && restaurants.map(restaurant => {
                return (
                    <tr key={restaurant.id}>
                        <td onClick={() => handleRestaurantClick(restaurant.id)} className="table-success" >{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>{<StarRating rating={restaurant.average_rating ? restaurant.average_rating : 0}/>}</td>
                        <td><button className='btn btn-warning' onClick={() => handleUpdate(restaurant.id)} >Edit</button></td>
                        <td><button className='btn btn-danger' onClick={() => handleDelete(restaurant.id)}>Delete</button></td>
                    </tr>
                ); 
            })}
        </tbody>
        </table>
    </div>
  )
}

export default ViewRestaurants; 
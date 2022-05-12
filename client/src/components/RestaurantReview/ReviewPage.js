import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../../context/RestaurantContext';

const ReviewPage = () => {
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext); 
    const {id} = useParams()

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/v1/restaurants/${id}`); 
                const data = await response.json(); 
                console.log(data); 

                if(data.status === "success"){
                    setSelectedRestaurant(data.restaurantData); 
                }
      
              } catch (err) {
                  console.error(err.message); 
              }
        }

        fetchRestaurant(); 

    }, [])
    

  return (
    <div>{selectedRestaurant.name}</div>
  )
}

export default ReviewPage; 
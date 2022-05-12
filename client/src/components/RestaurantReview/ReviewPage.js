import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../../context/RestaurantContext';
import AddReview from '../RestaurantReview/AddReview';
import ReviewCards from './ReviewCards';

const ReviewPage = () => {
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext); 
    const {id} = useParams(); 

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/v1/restaurants/${id}`); 
                const data = await response.json(); 

                if(data.status === "success"){
                    setSelectedRestaurant(data); 
                }
      
              } catch (err) {
                  console.error(err.message); 
              }
        }

        fetchRestaurant(); 
    }, []); 

    console.log(selectedRestaurant.reviewData); 

  return (
    <div>
        <h1 className="text-center display-1 font-weight-bold">{selectedRestaurant.restaurantData.name}</h1>
        <ReviewCards reviews={selectedRestaurant.reviewData}/>
        <AddReview/>
    </div>
  )
}

export default ReviewPage; 
import React, {useContext, useEffect} from 'react'; 
import { RestaurantsContext } from '../../context/RestaurantContext';

const ViewRestaurants = () => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext); 

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
    }, [])
    

  return (
    <div className='mt-4'>
        <h2 className='fw-light text-start mb-3'>All current restaurants:</h2>
        <table class="table table-hover">
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
            {restaurants.map(restaurant => {
                return (
                    <tr>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.price_range)}</td>
                        <td>Rating</td>
                        <td><button className='btn btn-warning'>Edit</button></td>
                        <td><button className='btn btn-danger'>Delete</button></td>
                    </tr>
                ); 
            })}
            {/* <tr>
            <td>Dummy Wendy's</td>
            <td>Dummy New York</td>
            <td>$$$$</td>
            <td>4</td>
            <td><button>Edit</button></td>
            <td><button>Delete</button></td>
            </tr> */}
        </tbody>
        </table>
    </div>
  )
}

export default ViewRestaurants; 
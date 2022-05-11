import React, {useContext} from 'react'; 
import { RestaurantsContext } from '../../context/RestaurantContext';

const ViewRestaurants = () => {
    const { restaurants, setRestaurants } = useContext(RestaurantsContext); 

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
            {}
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
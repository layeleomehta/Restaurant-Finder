import React, {useState, useContext} from 'react'; 
import { RestaurantsContext } from '../../context/RestaurantContext';

const AddRestaurant = () => {
  const [addRestaurantObject, setAddRestaurantObject] = useState({
    name: "", 
    location: "", 
    price_range: 0
  }); 

  const {restaurants, setRestaurants} = useContext(RestaurantsContext)

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await fetch("http://localhost:4000/api/v1/restaurants", {
        method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(addRestaurantObject)
      }); 

      const data = await response.json(); 
      if(data.status === "success"){
        setRestaurants([...restaurants, data.restaurantData]); 
      }

    } catch (err) {
      console.error(err.message); 
    }

  }

  return (
    <div className='mt-4'>
        <h2 className='fw-light text-start'>Add your restaurant!</h2>
        <form className="form-inline">
            <label className="sr-only" htmlFor="inlineFormInputName2">Name</label>
            <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Restaurant"
                   value={addRestaurantObject.name} onChange={(e) => setAddRestaurantObject({...addRestaurantObject, name: e.target.value})}
            />

            <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Username</label>
            <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                </div>
                <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Location"
                       value={addRestaurantObject.location} onChange={(e) => setAddRestaurantObject({...addRestaurantObject, location: e.target.value})}              
                />
            </div>

            <select className="form-select custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref"
                    value={addRestaurantObject.price_range} onChange={(e) => setAddRestaurantObject({...addRestaurantObject, price_range: e.target.value})}
            >
                <option defaultValue>Choose a price range</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
                <option value="5">$$$$$</option>
            </select>

            <div className="text-start">
              <button type="submit" className="text-left btn btn-success mb-2 mt-1" onClick={handleSubmit}>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddRestaurant; 
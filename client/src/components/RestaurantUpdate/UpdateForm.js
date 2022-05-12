import React, {useState, useEffect} from 'react'; 
import {useParams, useNavigate} from "react-router-dom"; 

const UpdateForm = () => {
    const [updateRestaurantObject, setUpdateRestaurantObject] = useState({
        name: "", 
        location: "", 
        price_range: 0
    }); 

    const {id} = useParams(); 
    let navigate = useNavigate(); 

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                // GET request to backend with specific restaurant id
                const response = await fetch(`http://localhost:4000/api/v1/restaurants/${id}`); 
                const data = await response.json(); 
                setUpdateRestaurantObject({
                    name: data.restaurantData.name, 
                    location: data.restaurantData.location, 
                    price_range: data.restaurantData.price_range
                }); 
            } catch (err) {
                console.error(err.message); 
            }
        }

        fetchRestaurant(); 
    
    }, [])
    



    const handleSubmit = async (e) => {
        e.preventDefault(); 
        try {
            // PUT request to update the restaurant with given id
            const response = await fetch(`http://localhost:4000/api/v1/restaurants/${id}`, {
                method: "PUT", 
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify(updateRestaurantObject)
            }); 

            navigate("/"); 

        } catch (err) {
            console.error(err.message); 
        }
    }

  return (
    <div className='mt-4'>
        <h2 className='fw-light text-start'>Update this restaurant!</h2>
        <form className="form-inline">
            <label className="sr-only" htmlFor="inlineFormInputName2">Name</label>
            <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Restaurant"
            value={updateRestaurantObject.name} onChange={(e) => setUpdateRestaurantObject({...updateRestaurantObject, name: e.target.value})}
            />

            <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Username</label>
            <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                </div>
                <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Location"  
                value={updateRestaurantObject.location} onChange={(e) => setUpdateRestaurantObject({...updateRestaurantObject, location: e.target.value})}      
                />
            </div>

            <select className="form-select custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref"
            value={updateRestaurantObject.price_range} onChange={(e) => setUpdateRestaurantObject({...updateRestaurantObject, price_range: e.target.value})}
            >
                <option defaultValue>Choose a price range</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
                <option value="5">$$$$$</option>
            </select>

            <div className="text-start">
              <button type="submit" className="text-left btn btn-success mb-2 mt-1" onClick={handleSubmit} >Submit Change</button>
            </div>
        </form>
    </div>
  )
}

export default UpdateForm; 
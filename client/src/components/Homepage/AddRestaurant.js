import React from 'react'

const AddRestaurant = () => {
  return (
    <div className='mt-4'>
        <h2 className='fw-light text-start'>Add your restaurant!</h2>
        <form class="form-inline">
            <label class="sr-only" for="inlineFormInputName2">Name</label>
            <input type="text" class="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Restaurant"/>

            <label class="sr-only" for="inlineFormInputGroupUsername2">Username</label>
            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                </div>
                <input type="text" class="form-control" id="inlineFormInputGroupUsername2" placeholder="Location"/>
            </div>

            <select class="form-select custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                <option selected>Choose a price range</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
                <option value="5">$$$$$</option>
            </select>

            <div className="text-start">
              <button type="submit" class="text-left btn btn-success mb-2 mt-1">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddRestaurant; 
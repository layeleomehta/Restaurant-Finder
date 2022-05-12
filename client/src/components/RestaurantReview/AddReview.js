import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

const AddReview = () => {
    const [reviewObject, setReviewObject] = useState({
        name: "", 
        review: "", 
        rating: 0
    }); 
    const {id} = useParams(); 

    const handleSubmitReview = async (e) => {
        e.preventDefault(); 
        try {
            const response = await fetch(`http://localhost:4000/api/v1/restaurants/${id}/addReview`, {
                method: "POST", 
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify(reviewObject)
              }); 

              window.location.reload(); 
        } catch (err) {
            console.error(err.message); 
        }
    }

  return (
    <div className='mt-4'>
        <h2 className='fw-light text-start'>Add your review!</h2>
        <form className="form-inline">
            <label className="sr-only" htmlFor="inlineFormInputName2">Name</label>
            <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Full Name"
            value={reviewObject.name} onChange={(e) => setReviewObject({...reviewObject, name: e.target.value})}
            />

            <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Username</label>
            <div className="input-group mb-2 mr-sm-2">
                <div className="input-group-prepend">
                </div>
                <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Review"
                value={reviewObject.review} onChange={(e) => setReviewObject({...reviewObject, review: e.target.value})}
                />
            </div>

            <select className="form-select custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref"
            value={reviewObject.rating} onChange={(e) => setReviewObject({...reviewObject, rating: e.target.value})}
            >
                <option defaultValue>Give this place a star rating out of 5!</option>
                <option value="1">*</option>
                <option value="2">**</option>
                <option value="3">***</option>
                <option value="4">****</option>
                <option value="5">*****</option>
            </select>

            <div className="text-start">
              <button type="submit" className="text-left btn btn-success mb-2 mt-1" onClick={handleSubmitReview}>Submit Review</button>
            </div>
        </form>
    </div>
  )
}

export default AddReview; 
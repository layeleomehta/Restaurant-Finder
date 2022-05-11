import React from 'react'; 
import Header from '../components/Homepage/Header';
import AddRestaurant from '../components/Homepage/AddRestaurant';
import ViewRestaurants from '../components/Homepage/ViewRestaurants';

const Homepage = () => {
  return (
    <div>
        <Header/>
        <AddRestaurant/>
        <ViewRestaurants/>

    </div>
  )
}

export default Homepage; 
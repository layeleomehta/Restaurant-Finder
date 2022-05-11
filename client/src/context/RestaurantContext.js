import React, {useState, createContext} from 'react'; 

export const RestaurantsContext = createContext(); 

// this is my global state that all components can access if they want to
export const RestaurantsContextProvider = (props) => {
    const [restaurants, setRestaurants] = useState([]); 

    return (
        <RestaurantsContext.Provider
            value={{
                restaurants, 
                setRestaurants
            }}
        >
            {props.children}
        </RestaurantsContext.Provider>
    ); 
}
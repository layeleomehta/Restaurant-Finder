import './App.css';
import {BrowserRouter, 
        Routes, 
        Route} from "react-router-dom"; 
import Homepage from './routes/Homepage';
import RestaurantUpdate from './routes/RestaurantUpdate';
import RestaurantReview from './routes/RestaurantReview';
import { RestaurantsContextProvider } from './context/RestaurantContext';

function App() {
  return (
    <RestaurantsContextProvider>
      <div className="App">
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Homepage/>}/>
              <Route exact path="/restaurants/:id" element={<RestaurantReview/>}/>
              <Route exact path="/restaurants/:id/update" element={<RestaurantUpdate/>}/>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;

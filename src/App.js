import React, { useState, useEffect }  from 'react';
import UserInput from './components/UserInput';
import Remaining from './components/Remaining';
import AddFoodBtn from './components/AddFoodBtn';
import FoodList from './components/FoodList';
import AddFoodItemModal from './components/AddFoodItemModal';
import './App.css';

const  App = () => {
  // initializing state
   const [dailyCalTot, setDailyCalTot] = useState('0');
   const [eatingWindow, setEatingWindow] = useState('0');
   const [foodListArr, setFoodListArr] = useState([]);

   useEffect(() => {
     // Init Materialize JS
     window.M.AutoInit();
   });

   // change dailyCalTot state when user inputs value
   const updateDailyCalTotState = (userCalTot) => {
     setDailyCalTot(userCalTot);
   }

   const updateEatingWindowState = (userEatingWindow) => {
     setEatingWindow(userEatingWindow);
   }

   const updateFoodListArrState = (foodItem) => {
     setFoodListArr(foodItem);
   }

  return (
    <div className="App">
      {/* daily calorie total set function and eating window set function passed as props to userinput component */}
      <UserInput 
        updateDailyCalTotState={updateDailyCalTotState}
        updateEatingWindowState={updateEatingWindowState} 
      />
      {/* daily calorie total state and eating window state passed as props to remaining component */}
      <Remaining 
        dailyCalTot={dailyCalTot} 
        eatingWindow={eatingWindow} 
      />
      <AddFoodBtn />
      <AddFoodItemModal foodListArr={foodListArr} updateFoodListArrState={updateFoodListArrState}/>
      {/* food list array state passed as props to FoodList component */}
      <FoodList foodListArr={foodListArr} />
    </div>
  );
}

export default App;

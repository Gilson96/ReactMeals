import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState } from 'react';



const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLooading, setIsLoading] = useState(true);

  

  // data from firebase.com
  // fecth this data one time when loaded
  // Then fetch again if data changes
  // for that useEffect
  useEffect(() => {

    // Can't use async directly with useEffect
    // So for that a nested function
    const fecthMeals = async () => {
      // sends a requets to REST API endpoint to fecth meals
      const response = await fetch('https://react-http-d667c-default-rtdb.firebaseio.com/meals.json');

      //  parsing data
      const responseData = await response.json();

      // It will always return an object from firebase
      // So 'responseData' will be an object as well
      // for that transfom into array
      const loadedMeals = [];

      // go through all the keys in responseData
      for (const key in responseData) {
        // reach out to 'loadedMeals'
        // push a new object into empty array in'loadedMeals'.
        // and transforming the fetched data
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
        })
      }

      // after fill empty array with transformed data
      // call state-updating function
      // to fill 'meals' state with data
      setMeals(loadedMeals);
      setIsLoading(false)
    }

    fecthMeals();
    
  }, [])

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {!isLooading ? <ul>{mealsList}</ul>
      : <p>Loading...</p> }
        </Card>
    </section>
  );
};

export default AvailableMeals;

import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import MealCard from '../../components/MealCard/MealCard';
import { Meals, MealsList } from '../../types';
import axiosApi from '../../axiosApi';
import Spinner from '../../components/Spinner/Spinner';

const Home = () => {
  const navigate = useNavigate();
  const [meals, setMeals] = useState<Meals[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMeals = useCallback(async () => {
    try {
      setLoading(true);
      const responseMeals = await axiosApi.get<MealsList | null>(
        'calorie.json',
      );
      const mealsData = responseMeals.data;

      if (!mealsData) {
        return;
      }

      const newMeals = Object.keys(mealsData).map((id) => {
        const meal = mealsData[id];
        return {
          ...meal,
          calorie: parseInt(meal.calorie),
          id,
        };
      });

      setMeals(newMeals);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);

  const total = meals.reduce((sum, meal) => {
    return sum + meal.calorie;
  }, 0);

  const onDeleteCard = (id: string) => {
    console.log('Delete ', id);
  };

  const onEditCard = (id: string) => {
    console.log('Edit ', id);
  };

  return (
    <>
      <div className="d-flex my-3 justify-content-between">
        <p>
          Total calorie: <strong>{total}</strong> kcal
        </p>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/meals/new')}
        >
          Add new meal
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        meals.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            onEditCard={() => onEditCard(meal.id)}
            onDeleteCard={() => onDeleteCard(meal.id)}
          />
        ))
      )}
    </>
  );
};

export default Home;

import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import MealCard from '../../components/MealCard/MealCard';
import Spinner from '../../components/Spinner/Spinner';
import { Meals, MealsList } from '../../types';

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

  const onDeleteCard = async (id: string) => {
    setLoading(true);
    try {
      const answer = confirm('Do yoy really want delete?');
      if (answer) {
        await axiosApi.delete('calorie/' + id + '.json');
        setMeals((prevState) => prevState.filter((value) => value.id !== id));
      }
    } finally {
      setLoading(false);
    }
  };

  const onEditCard = (id: string) => {
    navigate('meals/' + id + '/edit');
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

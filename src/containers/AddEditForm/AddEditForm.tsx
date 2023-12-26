import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosApi from '../../axiosApi';
import MealForm from '../../components/MealForm/MealForm';
import Spinner from '../../components/Spinner/Spinner';
import { ApiMeals } from '../../types';

const AddEditForm = () => {
  const [meal, setMeal] = useState<ApiMeals>({
    meal: '',
    description: '',
    calorie: '',
  });

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const createMeal = async (meal: ApiMeals) => {
    try {
      setLoading(true);
      await axiosApi.post('calorie.json', meal);
    } finally {
      setLoading(false);
      navigate('/');
    }
  };

  const changeMeal = async (meal: ApiMeals, id: string) => {
    try {
      setLoading(true);
      await axiosApi.put(`calorie/${id}.json`, meal);
    } finally {
      setLoading(false);
    }
  };

  const fetchMeal = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response = await axiosApi.get<ApiMeals | null>(
        `calorie/${id}.json`,
      );
      const mealData = response.data;

      if (mealData) {
        setMeal(mealData);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const onMealChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setMeal((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onCalorieChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMeal((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (params.id) {
      void changeMeal(meal, params.id);
    } else {
      void createMeal(meal);
    }
  };

  const isEdit = !!params.id;

  useEffect(() => {
    if (params.id) {
      void fetchMeal(params.id);
    }
  }, [fetchMeal, params]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <MealForm
          meal={meal}
          onChange={(event) => onMealChange(event)}
          onSelectChange={(event) => onCalorieChange(event)}
          onFormSubmit={(event) => onFormSubmit(event)}
          isLoading={loading}
          isEdit={isEdit}
        />
      )}
    </>
  );
};

export default AddEditForm;

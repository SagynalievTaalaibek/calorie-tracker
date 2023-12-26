import React, { useState } from 'react';
import { MealFormInterface } from '../../types';
import MealForm from '../../components/MealForm/MealForm';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import axiosApi from '../../axiosApi';

const AddEditForm = () => {
  const [meal, setMeal] = useState<MealFormInterface>({
    meal: '',
    description: '',
    calorie: 0,
  });

  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const createMeal = async (meal: MealFormInterface) => {
    try {
      setLoading(true);
      console.log(meal);
      await axiosApi.post('calorie.json', meal);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

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
      console.log('edit');
    } else {
      void createMeal(meal);
    }
  };

  const isEdit = !!params.id;

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
          isEdit={isEdit}
        />
      )}
    </>
  );
};

export default AddEditForm;

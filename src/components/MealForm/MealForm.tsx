import React from 'react';
import { MealFormInterface } from '../../types';
import { meals } from '../../constant';

interface Props {
  isEdit?: boolean;
  isLoading?: boolean;
  meal: MealFormInterface;
  onFormSubmit: (event: React.FormEvent) => void;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MealForm: React.FC<Props> = ({
  isEdit = false,
  isLoading = false,
  meal,
  onFormSubmit,
  onChange,
  onSelectChange,
}) => {
  return (
    <form onSubmit={onFormSubmit}>
      <h4>{isEdit ? 'Edit meal' : 'Add new meal'}</h4>
      <div className="mb-3">
        <label htmlFor="meal">Meal</label>
        <select
          name="meal"
          id="meal"
          className="form-select"
          required
          value={meal.meal}
          onChange={onSelectChange}
        >
          <option value="">Select Meal</option>
          {meals.map((meal, index) => (
            <option value={meal} key={index}>
              {meal}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          className="form-control"
          value={meal.description}
          onChange={onChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="calorie">Calorie</label>
        <input
          type="number"
          name="calorie"
          id="calorie"
          required
          className="form-control"
          value={meal.calorie}
          onChange={onChange}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-2"
        disabled={isLoading}
      >
        Save
      </button>
    </form>
  );
};

export default MealForm;

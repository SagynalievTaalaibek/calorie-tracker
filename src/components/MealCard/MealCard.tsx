import React from 'react';
import { Meals } from '../../types';

interface Props {
  meal: Meals;
  onDeleteCard: React.MouseEventHandler;
  onEditCard: React.MouseEventHandler;
}

const MealCard: React.FC<Props> = ({ meal, onDeleteCard, onEditCard }) => {
  return (
    <div className="row border rounded p-2 mb-2">
      <div className="col-6">
        <h5>{meal.meal}</h5>
        <p>{meal.description}</p>
      </div>
      <div className="col-6">
        <div className="d-flex justify-content-between">
          <strong className="my-auto ms-lg-5">{meal.calorie} kcal</strong>
          <div className="d-flex flex-column">
            <button className="btn btn-primary mb-2" onClick={onEditCard}>
              Edit
            </button>
            <button className="btn btn-danger" onClick={onDeleteCard}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;

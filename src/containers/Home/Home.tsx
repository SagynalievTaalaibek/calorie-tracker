import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/meals/new')}
        >
          Add new meal
        </button>
      </div>
    </>
  );
};

export default Home;

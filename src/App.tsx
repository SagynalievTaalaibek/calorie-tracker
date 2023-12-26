import Layout from './components/Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import AddEditForm from './containers/AddEditForm/AddEditForm';
import NotFound from './containers/NotFound';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meals/new" element={<AddEditForm />} />
        <Route path="meals/:id/edit" element={<AddEditForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
};

export default App;

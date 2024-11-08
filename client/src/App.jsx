import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import PrivateRoute from './components/privateRoute';
import CreateListing from './pages/CreateListing';
import UpdateListing from './pages/UpdateListing';
import Listing from './pages/Listing';
import Search from './pages/Search';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<Search />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/listing/:id' element={<Listing />} />
        <Route path='/profile' element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path='/create-listing' element={<PrivateRoute><CreateListing /></PrivateRoute>} />
        <Route path='/update-listing/:id' element={<PrivateRoute><UpdateListing /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
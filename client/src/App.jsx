import {Route, Routes}  from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import Header from './components/Header';
import PrivateRoute from './components/privateRoute';
import CreateListing from './pages/CreateListing';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route element={<PrivateRoute />} >
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/create-listing' element={<CreateListing />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

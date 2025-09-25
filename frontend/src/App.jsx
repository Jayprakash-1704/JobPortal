
import Navbar from './components/shared/Navbar.jsx';
import Signup from './components/auth/Signup.jsx';
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/auth/Login.jsx';
import Home from './components/Home.jsx';
import Jobs from './components/Jobs.jsx';
import Browse from './components/Browse.jsx';
import Profile from './components/Profile.jsx';
import JobDescription from './components/JobDescription.jsx';
import UpdateProfileDialog from './components/UpdateProfileDialog.jsx';

function App() {


  const location = useLocation();

  const noNavbarRoutes = ["/signup", "/login"];
  const hideNavbar = noNavbarRoutes.includes(location.pathname);
  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/explore" element={<Browse />} />
        <Route path="/view-profile" element={<Profile />} />
        <Route path="/jobs/description/:id" element={<JobDescription  />} />
        
      </Routes>
    </>
  );

}
export default App

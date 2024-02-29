import MainPage from './pages/MainPage/MainPage.js'
import RegistrationPage from './pages/RegistrationPage/RegistrationPage.js';
import LoginPage from './pages/LoginPage/LoginPage.js';
import PatientPage from './pages/PatientPage/PatientPage.js';
import DoctorPage from './pages/DoctorPage/DoctorPage';
import ResetPasswordPage from './pages/ResetPasswordPage/ResetPasswordPage.js';
import DoctorCard from './components/DoctorCard/DoctorCard.js';
import {Routes, Route, Link } from 'react-router-dom'


function App() {
  return (
      // <MainPage />
      // <RegistrationPage/>
      // <LoginPage/>
      // <PatientPage/>
      // <DoctorCard/>
      <Routes>
        <Route path="/" element={<MainPage/>}></Route>
        <Route path="/registration" element={<RegistrationPage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/patient" element={<PatientPage/>}></Route>
        <Route path="/doctor" element={<DoctorPage/>}></Route>
        <Route path="/reset-password" element={<ResetPasswordPage/>}></Route>

      </Routes>
  );
}

let styles = {
  main: {
    // background: linear-gradient(180deg, rgba(255, 114, 94, 0.34) 0%, rgba(255, 255, 255, 0) 100%),
  },
}

export default App;

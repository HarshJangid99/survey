
import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage'
import Survey from './pages/survey';
import Thankyou from './pages/Thankyou';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/"  element={<WelcomePage/>} />
        <Route path="/survey" element={<Survey/>} />
        <Route path="/thank-you" element={<Thankyou />} />
      </Routes>
    </Router>
  );
};

export default App;

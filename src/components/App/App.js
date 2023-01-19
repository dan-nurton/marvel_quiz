/* eslint-disable import/no-extraneous-dependencies */
import { React, useMemo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { IconContext } from 'react-icons';
import Header from '../Header';
import Landing from '../Landing';
import Footer from '../Footer';
import Welcome from '../Welcome';
import Login from '../Login';
import Signup from '../Signup';
import ErrorPage from '../ErrorPage';
import SessionContext from './SessionContext';
import ForgetPassword from '../ForgetPassword';
import '../../App.css';
import 'react-notifications/lib/notifications.css';

function App() {
  const iconContextStyle = useMemo(() => ({ style: { verticalAlign: 'middle' } }), []);
  return (
    <Router>
      <IconContext.Provider value={iconContextStyle}>
        <div>
          <Header />
          {/* Route component */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/welcome"
              element={(
                <SessionContext>
                  <Welcome />
                  {' '}
                </SessionContext>
              )}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </div>
      </IconContext.Provider>
    </Router>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import PrivateRoutes from './components/PrivateRoute.js';

const LoginPage = React.lazy(() => import('./components/Login'));
const HomePage = React.lazy(() => import('./components/Home'));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          exact
          element={
            <React.Suspense fallback={<h1>Loading...</h1>}>
              <LoginPage />
            </React.Suspense>
          }
        />
        <Route element={<PrivateRoutes />}>
          <Route
            path="/home"
            element={
              <React.Suspense fallback={<h1>Loading...</h1>}>
                <HomePage />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const LoginPage = React.lazy(() => import('./components/Login'));
const HomePage = React.lazy(() => import('./components/Home'));

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<h1>Loading...</h1>}>
              <LoginPage />
            </React.Suspense>
          }
        />
        <Route
          path="/"
          element={
            <React.Suspense fallback={<h1>Loading...</h1>}>
              <HomePage />
            </React.Suspense>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

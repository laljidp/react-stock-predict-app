import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import './App.css';
import PrivateRoutes from './components/PrivateRoute.js';
import { useSnackbar } from './Hooks/useSnackbar';

const LoginPage = React.lazy(() => import('./components/Login'));
const HomePage = React.lazy(() => import('./components/Home'));

function App() {
  const { snackbar, hideSnackbar } = useSnackbar();
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
      <Snackbar
        open={snackbar.show}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={hideSnackbar}
        message={snackbar.message}
      >
        <Alert onClose={hideSnackbar} severity={snackbar.type} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;

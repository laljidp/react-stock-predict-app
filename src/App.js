import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PrivateRoutes from './components/PrivateRoute.js';
import { useSnackbar } from './Hooks/useSnackbar';
import LoadingProgress from './components/UI/LoadingProgress';
import { AuthContext } from './Context/userAuth.context';
import './App.css';

const LoginPage = React.lazy(() => import('./components/Login'));
const HomePage = React.lazy(() => import('./components/Home'));

function App() {
  const { snackbar, hideSnackbar } = useSnackbar();
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.uid) {
      navigate('/home');
    }
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          exact
          element={
            <React.Suspense fallback={<LoadingProgress />}>
              <LoginPage />
            </React.Suspense>
          }
        />
        <Route element={<PrivateRoutes />}>
          <Route
            path="/home"
            exact
            element={
              <React.Suspense fallback={<LoadingProgress />}>
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

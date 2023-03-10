import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { signInWithFirebase } from '../../services/firebase/auth.firebase';
import { AuthContext, IS_AUTHENTICATED, USER_STORAGE_KEY } from '../../Context/userAuth.context';
import { fetchUserinfoByID } from '../../services/firebase/users.firebase';
import { useSnackbar } from '../../Hooks/useSnackbar';

const theme = createTheme();

export default function SignIn() {
  const [setSubmitting, setIsSubmitting] = useState(false);
  const { setIsAuthenticated, setUserData } = useContext(AuthContext);

  const navigate = useNavigate();
  const { showError } = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    setIsSubmitting(true);
    const {
      success,
      message,
      user: { accessToken, displayName, uid, metadata, photoURL, phoneNumber },
    } = await signInWithFirebase(email, password);
    if (success) {
      // Manage user data in context
      const result = await fetchUserinfoByID(uid);
      const userData = {
        accessToken,
        displayName,
        uid,
        metadata,
        photoURL,
        phoneNumber,
        ...result.data,
      };
      setUserData(userData);
      setIsAuthenticated(true);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
      localStorage.setItem(IS_AUTHENTICATED, true);
      navigate('/home');
    } else {
      // show error toast message
      showError(message);
    }
    setIsSubmitting(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              disabled={setSubmitting}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {setSubmitting ? 'Logging...' : 'Sign In'}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

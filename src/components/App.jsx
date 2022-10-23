import { useState, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useUserLogoutQuery } from '../redux/auth/auth';
import { setCredentials } from '../redux/auth/auth-slice';
import { setLoggedIn } from '../redux/auth/logged-slice';
import { persistor } from '../redux/store';
import { ThemeProvider } from 'styled-components';
import { Container } from './App.styled';
import AppBar from './AppBar/AppBar';
import NoteLoader from './NoteLoader';
import { StyledToastContainer } from './App.styled';

const RegistrationPage = lazy(() =>
  import(
    '../pages/RegistrationPage' /* webpackChunkName: "registration-page" */
  )
);

const LoginPage = lazy(() =>
  import('pages/LoginPage' /* webpackChunkName: "login-page" */)
);

const ContactsPage = lazy(() =>
  import('pages/ContactsPage' /* webpackChunkName: "contacts-page" */)
);

const ForgotPasswordPage = lazy(() =>
  import(
    'pages/ForgotPasswordPage' /* webpackChunkName: "forgot-password-page" */
  )
);

const ChangePasswordPage = lazy(() =>
  import(
    'pages/ChangePasswordPage' /* webpackChunkName: "change-password-page" */
  )
);

export function App() {
  const [skip, setSkip] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector(({ rootReducer }) => rootReducer.theme);
  const isLogged = useSelector(({ isLoggedIn }) => isLoggedIn.logged);
  const { token, user } = useSelector(({ auth }) => auth);
  const userReset = {
    user: {
      id: '',
      email: user.email,
      name: '',
      subscription: '',
      verify: user.verify,
    },
    token: '',
  };

  const { isSuccess } = useUserLogoutQuery(token, {
    skip,
  });

  const userLogout = () => {
    setSkip(false);
  };

  if (isSuccess) {
    dispatch(setCredentials(userReset));
    dispatch(setLoggedIn(false));
    persistor.purge();
    navigate('/login', { replace: true });
  }
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar userLogout={userLogout} />
        <Suspense fallback={<NoteLoader />}>
          <Routes>
            <Route path="/register" element={<RegistrationPage />} />
            <Route
              path="/login/:verifyToken"
              element={<LoginPage setSkip={() => setSkip(true)} />}
            />
            <Route
              path="/contacts"
              element={<ContactsPage userLogout={userLogout} />}
            />
            <Route path="/password" element={<ForgotPasswordPage />} />
            <Route
              path="/password/:passwordToken"
              element={<ChangePasswordPage />}
            />
            <Route
              path="*"
              element={
                isLogged ? (
                  <Navigate to="/contacts" replace />
                ) : (
                  <Navigate to="/login/null" replace />
                )
              }
            />
          </Routes>
        </Suspense>
      </Container>
      <StyledToastContainer
        autoClose={3000}
        position={'top-center'}
        limit={1}
      />
    </ThemeProvider>
  );
}

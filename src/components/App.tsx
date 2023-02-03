import { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/rtkQueryHooks';
import { useUserLogoutQuery } from '../redux/auth/auth';
import { setCredentials } from '../redux/auth/auth-slice';
import { setLoggedIn } from '../redux/auth/logged-slice';
import { persistor } from '../redux/store';
import { ThemeProvider } from 'styled-components';
import { Background, Container } from './App.styled';
import AppBar from './AppBar/AppBar';
import NoteLoader from './NoteLoader';
import { StyledToastContainer } from './App.styled';

const RegistrationPage = lazy(
  () =>
    import(
      '../pages/RegistrationPage' /* webpackChunkName: "registration-page" */
    )
);

const LoginPage = lazy(
  () => import('../pages/LoginPage' /* webpackChunkName: "login-page" */)
);

const ContactsPage = lazy(
  () => import('../pages/ContactsPage' /* webpackChunkName: "contacts-page" */)
);

const ForgotPasswordPage = lazy(
  () =>
    import(
      '../pages/ForgotPasswordPage' /* webpackChunkName: "forgot-password-page" */
    )
);

const ChangePasswordPage = lazy(
  () =>
    import(
      '../pages/ChangePasswordPage' /* webpackChunkName: "change-password-page" */
    )
);

export function App() {
  const [skip, setSkip] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const state = useAppSelector(({ rootReducer }) => rootReducer);
  console.log(state);
  const theme = useAppSelector(({ rootReducer }) => rootReducer.theme);
  const isLogged = useAppSelector(
    ({ rootReducer }) => rootReducer.isLoggedIn.logged
  );
  const { token, user } = useAppSelector(({ rootReducer }) => rootReducer.auth);
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

  useEffect(() => {
    if (isSuccess) {
      setSkip(true);
      dispatch(setCredentials(userReset));
      dispatch(setLoggedIn(false));
      persistor.purge();
      navigate('/login', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <ThemeProvider theme={theme}>
      <Background>
        <Container>
          <AppBar userLogout={userLogout} />
          <Suspense fallback={<NoteLoader />}>
            <Routes>
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/login/:verificationToken" element={<LoginPage />} />
              <Route
                path="/contacts"
                element={<ContactsPage userLogout={userLogout} />}
              />
              <Route path="/password" element={<ForgotPasswordPage />} />
              <Route
                path="/password/:resetPasswordToken"
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
      </Background>
      <StyledToastContainer
        autoClose={3000}
        position={'top-center'}
        limit={1}
      />
    </ThemeProvider>
  );
}

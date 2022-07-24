import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Container } from './App.styled';
import AppBar from './AppBar/AppBar';
import NoteLoader from './NoteLoader';

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

export function App() {
  const theme = useSelector(({ rootReducer }) => rootReducer.theme);
  const isLogged = useSelector(({ isLoggedIn }) => isLoggedIn.logged);
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar />
        <Suspense fallback={<NoteLoader />}>
          <Routes>
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route
              path="*"
              element={
                isLogged ? (
                  <Navigate to="/contacts" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Suspense>
      </Container>
    </ThemeProvider>
  );
}

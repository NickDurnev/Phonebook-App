import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import ContactsPage from 'pages/ContactsPage';
import { Container } from './App.styled';
import AppBar from './AppBar/AppBar';
import RegistrationPage from '../pages/RegistrationPage';
import LoginPage from 'pages/LoginPage';

export function App() {
  const theme = useSelector(({ rootReducer }) => rootReducer.theme);
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar />
        <Routes>
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

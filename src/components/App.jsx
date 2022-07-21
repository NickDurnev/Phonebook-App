import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import ContactsPage from 'pages/ContactsPage';
import { Container } from './App.styled';
import Navigation from './Navigation';

export function App() {
  const theme = useSelector(({ rootReducer }) => rootReducer.theme);
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Navigation />
        <Routes>
          {/* <Route path="/register" element={<ContactsPage />} /> */}
          {/* <Route path="/login" element={<ContactsPage />} /> */}
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<Navigate to="/contacts" replace />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
}

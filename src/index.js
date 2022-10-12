import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { App } from 'components/App';
import { StyledToastContainer } from 'pages/ContactsPage/ContactsPage.styled';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <StyledToastContainer
            autoClose={3000}
            position={'top-center'}
            limit={1}
          />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

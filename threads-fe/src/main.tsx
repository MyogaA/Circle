import React from 'react';
import App from './App.tsx';
import { Provider } from 'react-redux';
import store from './Store/store';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from 'react-router-dom'
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <QueryClientProvider client={queryClient}>
     <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </QueryClientProvider>
  </React.StrictMode>
);

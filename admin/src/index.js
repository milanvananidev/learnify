import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import { BrowserRouter as Router } from 'react-router-dom';
import { Providers } from './redux/provider'
import App from './App';
import './index.css'

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <Providers>
      <App />
    </Providers>
  </Router>,
  document.getElementById('root')
);

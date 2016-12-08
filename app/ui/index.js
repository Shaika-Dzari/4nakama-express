import React from 'react';
import ReactDOM from 'react-dom';
import AppRoute from './routes.jsx';
import 'whatwg-fetch';

import './index.scss';

ReactDOM.render(
  <AppRoute />,
  document.getElementById('app')
);
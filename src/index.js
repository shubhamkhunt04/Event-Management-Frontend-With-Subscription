import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider } from '@apollo/client';

import { client } from './apollo';
import App from './app/App';
import 'antd/dist/antd.css';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

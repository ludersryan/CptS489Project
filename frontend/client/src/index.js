import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, createHttpLink } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './auth/userProvider';
import { setContext } from '@apollo/client/link/context';


const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('id');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      userId: userId ? userId : ""
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
      <React.StrictMode>
        <UserProvider>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </UserProvider>
      </React.StrictMode>
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

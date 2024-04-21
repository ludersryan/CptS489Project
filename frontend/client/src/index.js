import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});


// client.query({
//   query: gql`
//     query {
//       wishList(userId: "66240ea7dd6bf32c45efaf54") {
//         id
//         name
//         brand
//         yearProduced
//         description
//         price
//         favorites
//         condition
//       }
//     }
//   `
// }).then(result => console.log(result));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ApolloProvider client={client}>
      <React.StrictMode>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
      </React.StrictMode>
    </ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

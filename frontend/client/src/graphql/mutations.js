import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            id
        }
    }
`;

export const ADD_USER = gql`
    mutation AddUser($name: String!, $email: String!, $password: String!) {
        addUser(name: $name, email: $email, password: $password){
            name
            email
            password
        }
    }
`;
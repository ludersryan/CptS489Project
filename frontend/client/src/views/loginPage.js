import '../css/login-styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { gql } from '@apollo/client';
import UserContext from '../auth/userContext';



export const LOGIN = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            id
        }
    }
`;

export default function LoginPage() {

    const { user, login } = useContext(UserContext);
    const [error, setError] = useState();
    const [data, setData] = useState();

    const navigate = useNavigate();


    const [mutate] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.message);
        },
        onCompleted: (data) => {
            login(data.login.token, data.login.id);
            navigate('/'); // redirect to home page
        }

    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await mutate({
                variables: {
                    email: e.target.elements.formBasicEmail.value,
                    password: e.target.elements.formBasicPassword.value
                }
            });
            if(response.data.login){
                setError(null);
            }
        }
        catch(err){
            console.error('Mutation error:', err)
        }
        
    }



    const resetForm = () => {
        document.getElementById('loginForm').reset();
    }

    return (
        <Container>
            <Form onSubmit= {(e) => {handleSubmit(e);}} id='loginForm'>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name='password' />
                </Form.Group>
                <Button type="submit" id="login-btn">
                    Submit
                </Button>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {/* contain the key inside the parent for the data.login.token */}
                {data && <div className="alert alert-success" role="alert" style={{wordWrap: "break-word"}}><b>User logged in successfully, awarded access token :</b> {data.login.token}</div>}
                {data && resetForm()}
            </Form>
        </Container>
    );
}
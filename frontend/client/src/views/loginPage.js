import '../css/login-styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { LOGIN } from '../graphql/mutations.js';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [error, setError] = useState();
    const [data, setData] = useState();
    const navigate = useNavigate();
    const [mutate] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.message);
        },
        onCompleted: (data) => {
            const { token } = data.login;
            localStorage.setItem('token', token);
            setData(data);
            setError(null);
            navigate('/');
            window.dispatchEvent(new Event('storage')); // Trigger the event listener (using local storage, another way ?)
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
            <Form
            onSubmit= {(e) => {
                e.preventDefault();
                handleSubmit(e);
            }
            } id='loginForm'
            >
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
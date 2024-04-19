import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { ADD_USER } from '../graphql/mutations.js';





export default function SignUpPage() {
    const [error, setError] = useState();
    const [data, setData] = useState();
    const [mutate] = useMutation(ADD_USER, {
        onError: (error) => {
            setError(error.message);
        }
    });
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setData(null);
        try{
            const response = await mutate({
                variables: {
                    name: e.target.elements.formBasicName.value,
                    email: e.target.elements.formBasicEmail.value,
                    password: e.target.elements.inputPassword5.value
                }
            });
            if(response.data.addUser){
                setData(response.data);
                setError(null);
            }

        } catch(err){
            console.error('Mutation error:', err)
        }
    }

    const resetForm = () => {
        document.getElementById('singUpForm').reset();
    }


    return (
        <Container>
            <Form
                onSubmit= {(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                }
                } id='singUpForm'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group className='mb-3' controlId='formBasicName'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter name' name="name"/>
                </Form.Group>


                <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                <Form.Control
                    type="password"
                    id="inputPassword5"
                    aria-describedby="passwordHelpBlock"
                    name="password"
                />
                <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8-20 characters long, contain letters and numbers,
                    and must not contain spaces, special characters, or emoji.
                </Form.Text>
                <br />
                <Button variant="primary" type="submit" style={{ backgroundColor: 'black', border: 'black', color: 'white'}}>
                    Submit
                </Button>
                {error && <div className="alert alert-danger" role="alert">{error}</div>}
                {data && <div className="alert alert-success" role="alert">User created successfully</div>}
                {data && resetForm()}
            </Form>
        </Container>
        
    );
}

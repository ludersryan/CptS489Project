import React, { useState, useContext, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserContext from '../auth/userContext';
import '../css/profile-styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const GET_USER = gql`
    query GetUser($id: ID!) {
        user(id: $id) {
            id
            name
            email
            dateCreated
            totalListings
            itemsSold
            itemsBought
            avgRating
            aboutMe
        }
    }
`;

export const UPDATE_USER = gql`
    mutation UpdateUser($id: ID!, $name: String, $email: String, $aboutMe: String) {
        updateUser(id: $id, name: $name, email: $email, aboutMe: $aboutMe) {
            id
            name
            email
            dateCreated
            totalListings
            itemsSold
            itemsBought
            avgRating
            aboutMe
        }
    }
`;

export default function ProfilePage() {
    const { user } = useContext(UserContext);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);


    
    const { loading, data } = useQuery(GET_USER, {
        variables: { id: user?.id },
        onError: setError,
        onCompleted: () => setError(null)
    });

    const [mutate] = useMutation(UPDATE_USER, {
        onError: setError,
        onCompleted: (data) => {
            if (data.updateUser) {
                console.log('User updated', data.updateUser);
                setError(null);
            }
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowAlert(false);
        const { name, email, aboutMe } = e.target.elements;

        try {
            const response = await mutate({
                variables: {
                    id: user.id,
                    name: name.value,
                    email: email.value,
                    aboutMe: aboutMe.value
                }
            });
            if (response.data.updateUser) {
                    setShowAlert(true);
                    setTimeout(() => { setShowAlert(false) }, 5000);
                }
        } catch (err) {
            console.error('Mutation error:', err);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data) return <p>No user data available.</p>;

    const { user: userData } = data;


    return (
        <Container fluid>
            <h1>Profile Page</h1>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" defaultValue={userData.name} name="name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" defaultValue={userData.email} name="email" />
                        </Form.Group>
                        <Form.Group controlId="formBasicAboutMe">
                            <Form.Label>About Me</Form.Label>
                            <Form.Control type="text" defaultValue={userData.aboutMe} name="aboutMe" />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="formBasicTotalListings">
                            <Form.Label>Total Listings</Form.Label>
                            <Form.Control type="text" defaultValue={userData.totalListings} readOnly />
                        </Form.Group>
                        <Form.Group controlId="formBasicItemsSold">
                            <Form.Label>Items Sold</Form.Label>
                            <Form.Control type="text" defaultValue={userData.itemsSold} readOnly />
                        </Form.Group>
                        <Form.Group controlId="formBasicItemsBought">
                            <Form.Label>Items Bought</Form.Label>
                            <Form.Control type="text" defaultValue={userData.itemsBought} readOnly />
                        </Form.Group>
                        <Form.Group controlId="formBasicAvgRating">
                            <Form.Label>Avg Rating</Form.Label>
                            <Form.Control type="text" defaultValue={userData.avgRating} readOnly />
                        </Form.Group>
                    </Col>
                </Row>
                    <Button variant="primary" type="submit" id="update-btn">
                        Update Profile
                    </Button>

                    <Link to='/wishlist'><Button variant="secondary">View Wishlist</Button></Link>
                    {showAlert && <div className="alert alert-success" role="alert">Profile updated successfully</div>}
                </Form>
        </Container>
    );
}


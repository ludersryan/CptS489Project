import '../css/create-listing-styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Row, Col } from 'react-bootstrap';


export const ADD_POST = gql`
    mutation AddPost($name: String!, $brand: String!, $yearProduced: Date, $description: String, $favorites: Int, $price: Float, $condition: String, $userId: ID!) {
        addPost(name: $name, brand: $brand, yearProduced: $yearProduced, description: $description, favorites: $favorites, price: $price, condition: $condition, userId: $userId){
            id
        }
    }
`;


export default function CreateListingPage() {
    const [error, setError] = useState();
    const [data, setData] = useState();
    const [mutate] = useMutation(ADD_POST, {
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
                    name: e.target.elements.formProductName.value,
                    brand: e.target.elements.formBrand.value,
                    yearProduced: e.target.elements.formYearProduced.value,
                    description: e.target.elements.formDescription.value,
                    favorites: e.target.elements.formFavorites.value,
                    price: e.target.elements.formPrice.value,
                    condition: e.target.elements.formCondition.value,
                    userId: localStorage.getItem('id')
                }
            });
            if(response.data.addPost){
                setData(response.data);
                setError(null);
            }

        } catch(err){
            console.error('Mutation error:', err)
        }
    }

    const resetForm = () => {
        document.getElementById('createListingForm').reset();
    }
    
  return (
    <Container>
        <Row>
            <Col>
                <img src={require('../images/Fender.jpg')} alt="Item-image1" className="image"/>
            </Col>
            <Col>
                <Form>
                    <Form.Group className="mb-3" controlId="formProductName">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter product name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBrand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" placeholder="Enter brand" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter description" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formYearProduced">
                        <Form.Label>Year Produced</Form.Label>
                        <Form.Control type="date" placeholder="Enter year produced" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFavorites">
                        <Form.Label>Favorites</Form.Label>
                        <Form.Control type="number" placeholder="Enter favorites" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter price" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCondition">
                        <Form.Label>Condition</Form.Label>

                        <Form.Control type="text" placeholder="Enter condition" />
                    </Form.Group>
                    {/* submit button */}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </Form>
            </Col>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {data && <div className="alert alert-success" role="alert">User created successfully</div>}
        </Row>
    </Container>
  );
}
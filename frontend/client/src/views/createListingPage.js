import '../css/create-listing-styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Row, Col } from 'react-bootstrap';


export default function CreateListingPage() {
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
        </Row>
    </Container>
  );
}
import '../css/search-styles.css'

import '../css/search-styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Table, Button, Card } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';


const SEARCH_POSTS = gql`
    query searchPosts($name: String, $brand: String, $condition: String, $price: Float, $yearProduced: String) {
        searchPosts(name: $name, brand: $brand, condition: $condition, price: $price, yearProduced: $yearProduced){
            id
            name
            brand
            yearProduced
            description
            price
            condition
        }
    }
`;



export default function SearchFeedPage() {

    const [error, setError] = useState();
    const [data, setData] = useState();
    const {isEmpty, setIsEmpty} = useState(true);

    const { loading, data: postData } = useQuery(SEARCH_POSTS, {
        onError: (error) => {
            setError(error.message);
        },
        onCompleted: (data) => {
            setData(data);
            setError(null);
        }
    });

    return (
        <>
        
        <Container>
            <Form>
                <Form.Group>
                    <Form.Control type="text" placeholder="Search for a product..." />
                </Form.Group>
            </Form>
        </Container>
        <Container style={{display: 'flex', justifyContent: 'center'}}>
            <Row xs={1} md={3}>

                {data && data.searchPosts && data.searchPosts.map((post) => (
                    <Col key={post.id}>
                        <Card>
                            <Card.Img variant="top" src={require(`../images/Fender.jpg`)} />
                            <Card.Body>
                                <Card.Title>{post.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{post.brand}</Card.Subtitle>
                                <Card.Text>{post.description}</Card.Text>
                                <Link to={`/product/${post.id}`}>View Product</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
        </>

    );
}
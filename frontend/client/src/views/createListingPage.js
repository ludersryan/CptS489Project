import '../css/create-listing-styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import UserContext from '../auth/userContext';


export const ADD_POST = gql`
    mutation AddPost($name: String!, $brand: String!, $yearProduced: String, $description: String, $favorites: Int, $price: Float!, $condition: PostCondition, $userId: ID!) {
        addPost(name: $name, brand: $brand, yearProduced: $yearProduced, description: $description, favorites: $favorites, price: $price, condition: $condition, userId: $userId){
            id
        }
    }
`;

export const GET_USER_LISTING_COUNT = gql`
    query user($id: ID!) {
        user(id: $id){
            totalListings
        }
    }
`;

export const UPDATE_USER_TOTAL_LISTINGS = gql`
    mutation updateUser($id: ID!, $totalListings: Int!) {
        updateUser(id: $id, totalListings: $totalListings){
            id
        }
    }
`;





export default function CreateListingPage() {
    const [error, setError] = useState();
    const [data, setData] = useState();
    const { user } = useContext(UserContext);
    const userId = user ? user.id : null;

    const [mutate] = useMutation(ADD_POST, {
        onError: (error) => {
            setError(error.message);
        },
        onCompleted: (data) => {
            if(data.addPost){
                const userListingCount = getUserListingData?.user?.totalListings ?? 0;
                const updatedUserListingCount = userListingCount + 1;
                updateUser({variables: {id: userId, totalListings: updatedUserListingCount}});
                setData(data);
                setError(null);
                resetForm();
            }
        }

    });

    const { data: getUserListingData, loading: getUserListingLoading, error:  getUserListingError } = useQuery(GET_USER_LISTING_COUNT, {
        variables: {id: userId},
        onError: (error) => {
            setError(error.message);
        }
    });



    
    

    const [updateUser] = useMutation(UPDATE_USER_TOTAL_LISTINGS, {
        onError: (error) => {
            setError(error.message);
        }
    });

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setData(null);
        let ISO = null;

        if(e.target.elements.formYearProduced.value){
            console.log(e.target.elements.formYearProduced.value);
            let dateProduced = new Date(e.target.elements.formYearProduced.value);
            ISO = dateProduced.toISOString();
        }

        let values = {
            name: e.target.elements.formProductName.value,
            brand: e.target.elements.formBrand.value,
            yearProduced: ISO,
            description: e.target.elements.formDescription.value,
            price: parseFloat(e.target.elements.formPrice.value),
            condition: e.target.elements.formCondition.value,
            userId: localStorage.getItem('id')
        };

        try{
            // loop through the value object and only use the values that are not empty
            const response = await mutate({
                variables: {...values, favorites: 0},
            });
            if(response.data.addPost){
                setData(response.data);
                setError(null);
                resetForm();
            }

        } catch(err){
            console.error('Mutation error:', err)
            setError(err.message);
        }
    }

    const resetForm = () => {
        document.getElementById('createListingForm').reset();
    }

    if(getUserListingLoading) return <p>Loading...</p>;
    if(getUserListingError) return <p>Error: {getUserListingError.message}</p>;
    
    
  return (
    <Container>
        <Row>
            <Col>
                <img src={require('../images/Fender.jpg')} alt="Item-image1" className="image"/>
            </Col>
            <Col>
                <Form
                    onSubmit= {(e) => {
                        e.preventDefault();
                        handleSubmit(e);
                    }
                    } id='createListingForm'
                >
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
                    <Form.Group className="mb-3" controlId="formPrice">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter price" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCondition">
                        <Form.Label>Condition</Form.Label>
                        <Form.Control as="select">
                            <option value="Mint">Mint</option>
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                            <option value="Poor">Poor</option>
                            <option value="For parts or not working">For parts or not working</option>
                            <option value="N/A">N/A</option>
                        </Form.Control>


                    </Form.Group>
                    <Button type="submit" id="login-btn">
                    Submit
                    </Button>
                </Form>
            </Col>
            {error && <div className="alert alert-danger" role="alert">{error}</div>}
            {data && <div className="alert alert-success" role="alert">Post created successfully</div>}
        </Row>
    </Container>
  );
}
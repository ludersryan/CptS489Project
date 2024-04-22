import '../css/product-listing-styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import UserContext from '../auth/userContext';




export const GET_POST = gql`
    query GetPost($id: ID!) {
        post(id: $id){
            id
            name
            price
            brand
            condition
            description
            yearProduced
            favorites
        }
    }
`;


export const ADD_WISHLIST = gql`
    mutation AddToWishList($userId: ID!, $postId: ID!) {
        addToWishList(userId: $userId, postId: $postId){
            userId
            postId
        }
    }
`;


{/* <Route path = "/product/:id" element={<productListingPage/>}/> */}

export default function ProductListingPage() {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const userId = user ? user.id : null;
    

    const [mutate] = useMutation(ADD_WISHLIST, {
        onError: (error) => {
            console.error('Mutation error:', error)
            setError(error.message);
        },
        onCompleted: (data) => {
            if (data.addToWishList) {
                console.log('Added to wishlist', data.addToWishList);
                setError(null);
                setData(data);
            } else {
                console.log('Not added to wishlist', data.addToWishList);
                setError('Not added to wishlist');
            }
        }
    });

    const { loading, data: postData } = useQuery(GET_POST, {
        variables: { id: id },
        onError: (error) => {
            setError(error.message);
            setData(null);
        },
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userId) {
            alert('Please login to add to wishlist');
            return;
        }
        try {
            const response = await mutate({
                variables: {
                    userId: userId,
                    postId: id
                }
            });
            if (response.data.addToWishList) {
                setError(null);
                setData(response.data);
            }
        }
        catch (err) {
            console.error('Mutation error:', err)

        }
    }




    return (
        <Container className="mt-4">
            {loading && <p>Loading...</p>}
            {postData && (
                <Card className="card-custom">
                    <Card.Body>
                        <Card.Title className="card-title-custom">{postData.post.name}</Card.Title>
                        <Card.Img src={require('../images/Fender.jpg')} alt="Item-image1" className="image"/>
                        <Card.Subtitle className="mb-2 text-muted">{postData.post.brand}</Card.Subtitle>
                        <Card.Text className="card-text-custom">{postData.post.description}</Card.Text>
                        <Card.Text className="card-text-custom">Price: ${postData.post.price}</Card.Text>
                        <Card.Text className="card-text-custom">Condition: {postData.post.condition}</Card.Text>
                        <Card.Text className="card-text-custom">Year Produced: {postData.post.yearProduced}</Card.Text>
                        <Button className="card-button-custom" onClick={handleSubmit}>Add to Wishlist</Button>
                    </Card.Body>
                    {data && <div className="alert alert-success" role="alert">Item Added to Wishlist!</div>}
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                </Card>
            )}
            
        </Container>
    );
}

import '../css/wishlist-styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useState } from 'react';
import { useContext } from 'react';
import UserContext from '../auth/userContext';
import { useMutation } from '@apollo/client';

export const GET_WISHLIST = gql` 
    query wishList($userId: ID!) {
        wishList(userId: $userId){
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


export const REMOVE_WISHLIST = gql`
    mutation RemoveFromWishList($userId: ID!, $postId: ID!) {
        removeFromWishList(userId: $userId, postId: $postId){
            userId
            postId
        }
    }
`;


export default function WishListPage() {
    const { user } = useContext(UserContext);

    const [error, setError] = useState();
    const [data, setData] = useState();
    const [removeData, setRemoveData] = useState();
    
    const userId = user ? user.id : null;

    const { loading, data: wishListData } = useQuery(GET_WISHLIST, {
        variables: { userId: userId},
        onError: (error) => {
            setError(error.message);
        },
        onCompleted: (data) => {
            setData(data);
            setError(null);
        }
    
    });



    const [mutate] = useMutation(REMOVE_WISHLIST, {
        onError: (error) => {
            setError(error.message);
        },
        onCompleted: (data) => {
            setRemoveData(data);
            setError(null);
        },
        refetchQueries: () => [{
            query: GET_WISHLIST,
            variables: { userId: userId }
        }]
    });

    const handleSubmit = async (e, postId) => {
        e.preventDefault();
        e.stopPropagation();
        try{
            const response = await mutate({
                variables: {
                    userId: userId,
                    postId: postId
                }
            });
            if(response.data.removeFromWishList){
                setRemoveData(response.data);
                setError(null);
            }
        }
        catch(err){
            console.error('Mutation error:', err)
        }
    }


    return ( // Return loops, I believe, unless my computer lied to me....
        <div className="container">
            <h1 className="wishlist-title"><b>My Wishlist</b></h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && data.wishList && (
                <table className="wishlist-table">
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Price</th>
                            <th>Condition</th>
                            <th>Description</th>
                            <th>Year Produced</th>
                        </tr>
                    </thead>
                    <tbody>
                        {console.log(data.wishList)}
                        {data.wishList.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.condition}</td>
                                <td>{item.description}</td>
                                <td>{item.yearProduced}</td>
                                <td><button onClick={(e) => handleSubmit(e, item.id)}>Remove</button></td>
                            </tr>
                        ))}


                    </tbody>
                </table>
            )}
        </div>
    );

}
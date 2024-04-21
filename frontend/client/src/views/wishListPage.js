import '../css/wishlist-styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useState } from 'react';



// enter the user id of 66240ea7dd6bf32c45efaf54 to check wishlist

export const GET_WISHLIST = gql` 
    query wishList($id: ID!) {
        wishList(id: $id){
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


export default function WishListPage() {
    const [error, setError] = useState();
    const [data, setData] = useState();
    // run the query when the page is loaded

    const { loading, data: wishListData } = useQuery(GET_WISHLIST, {
        variables: { userId: '66240ea7dd6bf32c45efaf54' }, // This is hardcoded for now I think...? Right?
        
        // variables: { id: localStorage.getItem(id)} // ? Why not this?

        onError: (error) => {
            setError(error.message);
        },
        onCompleted: (data) => {
            setData(data);
            setError(null);
        }
    });

    return (
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
                            <th>User</th>
                            <th>Stock</th>
                            <th>Added Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.wishList.map(item => (
                            <tr key={item.userId}>
                                <td>
                                    <img src={`../images/${item.image}`} alt={item.name} />
                                    <span>{item.name}</span>
                                </td>
                                <td>${item.price}</td>
                                <td>{item.user}</td>
                                <td>{item.stock}</td>
                                <td>{item.addedDate}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );

}


    /*
    const handleRefreshedList = (e) => {
        e.preventDefault(); // Not sure that e is needed here....
        setError(null);
        // setData(null);

        // Forever loop to display wishlist
        while (true) {
            try {
                if (loading) {
                    // Any Loading action?
                }
                else {
    
                    // Trying:
                    const browserUserID = localStorage.getItem('id');
                    // const response = await wishListData({
                    const response = wishListData({
                        variables: {
                        // e.target.elements.
                        }

                    });
                    
                }

                if(response.data.wishList){

                    // setData(response.data);
                    setError(null);
    
                }

            } catch(err){
                console.error('Query error:', err)
                // not -> if (error) return `Error! ${error}`; ?
            }     
            

        }


    }

    

    

    return (

        
        <div className="container">

        <h1 className="wishlist-title"><b>My Wishlist</b></h1>
        
        <table className="wishlist-table">

            <thead>

                <tr>

                    <th>Product name</th>
                    <th>Price</th>
                    <th>User</th>
                    <th>Stock</th>
                    <th></th> 

                </tr>

            </thead>

            <tbody>

                <tr>

                    <td>

                        <img src="../images/wishlistitem1.jpg" alt="Item 1"/>
                        <span>Recorder</span>

                    </td>

                    <td>$100</td>
                    <td>Gregory Smith</td>
                    <td>In Stock</td>
                    
                    <td className="added-date">Added: <span className="transparent-text">2024-03-06</span></td>
                
                </tr>

                <tr>

                    <td>
                        
                        <img src="../images/wishlistitem2.jpg" alt="Item 2"/>
                        <span>Ukulele</span>

                    </td>

                    <td>$80</td>
                    <td>Joeseph Goagain</td>
                    <td>In Stock</td>
                    
                    <td className="added-date">Added: <span className="transparent-text">2024-03-05</span></td>

                </tr>

                <tr>

                    <td>

                        <img src="../images/wishlistitem3.jpg" alt="Item 3"/>
                        <span>Drum</span>

                    </td>

                    <td>$120</td>
                    <td>William Taft</td>
                    <td>Unavailable</td>

                    <td className="added-date">Added: <span className="transparent-text">2024-03-04</span></td>

                </tr>

            </tbody>

        </table>

    </div>
    );
    
}*/

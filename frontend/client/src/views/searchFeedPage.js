import '../css/search-styles.css'

import '../css/search-styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Table, Button, Card } from 'react-bootstrap';
import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';


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
        <Container>
            <Form>
                <Form.Group>
                    <Form.Control type="text" placeholder="Search for a product..." />
                </Form.Group>
            </Form>
            <Card>
                {data && data.searchPosts && (
                    data.searchPosts.map((post) => (
                        <Card.Body key={post.id}>
                            {/* card image need to haev require*/}

                            <Card.Img variant="top" src={require('../images/Fender.jpg')} alt="Item-image1" className="image" />
                            <Card.Title>{post.name}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{post.brand}</Card.Subtitle>
                            <Card.Text>{post.description}</Card.Text>
                            <Link to={`/product/${post.id}`}>View Product</Link>
                        </Card.Body>
                    ))
                )}

            </Card>


        </Container>

    );
}

// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Form } from 'react-bootstrap';
// import { gql, useQuery } from '@apollo/client';


// export default function SearchFeedPage() {
//     return (
//         <div className="container">
        
//         <div className="search-bar">

//             <h1><b>Search</b></h1>

//             <input type="text" id="search-input" placeholder="Search for instruments..."/>
//             <button id="search-btn">Search</button>

//         </div>
        
//         <div className="filter-options">

//             <h2>Filter Options</h2>

//             <label htmlFor="distance-filter">Distance:</label>
//             <select id="distance-filter">

//                 <option value="0-50">0-50 miles</option>
//                 <option value="50-100">50-100 miles</option>
//                 <option value="100-200">100-200 miles</option>
//                 <option value="200+">200+ miles</option>

//             </select>
            
//             <label htmlFor="condition-filter">Condition:</label>
//             <select id="condition-filter">

//                 <option value="new">New</option>
//                 <option value="used">Used</option>
//                 <option value="like-new">Like New</option>
//                 <option value="fair">Fair</option>

//             </select>

//             <label htmlFor="recommendations-filter">Recommendations:</label>
//             <select id="recommendations-filter">

//                 <option value="none">None</option>
//                 <option value="by-occupation">By Occupation</option>
//                 <option value="by-previous-sells">By Previous Transations</option>

//             </select>

//         </div>
        
//         <div className="search-results">

//             <table>

//                 <thead>

//                     <tr>

//                         <th>Item</th>
//                         <th>Title</th>
//                         <th>Price</th>
//                         <th>Details</th>

//                     </tr>

//                 </thead>

//                 <tbody>

//                     <tr>

//                         <td><img src="../images/Epiphone-Ruby-Red-Metallic.jpg" alt="Item 1"/></td>

//                         <td>
//                             <h3>Epiphone Electric</h3>
//                             <p>Ruby Red Metallic</p>
//                             <p className="small-text">Electric Guitar</p>
//                         </td>

//                         <td><span className="price">$1500</span></td>

//                         <td>
//                             <p>Condition: Used</p>
//                             <p>Seller: James Georgo</p>
//                         </td>

//                     </tr>

//                     <tr>

//                         <td><img src="../images/Yamaha-Acoustic-Natural-Finish.jpg" alt="Item 2"/></td>

//                         <td>
//                             <h3>Yamaha Acoustic</h3>
//                             <p>Natural Finish</p>
//                             <p className="small-text">Acoustic Guitar</p>
//                         </td>

//                         <td><span className="price">$1200</span></td>

//                         <td>
//                             <p>Condition: Like New</p>
//                             <p>Seller: Lucas Arbuckle</p>
//                         </td>

//                     </tr>

//                     <tr>

//                         <td><img src="../images/Peavey-Electric.jpg" alt="Item 3"/></td>

//                         <td>
//                             <h3>Peavey Electric</h3>
//                             <p>Natural Finish</p>
//                             <p className="small-text">Electric Guitar</p>
//                         </td>

//                         <td><span className="price">$800</span></td>

//                         <td>
//                             <p>Condition: New</p>
//                             <p>Seller: Halloway Smithy</p>
//                         </td>
//                     </tr>

//                 </tbody>

//             </table>

//         </div>

//     </div>
//     );
// }


// import '../css/search-styles.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Container, Form } from 'react-bootstrap';
// import { gql, useQuery } from '@apollo/client';


// export default function SearchFeedPage() {
//     return (
//         <div className="container">
        
//         <div className="search-bar">

//             <h1><b>Search</b></h1>

//             <input type="text" id="search-input" placeholder="Search for instruments..."/>
//             <button id="search-btn">Search</button>

//         </div>
        
//         <div className="filter-options">

//             <h2>Filter Options</h2>

//             <label htmlFor="distance-filter">Distance:</label>
//             <select id="distance-filter">

//                 <option value="0-50">0-50 miles</option>
//                 <option value="50-100">50-100 miles</option>
//                 <option value="100-200">100-200 miles</option>
//                 <option value="200+">200+ miles</option>

//             </select>
            
//             <label htmlFor="condition-filter">Condition:</label>
//             <select id="condition-filter">

//                 <option value="new">New</option>
//                 <option value="used">Used</option>
//                 <option value="like-new">Like New</option>
//                 <option value="fair">Fair</option>

//             </select>

//             <label htmlFor="recommendations-filter">Recommendations:</label>
//             <select id="recommendations-filter">

//                 <option value="none">None</option>
//                 <option value="by-occupation">By Occupation</option>
//                 <option value="by-previous-sells">By Previous Transations</option>

//             </select>

//         </div>
        
//         <div className="search-results">

//             <table>

//                 <thead>

//                     <tr>

//                         <th>Item</th>
//                         <th>Title</th>
//                         <th>Price</th>
//                         <th>Details</th>

//                     </tr>

//                 </thead>

//                 <tbody>

//                     <tr>

//                         <td><img src="../images/Epiphone-Ruby-Red-Metallic.jpg" alt="Item 1"/></td>

//                         <td>
//                             <h3>Epiphone Electric</h3>
//                             <p>Ruby Red Metallic</p>
//                             <p className="small-text">Electric Guitar</p>
//                         </td>

//                         <td><span className="price">$1500</span></td>

//                         <td>
//                             <p>Condition: Used</p>
//                             <p>Seller: James Georgo</p>
//                         </td>

//                     </tr>

//                     <tr>

//                         <td><img src="../images/Yamaha-Acoustic-Natural-Finish.jpg" alt="Item 2"/></td>

//                         <td>
//                             <h3>Yamaha Acoustic</h3>
//                             <p>Natural Finish</p>
//                             <p className="small-text">Acoustic Guitar</p>
//                         </td>

//                         <td><span className="price">$1200</span></td>

//                         <td>
//                             <p>Condition: Like New</p>
//                             <p>Seller: Lucas Arbuckle</p>
//                         </td>

//                     </tr>

//                     <tr>

//                         <td><img src="../images/Peavey-Electric.jpg" alt="Item 3"/></td>

//                         <td>
//                             <h3>Peavey Electric</h3>
//                             <p>Natural Finish</p>
//                             <p className="small-text">Electric Guitar</p>
//                         </td>

//                         <td><span className="price">$800</span></td>

//                         <td>
//                             <p>Condition: New</p>
//                             <p>Seller: Halloway Smithy</p>
//                         </td>
//                     </tr>

//                 </tbody>

//             </table>

//         </div>

//     </div>
//     );
// }

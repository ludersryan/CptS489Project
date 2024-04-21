import '../css/wishlist-styles.css'; // Css related things across multiple pages, I believe.
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const GET_USER = gql`
  query user($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
      dateCreated
      password
    }
  }
`;
export default function ProfilePage() {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    // const userId = "66240ea7dd6bf32c45efaf54"; // For testing, replace it with actual userId from localStorage
    const userId = localStorage.getItem('id');
  
    const { loading } = useQuery(GET_USER, {
      variables: { userId },
      onError: (error) => setError(error.message),
      onCompleted: (data) => setData(data),
    });
  
    const styles = {
      profileContainer: {
        display: 'flex',
        alignItems: 'center',
      },
      profilePicture: {
        marginRight: '20px',
      },
      profileDetails: {
        flexGrow: 1,
      },
      profileName: {
        fontSize: '24px',
        marginBottom: '10px',
      },
      profileMetaItem: {
        marginBottom: '5px',
      },
      editProfileButton: {
        marginTop: '10px',
      },
      largeText: {
        fontSize: '20px',
      },
      smallText: {
        fontSize: '16px',
      },
      fieldName: {
        fontWeight: 'bold',
      },
      viewWishlistLink: {
        marginTop: '20px',
        display: 'block',
        fontSize: '18px',
      },
    };
  
    return (
      <div className="container">
        <h1><b>User Profile</b></h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && data.user && (
          <div style={styles.profileContainer}>
            <div style={styles.profilePicture}>
                <img src="../images/profile-placeholder-pic.jpg" alt="../images/profile-placeholder-pic.jpg" width="250" height="150" />            </div>
            <div style={styles.profileDetails}>
              <h2 style={styles.profileName}>{data.user.name}</h2>
              <div>
                <p style={styles.profileMetaItem}>Account ID: {data.user.id}</p>
                <p style={styles.profileMetaItem}>Email: {data.user.email}</p>
                <p style={styles.profileMetaItem}>Member Since: {data.user.dateCreated}</p>
                <p style={styles.profileMetaItem}>Password (hashed): {data.user.password}</p>
              </div>
              <button style={styles.editProfileButton}>Edit Profile</button>
            </div>
          </div>
        )}
        <Link to="/wishlist" style={styles.viewWishlistLink}>View My Wishlist</Link>
      </div>
    );
  }

/*
export default function ProfilePage() {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const userId = "66240ea7dd6bf32c45efaf54"; // For testing, replace it with actual userId from localStorage
  
    const { loading } = useQuery(GET_USER, {
      variables: { userId },
      onError: (error) => setError(error.message),
      onCompleted: (data) => setData(data),
    });
  
    return (
      <div className="container">
        <h1><b>User Profile</b></h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && data.user && (
          <div className="profile-info">
            <div className="profile-picture">
              <img src="../images/profile-placeholder-pic.jpg" alt="Profile" />
            </div>
            <div className="profile-details">
              <h2 className="profile-name">{data.user.name}</h2>
              <div className="profile-meta">
                <p className="profile-meta-item">Location: PLACEHOLDERTEXT</p>
                <p className="profile-meta-item">Member Since: {data.user.dateCreated}</p>
                <p className="profile-meta-item">Last Active: PLACEHOLDERTEXT</p>
              </div>
              <button className="edit-profile-button">Edit Profile</button>
            </div>
          </div>
        )}
        <div className="reviews">
          <h2 className="large-text"><b>Recent Reviews</b></h2>
          <div className="review-item">
            <p className="small-text">From: PLACEHOLDERTEXT</p>
            <p className="small-text">Rating: PLACEHOLDERTEXT</p>
            <p>PLACEHOLDERTEXT</p>
          </div>
          <div className="review-item">
            <p className="small-text">From: PLACEHOLDERTEXT</p>
            <p className="small-text">Rating: PLACEHOLDERTEXT</p>
            <p>PLACEHOLDERTEXT</p>
          </div>
        </div>
        <div className="additional-info">
          <h2 className="large-text"><b>Additional Information</b></h2>
          <div className="info-item">
            <p><span className="field-name">Total Listings:</span> PLACEHOLDERTEXT</p>
            <p><span className="field-name">Items Sold:</span> PLACEHOLDERTEXT</p>
            <p><span className="field-name">Items Bought:</span> PLACEHOLDERTEXT</p>
            <p><span className="field-name">Average Rating:</span> PLACEHOLDERTEXT</p>
            <p><span className="field-name">Payment Methods:</span> PLACEHOLDERTEXT</p>
            <p><span className="field-name">Shipping Preferences:</span> PLACEHOLDERTEXT</p>
            <p><span className="field-name">Contact Information:</span> PLACEHOLDERTEXT</p>
            <p><span className="field-name">About Me:</span> PLACEHOLDERTEXT</p>
          </div>
        </div>
        <div className="toWishlist">
          <Link to="/wishlist"><h2 className="large-text"><b>View My Wishlist</b></h2></Link>
        </div>
      </div>
    );
  }
*/


/*
export default function ProfilePage() {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    const userId = "66240ea7dd6bf32c45efaf54"; // For testing, replace it with actual userId from localStorage
  
    const { loading } = useQuery(GET_USER, {
      variables: { userId },
      onError: (error) => setError(error.message),
      onCompleted: (data) => setData(data),
    });
  
    return (
      <div className="container">
        <h1><b>User Profile</b></h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {data && data.user && (
          <div className="profile-info">
            <div className="profile-picture">
              <img src="../images/profile-placeholder-pic.jpg" alt="Profile" />
            </div>
            <div className="profile-details">
              <h2 className="large-text">{data.user.name}</h2>
              <p className="small-text">Location: PLACEHOLDERTEXT</p>
              <p className="small-text">Member Since: {data.user.dateCreated}</p>
              <p className="small-text">Last Active: PLACEHOLDERTEXT</p>
              <button>Edit Profile</button>
            </div>
          </div>
        )}
        <div className="reviews">
          <h2 className="large-text"><b>Recent Reviews</b></h2>
          <div className="review-item">
            <p className="small-text">From: PLACEHOLDERTEXT</p>
            <p className="small-text">Rating: PLACEHOLDERTEXT</p>
            <p>PLACEHOLDERTEXT</p>
          </div>
          <div className="review-item">
            <p className="small-text">From: PLACEHOLDERTEXT</p>
            <p className="small-text">Rating: PLACEHOLDERTEXT</p>
            <p>PLACEHOLDERTEXT</p>
          </div>
        </div>
        <div className="additional-info">
          <h2 className="large-text"><b>Additional Information</b></h2>
          <p><span className="field-name">Member Since:</span> {data && data.user.dateCreated}</p>
          <p><span className="field-name">Total Listings:</span> PLACEHOLDERTEXT</p>
          <p><span className="field-name">Items Sold:</span> PLACEHOLDERTEXT</p>
          <p><span className="field-name">Items Bought:</span> PLACEHOLDERTEXT</p>
          <p><span className="field-name">Average Rating:</span> PLACEHOLDERTEXT</p>
          <p><span className="field-name">Payment Methods:</span> PLACEHOLDERTEXT</p>
          <p><span className="field-name">Shipping Preferences:</span> PLACEHOLDERTEXT</p>
          <p><span className="field-name">Contact Information:</span> PLACEHOLDERTEXT</p>
          <p><span className="field-name">About Me:</span> PLACEHOLDERTEXT</p>
        </div>
        <div className="toWishlist">
          <Link to="/wishlist"><h2 className="large-text"><b>View My Wishlist</b></h2></Link>
        </div>
      </div>
    );
  }

  */

/*
export default function WishListPage() {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const userId = "66240ea7dd6bf32c45efaf54"; // For testing. I'll replace it with actual userId from localStorage
  // const userId = localStorage.getItem('id');

  const { loading } = useQuery(GET_USER, {
    variables: { userId },
    onError: (error) => setError(error.message),
    onCompleted: (data) => setData(data),
  });

  return (
    <div className="container">
      <h1 className="wishlist-title"><b>User Profile</b></h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && data.user && (
        <div className="profile-info">
          <div className="profile-picture">
            <img src="../images/profile-placeholder-pic.jpg" alt="../images/profile-placeholder-pic.jpg" />
          </div>
          <div className="profile-details">
            <h2 className="large-text">{data.user.name}</h2>
            <p className="small-text">Email: {data.user.email}</p>
            <p className="small-text">Member Since: {data.user.dateCreated}</p>
            <p className="small-text">Last Active: {new Date().toLocaleString()}</p>
            <button>Edit Profile</button>
          </div>
        </div>
      )}
    </div>
  );
}
*/

/*
import '../css/profile-styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

export default function ProfilePage() {
    const [userData, setUserData] = useState(null);
    const userId = localStorage.getItem('id'); // Assuming you store the user ID in localStorage

    useEffect(() => {
        // Fetch user data based on the stored user ID
        fetchUserData(userId);
    }, [userId]);

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`/api/users/${userId}`); // Replace '/api/users/' with your API endpoint
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    return (
        <div className="container">
            <h1><b>User Profile</b></h1>
            {userData ? (
                <div className="profile-info">
                    <div className="profile-details">
                        <h2 className="large-text">{userData.name}</h2>
                        <p className="small-text">Email: {userData.email}</p>
                        <p className="small-text">Member Since: {userData.dateCreated}</p>
                        <button>Edit Profile</button>
                    </div>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
            <div className="toWishlist">
                <a href="/wishlist"><h2 className="large-text"><b>View My Wishlist</b></h2></a>
            </div>
        </div>
    );
}

*/
/*
import '../css/profile-styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { useState, useEffect } from 'react';

// Define GraphQL query
export const GET_USER_PROFILE = gql`
    query getUserProfile($userId: ID!) {
        userProfile(userId: $userId){
            id
            name
            location
            memberSince
            lastActive
            reviews {
                from
                rating
                comment
            }
            additionalInfo {
                memberSince
                totalListings
                itemsSold
                itemsBought
                averageRating
                paymentMethods
                shippingPreferences
                contactInformation
                aboutMe
            }
        }
    }
`;

// Component definition
export default function ProfilePage() {
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    // Fetch user profile data
    const { loading, data: userProfileData } = useQuery(GET_USER_PROFILE, {
        variables: { userId: localStorage.getItem('id') },
        onError: (error) => {
            setError(error.message);
        },
        onCompleted: (data) => {
            setData(data);
            setError(null);
        }
    });

    useEffect(() => {
        // Perform any actions on component mount maybe needed..... Don't think so right now, though.
    }, []);

    return (
        <div className="container">
            <h1><b>User Profile</b></h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && data.userProfile && (
                <>
                    <div className="profile-info">
                        <div className="profile-picture">
                            <img src="../images/profile-placeholder-pic.jpg" alt="Profile"/>
                        </div>
                        <div className="profile-details">
                            <h2 className="large-text">{data.userProfile.name}</h2>
                            <p className="small-text">Location: {data.userProfile.location}</p>
                            <p className="small-text">Member Since: {data.userProfile.memberSince}</p>
                            <p className="small-text">Last Active: {data.userProfile.lastActive}</p>
                            <button>Edit Profile</button>
                        </div>
                    </div>
                    <div className="reviews">
                        <h2 className="large-text"><b>Recent Reviews</b></h2>
                        {data.userProfile.reviews.map((review, index) => (
                            <div key={index} className="review-item">
                                <p className="small-text">From: {review.from}</p>
                                <p className="small-text">Rating: {review.rating} stars</p>
                                <p>{review.comment}</p>
                            </div>
                        ))}
                    </div>
                    <div className="additional-info">
                        <h2 className="large-text"><b>Additional Information</b></h2>
                        {Object.entries(data.userProfile.additionalInfo).map(([key, value]) => (
                            <p key={key}><span className="field-name">{key}:</span> {value}</p>
                        ))}
                    </div>
                    <div className="toWishlist">
                        <a href="/wishlist"><h2 className="large-text"><b>View My Wishlist</b></h2></a>
                    </div>
                
         
                </>
            )}
        </div>
    );
}
*/

/*
import '../css/profile-styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function ProfilePage() {
    return (
        <div className="container">

        <h1><b>User Profile</b></h1>
        
        <div className="profile-info">

            <div className="profile-picture">

                <img src="../images/profile-placeholder-pic.jpg" alt="Profile"/>

            </div>

            <div className="profile-details">
                <h2 className="large-text">Wilbur Mudkip</h2>
                <p className="small-text">Location: North Pole, AK</p>
                <p className="small-text">Member Since: June 2019</p>
                <p className="small-text">Last Active: 2 hours ago</p>
                <button>Edit Profile</button>
            </div>

        </div>
        
        <div className="reviews">

            <h2 className="large-text"><b>Recent Reviews</b></h2>

            <div className="review-item">
                <p className="small-text">From: Rebecca Lionheart</p>
                <p className="small-text">Rating: 5 stars</p>
                <p>Very friendly and handled my questions well! Instrument shipped fast, and was in proper, listed condition..</p>
            </div>

            <div className="review-item">
                <p className="small-text">From: Gregory Felix</p>
                <p className="small-text">Rating: 4 stars</p>
                <p>D+Rep. I will certainly be buying from this good sir again. My drumkit, while slightly dusty, sounds great! </p>
            </div>

        </div>
        
        <div className="additional-info">
            <h2 className="large-text"><b>Additional Information</b></h2>
            <p><span className="field-name">Member Since:</span> June 2019</p>
            <p><span className="field-name">Total Listings:</span> 20</p>
            <p><span className="field-name">Items Sold:</span> 15</p>
            <p><span className="field-name">Items Bought:</span> 10</p>
            <p><span className="field-name">Average Rating:</span> 4.5 stars</p>
            <p><span className="field-name">Payment Methods:</span> Visa, Mastercard, PayPal</p>
            <p><span className="field-name">Shipping Preferences:</span> Priority Mail, FedEx</p>
            <p><span className="field-name">Contact Information:</span> Wilbur.Mudkip@pokemon.com</p>
            <p><span className="field-name">About Me:</span> The trade of musical instruments simply fills my heart with joy. Father of two. </p>

        </div>

        <div className="toWishlist">

            

            <a href="/wishlist"><h2 className="large-text"><b>View My Wishlist</b></h2></a>

        </div>

    </div>
    );
}
*/
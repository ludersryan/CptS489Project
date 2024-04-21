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

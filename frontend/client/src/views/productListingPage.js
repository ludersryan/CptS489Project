import '../css/product-listing-styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function productListingPage() {
    return (
        <div id="page-content">
            <div className="container">
                <div className="left-section">
                    <img src="../images/Yamaha-Acoustic-Natural-Finish.jpg" alt="Item-image1" className="image"/>
                </div>
                <div className="right-section">
                    <h1>Yamaha Acoustic</h1>
                    <h2>$1200.00</h2>
                    <p><b>Seller:</b> Lucas Arbuckle</p>
                    <p><b>Condition:</b> New</p>
                    <p>Lucas Arbuckle has been breathing new life into vintage acoustic instruments with a focus on sustainability and crafstmanship for over 25 years.</p>

                    <div className="button-container">
                        <button type="submit" className="button" id="purchase-btn">purchase</button>
                        <button type="submit" className="button" id="favorite-btn">favorite (43)</button>
                        <button type="submit" className="button" id="message-btn">message</button>
                    </div>
                    <p><b>User Reviews</b></p>
                    <div className="review-box">
                        <div className="review-date">March 25th, 2023</div>
                        <div className="review-rating">4.5 / 5</div>
                        <div className="review-item">Fender Acoustic Guitar</div>
                        <div className="review-description">Guitar came in perfect condition for a great price!</div>
                    </div>
                    <div className="review-box">
                        <div className="review-date">January 3rd, 2023</div>
                        <div className="review-rating">4 / 5</div>
                        <div className="review-item">Yamaha Acoustic</div>
                        <div className="review-description">Guitar had some visible scratches.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

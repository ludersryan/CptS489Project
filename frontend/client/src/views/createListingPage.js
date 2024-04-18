import '../css/create-listing-styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateListingPage() {
  return (
    <>
        <div id="nav-placeholder"></div>
        <div id="page-content">
            <div className="container">
            
                <h1><b>Create Post</b></h1>
                <div className="contact-form">
                    <div className="content">
                        <div className="left-section">
                            <img src="../images/assets/upload-image.PNG" alt="Item-image1" className="image"/>
                        </div>
                        <div className = "right-section">
                            <label for="product-name"><b>Product Name</b></label>
                            <input type="text" id="product-name" name="product-name"/>
                            <label for="condition"><b>Condition</b></label>
                            <select id="condition" name="condition" className="form-control">
                                <option value="">Select Condition</option>
                                <option value="new">New</option>
                                <option value="like_new">Like New</option>
                                <option value="very_good">Very Good</option>
                                <option value="good">Good</option>
                                <option value="acceptable">Acceptable</option>
                                <option value="used">Used</option>
                                <option value="used">Poor</option>
                            </select>
                            <label for="product-price"><b>Price</b></label>
                            <input type="text" id="product-price" name="product-price"/>
                            <label for="fixed-price"><b>Accept Bids and Offers?</b></label>
                            <select id="fixed-price" name="fixed-price" className="form-control">
                                <option value="">Select Option</option>
                                <option value="false">Yes</option>
                                <option value="true">No</option>
                            </select>
                            <button type="submit" className="button">create posting</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  );
}

export default CreateListingPage;
import '../css/support-styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';



export default function SupportPage() {
    return (
        <div id="page-content">

        <div className="container">
        
            <h1><b>Support</b></h1>
            <p className="large-text">Need help? Reach our support team with the Contact Us field!</p>

        </div>

        <div className="container">

            <h1>Contact Us</h1>
            <p className="large-text">How can we help?</p>
            <p>Send a message to our help center for quick solutions.</p>
            
            <div className="contact-form">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" placeholder="Your email address"/>


                <label for="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="Your email address"/>
                
                <label for="listing-url">Listing URL</label>
                <input type="text" id="listing-url" name="listing-url" placeholder="Link to the listing"/>
                
                <div>

                    <label for="request-reason">I need help with...</label>
                    <select id="request-reason" name="request-reason">

                        <option value="instrument-damage">Instrument Damage</option>
                        <option value="returns">Returns</option>
                        <option value="reports">Reports</option>
                        <option value="account-issues">Account Issues</option>
                        <option value="payment">Payment</option>
                        <option value="legal">Legal</option>
                        <option value="shipping">Shipping</option>
                        <option value="other">Other</option>

                    </select>

                </div>
                
                <label for="issue-description">Describe your issue</label>
                <input type="text" id="issue-description" name="issue-description" placeholder="Type the description of your issue here..."/>
                
                <button type="submit" id="send-btn">SEND</button>

            </div>

        </div>

    </div>
    );
}


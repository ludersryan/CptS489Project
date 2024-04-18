import '../css/login-styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';



export default function LoginPage() {
    return (
        <div id="page-content">
            <div className="container">
                <h1><b>Login</b></h1>
                <div className="contact-form">
                    <label for="email"><b>Email</b></label>
                    <input type="email" id="email" name="email"/>
                    <label for="password"><b>Password</b></label>
                    <input type="text" id="password" name="password"/>
                    <button type="submit" id="login-btn">LOG IN</button>
                </div>
            </div>
        </div>
    );
}
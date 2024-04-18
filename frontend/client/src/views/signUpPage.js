import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



export default function SignUpPage() {
    return (
        <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
            We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>

        <Form.Label htmlFor="inputPassword5">Password</Form.Label>
        <Form.Control
            type="password"
            id="inputPassword5"
            aria-describedby="passwordHelpBlock"
        />
        <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters and numbers,
            and must not contain spaces, special characters, or emoji.
        </Form.Text>
        <Button variant="primary" type="submit">
            Submit
        </Button>
    </Form>
    );
}

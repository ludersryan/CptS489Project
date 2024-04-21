import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function FooterBar() {
  return (
    <>
    <footer className="bg-body-secondary text-center text-lg-start" id="global-footer">
        <div className="text-center p-3" id="footer-div">
            <a className="btn btn-outline-primary btn-floating m-1" href="#!" role="button">
                <i className="fab fa-facebook-f"></i>
            </a>
            <a className="btn btn-outline-primary btn-floating m-1" href="#!" role="button">
                <i className="fab fa-twitter"></i>
            </a>
            <a className="btn btn-outline-primary btn-floating m-1" href="#!" role="button">
                <i className="fab fa-google"></i>
            </a>
            <a className="btn btn-outline-primary btn-floating m-1" href="#!" role="button">
                <i className="fab fa-instagram"></i>
            </a>
            <a className="btn btn-outline-primary btn-floating m-1" href="#!" role="button">
                <i className="fab fa-linkedin"></i>
            </a>
            <a className="btn btn-outline-primary btn-floating m-1" href="#!" role="button">
                <i className="fab fa-github"></i>
            </a>
        </div> 
        <p className="text-center">Copyright 2024 : CPTS 489</p>
    </footer>
    </>
  );
}
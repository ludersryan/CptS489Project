import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function FooterBar() {
  return (
    <>
    <footer class="bg-body-secondary text-center text-lg-start" id="global-footer">
        <div class="text-center p-3" id="footer-div">
            <a class="btn btn-outline-primary btn-floating m-1" href="#!" role="button">
                <i class="fab fa-facebook-f"></i>
            </a>
            <a class="btn btn-outline-primary btn-floating m-1" href="#!" role="button">
                <i class="fab fa-twitter"></i>
            </a>
            <a class="btn btn-outline-primary btn-floating m-1" href="#!" role="button">
                <i class="fab fa-google"></i>
            </a>
            <a class="btn btn-outline-primary btn-floating m-1" href="#!" role="button">
                <i class="fab fa-instagram"></i>
            </a>
            <a class="btn btn-outline-primary btn-floating m-1" href="#!" role="button">
                <i class="fab fa-linkedin"></i>
            </a>
            <a class="btn btn-outline-primary btn-floating m-1" href="#!" role="button">
                <i class="fab fa-github"></i>
            </a>
        </div> 
        <p class="text-center">Copyright 2024 : CPTS 489</p>
    </footer>
    </>
  );
}

export default FooterBar;

import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Link } from 'react-router-dom'

export default function NavBar() {

  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" id="global-top-nav">
            <div className="container-fluid">
            <a className="navbar-brand" href="./index.html">SoundSwap</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <form className="d-flex w-50">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" id="global-search-button" type="submit">SEARCH</button>
                </form>
                <div className="d-flex w-50" id="navbar-div">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to = '/' className="nav-link active" aria-current="page" >HOME</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-primary" id="global-sell-button" aria-pressed="false">SELL</button>
                        </li>
                        <li className="nav-item">
                            <Link to = '/Search' className="nav-link">SHOP</Link>
                        </li>
                        <li className="nav-item">
                            <Link to = '/Legal' className="nav-link">LEGAL</Link>
                        </li>
                        <div className = "btn-group" id="nav-btn-group">
                            <button className="btn btn-outline-primary me-4" id="global-login-button" aria-pressed="false">LOGIN</button>
                            <button className="btn btn-outline-primary" id="global-signup-button" aria-pressed="false">SIGN UP</button>
                        </div>
                    </ul>
                    </div>
            </div>
            </div>
        </nav>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" id="global-lower-nav">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mx-auto mb-2 mb-lg-0" id="global-lower-nav-list">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">GUITARS</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">DRUMS</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">PEDALS AND AMPLIFIERS</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">KEYBOARDS</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">RECORDING</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">DJ AND LIGHTING</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">ACCESSORIES</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">SOFTWARE</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  );
}

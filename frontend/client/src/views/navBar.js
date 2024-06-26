import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import React from 'react';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import UserContext from '../auth/userContext';
import { useContext } from 'react';


export default function NavBar() {
    const { user, logout } = useContext(UserContext);
    
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" id="global-top-nav">
            <div className="container-fluid">
            <a className="navbar-brand" href="/">SoundSwap</a>
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
                            <Link to = '/createListing'><button className="btn btn-outline-primary" id="global-sell-button" aria-pressed="false">SELL</button></Link>
                        </li>
                        <li className="nav-item">
                            <Link to = '/Search' className="nav-link">SHOP</Link>
                        </li>
                        <li className="nav-item">
                            <Link to = '/Legal' className="nav-link">LEGAL</Link>
                        </li>
                        {user && (
                            <li className="nav-item">
                                <Link to = '/wishlist' className="nav-link">WISHLIST</Link>
                            </li>
                        )}
                        {!user ? (
                            <div className = "btn-group" id="nav-btn-group">
                                <Link to = '/login'><button className="btn btn-outline-primary me-4" id="global-login-button" aria-pressed="false">LOGIN</button></Link>
                                <Link to = '/signup'><button className="btn btn-outline-primary" id="global-signup-button" aria-pressed="false">SIGN UP</button></Link>
                            </div>
                        ) : (
                            <div className = "btn-group" id="nav-btn-group">
                                <Link to = '/profile'><button className="btn btn-outline-primary me-4" id="global-login-button" aria-pressed="false">PROFILE</button></Link>
                                <button className="btn btn-outline-primary me-4" id="global-signup-button" aria-pressed="false" onClick={logout}>LOGOUT</button>
                                
                            </div>
                        )}

                        
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
                            <Link to = '/search' className="nav-link" aria-current="page"> GUITARS</Link>
                        </li>
                        <li className="nav-item">
                            <Link to = '/search' className="nav-link" >DRUMS</Link>
                        </li>
                        <li className="nav-item">
                            <Link to = '/search' className="nav-link">PEDALS AND AMPLIFIERS</Link>
                        </li>
                        <li className="nav-item">
                            <Link to = '/search' className="nav-link" >KEYBOARDS </Link>
                        </li>
                        <li className="nav-item">
                            <Link to = '/search' className="nav-link" >RECORDING</Link>
                        </li>
                        <li className="nav-item">
                            <Link to = '/search' className="nav-link">DJ AND LIGHTING</Link>
                        </li>
                        <li className="nav-item">
                            <Link to = '/search' className="nav-link" >ACCESSORIES</Link>
                        </li>
                        <li className="nav-item">
                            <Link to = '/search' className="nav-link">SOFTWARE</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
  );
}

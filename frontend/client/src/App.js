import NavBar from "./views/navBar"
import HomePage from "./views/homePage"
import FooterBar from "./views/footer"
import SearchFeedPage from "./views/searchFeedPage";
import LegalPage from "./views/legalPage";
import LoginPage from "./views/loginPage"
import SignUpPage from "./views/signUpPage";
import CreateListingPage from "./views/createListingPage";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router";


export default function App() {
    return (
        <>
        <NavBar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path = "/search" element={<SearchFeedPage/>}/>
                <Route path = "/legal" element={<LegalPage/>}/>
                <Route path = "/login" element={<LoginPage/>}/>
                <Route path = "/signup" element={<SignUpPage/>}/>
                <Route path = "/createListing" element={<CreateListingPage/>}/>
            </Routes>
        <FooterBar/>
        </>
    );
}
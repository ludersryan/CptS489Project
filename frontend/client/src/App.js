import NavBar from "./views/navBar"
import HomePage from "./views/homePage"
import FooterBar from "./views/footer"
import SearchFeedPage from "./views/searchFeedPage";
import LegalPage from "./views/legalPage";
import LoginPage from "./views/loginPage"
import SignUpPage from "./views/signUpPage";
import CreateListingPage from "./views/createListingPage";
import ProfilePage from "./views/profilePage";
import WishList from "./views/wishListPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router";

import RequireAuth from "./auth/requireAuth";



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
                    <Route element={ <RequireAuth /> }>
                        <Route path = "/profile" element={<ProfilePage/>}/>
                        <Route path = "/wishlist" element={<WishList/>}/>
                    </Route>
                </Routes>
            <FooterBar/>
        </>
    );
}
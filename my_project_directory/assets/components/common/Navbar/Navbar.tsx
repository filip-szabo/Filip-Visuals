import React from "react";
import './Navbar.css';
import { Link} from "react-router-dom";
function Navbar() {

    const isLoggedIn = sessionStorage.getItem('user');
    const user = isLoggedIn ? JSON.parse(isLoggedIn) : null;
    const role = user?.role;

    const handleLogout = () => {
        sessionStorage.removeItem('user');
        fetch("http://127.0.0.1:8000/session_stop", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json',
            },
            body: JSON.stringify({

            }),
        }).then(response => {
            return response.json();
        }).then(response => {
            const redirectUrl = response.redirectUrl;
            if (redirectUrl) {
                window.location.href= redirectUrl;
            }
        });
    };

    return (
        <nav>
            <h1> FilipVisuals </h1>

            <div className="nav-links">
                <Link to={"/"}>Home</Link>
                <Link to={"/about-us"}>About Us</Link>
                {isLoggedIn ? (
                    <>
                        {role === "Admin" ? (
                            <Link to={"/admin-page"}>Admin Page</Link>
                        ) : (
                            <Link to={"/user-page"}>User Page</Link>
                        )}
                        <Link to={"/logout"} onClick={handleLogout}>
                            Logout
                        </Link>
                    </>
                ) : (
                    <Link to={"/login"}>Log In</Link>
                )}
            </div>
            {!isLoggedIn && (
                <div className="signup-button">
                    <Link to={"/register"}>Sign Up</Link>
                </div>
            )}

            <ul>
                <li><a><i className="bi bi-list dropdown-button"></i></a>
                    <ul>
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/about-us"}>About me</Link></li>
                        <li><Link to={"/login"}>Log In</Link></li>
                        <li><Link to={"/register"}>Sign Up</Link></li>
                    </ul>
                </li>
            </ul>
        </nav>
        
    );
}

export default Navbar;

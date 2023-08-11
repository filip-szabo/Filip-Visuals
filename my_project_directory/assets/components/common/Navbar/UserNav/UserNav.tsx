import React from "react";
import "./UserNav.css";
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
function UserNav() {

    const logoutUser = (e:any) => {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/logout_user", {
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
            sessionStorage.clear();
            const redirectUrl = response.redirectUrl;
            if (redirectUrl) {
                window.location.href= redirectUrl;
            }
        });
    }

    return (
        <>
            <nav>
                <h1>FilipVisuals</h1>
                <div className="user-nav">
                    <Link to={"/"}>Home Page </Link>
                    <Link to={"/user-page"}>User Page </Link>
                </div>
                <Button variant="contained" size="large" onClick={logoutUser}>
                    Log Out
                </Button>
            </nav>
        </>
    );
}

export default UserNav;
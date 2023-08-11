import React from 'react';
import './UserPage.css';
import {Link} from "react-router-dom";
import UserNav from "../common/Navbar/UserNav/UserNav";

function UserPage() {

    const userSet = sessionStorage.getItem('user');
    const user = userSet ? JSON.parse(userSet) : null;
    const name = user?.name;
    const album = user?.album;
    const albumType = user?.albumType;
    const packages = user?.package;
    return (
        <div className="user-body">
            <UserNav/>
            <div className="user-page">
                <h1>Hello, <span>{name}!</span></h1>

                <div className="container-user">

                    <div className="user-context">
                        <div className="column column1">
                            <h2> Photos:</h2>
                            <p>I'm happy that I had the chance <br/>to take your photos. <Link to={"/see-images"}>Watch all the photos.</Link></p>

                        </div>
                        {album ? (
                            <div className="column column2">
                                <h2> Album/packages:</h2>
                                <p>Thank you for choosing the album and the package that you want.</p>
                            </div>

                        ) : (
                            <div className="column column2">
                                <h2> Album/packages</h2>
                                <p>It seems that you have not selected your album type.</p>
                                <Link to={"/albums-and-features"}>Albums and features</Link>
                            </div>

                        )}
                        {album ? (
                            <div className="column column3">
                                <h2>Your order: <span>COMPLETE</span></h2>
                                <div className="column3-context">
                                    <p>Album: {album}</p>
                                    <p>AlbumType: {albumType}</p>
                                    <p>Package: {packages}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="column column3">
                                <h2>Your order: PENDING</h2>
                                <div className="column3-context">
                                    <p>Album: -pending-</p>
                                    <p>AlbumType: -pending-</p>
                                    <p>Package: -pending-</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPage;
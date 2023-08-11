import React from "react";
import './AdminPage.css';
import {Link} from "react-router-dom";
import AdminNav from "../common/Navbar/AdminNav/AdminNav";

function AdminPage() {
    return (
        <>
            <div className="admin-background">
                <AdminNav />
                <div className="container admin-tools">
                    <h1>Welcome home!</h1>
                    <div className="options">
                        <Link to={"/show-users"}>Users list</Link>
                        <Link to={"/create-user"}>Create user</Link>
                        <Link to={"/add-attributes"}>Add city/school/class</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminPage;
import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './components/Home/Home';
import {Route, Routes} from 'react-router-dom';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AboutUs from "./components/about/AboutUs";
import CreateUser from "./components/admin-page/create-user/CreateUser";
import AdminPage from "./components/admin-page/AdminPage";
import ShowClasses from "./components/admin-page/show-classes/ShowUsers";
import { BrowserRouter } from 'react-router-dom';
import AddAttributes from "./components/admin-page/add-attributes/AddAttributes";
import UserPage from "./components/UserPage/UserPage";
import AlbumsAndFeatures from "./components/UserPage/AlbumsAndFeatures/AlbumsAndFeatures";
import SeeImages from "./components/UserPage/SeeImages/SeeImages";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

export const setSession = () => {
    fetch("http://127.0.0.1:8000/api/session", {
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
        if(JSON.stringify(response) != '{}'){
            sessionStorage.setItem("user", response);
        }
    });
}

setSession();


root.render(
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin-page" element={<AdminPage />} />
                <Route path="/user-page" element={<UserPage />} />
                <Route path="/show-users" element={<ShowClasses />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/add-attributes" element={<AddAttributes />} />
                <Route path="/albums-and-features" element={<AlbumsAndFeatures />} />
                <Route path="/see-images" element={<SeeImages />} />
            </Routes>
    </BrowserRouter>
);



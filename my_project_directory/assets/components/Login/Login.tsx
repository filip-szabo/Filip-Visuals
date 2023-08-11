import React, {useState} from "react";
import './Login.css';
import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/Footer/Footer";
import {Link} from "react-router-dom";
import {setSession} from "../../app";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    let loginUser = (e:any) => {
        e.preventDefault();

        fetch("http://127.0.0.1:8000/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email:email,
                password:password,
            }),
        }).then(response => {
            return response.json();
        }).then(response => {
            const redirectUrl = response.redirectUrl;
            if (redirectUrl) {
                setSession();
                window.location.href= redirectUrl;
            }
            if (rememberMe) {
                document.cookie = "rememberMe=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
            } else {
                document.cookie = "rememberMe=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            }
        }).catch(error => {
            setErrorMessage("Incorrect email or password");
        });
    }

        return (
            <>
                <div className="login-background">
                    <Navbar/>
                    <div className="login-form">
                        <div className="wrapper">
                            <form id="loginForm" method="post">
                                <h1>Login</h1>

                                <div className="input-box">
                                    <input type="email" id="title" placeholder="Enter your email address" name="email"
                                           value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    <i className="bi bi-envelope"></i>
                                </div>

                                <div className="input-box">
                                    <input type="password" placeholder="Enter your password" name="password"
                                           value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    <i className="bi bi-lock"></i>
                                </div>

                                <button type="submit" id="login-button" className="btn" onClick={loginUser}>Log In</button>

                                <div className="register-link">
                                    <p>Don't have an account? <Link to={"/register"}>Register</Link> </p>
                                </div>
                                <div className="error">
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                                </div>
                            </form>

                        </div>
                    </div>
                </div>

                <Footer title={"FilipVisuals"}
                        paragraph={<p>Your dream home can now become a reality.<br/> Your most unrealistic ideas,we try
                            to materialize them.<br/> We are at your disposal and do our best <br/>to make your home
                            perfect.</p>}/>
            </>
        );
    }

export default Login;
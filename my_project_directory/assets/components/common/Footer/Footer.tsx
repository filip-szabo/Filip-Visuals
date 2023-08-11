import React, {ReactElement} from "react";
import './Footer.css';
import { Link } from "react-router-dom";
type Footer = {
    title:string;
    paragraph:ReactElement;
};

function Footer(props:Footer) {
    return (
        <div className="footer">
            <div className="footer-container">

                <div className="footer-text">
                    <h2>{props.title}</h2>
                    {props.paragraph}
                </div>

                <div className="footer-menu">
                    <h2>Menu</h2>
                    <Link to={"/"}>Home</Link>
                    <Link to={"/about-us"}>About Us</Link>
                    <Link to={"/login"}>Log In</Link>
                </div>

                <div className="footer-contact">
                    <h2>Get in touch</h2>
                    <p><i className="bi bi-envelope-at"></i> filipvisuals@gmail.com</p>
                    <p><i className="bi bi-telephone"></i> 0743663264</p>
                    <p><i className="bi bi-geo-alt"></i> Romania, Arad</p>
                    <div className="social-icons">
                        <Link to={"https://www.instagram.com/filipsvisuals/"} className="fa fa-instagram"></Link>
                        <Link to={"https://www.linkedin.com/in/filip-szabo/"} className="fa fa-linkedin"></Link>
                        <Link to={"https://www.facebook.com/profile.php?id=100006844338323"}
                           className="fa fa-facebook"></Link>
                    </div>
                </div>

                <div className="footer-newsletter">
                    <h2>Newsletter</h2>
                    <div className="footer-email">
                        <input className="form-control" type="text" placeholder="Enter your email" />
                            <div className="custom-control custom-checkbox my-1 mr-sm-2">
                                <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                    <label className="custom-control-label" htmlFor="customControlInline">Remember
                                        me</label>
                            </div>
                    </div>
                <form>
                    <button type="submit" className="btn btn-secondary btn-sm">Submit</button>
                </form>
            </div>
        </div>
        </div>
    );
}

export default Footer;
import React, {ReactElement} from "react";
import './About.css';
import CameraImage from '../../../images/camera1.jpg';
type AboutInfo = {
    title:string;
    paragraph:ReactElement;
};

function About(props:AboutInfo) {
    return (
        <div id="about-section" className="about-us">
            <div className="about-image">
                <img src={CameraImage} />
            </div>
            <div className="about-content">
                <h1>{props.title}</h1>
                {props.paragraph}
            </div>
        </div>
    );
}

export default About;
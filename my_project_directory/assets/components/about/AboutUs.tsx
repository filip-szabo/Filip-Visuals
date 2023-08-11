import React from "react";
import './AboutUs.css';
import Navbar from "../common/Navbar/Navbar";
import Footer from "../common/Footer/Footer";
import AboutWelcome from "./about-welcome/AboutWelcome";
import AboutContent from "./about-content/AboutContent";


function AboutUs() {
    return (
      <>
          <div className="first-look">
              <Navbar />
              <AboutWelcome />
          </div>
          <AboutContent />
          <Footer title={"FilipVisuals"}  paragraph={<p>Your dream home can now become a reality.<br/> Your most unrealistic ideas,we try to materialize them.<br/> We are at your disposal and do our best <br/>to make your home perfect.</p>}/>
      </>
    );
}

export default AboutUs;
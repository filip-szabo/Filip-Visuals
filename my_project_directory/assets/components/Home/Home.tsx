import React from 'react';
import './Home.css';
import Welcome from './welcome/Welcome';
import Navbar from "../common/Navbar/Navbar";
import Action from "./action/Action";
import About from "./about-us/About";
import Footer from "../common/Footer/Footer";

function Home() {
    return (
        <div id="window">

            <div className="first-look">
                <Navbar />
                <Welcome title={"Welcome to my website!"} subtitle={<p>Hello. My name is Filip and I am a photographer. If you are on this site, it means that I had<br/> the pleasure of taking your pictures. To access the customer please <br/>log in. If you are new, press the Sign Up button and start the adventure.</p>} />
            </div>
            <Action />
            <About title={"About me"} paragraph={<p>Hello! My name is Filip and I am a photographer. Ever since I was a child,<br/> I had a passion for photography and I liked to capture the unique<br/> moments of those around me.<br/> All I try to do is to capture the happiness and joy of those around me.</p>}/>
            <Footer title={"FilipVisuals"}  paragraph={<p>Your dream home can now become a reality.<br/> Your most unrealistic ideas,we try to materialize them.<br/> We are at your disposal and do our best <br/>to make your home perfect.</p>}/>
        </div>
    );
}

export default Home;

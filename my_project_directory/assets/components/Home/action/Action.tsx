import React from "react";
import './action.css';
import { Link } from "react-router-dom";
function Action() {
    return (
          <div id="start-project" className="action-section">
              <h1>New here?... No problem! <span>Sign Up</span> right now!</h1>
              <div className="action-button"><Link to={"/Register"}>Sign Up</Link> <span><i
                  className="bi bi-box-arrow-in-right"></i></span></div>
          </div>
    );
}

export default Action;
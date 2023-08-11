import React, {ReactElement} from "react";
import './Welcome.css';
type propsType={
    title: string;
    subtitle: ReactElement;
    active?: boolean;
};
function Welcome(props:propsType) {
    return (
            <div className="container">
                <div className="welcome">
                    <div className="welcome-title">
                        <h2>{props.title}</h2>
                    </div>
                    <div className="welcome-description">
                        {props.subtitle}
                    </div>
                </div>
            </div>
    );
}

export default Welcome;
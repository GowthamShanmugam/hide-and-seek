import * as React from "react";
import Counter from './counter';
import './controller.scss';

const Controller: React.FC = () => {
    return(
        <>
        <div className="controller-container">
            <div className="btn"> <a href="https://ablimits.com">Get Host</a></div>    
            <div className="btn"> <a href="https://ablimits.com">Join Game</a> </div>        
            <div className="btn"> <a href="https://ablimits.com">Logout</a> </div>
        </div>

         <Counter />
        </>
    );
};

export default Controller;
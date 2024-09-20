import React from "react";
import { Link } from "react-router-dom";
import './index.css'
import flyimage from './../../Images/assets/icons/PicsArt_04-14-04.42 1.svg'
function MainPage() {
    return (
        <div className="mainpage-hackathon-container">
              <div className="main-page-hackathon-content">
                 <h1 className="main-page-hackathon-heading">Accelerate Innovation <br/>with Global AI Challenges</h1>
                 <p className="main-page-hackathon-discription">AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills to test on diverse datasets allowing you to foster learning through competitions.</p>
                 <Link to='/create-challenge'>
                   <button className="create-challenge-btn">Create Challenge</button>
                 </Link>
              </div>
              <div className="main-page-image">
                 <img src={flyimage} alt="main-page-pic" className="main-page-img"/>
              </div>
    </div>
    )
}

export default MainPage;
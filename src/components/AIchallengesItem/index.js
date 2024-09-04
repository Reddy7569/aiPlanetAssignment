import React from "react";
import './aichallenege.css'
const AIchallengesList = (props) => {
  const {aiData} = props
  const {image,numberOfChallenges,content} = aiData
    return (
      <li className="ai-challenge-container">
        <div className="ai-challenge-image-container">
          <img src={image} alt={image} className="ai-challenge-image"/>
        </div>
        <div className="ai-challenge-discription">
            <h1 className="ai-challenge-heading">{numberOfChallenges}</h1>
            <p className="ai-challenge-content">{content}</p>
        </div>
      </li>
    )
}

export default AIchallengesList ; 
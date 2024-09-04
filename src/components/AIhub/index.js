import React  from "react";
import AIchallengesItem from "../AIchallengesItem";
import aiModel from './../../Images/assets/icons/Group 1000002515.svg'
import dataScientists from './../../Images/assets/icons/Group 1000002516.svg'
import aiChallenges from './../../Images/assets/icons/Group 1000002518.svg'
import './ai.css'

const AIhub = () => {
    const aiList = [
        {
            id : 0 ,
            image : aiModel,
            numberOfChallenges: "100K+",
            content:"AI model submissions"
    
        },
        {
            id : 1 ,
            image : dataScientists ,
            numberOfChallenges: "50K+",
            content:"Data Scientists"
        },
        {
            id : 2 ,
            image : aiChallenges,
            numberOfChallenges: "100+",
            content:"AI Challenges hosted"
        }
    ]
  return (
    <div className="challenges-main-container">
      <ul className="ai-challenges-container">
      {aiList.map(e=>(<AIchallengesItem aiData={e} key={e.id}/>))}
      </ul>
    </div>
  )
}

export default AIhub;
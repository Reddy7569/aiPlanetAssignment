import React from "react";
import WhyAiItem from "../WhyAiItem";
import identificationImage from './../../Images/assets/icons/IdentificationCard.svg'
import robotImage from './../../Images/assets/icons/Robot.svg'
import carbonNoteBookImage from './../../Images/assets/icons/carbon_notebook-reference.svg'
import vectorImage from './../../Images/assets/icons/Vector.svg'
import './index.css'

const WhyAi = () => {
  const whyAiList = [
    {
        id : 0 ,
        image:carbonNoteBookImage,
        heading:"Prove your skills",
        content:"Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions."
    },
    {
        id: 1,
        image: vectorImage,
        heading: "Learn from community",
        content:"One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them."
    },
    {
        id: 2,
        image: robotImage,
        heading: "Challenge yourself",
        content:"There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder."
    },
    {
        id: 3,
        image: identificationImage,
        heading: "Earn recognition",
        content:"You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards."
    },

  ]
  return (
    <div className="why-ai-main-container">
        <h1 className="why-ai-heading">Why Participate in <span>AI Challenges?</span> </h1>
       <ul className="why-ai-lists">
        {whyAiList.map(e=>(<WhyAiItem whyData={e} key={e.id}/>))}
       </ul>
    </div>
  )
}

export default WhyAi
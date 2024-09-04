import React from "react";
import'./index.css'

const WhyAiItem = (props) => {
 const {whyData} = props
 const {image,heading,content} = whyData
 return (
    <li className="why-item">
        <img src={image} alt={image} className='why-image'/>
        <h1 className="why-ai-dicription-heading">{heading}</h1>
        <p className="why-ai-content">{content}</p>
    </li>
 )
}

export default WhyAiItem
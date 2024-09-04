import React from "react";
import MainPage from './../MainPage'
import AIhub from './../AIhub'
import WhyAi from './../WhyAi'
import Challenges from "./../Challenges";

const HomePage = () => {
    return (
        <div>
            <MainPage />
            <AIhub />
            <WhyAi />
            <Challenges/>
        </div>
    )
}

export default HomePage;
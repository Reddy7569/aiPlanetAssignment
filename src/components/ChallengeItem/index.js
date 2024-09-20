import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import './index.css';

const ChallengeItem = (props) => {
  const { challengeData } = props;
  const { id, name, image, startDate, endDate } = challengeData;

  const [imageUrl, setImageUrl] = useState(null);
  const [timerText, setTimerText] = useState("");

  const calculateStatusAndTimer = (startDate, endDate) => {
    const now = moment();
    const start = moment(startDate);
    const end = moment(endDate);

    if (now.isBefore(start)) {
      return {
        status: "Upcoming",
        text: "Starts in",
        timerText: `${start.diff(now, 'days')} days : ${start.diff(now, 'hours') % 24} hours : ${start.diff(now, 'minutes') % 60} minutes`,
      };
    } else if (now.isBetween(start, end)) {
      return {
        status: "Active",
        text: "Ends in",
        timerText: `${end.diff(now, 'days')} days : ${end.diff(now, 'hours') % 24} hours : ${end.diff(now, 'minutes') % 60} minutes`,
      };
    } else {
      return {
        status: "Past",
        text: "Ended on",
        timerText: `${end.format('DD MMM YYYY, HH:mm')}`,
      };
    }
  };

  useEffect(() => {
    const updateTimer = () => {
      const { timerText } = calculateStatusAndTimer(startDate, endDate);
      setTimerText(timerText);
    };

    updateTimer(); 

    const interval = setInterval(updateTimer, 60000); 

    return () => clearInterval(interval); 
  }, [startDate, endDate]);

  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setImageUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setImageUrl(image);
    }
  }, [image]);

  const { status, text } = calculateStatusAndTimer(startDate, endDate);

  return (
    <li className="challenge-item-container">
      <img
        src={imageUrl || "placeholder-image-url"}
        alt={name}
        className="challenge-image"
        onError={(e) => e.target.src = "placeholder-image-url"}
      />
      <div className="challenge-details">
        <span className={`status ${status.toLowerCase()}`}>{status}</span>
        <h1 className="challenge-item-name">{name}</h1>
        <p className="challenge">{text}</p>
        <p className="timer">{timerText}</p>
        <Link to={`aiPlanetAssignment/challenges/${id}`} className="participate-link">Participate Now</Link>
      </div>
    </li>
  );
};

export default ChallengeItem;

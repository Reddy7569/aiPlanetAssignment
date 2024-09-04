import React, { Component } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './index.css';
import skill from './../../Images/assets/icons/carbon_skill-level-basic.svg';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} navigate={useNavigate()} />;
}

class ChallengeDetail extends Component {
  capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  formatDateToIST(date) {
    
    const options = {
      timeZone: 'Asia/Kolkata',
      weekday: 'long',     
      day: '2-digit',      
      month: 'short',       
      year: '2-digit',     
      hour: '2-digit',  
      minute: '2-digit',   
      hour12: true         
    };
    return new Date(date).toLocaleString('en-IN', options) + ' (India Standard Time)';
  }
  

  getChallengeStatusText(challenge) {
    const today = new Date();
    const startDate = new Date(challenge.startDate);
    const endDate = new Date(challenge.endDate);
  
    const startDateIST = this.formatDateToIST(startDate);
    const endDateIST = this.formatDateToIST(endDate);
  
    if (today < startDate) {
      return `Starts on ${startDateIST}`;
    } else if (today > endDate) {
      return `Ended on ${endDateIST}`;
    } else {
      const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      return `Ends in ${daysRemaining} days (on ${endDateIST})`;
    }
  }
  
  

  handleDelete = () => {
    const { id } = this.props.params;
    const { challenges } = this.props;
    const { navigate } = this.props;
    const updatedChallenges = challenges.filter(challenge => challenge.id !== id);
    localStorage.setItem('challenges', JSON.stringify(updatedChallenges));
    if (this.props.onChallengesUpdate) {
      this.props.onChallengesUpdate(updatedChallenges);
    }
    navigate('/');
  }

  render() {
    const { id } = this.props.params;
    const { challenges } = this.props;
    const challenge = challenges.find(challenge => challenge.id === id);
    
    if (!challenge) {
      return <div>Challenge not found</div>;
    }

    const statusText = this.capitalizeFirstLetter(challenge.level);
    const challengeStatusText = this.getChallengeStatusText(challenge);

    return (
      <div className='challenge-detail'>
        <div className='challenge-content'>
          <p className='challenge-status-txt'>{challengeStatusText}</p>
          <h1>{challenge.name}</h1>
          <p>{challenge.description}</p>
          <div className='challenge-detail-level'>
            <img src={skill} alt="skill" className='status-skill'/>
            <p className='status-text'>{statusText}</p>
          </div>
        </div>
        <div className='challenge-editable-content'>
          <p className='challenge-overview-heading'>Overview</p>
          <div className='editable-buttons'>
            <Link to={`/edit-challenge/${id}`}><button className='edit-btn'>Edit</button></Link>
            <button className='delete-btn' onClick={this.handleDelete}>Delete</button>
          </div>
        </div>
        <div className='challenge-description'>
          <p className='challenge-overview'>Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera. The word "Lepidoptera" means "scaly wings" in Greek. This name perfectly suits the insects in this group because their wings are covered with thousands of tiny scales overlapping in rows.</p>
          <p className='challenge-overview'>An agency of the Governmental Wildlife Conservation is planning to implement an automated system based on computer vision so that it can identify butterflies based on captured images. As a consultant for this project, you are responsible for developing an efficient model.</p>
          <p className='challenge-overview'> Your Task is to build an Image Classification Model using CNN that classifies to which class of weather each image belongs to.</p>
        </div>
      </div>
    );
  }
}

export default withParams(ChallengeDetail);




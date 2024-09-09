import React, { Component } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import withNavigation from "./navigate";
import './index.css';

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

class EditChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newHackathon: {
        id: uuidv4(),
        name: "",
        startDate: "",
        endDate: "",
        description: "",
        image: null,
        level: "easy",
        status: "", 
      },
      filterLevel: "easy", 
    };
  }

  componentDidMount() {
    const { params } = this.props;
    console.log("Params:", params); 

    if (params) {
      const { id } = params;
      const storedChallenges = JSON.parse(localStorage.getItem("challenges")) || [];
      const challengeToEdit = storedChallenges.find(challenge => challenge.id === id);
      
      console.log("Challenge to Edit:", challengeToEdit); 

      if (challengeToEdit) {
        this.setState({
          newHackathon: { ...challengeToEdit },
          filterLevel: challengeToEdit.level,
        }, this.updateStatus); 
      }
    }
  }

  handleChallengeText = (event) => {
    this.setState({
      newHackathon: {
        ...this.state.newHackathon,
        [event.target.name]: event.target.value,
      },
    }, this.updateStatus); 
  };

  handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Image = e.target.result;
      this.setState({
        newHackathon: {
          ...this.state.newHackathon,
          image: base64Image
        }
      });
    };
  
    reader.readAsDataURL(file);
  };

  handleFilterLevel = (event) => {
    this.setState({
      newHackathon: {
        ...this.state.newHackathon,
        level: event.target.value,
      },
      filterLevel: event.target.value,
    });
  };

  updateStatus = () => {
    const { startDate, endDate } = this.state.newHackathon;
    const currentDate = new Date();

    let status = ""; 

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (currentDate >= start && currentDate <= end) {
        status = "active";
      } else if (currentDate > end) {
        status = "past";
      } else if (currentDate < start) {
        status = "upcoming";
      }
    }

    this.setState(prevState => ({
      newHackathon: {
        ...prevState.newHackathon,
        status: status
      }
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { newHackathon } = this.state;
    const storedChallenges = JSON.parse(localStorage.getItem("challenges")) || [];
    const updatedChallenges = storedChallenges.map(challenge =>
      challenge.id === newHackathon.id ? newHackathon : challenge
    );

    localStorage.setItem("challenges", JSON.stringify(updatedChallenges));
    this.props.navigate('/aiPlanetAssignment'); 
  };

  render() {
    const { newHackathon, filterLevel } = this.state;

    return (
      <div className="create-challenge">
        <h1 className="create-challenge-heading">Edit Challenge</h1>
        <form className="create-challenge-form" onSubmit={this.handleSubmit}>
          <div className="challenge-input">
            <label className="input-label" htmlFor="challengeName">Challenge Name</label>
            <input
              className="challenge-text"
              type="text"
              id="challengeName"
              name="name"
              value={newHackathon.name}
              onChange={this.handleChallengeText}
            />
          </div>
          <div className="challenge-input">
            <label className="input-label" htmlFor="startDate">Start Date</label>
            <input
              className="challenge-text"
              type="date"
              id="startDate"
              name="startDate"
              value={newHackathon.startDate}
              onChange={this.handleChallengeText}
            />
          </div>
          <div className="challenge-input">
            <label className="input-label" htmlFor="endDate">End Date</label>
            <input
              className="challenge-text"
              type="date"
              id="endDate"
              name="endDate"
              value={newHackathon.endDate}
              onChange={this.handleChallengeText}
            />
          </div>
          <div className="challenge-input">
            <label className="input-label" htmlFor="description">Description</label>
            <textarea
              className="challenge-text"
              id="description"
              name="description"
              value={newHackathon.description}
              onChange={this.handleChallengeText}
            />
          </div>
          <div className="challenge-input">
            <label className="input-label" htmlFor="image">Image</label>
            <input
              className="challenge-text"
              type="file"
              id="image"
              name="image"
              onChange={this.handleImageChange}
            />
            {newHackathon.image && (
              <img src={newHackathon.image} alt="Selected" style={{ width: "100px", height: "100px", marginTop: "10px" }} />
            )}
          </div>
          <div className="challenge-input">
            <label className="input-label" htmlFor="level">Level</label>
            <select
              id="level"
              name="level"
              value={filterLevel}
              onChange={this.handleFilterLevel}
              className="challenge-text"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <button type="submit" className="create-challenge-button">Save Changes</button>
        </form>
      </div>
    );
  }
}

export default withParams(withNavigation(EditChallenge));



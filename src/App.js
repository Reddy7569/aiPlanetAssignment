import React , {Component} from 'react';
import { Routes,Route } from 'react-router-dom';
import mainLogo from './mainLogo.png';
import CreateChallenge from './components/CreateChallenge';
import ChallengeDetail from './components/ChallenegeDetail';
import EditChallenge from './components/EditChallenge';
import './App.css';
import HomePage from './components/HomePage';

class App extends Component {
  state = {
    challenges: [],
  }
  componentDidMount() {
    const storedChallenges = JSON.parse(localStorage.getItem('challenges')) || []
    this.setState({challenges:storedChallenges})
  }
  render() { 
    const {challenges} = this.state
    return (
        <div className='main-hackathon-container'>
          <div className='nav-hackathon'>
            <img src={mainLogo} alt="NavLogo" className='nav-logo'/>
          </div>
          <Routes>
            <Route exact  path='/aiPlanetAssignment' element={<HomePage/>}/>
            <Route path="/create-challenge" element={<CreateChallenge/>} />
            <Route path="/challenges/:id" element={<ChallengeDetail challenges={challenges}/>}/>
            <Route path="/edit-challenge/:id" element={<EditChallenge challenges={challenges}/>}/>
          </Routes>
          
       </div>
    )
  }
}
export default App;

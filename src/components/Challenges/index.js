import React, { useState, useEffect, useCallback } from "react";
import ChallengeItem from "./../ChallengeItem";
import './challenges.css';

const Challenges = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState({
    all: true,
    active: false,
    upcoming: false,
    past: false,
  });
  const [filterLevel, setFilterLevel] = useState({
    easy: false,
    medium: false,
    hard: false,
  });
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

 
  useEffect(() => {
    const storedChallenges = JSON.parse(localStorage.getItem('challenges')) || [];
    setChallenges(storedChallenges);
    setFilteredChallenges(storedChallenges);
  }, []);

  
  const filterChallenges = useCallback(() => {
    const filtered = challenges.filter((challenge) => {
      const matchesSearch = challenge.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        filterStatus.all ||
        (filterStatus.active && challenge.status === "active") ||
        (filterStatus.upcoming && challenge.status === "upcoming") ||
        (filterStatus.past && challenge.status === "past");

      const matchesLevel =
        (filterLevel.easy && challenge.level === "easy") ||
        (filterLevel.medium && challenge.level === "medium") ||
        (filterLevel.hard && challenge.level === "hard") ||
        !Object.values(filterLevel).some(Boolean);

      return matchesSearch && matchesStatus && matchesLevel;
    });


    setFilteredChallenges(filtered);
  }, [searchQuery, filterStatus, filterLevel, challenges]);


  useEffect(() => {
    filterChallenges();
  }, [filterChallenges]);


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };


  const handleStatusChange = (event) => {
    const { name, checked } = event.target;
    setFilterStatus((prevState) => {
      const newStatus = { ...prevState, [name]: checked };
      if (name === "all" && checked) {
        return { all: true, active: false, upcoming: false, past: false };
      } else if (checked) {
        return { ...newStatus, all: false };
      } else if (!Object.values(newStatus).some(Boolean)) {
        return { all: true, active: false, upcoming: false, past: false };
      }
      return newStatus;
    });
  };


  const handleLevelChange = (event) => {
    const { name, checked } = event.target;
    setFilterLevel((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  
  const handleRemoveFilter = (filterType, filterName) => {
    if (filterType === "filterStatus") {
      setFilterStatus((prevState) => ({
        ...prevState,
        [filterName]: false,
      }));
    } else if (filterType === "filterLevel") {
      setFilterLevel((prevState) => ({
        ...prevState,
        [filterName]: false,
      }));
    }
  };

  
  const toggleFilter = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="explore-challenges">
      <div className="explore">
        <h1 className="explore-heading">Explore Challenges</h1>
        <div className="filter-section">
          <input
            type="text"
            placeholder="Search Hackathons"
            value={searchQuery}
            onChange={handleSearchChange}
            className="filter-input-field"
          />
          <div className="filters">
            <span className="filter-heading" onClick={toggleFilter}>Filters</span>
            {showFilters && (
              <div className="filter-list">
                <hr />
                <div className="status-filters">
                  <p className="filter-status">Status</p>
                  {Object.keys(filterStatus).map((status) => (
                    <label key={status} className="label-item">
                      <input
                        type="checkbox"
                        name={status}
                        checked={filterStatus[status]}
                        onChange={handleStatusChange}
                      />
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </label>
                  ))}
                </div>
                <hr />
                <div className="level-filters">
                  <p className="filter-level">Level</p>
                  {Object.keys(filterLevel).map((level) => (
                    <label key={level} className="label-item">
                      <input
                        type="checkbox"
                        name={level}
                        checked={filterLevel[level]}
                        onChange={handleLevelChange}
                      />
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="active-filters">
          {Object.keys(filterStatus).map(
            (status) =>
              filterStatus[status] && (
                <span key={status} className="filter-tag">
                  {status} <button onClick={() => handleRemoveFilter("filterStatus", status)} className="filter-btn">x</button>
                </span>
              )
          )}
          {Object.keys(filterLevel).map(
            (level) =>
              filterLevel[level] && (
                <span key={level} className="filter-tag">
                  {level} <button onClick={() => handleRemoveFilter("filterLevel", level)} className="filter-btn">x</button>
                </span>
              )
          )}
        </div>
      </div>
      <div className="challenges-list">
        {filteredChallenges.length > 0 ? (
          <ul className="challenges-items-container">
            {filteredChallenges.map((challenge) => (
              <ChallengeItem key={challenge.id} challengeData={challenge} />
            ))}
          </ul>
        ) : (
          <p>No challenges found</p>
        )}
      </div>
    </div>
  );
};

export default Challenges;






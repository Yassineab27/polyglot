import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

const ProfileItem = props => {
  const {
    owner,
    age,
    country,
    interests,
    languageL,
    languageN
  } = props.profile;
  return (
    <div className="profile">
      <Link to={`/profiles/user/${owner._id}`}>
        <img src={owner.avatar} alt={owner.firstName} className="image-round" />
      </Link>
      <div>
        <Link to={`/profiles/user/${owner._id}`}>
          <h2>
            {owner.firstName} {owner.lastName}
          </h2>
        </Link>
        <p className="profile-info">
          From: <span className="main-text">{country}</span>
        </p>
        <p className="profile-info">
          Age Bracket: <span className="main-text">{age}</span>
        </p>
        <p className="profile-info">
          Speaks: <span className="main-text">{languageN}</span>
        </p>
        <p className="profile-info">
          Learning: <span className="main-text">{languageL}</span>
        </p>
        <Link to={`/profiles/user/${owner._id}`}>
          <button className="btn btn-main my-1">
            <i className="fas fa-user-circle" /> Visit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default connect()(ProfileItem);

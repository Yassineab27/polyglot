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
        <img
          src={
            owner.avatar
              ? `https://social-network-polyglot.s3.eu-west-3.amazonaws.com/${
                  owner.avatar
                }`
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt={owner.firstName}
          className="image-round"
          style={{ height: "150px", width: "150px" }}
        />
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

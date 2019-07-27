import React, { useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { setAlert } from "../../actions";

const CreateProfile = props => {
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [languageN, setLanguageN] = useState("");
  const [languageL, setLanguageL] = useState("");
  const [interests, setInterests] = useState("");

  const { profile, isAuthenticated } = props.auth;
  if (!isAuthenticated) {
    return <Redirect to="/auth/login" />;
  }

  if (profile) {
    return <Redirect to="/posts" />;
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!age || !languageN || !languageL) {
      props.setAlert({
        msg:
          "Please select Age, Native language and the language you would like to learn.",
        type: "warning"
      });
    } else {
      const profile = {
        age,
        country,
        bio,
        languageN,
        languageL,
        interests
      };
      console.log(profile);
    }
  };

  return (
    <Fragment>
      <h1 className="large text-main text-center">
        <i className="fas fa-user" /> Create Your Profile
      </h1>
      <div className="underline" />
      <p className="text text-center main-color">
        Let's get some information to make your profile stand out
      </p>
      <p className="text-center">
        <small className="grey-text">
          *the more information you give about yourself the easier it is for
          others to know about you*
        </small>
      </p>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <select
            name="age"
            value={age}
            onChange={e => setAge(e.target.value)}
            required
          >
            <option value="0">* Select Your Age Bracket</option>
            <option value="<18">- 18</option>
            <option value="18-25">18 - 25</option>
            <option value="25-30">25 - 30</option>
            <option value="30-40">30 - 40</option>
            <option value="40-50">40 - 50</option>
            <option value=">50">+ 50</option>
          </select>
          <small className="danger-text">
            *Give us an idea of your approximate age*
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={country}
            onChange={e => setCountry(e.target.value)}
            required
          />
          <small className="grey-text">*Where are you from (ex: Russia)*</small>
        </div>
        <div className="form-group">
          <select
            placeholder="Native language"
            name="languageN"
            value={languageN}
            onChange={e => setLanguageN(e.target.value)}
            required
          >
            <option value="0">* Select native language</option>
            <option value="CHINESE">Chinese</option>
            <option value="SPANISH">Spanish</option>
            <option value="ENGLISH">English</option>
            <option value="HINDI">Hindi</option>
            <option value="ARABIC">Arabic</option>
            <option value="PORTUGUESE">Portuguese</option>
            <option value="BENGALI">Bengali</option>
            <option value="RUSSIAN">Russian</option>
            <option value="JAPANESE">Japanese</option>
            <option value="GERMAN">German</option>
            <option value="KOREAN">Korean</option>
            <option value="FRENCH">French</option>
            <option value="TURKISH">Turkish</option>
            <option value="URDU">Urdu</option>
            <option value="ITALIAN">Italian</option>
            <option value="NORVEGIAN">Norvegian</option>
            <option value="HEBREW ">Hebrew</option>
            <option value="ROMANIAN">Romanian</option>
            <option value="DUTCH">Dutch</option>
          </select>
          <small className="danger-text">
            *What is your native language ?*
          </small>
        </div>
        <div className="form-group">
          <select
            placeholder="Learning language"
            name="languageL"
            value={languageL}
            onChange={e => setLanguageL(e.target.value)}
            required
          >
            <option value="0">* Select learning language</option>
            <option value="CHINESE">Chinese</option>
            <option value="SPANISH">Spanish</option>
            <option value="ENGLISH">English</option>
            <option value="HINDI">Hindi</option>
            <option value="ARABIC">Arabic</option>
            <option value="PORTUGUESE">Portuguese</option>
            <option value="BENGALI">Bengali</option>
            <option value="RUSSIAN">Russian</option>
            <option value="JAPANESE">Japanese</option>
            <option value="GERMAN">German</option>
            <option value="KOREAN">Korean</option>
            <option value="FRENCH">French</option>
            <option value="TURKISH">Turkish</option>
            <option value="URDU">Urdu</option>
            <option value="ITALIAN">Italian</option>
            <option value="NORVEGIAN">Norvegian</option>
            <option value="HEBREW ">Hebrew</option>
            <option value="ROMANIAN">Romanian</option>
            <option value="DUTCH">Dutch</option>
          </select>
          <small className="danger-text">
            *What language do you want to learn ?*
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Short bio of yourself.."
            name="bio"
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows="4"
            required
          />
          <small className="grey-text">
            *Tell us something about yourself*
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Your interests"
            name="interests"
            value={interests}
            onChange={e => setInterests(e.target.value)}
            required
          />
          <small className="grey-text">
            *Please use comma separated interests (eg.
            Reading,Singing,Dancing...)*
          </small>
        </div>

        <input
          type="submit"
          className="btn btn-main my-1 btn-block"
          value="Create Profile"
        />
      </form>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return { auth: state.auth };
};

export default connect(
  mapStateToProps,
  { setAlert }
)(CreateProfile);

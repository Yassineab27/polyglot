import React, { useState } from "react";
import { connect } from "react-redux";

import { setAlert } from "../../actions";

const FormProfile = props => {
  const { info } = props;
  const [age, setAge] = useState(info ? info.profile.age : "");
  const [country, setCountry] = useState(info ? info.profile.country : "");
  const [bio, setBio] = useState(info ? info.profile.bio : "");
  const [languageN, setLanguageN] = useState(
    info ? info.profile.languageN : ""
  );
  const [languageL, setLanguageL] = useState(
    info ? info.profile.languageL : ""
  );
  const [interests, setInterests] = useState(
    info ? info.profile.interests : ""
  );

  const onSubmit = e => {
    e.preventDefault();
    if (!age || !languageN || !languageL) {
      props.setAlert({
        msg:
          "Please select Age, Native language and the language you would like to learn.",
        type: "warning"
      });
    } else {
      const myInterests = interests.includes(",")
        ? interests.split(",")
        : [interests];
      const profile = {
        age,
        country,
        bio,
        languageN,
        languageL,
        interests: myInterests
      };
      props.handleSubmit(profile);
    }
  };
  return (
    <form onSubmit={onSubmit} className="form">
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
        <small className="danger-text">*What is your native language ?*</small>
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
        <small className="grey-text">*Tell us something about yourself*</small>
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

      <button className="btn btn-main my-1 btn-block">
        {props.hasProfile ? "Update Profile" : "Create Profile"}
      </button>
    </form>
  );
};

const mapStateToProps = state => {
  return { hasProfile: state.auth.hasProfile };
};

export default connect(
  mapStateToProps,
  { setAlert }
)(FormProfile);

import React, { Component } from "react";

import { connect } from "react-redux";
import { getAllProfiles } from "../../actions";
import Loader from "../layout/Loader";
import Profile from "./Profile";
import SearchBar from "./SearchBar";

class AllProfiles extends Component {
  componentDidMount() {
    this.props.getAllProfiles();
  }
  render() {
    if (!this.props.profiles) {
      return <Loader />;
    }
    const profiles = this.props.profiles.length ? (
      this.props.profiles.map(profile => {
        return <Profile key={profile._id} profile={profile} />;
      })
    ) : (
      <p>No Pals found.</p>
    );

    return (
      <div>
        <h1>Profiles</h1>
        <SearchBar />
        {profiles}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { profiles, search } = state.prof;
  if (!search) {
    return { profiles };
  }
  return {
    profiles: profiles.filter(
      profile =>
        profile.owner.firstName.startsWith(search) ||
        profile.owner.firstName.toLowerCase().startsWith(search) ||
        profile.languageN.toLowerCase().startsWith(search) ||
        profile.languageN.startsWith(search)
    )
  };
};

export default connect(
  mapStateToProps,
  { getAllProfiles }
)(AllProfiles);

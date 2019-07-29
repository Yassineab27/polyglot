import React, { Component } from "react";

import { connect } from "react-redux";
import { getAllProfiles } from "../../actions";
import Loader from "../layout/Loader";
import ProfileItem from "./ProfileItem";
import SearchBar from "./SearchBar";

class AllProfiles extends Component {
  componentDidMount() {
    this.props.getAllProfiles();
  }
  render() {
    if (!this.props.profiles) {
      return <Loader />;
    }

    const filterProfiles = this.props.profiles.filter(
      profile => profile.owner._id !== this.props.user._id
    );

    const profiles = filterProfiles.length ? (
      filterProfiles.map(profile => {
        return <ProfileItem key={profile._id} profile={profile} />;
      })
    ) : (
      <p>No Pals found.</p>
    );

    return (
      <div>
        <h1 className="large text-center">Pals</h1>
        <div className="underline" />
        <p className="text text-center main-text">
          Connect with native speakers!
        </p>
        <SearchBar />
        <div className="profiles">{profiles}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { profiles, search } = state.prof;
  const { user } = state.auth;
  if (!search) {
    return { profiles, user };
  }
  return {
    profiles: profiles.filter(
      profile =>
        profile.owner.firstName.startsWith(search) ||
        profile.owner.firstName.toLowerCase().startsWith(search) ||
        profile.languageN.toLowerCase().startsWith(search) ||
        profile.languageN.startsWith(search)
    ),
    user
  };
};

export default connect(
  mapStateToProps,
  { getAllProfiles }
)(AllProfiles);

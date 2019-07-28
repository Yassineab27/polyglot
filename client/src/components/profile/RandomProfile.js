import React, { Component } from "react";

import { connect } from "react-redux";
import { getRandomProfile } from "../../actions";

import Loader from "../layout/Loader";

class RandomProfile extends Component {
  componentDidMount() {
    this.props.getRandomProfile(this.props.match.params.user_id);
  }
  render() {
    const { info } = this.props;
    if (!info) {
      return <Loader />;
    }

    return (
      <div>
        <h1>
          {info.profile.owner.firstName} {info.profile.owner.firstName}
        </h1>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { info: state.prof.profileInfo };
};

export default connect(
  mapStateToProps,
  { getRandomProfile }
)(RandomProfile);

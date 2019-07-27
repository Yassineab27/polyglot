import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

const Profile = props => {
  const { profile, user } = props;
  return (
    <div>
      <h2>
        {profile.owner.firstName} {profile.owner.lastName}
      </h2>
    </div>
  );
};

export default connect()(Profile);

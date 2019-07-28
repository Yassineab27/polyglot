import React from "react";
import { Link } from "react-router-dom";

import { connect } from "react-redux";

const Profile = props => {
  const { profile } = props;
  return (
    <div>
      <h2>
        <Link to={`/profiles/user/${profile.owner._id}`}>
          {profile.owner.firstName} {profile.owner.lastName}
        </Link>
      </h2>
    </div>
  );
};

export default connect()(Profile);

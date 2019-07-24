import React, { Component } from "react";
import { connect } from "react-redux";
import { removeAlert } from "../../actions";

import "../../index.css";

class Alert extends Component {
  render() {
    const { alert } = this.props;

    if (alert) {
      setTimeout(() => {
        this.props.removeAlert();
      }, 3000);
      return (
        <h4 className={`alert alert-${alert.type} form`}>
          <i className="fas fa-exclamation-circle" /> {alert.msg}
        </h4>
      );
    }
    return null;
  }
}

const mapStateToProps = state => {
  return { alert: state.auth.alert };
};

export default connect(
  mapStateToProps,
  { removeAlert }
)(Alert);

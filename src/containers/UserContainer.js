import React from "react";
import { handleLogin } from "../actions/UserAction";
import { connect } from "react-redux";
import { User } from "../components/User";

class UserContainer extends React.Component {
  render() {
    const { user, handleLoginAction } = this.props;
    return (
      <User
        name={user.name}
        isFetching={user.isFetching}
        error={user.error}
        handleLogin={handleLoginAction}
      />
    );
  }
}

const mapStateToProps = store => {
  console.log(store);
  return {
    user: store.user
  };
};

const mapDispatchToProps = dispatch => ({
  handleLoginAction: () => dispatch(handleLogin())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer);

import React from "react";
import PropTypes from "prop-types";

export class User extends React.Component {
  renderTemlate = () => {
    const { name, isFetching, error } = this.props;
    console.log("userName: ", name);
    if (error) {
      return (
        <p>Во время запроса произошла ошибка, пожалуйста, обновите страницу</p>
      );
    }

    if (isFetching) {
      return <p>Загружаю...</p>;
    }
    if (name) {
      return <p>Привет, {name}</p>;
    } else {
      return (
        <button className="btn" onClick={this.props.handleLogin}>
          Войти
        </button>
      );
    }
  };
  render() {
    console.log("<User/>	render");
    return <div className="ib user">{this.renderTemlate()}</div>;
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired
};

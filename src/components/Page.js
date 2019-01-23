import React from "react";
import PropTypes from "prop-types";

export class Page extends React.Component {
  onBtnClick = e => {
    const year = +e.currentTarget.innerText;
    this.props.getPhotos(year);
  };
  componentDidMount() {
    this.props.getPhotos(this.props.year);
  }
  renderTemplate() {
    const { photos, isFetching, error } = this.props;
    if (error) {
      return <p>Во время загрузки фото произошла ошибка</p>;
    }
    if (isFetching) {
      return <p>Загружаю</p>;
    } else {
      return photos.map((entry, index) => (
        <div key={index} className="photo">
          <img src={entry.sizes[0].url} alt="" />
          <p>{entry.likes.count} ❤</p>
        </div>
      ));
    }
  }
  render() {
    const { year, photos } = this.props;
    return (
      <div className="ib page">
        <button className="btn" onClick={this.onBtnClick}>
          2018
        </button>{" "}
        <button className="btn" onClick={this.onBtnClick}>
          2017
        </button>{" "}
        <button className="btn" onClick={this.onBtnClick}>
          2016
        </button>{" "}
        <button className="btn" onClick={this.onBtnClick}>
          2015
        </button>{" "}
        <button className="btn" onClick={this.onBtnClick}>
          2014
        </button>
        <h3>
          {year} год [{photos.length}]{" "}
        </h3>
        {this.renderTemplate()}
      </div>
    );
  }
}

Page.propTypes = {
  year: PropTypes.number.isRequired,
  photos: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getPhotos: PropTypes.func.isRequired,
  error: PropTypes.string
};

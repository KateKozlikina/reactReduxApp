import React from "react";
import { getPhotos } from "../actions/PageAction";
import { connect } from "react-redux";
import { Page } from "../components/Page";

class PageContainer extends React.Component {
  render() {
    const { page, getPhotosAction } = this.props;
    return (
      <Page
        photos={page.photos}
        year={page.year}
        isFetching={page.isFetching}
        getPhotos={getPhotosAction}
        error={page.error}
      />
    );
  }
}
const mapStateToProps = store => {
  console.log(store);
  return {
    page: store.page
  };
};

const mapDispatchToProps = dispatch => ({
  getPhotosAction: year => dispatch(getPhotos(year))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageContainer);

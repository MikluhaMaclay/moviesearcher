/* eslint-disable arrow-parens */
import React, { useState } from 'react';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { fetchingMovies } from '../Actions/movieActions';

import FavouriteList from '../Components/FavouriteList';
import PaginationComponent from '../Components/PaginationComponent';

const Favourites = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);
  const { state } = props;

  const batch = 20;
  const totalPages = Math.ceil(state.get('favourites').size / batch);

  const nextPageHandler = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const prevPageHandler = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

  const firstPageHandler = () => {
    setCurrentPage(1);
  };

  const lastPageHandler = () => {
    setCurrentPage(totalPages);
  };

  const renderFavoutires = () => {
    let currentFavourite = (currentPage - 1) * batch;
    const favoutiresToRender = [];

    while (
      currentFavourite < props.state.get('favourites').size &&
      currentFavourite < currentPage * batch
    ) {
      favoutiresToRender.push(
        props.state.get('favourites').get(currentFavourite)
      );
      currentFavourite += 1;
    }
    return fromJS(favoutiresToRender);
  };
  return (
    <div>
      {state.get('isError') ? (
        <React.Fragment>
          <Alert color="danger">Loading failed, try again later...</Alert>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <FavouriteList movies={renderFavoutires()} />
          {!state.get('isLoading') ? (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              lastPageHandler={lastPageHandler}
              prevPageHandler={prevPageHandler}
              nextPageHandler={nextPageHandler}
              firstPageHandler={firstPageHandler}
            />
          ) : (
            ''
          )}
          {isLoading ? <div id="cover-spin" /> : ''}
        </React.Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  state: state.getIn(['movies']),
});

const mapDispatchToProps = (dispatch) => ({
  fetchingMovies: (page) => {
    dispatch(fetchingMovies(page));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites);

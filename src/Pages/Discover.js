/* eslint-disable arrow-parens */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import MovieList from '../Components/MovieList';
import PaginationComponent from '../Components/PaginationComponent';
import { fetchingMovies } from '../Actions/movieActions';

const Discover = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  let loadingTimeout;
  const { movies } = props;

  let isLoadingState;
  let isError;
  let totalPages;
  if (movies) {
    isLoadingState = props.movies.get('isLoading');
    isError = props.movies.get('isError');
    totalPages = props.movies.get('totalPages');
  } else {
    isLoadingState = true;
    isError = false;
    totalPages = 1;
  }

  const loadingHandler = () => {
    if (isLoadingState) {
      loadingTimeout = setTimeout(() => {
        setIsLoading(true);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    props.fetchingMovies(currentPage);
  }, []);

  useEffect(() => {
    loadingHandler();
    return () => {
      clearTimeout(loadingTimeout);
    };
  });

  useEffect(() => {
    props.fetchingMovies(currentPage);
  }, [currentPage]);

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

  return (
    <div>
      {isError ? (
        <React.Fragment>
          <Alert color="danger">Loading failed, try again later...</Alert>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <MovieList movies={movies.get('movies')} />
          {!isLoadingState ? (
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
  movies: state.get('movies'),
});

export default connect(
  mapStateToProps,
  { fetchingMovies }
)(Discover);

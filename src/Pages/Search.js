/* eslint-disable arrow-parens */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import MovieList from '../Components/MovieList';
import PaginationComponent from '../Components/PaginationComponent';
import SearchForm from '../Components/SearchForm';
import { searchMovies } from '../Actions/movieActions';

const Search = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('A');
  const [isLoading, setIsLoading] = useState(false);
  let loadingTimeout;
  const { state } = props;

  const loadingHandler = () => {
    if (props.state.get('isLoading')) {
      loadingTimeout = setTimeout(() => {
        setIsLoading(true);
      }, 1000);
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    props.searchMovies(query, currentPage);
  }, []);

  useEffect(() => {
    loadingHandler();
    return () => {
      clearTimeout(loadingTimeout);
    };
  });
  useEffect(() => {
    props.searchMovies(query, currentPage);
  }, [currentPage]);

  useEffect(() => {
    props.searchMovies(query, currentPage);
  }, [query]);

  const nextPageHandler = () => {
    if (currentPage === props.state.get('totalPages')) return;
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
    setCurrentPage(props.state.get('totalPages'));
  };

  const handleQueryChange = (change) => {
    setCurrentPage(1);
    setQuery(change);
  };

  return (
    <div>
      <SearchForm className="mx-5" handleQueryChange={handleQueryChange} />
      {state.get('isError') ? (
        <React.Fragment>
          <Alert color="danger">Loading failed, try again later...</Alert>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <MovieList movies={state.get('movies')} />
          {!state.get('isLoading') ? (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={state.get('totalPages')}
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
  state: state.get('movies'),
});

export default connect(
  mapStateToProps,
  { searchMovies }
)(Search);

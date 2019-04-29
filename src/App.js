import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Components/Header';
import Discover from './Pages/Discover';
import Favourites from './Pages/Favourites';
import Search from './Pages/Search';
import { fetchingGenres } from './Actions/index';

const App = (props) => {
  useEffect(() => {
    props.fetchingGenres();
  }, []);
  return (
    <Router>
      <Header />
      <Route path="/" exact component={Discover} />
      <Route path="/favourites" component={Favourites} />
      <Route path="/search" component={Search} />
    </Router>
  );
};

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  { fetchingGenres }
)(App);

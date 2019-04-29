/* eslint-disable arrow-parens */
import React from 'react';
import { Container, ListGroup } from 'reactstrap';
import Movie from './Movie';

const listStyle = {
  marginTop: '20px',
};

const FavouriteList = (props) => {
  const { movies } = props;
  return (
    <div style={listStyle}>
      <Container>
        <ListGroup>
          {movies.map((movie) => <Movie key={movie.id} movie={movie} />)}
        </ListGroup>
      </Container>
    </div>
  );
};

export default FavouriteList;

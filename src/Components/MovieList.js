import React from 'react';
import { Container, ListGroup } from 'reactstrap';
import { isImmutable } from 'immutable';
import uuid from 'uuid';
import Movie from './Movie';

const listStyle = {
  marginTop: '20px',
};

const MovieList = (props) => {
  const { movies } = props;

  const render = () => {
    if (!isImmutable(movies)) return;
    // eslint-disable-next-line consistent-return
    return movies
      // eslint-disable-next-line arrow-parens
      .map((movie) => <Movie key={uuid()} movie={movie} />)
      .valueSeq()
      .toArray();
  };

  return (
    <div style={listStyle}>
      <Container>
        <ListGroup>{render()}</ListGroup>
      </Container>
    </div>
  );
};

export default MovieList;

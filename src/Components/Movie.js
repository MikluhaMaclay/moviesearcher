/* eslint-disable arrow-parens */
import React, { useState } from 'react';
import { ListGroupItem, Badge } from 'reactstrap';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  addToFavourite,
  removeFromFavourite,
} from '../Actions/favouriteActions';

const MovieCard = styled.li`
  display: flex;
  flex-direction: row;

  > img {
    max-width: 100%;
    height: auto;
    width: auto;
  }

  > div {
    padding: 10px;
    text-align: center;
    > h3 {
      display: inline-block;
    }

    > p {
      text-align: left;
    }

    > div {
    }
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const Movie = (props) => {
  const { movie, favourites } = props;
  const thumbnail = `https://image.tmdb.org/t/p/w400/${movie.get(
    'poster_path'
  )}`;

  const title = movie.get('original_name') || movie.get('title');

  const year = movie.get('first_air_date') || movie.get('release_date') || '';
  const releaseYear = year.split('-')[0];

  const score = movie.get('vote_average');
  const overview = movie.get('overview');

  const genres = movie.get('genre_ids').map((genreID) => {
    const genre = props.genres
      .get('genres')
      .find((element) => element.get('id') === genreID);
    return genre;
  });

  const renderGenres = () => {
    if (props.genres.get('isLoading')) return false;
    return genres
      .map((genre) => <span>{genre.get('name')}</span>)
      .valueSeq()
      .toArray();
  };

  const [isFavourite, setIsFavourite] = useState(
    favourites.some(
      (favourite) => favourite.get('id') === props.movie.get('id')
    )
  );

  const handleFavourite = () => {
    if (isFavourite) {
      props.removeFromFavourite(props.movie);
      setIsFavourite(false);
    } else {
      props.addToFavourite(props.movie);
      setIsFavourite(true);
    }
  };

  return (
    <ListGroupItem className="mb-3 p-0">
      <MovieCard>
        {movie.get('poster_path') ? (
          <img src={thumbnail} alt="thumbnail" />
        ) : (
          ''
        )}
        <div>
          <div>
            <button
              style={{ border: 'none', backgroundColor: 'white' }}
              type="button"
              onClick={(e) => {
                handleFavourite(e);
              }}
            >
              <FontAwesomeIcon
                className="fa-2x mr-2"
                icon={faStar}
                color={isFavourite ? 'yellow' : 'black'}
              />
            </button>
          </div>
          <h3>
            {title}
            <Badge className="ml-3">{releaseYear}</Badge>
          </h3>
          <div>
            <p>{overview}</p>
            <div>
              <p>{renderGenres()}</p>
              Score:
              {score}
            </div>
          </div>
        </div>
      </MovieCard>
    </ListGroupItem>
  );
};

const mapStateToProps = (state) => ({
  genres: state.get('genres'),
  favourites: state.get('movies').get('favourites'),
});

export default connect(
  mapStateToProps,
  { addToFavourite, removeFromFavourite }
)(Movie);

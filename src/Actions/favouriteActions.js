/* eslint-disable arrow-parens */
import {
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
  FETCH_FAVOURITES,
} from './types';

export const addToFavourite = (movie) => ({
  type: ADD_TO_FAVOURITE,
  payload: movie,
});

export const removeFromFavourite = (movie) => ({
  type: REMOVE_FROM_FAVOURITE,
  payload: movie,
});

export const fetchFavourites = () => ({
  type: FETCH_FAVOURITES,
});

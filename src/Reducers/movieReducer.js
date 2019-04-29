/* eslint-disable arrow-parens */
import { fromJS, Map } from 'immutable';
import { loadState } from '../utils/localStorage';
import {
  FETCH_MOVIES_FAILED,
  MOVIES_ARE_LOADING,
  FETCH_MOVIES_SUCCESSED,
  ADD_TO_FAVOURITE,
  REMOVE_FROM_FAVOURITE,
} from '../Actions/types';

const initialData = {
  movies: [],
  totalPages: 1,
  isLoading: false,
  isError: false,
  favourites: fromJS(loadState()) || [],
};

const initialState = Map(initialData);

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES_SUCCESSED: {
      let pages;
      if (action.payload.total_pages > 1000) {
        pages = 1000;
      } else {
        pages = action.payload.total_pages;
      }

      return state
        .set('movies', fromJS(action.payload.results))
        .set('isError', false)
        .set('isLoading', false)
        .set('totalPages', pages);
    }

    case FETCH_MOVIES_FAILED: {
      return state.set('isError', true).set('isLoading', false);
    }

    case MOVIES_ARE_LOADING: {
      return state.set('isError', false).set('isLoading', true);
    }

    case ADD_TO_FAVOURITE: {
      return state.set(
        'favourites',
        state.get('favourites').push(fromJS(action.payload))
      );
    }

    case REMOVE_FROM_FAVOURITE: {
      return state.set(
        'favourites',
        state
          .get('favourites')
          .filter(
            (favourite) => favourite.get('id') !== action.payload.get('id')
          )
      );
    }
    default:
      return state;
  }
}

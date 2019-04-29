import { fromJS } from 'immutable';
import {
  FETCH_GENRES_SUCCESSED,
  GENRES_ARE_LOADING,
  FETCH_GENRES_FAILED,
  FETCHING_GENRES,
} from '../Actions/types';


const initialState = fromJS({
  genres: [],
  isLoading: true,
  isError: false,
});

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_GENRES_SUCCESSED: {
      return state
        .set('isError', false)
        .set('isLoading', false)
        .set('genres', fromJS(action.payload.genres));
    }

    case FETCH_GENRES_FAILED: {
      return state.set('isError', true).set('isLoading', false);
    }

    case FETCHING_GENRES: {
      return state.set('isError', false).set('isLoading', true);
    }

    case GENRES_ARE_LOADING: {
      return state.set('isError', false).set('isLoading', true);
    }

    default:
      return state;
  }
}

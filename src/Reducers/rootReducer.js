import { combineReducers } from 'redux-immutable';
import movieReducer from './movieReducer';
import genresReducer from './genresReducer';

export default combineReducers({
  movies: movieReducer,
  genres: genresReducer,
});

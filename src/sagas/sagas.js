/* eslint-disable max-len */
import {
  put,
  takeEvery,
  all,
  call,
  takeLatest
} from 'redux-saga/effects';
import {
  FETCH_MOVIES_SUCCESSED,
  FETCH_MOVIES_FAILED,
  MOVIES_ARE_LOADING,
} from '../Actions/types';

export function* fetchGenresSaga() {
  try {
    yield put({ type: 'GENRES_ARE_LOADING', payload: true });
    const response = yield call(
      fetch,
      'https://api.themoviedb.org/3/genre/movie/list?api_key=1e0dcaa7e93980fb84e1d2430d01b887&language=en-US'
    );
    const genres = yield call([response, 'json']);

    yield put({ type: 'FETCH_GENRES_SUCCESSED', payload: genres });
  } catch (e) {
    yield put({ type: 'FETCH_GENRES_FAILED' });
  }
}

export function* watchFetchingGenres() {
  yield takeEvery('FETCHING_GENRES', fetchGenresSaga);
}

export function* searchMovieSaga(params) {
  try {
    yield put({ type: MOVIES_ARE_LOADING });
    let query = params.payload.query;
    if (query === '') {
      query = 'a';
    }
    const page = params.payload.page;
    const fetchURL = `https://api.themoviedb.org/3/search/movie?api_key=1e0dcaa7e93980fb84e1d2430d01b887&language=en-US&query=${query}&page=${page}&include_adult=false`;

    const response = yield call(fetch, fetchURL);
    const movies = yield call([response, 'json']);

    yield put({ type: FETCH_MOVIES_SUCCESSED, payload: movies });
  } catch (e) {
    yield put({ type: FETCH_MOVIES_FAILED });
    console.error(e);
  }
}

export function* watchSearchMovies() {
  yield takeLatest('SEARCH_MOVIE', searchMovieSaga);
}

export function* fetchMoviesSaga(params) {
  try {
    yield put({ type: MOVIES_ARE_LOADING });
    const page = params.payload;
    const fetchURL = `https://api.themoviedb.org/3/discover/movie?api_key=1e0dcaa7e93980fb84e1d2430d01b887&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`;

    const response = yield call(fetch, fetchURL);
    const movies = yield call([response, 'json']);

    yield put({ type: FETCH_MOVIES_SUCCESSED, payload: movies });
  } catch (e) {
    yield put({ type: FETCH_MOVIES_FAILED });
    console.error(e);
  }
}

export function* watchFetchingMovies() {
  yield takeLatest('FETCH_MOVIES', fetchMoviesSaga);
}

export default function* rootSaga() {
  yield all([
    watchFetchingGenres(),
    watchSearchMovies(),
    watchFetchingMovies(),
  ]);
}

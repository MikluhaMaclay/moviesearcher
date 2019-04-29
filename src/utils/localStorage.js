export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('favourites');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(
      state.get('movies').get('favourites')
    );
    localStorage.setItem('favourites', serializedState);
  } catch (err) {
    console.error(err);
  }
};

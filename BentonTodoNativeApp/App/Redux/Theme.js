import {createReducer, createActions} from 'reduxsauce';
import Immutable from 'seamless-immutable';
import {clearThemeCache} from 'native-base-shoutem-theme';

/* ------------- Constants ------------- */
export const LIGHT_THEME = 'light';
export const DIM_THEME = 'dim';

/* ------------- Types and Actions ------------- */

const {Types, Creators} = createActions({
  toggleTheme: null,
});

export const ThemeTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  currentTheme: LIGHT_THEME,
});

/* ------------- Selectors ------------- */

export const ThemeSelectors = {
  selectTheme: state => state.theme,
};

/* ------------- Reducers ------------- */

export const toggleTheme = state => {
  clearThemeCache();

  if (state.currentTheme === LIGHT_THEME) {
    return state.merge({currentTheme: DIM_THEME});
  } else {
    return state.merge({currentTheme: LIGHT_THEME});
  }
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.TOGGLE_THEME]: toggleTheme,
});

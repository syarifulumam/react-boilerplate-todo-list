import { produce } from 'immer';

import { SET_LOCAL, SET_THEME, SET_POPUP, SET_LOADING, SET_DATA, SET_FILTER } from '@containers/App/constants';

export const initialState = {
  locale: 'en',
  theme: 'dark',
  popup: {
    open: false,
    title: '',
    message: '',
  },
  filter: 'All',
  data: [],
  loading: false,
};

export const storedKey = ['locale', 'theme', 'data'];

const appReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOCAL:
        draft.locale = action.locale;
        break;
      case SET_THEME:
        draft.theme = action.theme;
        break;
      case SET_POPUP:
        draft.popup = action.popup;
        break;
      case SET_LOADING:
        draft.loading = action.loading;
        break;
      case SET_DATA:
        draft.data = action.data;
        break;
      case SET_FILTER:
        draft.filter = action.filter;
        break;
    }
  });

export default appReducer;

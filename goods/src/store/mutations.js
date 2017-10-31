import * as types from './mutation-types';

const mutations = {
  [types.SET_USERID] (state, userId) {
    state.userId = userId;
  }
};

export default mutations;

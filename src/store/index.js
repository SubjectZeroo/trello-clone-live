import { createStore } from 'vuex'
import boardModule from './boardModule'
import userModule from './userModule'
export default createStore({
  actions: {
    initApp({ dispatch }) {
      dispatch("boardModule/getBoard");
      dispatch("boardModule/getColumns");
      dispatch("boardModule/getCards");
    }
  },
  modules: { boardModule, userModule }
});

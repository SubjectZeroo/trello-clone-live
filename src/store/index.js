import { createStore } from 'vuex'
import boardModule from './boardModule'
import userModule from './userModule'
export default createStore({
  modules: { boardModule, userModule }
});

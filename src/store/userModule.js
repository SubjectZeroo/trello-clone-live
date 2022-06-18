// import { user } from "@/seed";
import { auth, firebase } from "@/firabase";

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    getUserAvatar: state => state.user && state.user.photoURL
  },
  mutation: {
    setUser(state, user) {
      state.user = user
    }
  },
  actions:{
    getUser({ commit }) {
      return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(user => {
          commit("setUser", user);
          resolve(user);
        });
      });
    },
    async userLogin(){
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider)
    },
    async userLogout() {
      await auth.signOut();
    }
  }
};
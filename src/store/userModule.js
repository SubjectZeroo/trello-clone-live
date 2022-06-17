import { user } from "@/seed";
export default {
  nameSpace: true,
  state: {
    user
  },
  getters: {
    getUserAvatar: state => state.user.avatar
  },
  mutation: {},
  actions:{}
}
import { board, columns, cards } from "@/seed";
export default {
  nameSpace: true,
  state: {
    board,
    columns,
    cards
  },
  getters: {
    getBoardName: state => state.boar.name
  },
  mutation: {},
  actions:{}
}
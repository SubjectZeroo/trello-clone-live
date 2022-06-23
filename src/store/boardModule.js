// import { board, columns, cards } from "@/seed";
import { db } from "@/firabase";

export default {
  namespaced: true,
  state: {
    board: {},
    columns: [],
    cards: []
  },
  getters: {
    getBoardName: state => state.board.name,
    getColumns: state => state.columns.sort((a, b) => a.order - b.order),
    getCardsByColumn: state => column => 
      state.cards
        .filter(card => card.column === column)
        .sort((a, b) => a.order - b.order),
    getNextColumnOrder: state =>
        Math.max(...state.columns.map(column => column.order)) + 1,
    getNextCardOrder: state =>
        Math.max(...state.cards.map(card => card.order)) + 1,
  },
  mutations: {
    setBoard(state, board) {
      state.board = board;
    },
    setColumns(state, columns) {
      state.columns = columns;
    },
    setCards(state, cards) {
      state.cards = cards;
    }
  },
  actions:{
    async getBoard({ rootState, commit }) {
      const uid = rootState.userModule.user.uid;
      const defaultBoard = {
        name: "Your first board 🔥",
        id: uid,
        backgroundColor: "#FFFFFF"
      };

      let board = await db
        .collection("boards")
        .doc(uid)
        .get();

      if (!board.exists) {
        await db
          .collection("boards")
          .doc(uid)
          .set(defaultBoard);
        board = defaultBoard;
      } else {
        board = board.data();
      }

      commit("setBoard", board);
    },
    // Column actions
    async getColumns({ commit, rootState }) {
      await db
        .collection("columns")
        .where("board", "==", rootState.userModule.user.uid)
        .onSnapshot(doSnapshot);

      function doSnapshot(querySnapshot) {
        const columns = [];
        querySnapshot.forEach(doc => {
          columns.push(doc.data());
        });
        commit("setColumns", columns);
      }
    },
    async createColumn({ rootState, state, getters }) {
      const ref = db.collection("columns");
      const { id } = ref.doc();
      const column = {
        name: "New Column",
        id,
        board: rootState.userModule.user.uid,
        order: state.columns.length ? getters["getNextColumnOrder"] : 0
      };
      await ref.doc(id).set(column);
    },
    updateColumns({ dispatch }, columns) {
      columns.forEach((column, index) => {
        if(column.order !== index) {
          column.order = index;
          dispatch("updateColumnOrder", column);
        }
      });
    },
    async updateColumnOrder(context, column) {
      await db.collection("columns").doc(column.id).update({ order: column.order })
    },
    async updateColumnName(context, { id, name }) {
      await db
        .collection("columns")
        .doc(id)
        .update({ name });
    },
    async deleteColumn(context, id) {
      await db.collection("columns").doc(id).delete();
    },

    async getCards({commit, rootState}) {
      await db
        .collection("cards")
        .where("board", "===", rootState.userModule.user.uid)
        .onSnapshot(doSnapshot);

        function doSnapshot(querySnapshot) {
          const cards = []
          querySnapshot.forEach(doc => {
            cards.push(doc.data())
          });

          commit("setCards", cards);
        }
    },

    async createCard({rootState, state, getters}, column) {
      const ref = db.collection("cards");
      const { id } = ref.doc();
      const card = {
        name: "New Card",
        description: "This is a Card description",
        id,
        board: rootState.userModule.user.uid,
        column,
        date: new Date().getTime() + 5 * 24 * 60 * 60 * 1000,
        done: false,
        order: state.cards.length ? getters["getNextCardOrder"] : 0
      };

      await ref.doc(id).set(card);
    },
    async updateCardMeta(context, card) {
      await db
        .collection("cards")
        .doc(card.id)
        .update({order: card.order, column: card.column});
        
    },
    updateCards({dispatch}, {column, cards}) {
      cards.forEach((card, index) => {
        if(card.order !== index || card.column !== column.id) {
          card.order = index;
          card.column = column.id;
          dispatch("updateCardMeta", card);
        }
      });
    }
  }
};
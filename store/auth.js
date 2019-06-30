export const state = () => ({
  token: true
});

/**
 *
 * @type {{setToken(*, *): void, clearToken(*): void}}
 */
export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  clearToken(state) {
    state.token = null
  }
};

/**
 *
 * @type {{login({commit: *, dispatch: *}, *=): Promise<void>, setToken({commit: *}, *=): void, logout({commit: *}): void, createUser({commit: *, dispatch: *}, *): Promise<void>}}
 */
export const actions = {
  async login({commit, dispatch}, formData) {
    try {
      const {token} = await this.$axios.$post('/api/auth/admin/login', formData);
      console.log('token ' + token)
      dispatch('setToken', token)
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  },
  setToken({commit}, token) {
    commit('setToken', token)
  },
  logout({commit}) {
    commit('clearToken')
  },
  async createUser({commit}, formData) {
    try {
     await this.$axios.$post('http://localhost:3000/api/auth/admin/create', formData)
    } catch (e) {
      commit('setError', e, {root: true});
      throw e
    }
  }
};

/**
 *
 * @type {{isAuthenticated: (function(*): boolean)}}
 */
export const getters = {
  isAuthenticated: state => !!state.token
};

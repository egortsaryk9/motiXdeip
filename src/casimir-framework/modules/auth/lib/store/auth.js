import { AuthService } from '@/casimir-framework/services/Auth';
import { UserService } from '@/casimir-framework/services/User';
import { AccessService } from '@/casimir-framework/services/Access';
import { WebSocketService } from '@/casimir-framework/services/WebSocket';
import { wrapInArray, genRipemd160Hash } from '@/casimir-framework/all';

const accessService = AccessService.getInstance();
const authService = AuthService.getInstance();
const userService = UserService.getInstance();
const webSocketService = WebSocketService.getInstance();

const STATE = {
  _id: null,
  isLoggedIn: false,
  settings: {
    signInRouteName: 'signIn',
    signUpRouteName: 'signUp',
    signInRedirectRouteName: 'home'
  }
};

const GETTERS = {
  _id: (state) => state._id,
  settings: (state) => state.settings,
  isLoggedIn: (state) => state.isLoggedIn
};

const ACTIONS = {

  restoreData({ commit }) {
    if (accessService.isLoggedIn()) {
      commit('setData');
    }
  },

  async signIn({ dispatch, commit }, { email, password }) {
    const res = await userService.getOne(email);
    if (!res.data._id) {
      throw new Error('Wrong email or password. Please try again.');
    }

    const { data: user } = await userService.getOne(email);
    const keyPair = authService.getKeyPair(password);

    const { data: signIn } = await authService.signIn({
      _id: user._id,
      secretSigHex: keyPair.signMsg(this._vm.$env.SIG_SEED)
    });

    if (!signIn.success) {
      dispatch('clear');
      throw new Error(signIn.error);
    }

    commit('setData', {
      jwtToken: signIn.jwtToken,
      privKey: keyPair.getPrivKey(),
      pubKey: keyPair.getPubKey()
    });

    webSocketService.connect();
  },
 
  async signUp(_, payload) {
    const { email, password } = payload;
    const res = await userService.getOne(email);
    if (res.data._id) {
      throw new Error('User with such email exists');
    }

    const keyPair = authService.getKeyPair(password);
    const { data: signUp } = await authService.signUp({
      pubKey: keyPair.getPubKey(),
      email: payload.email,
      attributes: payload.attributes || [],
      ...{ roles: wrapInArray(payload.roles) }
    });

    return signUp;
  },

  signOut({ dispatch }) {
    dispatch('clear');
    window.location.reload();
  },

  clear({ commit }) {
    commit('clearData');
  },

  setup({ commit }, {
    signInRouteName,
    signInRedirectRouteName,
    signUpRouteName
  }) {
    commit('setSettings', {
      ...(signInRouteName ? { signInRouteName } : {}),
      ...(signInRedirectRouteName ? { signInRedirectRouteName } : {}),
      ...(signUpRouteName ? { signUpRouteName } : {})
    });
  },

  async changePassword({ dispatch }, payload) {
    const { initiator, data: formPass } = payload;
    const { oldPassword, newPassword } = formPass;

    const oldKeyPair = authService.getKeyPair(oldPassword);
    if (initiator.pubKey !== oldKeyPair.getPubKey()) 
      throw new Error('Old password is invalid');
    
    const newKeyPair = authService.getKeyPair(newPassword);
    const newPubKey = newKeyPair.getPubKey();
    const newPrivKey = newKeyPair.getPrivKey();

    // TODO: update user PubKey
    throw new Error("Not Implemented");

    await dispatch('currentUser/get', null, { root: true });
    accessService.setOwnerKeysPair(newPrivKey, newPubKey);
    return { privKey: newPrivKey, pubKey: newPubKey };
  }

};

const MUTATIONS = {
  setData(state, data = {}) {
    const {
      jwtToken,
      privKey = null,
      pubKey = null
    } = data;

    if (jwtToken) {
      accessService.setAccessToken(jwtToken, privKey, pubKey);
    }

    state._id = accessService.getDecodedToken()._id;
    state.isLoggedIn = accessService.isLoggedIn();
  },

  clearData(state) {
    accessService.clearAccessToken();

    state._id = null;
    state.isLoggedIn = accessService.isLoggedIn();
  },

  setSettings(state, payload) {
    state.settings = {
      ...state.settings,
      ...payload
    };
  }

};

export const authStore = {
  state: STATE,
  getters: GETTERS,
  actions: ACTIONS,
  mutations: MUTATIONS,
  namespaced: true
};

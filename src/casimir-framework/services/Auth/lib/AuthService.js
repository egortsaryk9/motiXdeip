import { genSha256Hash, makeSingletonInstance } from '@/casimir-framework/all';
import { proxydi } from '@/casimir-framework/proxydi';
import { CreateUserCmd, ImportDAOCmd } from '@/casimir-framework/commands';
// import { ChainService } from '@casimir.one/chain-service';
import { JsonDataMsg } from '@/casimir-framework/messages';
import { AuthHttp } from './AuthHttp';
import KeyPair from './KeyPair';

/**
 * Auth transport
 */
export class AuthService {
  http = AuthHttp.getInstance();
  proxydi = proxydi;

  /**
   * @param {Object} data
   * @return {Promise<Object>}
   */
  async signIn(data) {
    return this.http.signIn(data);
  }

  /**
   * Create new User via sign up
   * @param {Object} keyPair
   * @param {Object} userData
   * @return {Promise<Object>}
   */
  async signUp(keyPair, userData) {
    const privKey = keyPair.getPrivKey();

    const {
      email,
      pubKey,
      roles,
      attributes,
    } = userData;

    const cmd = new CreateUserCmd({
      pubKey,
      email,
      roles,
      attributes,
    });

    const msg = new JsonDataMsg({
      appCmds: [cmd]
    });

    return this.http.signUp(msg);
  }

  /**
   * Check if user exists by username or email
   * @param {string} usernameOrEmail
   * @return {Promise<Object>}
   */
  async isExist(usernameOrEmail) {
    return this.http.isExist(usernameOrEmail).then(({ data: { exists } }) => exists);
  }

  /**
   * @param {string} seed
   * @return {Promise<Object>}
   */
  getKeyPair(seed) {
    const keyPair = new KeyPair(seed);
    return keyPair;
  }

  /** @type {() => AuthService} */
  static getInstance = makeSingletonInstance(() => new AuthService());
}

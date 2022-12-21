import { genSha256Hash, makeSingletonInstance } from '@/casimir-framework/all';
import { proxydi } from '@/casimir-framework/proxydi';
import { CreateUserCmd, ImportDAOCmd } from '@/casimir-framework/commands';
// import { ChainService } from '@casimir.one/chain-service';
import { JsonDataMsg, MultFormDataMsg } from '@/casimir-framework/messages';
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
   * @param {Object} data
   * @return {Promise<Object>}
   */
  async signUp(data) {
    const {
      email,
      pubKey,
      roles,
      attributes,
    } = data;

    const cmd = new CreateUserCmd({
      pubKey,
      email,
      roles,
      attributes
    });

    const msg = new MultFormDataMsg(null, {
      appCmds: [cmd]
    }, { 
      'entity-id': cmd.getEntityId() 
    });

    return this.http.signUp(msg);
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

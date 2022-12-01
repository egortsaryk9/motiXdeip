import { HttpService } from '@/casimir-framework/services/Http';
import { makeSingletonInstance } from '@/casimir-framework/all';

/**
 * Auth HTTP transport
 */
export class AuthHttp {
  http = HttpService.getInstance();

  /**
   * @param {Object} data
   * @return {Promise<Object>}
   */
  async signIn(data) {
    return this.http.post('/auth/v3/sign-in/', data);
  }

  /**
   * Create new user
   * @param {Object} req
   * @return {Promise<Object>}
   */
  async signUp(req) {
    return this.http.post('/auth/v3/sign-up/', req.getHttpBody());
  }

  /**
   * Check if user exists by _id or email
   * @param {string} usernameOrEmail
   * @return {Promise<Object>}
   */
  async isExist(usernameOrEmail) {
    return this.http.get(`/auth/v2/exist/${usernameOrEmail}`);
  }

  /** @type {() => AuthHttp} */
  static getInstance = makeSingletonInstance(() => new AuthHttp());
}

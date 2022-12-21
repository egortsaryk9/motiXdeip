import { HttpService, serializeParams } from '@/casimir-framework/services/Http';
import { makeSingletonInstance } from '@/casimir-framework/all';

export class UserHttp {
  http = HttpService.getInstance();

  /**
   * Get user by given userId
   * @param {string} _id
   * @return {Promise<Object>}
   */
  async getOne(usernameOrEmail) {
    return this.http.get(`/api/v3/users/${usernameOrEmail}`);
  }

  /**
   * Get Users list paginated
   * @param {Object} query
   * @param {Object} query.sort 'asc', 'desc' by fields
   * @param {Number} query.page 0 or above
   * @param {Number} query.pageSize from 1 to 100
   * @param {Object} query.filter filter
   * @returns {Promise<Object>}
   */
  async getList(query) {
    const querySerialized = serializeParams(query);
    return this.http.get(`/api/v3/users?${querySerialized}`);
  }

  /**
   * Create User
   * @param {Object} req
   * @returns {Promise<Object>}
   */
  async create(req) {
    return this.http.post(`/api/v3/users`, req.getHttpBody(), {
      headers: req.getHttpHeaders()
    });
  }

  /**
   * Update User
   * @param {Object} req
   * @return {Promise<Object>}
   */
  async update(req) {
    return this.http.put(`/api/v3/users`, req.getHttpBody(), { 
      headers: req.getHttpHeaders() 
    });
  }

  /** @type {() => UserHttp} */
  static getInstance = makeSingletonInstance(() => new UserHttp());
}

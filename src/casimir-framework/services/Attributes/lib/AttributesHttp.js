import { HttpService, serializeParams } from '@/casimir-framework/services/Http';
import { makeSingletonInstance } from '@/casimir-framework/all';

/**
 * Attributes HTTP transport
 */
export class AttributesHttp {
  http = HttpService.getInstance();

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
    return this.http.get(`/api/v3/attributes?${querySerialized}`);
  }

  /**
   * Get attribute info
   * @param {string} id
   * @return {Promise<Object>}
   */
  async getOne(id) {
    return this.http.get(`/api/v2/attribute/${id}`);
  }

  /**
   * Get attributes list by scope
   * @param {string} scope
   * @return {Promise<Object>}
   */
  async getListByScope(scope) {
    return this.http.get(`/api/v2/attributes/scope/${scope}`);
  }

  /**
   * Create new attribute
   * @param {Object} req
   * @return {Promise<Object>}
   */
  async create(req) {
    return this.http.post('/api/v2/attribute', req.getHttpBody());
  }

  /**
   * Update current attribute
   * @param {Object} req
   * @return {Promise<Object>}
   */
  async update(req) {
    return this.http.put('/api/v2/attribute', req.getHttpBody());
  }

  /**
   * Delete attribute
   * @param {Object} req
   * @return {Promise<Object>}
   */
  async delete(req) {
    return this.http.put('/api/v2/attribute/delete', req.getHttpBody());
  }

  /**
   * Get attributes settings
   * @return {Promise<Object>}
   */
  async getMappings() {
    return this.http.get('/portal/settings/attribute-mappings');
  }

  /**
   * Update attributes settings
   * @param {Object} req
   * @return {Promise<Object>}
   */
  async updateMappings(req) {
    return this.http.put('/portal/settings/attribute-mappings', req.getHttpBody());
  }

  /** @type {() => AttributesHttp} */
  static getInstance = makeSingletonInstance(() => new AttributesHttp());
}

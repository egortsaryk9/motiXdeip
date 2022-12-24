import { HttpService, serializeParams } from '@/casimir-framework/services/Http';
import { makeSingletonInstance } from '@/casimir-framework/all';

/**
 * Layouts HTTP transport
 */
export class LayoutHttp {
  http = HttpService.getInstance();

  /**
   * Get layout
   * @param {string} layoutId
   * @returns {Promise<Object>}
   */
  async getLayout(layoutId) {
    return this.http.get(`/api/v3/layout/${layoutId}`);
  }

  /**
   * Get layouts
   * @returns {Promise<Object>}
   */
  async getLayouts(query) {
    const querySerialized = serializeParams(query);
    return this.http.get(`/api/v3/layouts?${querySerialized}`);
  }

  /**
   * Create layout
   * @param {Object} req
   * @returns {Promise<Object>}
   */
  async createLayout(req) {
    return this.http.post('/api/v3/layouts', req.getHttpBody());
  }

  /**
   * Update layout
   * @param {Object} req
   */
  async updateLayout(req) {
    return this.http.put('/api/v3/layouts', req.getHttpBody());
  }

  /**
   * Delete layout
   * @param {Object} req
   * @returns {Promise<Object>}
   */
  async deleteLayout(req) {
    return this.http.put('/api/v3/layouts/delete', req.getHttpBody());
  }

  /**
   * Get layouts settings
   * @returns {Promise<Object>}
   */
  async getMappings() {
    return this.http.get('/portal/settings/layout-mappings');
  }

  /**
   * Update settings
   * @param {Object} req
   * @returns {Promise<Object>}
   */
  async updateMappings(req) {
    return this.http.put('/portal/settings/layout-mappings', req.getHttpBody());
  }

  /** @type {() => LayoutHttp} */
  static getInstance = makeSingletonInstance(() => new LayoutHttp());
}

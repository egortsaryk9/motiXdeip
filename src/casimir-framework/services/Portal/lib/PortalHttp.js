import { HttpService } from '@/casimir-framework/services/Http';
import { makeSingletonInstance } from '@/casimir-framework/all';

/**
 * Portal HTTP transport
 */
export class PortalHttp {
  http = HttpService.getInstance();

  /**
   * Get portal
   * @returns {Promise<Object>}
   */
  async getPortal() {
    return this.http.get('/portal');
  }

  /**
   * Update portal profile
   * @param {Object} req
   * @returns {Promise<Object>}
   */
  async updatePortal(req) {
    return this.http.put('/portal', req.getHttpBody());
  }

  /**
   * Get layouts settings
   * @returns {Promise<Object>}
   */
  async getPortalCustomFields() {
    return this.http.get('/portal/settings/custom-fields');
  }

  /**
   * Update portal custom fields
   * @param {Object} req
   * @returns {Promise<Object>}
   */
  async updatePortalCustomFields(req) {
    return this.http.put('/portal/settings/custom-fields', req.getHttpBody());
  }

  /** @type {() => PortalHttp} */
  static getInstance = makeSingletonInstance(() => new PortalHttp());
}

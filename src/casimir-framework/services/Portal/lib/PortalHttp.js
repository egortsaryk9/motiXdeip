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

  /** @type {() => PortalHttp} */
  static getInstance = makeSingletonInstance(() => new PortalHttp());
}

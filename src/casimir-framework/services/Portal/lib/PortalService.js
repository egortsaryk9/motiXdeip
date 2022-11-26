import { createFormData, makeSingletonInstance, genSha256Hash } from '@/casimir-framework/all';
import { proxydi } from '@/casimir-framework/proxydi';
import {
  CreateDaoCmd,
  DeleteUserProfileCmd,
  UpdateNetworkSettingsCmd,
  UpdatePortalProfileCmd,
  UpdatePortalSettingsCmd
} from '@/casimir-framework/commands';
// import { ChainService } from '@casimir.one/chain-service';
import { MultFormDataMsg, JsonDataMsg } from '@/casimir-framework/messages';
import { PortalHttp } from './PortalHttp';

/**
 * Portal data transport
 */
export class PortalService {
  portalHttp = PortalHttp.getInstance();

  proxydi = proxydi;

  /**
   * Get portal
   * @returns {Promise<Object>}
   */
  async getPortal() {
    return this.portalHttp.getPortal();
  }

  /**
   * Update portal profile
   * @param {Object} data
   * @param {Object} data.settings
   * @returns {Promise<Object>}
   */
  async updatePortal(data) {
    const updatePortalProfileCmd = new UpdatePortalProfileCmd(data);
    const msg = new JsonDataMsg({ appCmds: [updatePortalProfileCmd] });
    return this.portalHttp.updatePortal(msg);
  }

  /** @type {() => PortalService} */
  static getInstance = makeSingletonInstance(() => new PortalService());
}

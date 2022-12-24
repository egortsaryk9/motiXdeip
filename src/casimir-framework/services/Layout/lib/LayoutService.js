import { makeSingletonInstance } from '@/casimir-framework/all';
import { JsonDataMsg } from '@/casimir-framework/messages';
import {
  CreateLayoutCmd, UpdateLayoutCmd, DeleteLayoutCmd, UpdateLayoutSettingsCmd
} from '@/casimir-framework/commands';
import { LayoutHttp } from './LayoutHttp';

/**
 * Layouts data transport
 */
export class LayoutService {
  layoutHttp = LayoutHttp.getInstance();

  /**
   * Get layout
   * @param {string} layoutId
   * @returns {Promise<Object>}
   */
  async getOne(layoutId) {
    return this.layoutHttp.getLayout(layoutId);
  }

  /**
   * Get layouts
   * @returns {Promise<Object>}
   */
  async getList(query) {
    return this.layoutHttp.getLayouts(query);
  }

  /**
   * Create layout
   * @param {Object} payload
   * @param {string} payload.name
   * @param {string} payload.scope
   * @param {string} payload.type
   * @param {Array.<Object>} payload.value
   * @returns {Promise<Object>}
   */
  async create(payload) {
    const createLayoutCmd = new CreateLayoutCmd(payload);
    const msg = new JsonDataMsg({ appCmds: [createLayoutCmd] });
    return this.layoutHttp.createLayout(msg);
  }

  /**
   * Update layout
   * @param {Object} payload
   * @param {string} payload._id
   * @param {string} payload.name
   * @param {string} payload.scope
   * @param {string} payload.type
   * @param {Array.<Object>} payload.value
   * @returns {Promise<Object>}
   */
  async update(payload) {
    const updateLayoutCmd = new UpdateLayoutCmd(payload);
    const msg = new JsonDataMsg({ appCmds: [updateLayoutCmd] });
    return this.layoutHttp.updateLayout(msg);
  }

  /**
   * Delete layout
   * @param {string} layoutId
   * @returns {Promise<Object>}
   */
  async remove(layoutId) {
    const deleteLayoutCmd = new DeleteLayoutCmd({ layoutId });
    const msg = new JsonDataMsg({ appCmds: [deleteLayoutCmd] });
    return this.layoutHttp.deleteLayout(msg);
  }

  /**
   * Get layouts settings
   * @returns {Promise<Object>}
   */
  async getMappings() {
    return this.layoutHttp.getMappings();
  }

  /**
   * Update settings
   * @param {Object} data
   * @param {Array.<Object>} data.mappedKeys
   * @returns {Promise<Object>}
   */
  async updateMappings(data) {
    const updateLayoutSettingsCmd = new UpdateLayoutSettingsCmd(data);
    const msg = new JsonDataMsg({ appCmds: [updateLayoutSettingsCmd] });
    return this.layoutHttp.updateMappings(msg);
  }

  /** @type {() => LayoutService} */
  static getInstance = makeSingletonInstance(() => new LayoutService());
}

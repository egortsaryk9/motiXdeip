import {
  CreateAttributeCmd,
  UpdateAttributeCmd,
  DeleteAttributeCmd,
  UpdateAttributeSettingsCmd
} from '@/casimir-framework/commands';
import { JsonDataMsg } from '@/casimir-framework/messages';
import { makeSingletonInstance } from '@/casimir-framework/all';
import { AttributesHttp } from './AttributesHttp';

/**
 * Attributes data transport
 */
export class AttributesService {
  attributesHttp = AttributesHttp.getInstance();

  /**
   * Get all attributes list
   * @return {Promise<Object>}
   */
  async getList(query) {
    return this.attributesHttp.getList(query);
  }

  /**
   * Get attributes by scope
   * @param {string} scope
   * @return {Promise<Object>}
   */
  async getListByScope(scope) {
    return this.attributesHttp.getListByScope(scope);
  }

  /**
   * Get attribute info
   * @param {string} id
   * @return {Promise<Object>}
   */
  async getOne(id) {
    return this.attributesHttp.getOne(id);
  }

  /**
   * Create new attribute
   * @param {Object} attribute
   * @return {Promise<Object>}
   */
  async create(attribute) {
    const createAttributeCmd = new CreateAttributeCmd(attribute);
    const msg = new JsonDataMsg({ appCmds: [createAttributeCmd] });
    return this.attributesHttp.create(msg);
  }

  /**
   * Update current attribute
   * @param {Object} payload
   * @return {Promise<Object>}
   */
  async update(payload) {
    const updateAttributeCmd = new UpdateAttributeCmd(payload);
    const msg = new JsonDataMsg({ appCmds: [updateAttributeCmd] });
    return this.attributesHttp.update(msg);
  }

  /**
   * Delete attribute
   * @param {string} attributeId
   * @return {Promise<Object>}
   */
  async delete(attributeId) {
    const deleteAttributeCmd = new DeleteAttributeCmd({ attributeId });
    const msg = new JsonDataMsg({ appCmds: [deleteAttributeCmd] });
    return this.attributesHttp.delete(msg);
  }

  /**
   * Get attributes settings
   * @return {Promise<Object>}
   */
  async getMappings() {
    return this.attributesHttp.getMappings();
  }

  /**
   * Update attributes settings
   * @param {Object} data
   * @return {Promise<Object>}
   */
  async updateMappings(data) {
    const updateAttributeSettingsCmd = new UpdateAttributeSettingsCmd(data);
    const msg = new JsonDataMsg({ appCmds: [updateAttributeSettingsCmd] });
    return this.attributesHttp.updateMappings(msg);
  }

  /** @type {() => AttributesService} */
  static getInstance = makeSingletonInstance(() => new AttributesService());
}

import { proxydi } from '@/casimir-framework/proxydi';
import { MultFormDataMsg, JsonDataMsg } from '@/casimir-framework/messages';
import {
  CreateUserCmd,
  UpdateUserCmd,
  AlterDaoAuthorityCmd
} from '@/casimir-framework/commands';
// import { ChainService } from '@casimir.one/chain-service';
import { WebSocketService } from '@/casimir-framework/services/WebSocket';
import {
  replaceFileWithName,
  createFormData,
  genSha256Hash,
  makeSingletonInstance
} from '@/casimir-framework/all';
// import { APP_EVENT } from '@/casimir-framework/all';
// import { walletSignTx } from '@casimir.one/platform-util';
import { UserHttp } from './UserHttp';

export class UserService {
  userHttp = UserHttp.getInstance();
  webSocketService = WebSocketService.getInstance();

  proxydi = proxydi;


  /**
   * Extract FormData from data
   * @param {Object} data
   * @returns {Object} convertedData
   * @returns {FormData} convertedData.formData
   * @returns {Array} convertedData.attributes
   * 
   */
  static #convertFormData(data) {
    const formData = createFormData(data);
    const attributes = replaceFileWithName(data.attributes);
    return {
      formData,
      attributes
    };
  }

  /**
   * Create user information
   * @param {Object} payload
   * @param {Object} payload.initiator
   * @param {string} payload.initiator._id
   * @param {string} payload.initiator.privKey
   * @param {string} payload.data.email
   * @param {number} payload.data.pubKey
   * @param {Object[]} payload.data.attributes
   * @return {Promise<Object>}
   */
  async create(payload) {
    const env = this.proxydi.get('env');
    const {
      initiator,
      data
    } = payload;

    const {
      formData,
      attributes
    } = UserService.#convertFormData(data);

    const cmd = new CreateUserCmd({
      ...data,
      attributes,
    });

    const msg = new MultFormDataMsg(formData, {
      'appCmds': [cmd]
    }, { 
      'entity-id': cmd.getEntityId() 
    });

    return this.userHttp.create(msg);
  }

  /**
   * Update user information
   * @param {Object} payload
   * @param {Object} payload.initiator
   * @param {string} payload.initiator._id
   * @param {string} payload.initiator.privKey
   * @param {string} payload.data.email
   * @param {number} payload.data.pubKey
   * @param {Object[]} payload.data.attributes
   * @return {Promise<Object>}
   */
  async update(payload) {
    const env = this.proxydi.get('env');
    const {
      initiator,
      data
    } = payload;
    
    const {
      formData,
      attributes
    } = UserService.#convertFormData(data);

    const cmd = new UpdateUserCmd({
      ...data,
      attributes,
    });

    const msg = new MultFormDataMsg(formData, {
      'appCmds': [cmd]
    }, { 
      'entity-id': data._id 
    });

    return this.userHttp.update(msg);
  }

  /**
   * Get users by ids
   * @param {string[]} ids
   * @return {Promise<Object>}
   */
  async getListByIds(ids) {
    return this.userHttp.getListByIds(ids);
  }

  /**
   * Get users by team id
   * @param {string} teamId
   * @return {Promise<Object>}
   */
  async getListByTeam(teamId) {
    return this.userHttp.getListByTeam(teamId);
  }

  /**
   * Get users by portal id
   * @param {string} portalId
   * @return {Promise<Object>}
   */
  async getListByPortal(portalId) {
    return this.userHttp.getListByPortal(portalId);
  }

  /**
   * Get users by several parameters
   * @param {Object} query
   * @return {Promise<Object>}
   */
  async getList(query = {}) {
    return this.userHttp.getList(query);
  }

  /**
   * Get user by _id or email
   * @param {string} _id
   * @return {Promise<Object>}
   */
  async getOne(_id) {
    if (_id.includes('@')) {
      return this.userHttp.getOneByEmail(_id);
    }
    return this.userHttp.getOne(_id);
  }

  /** @type {() => UserService} */
  static getInstance = makeSingletonInstance(() => new UserService());
}

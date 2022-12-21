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
   * Get user by _id or email
   * @param {string} _id
   * @return {Promise<Object>}
   */
  async getOne(userIdOrEmail) {
    return this.userHttp.getOne(userIdOrEmail);
  }

  /**
   * Get Users list paginated
   * @param {Object} query
   * @param {Object} query.sort 'asc', 'desc'
   * @param {Number} query.page 0 or above
   * @param {Number} query.pageSize from 1 to 100
   * @param {Object} query.filter
   */
  async getList(query) {
    return this.userHttp.getList(query);
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

  /** @type {() => UserService} */
  static getInstance = makeSingletonInstance(() => new UserService());
}

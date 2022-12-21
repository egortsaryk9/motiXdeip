import { makeSingletonInstance, createFormData, replaceFileWithName, uuidv4 } from '@/casimir-framework/all';
import { proxydi } from '@/casimir-framework/proxydi';
import { JsonDataMsg, MultFormDataMsg } from '@/casimir-framework/messages';
import { 
  TransferNFTCmd, 
  CreateNftCollectionCmd, 
  UpdateNftItemCmd, 
  CreateNftItemCmd, 
  DeleteNftItemCmd,
  UpdateNftCollectionCmd, 
  ModerateNftItemCmd, 
} from '@/casimir-framework/commands';
import { APP_PROPOSAL } from '@/casimir-framework/vars';
// import { walletSignTx } from '@/casimir-framework/all';
// import { ChainService } from '@casimir.one/chain-service';
import { WebSocketService } from '@/casimir-framework/services/WebSocket';
import { NonFungibleTokenHttp } from './NonFungibleTokenHttp';
import { transferToken, updateProposalInfo } from '../../util';

/**
 * Non-fungible token service
 */
export class NonFungibleTokenService {
  proxydi = proxydi;
  webSocketService = WebSocketService.getInstance();
  nonFungibleTokenHttp = NonFungibleTokenHttp.getInstance();

  /**
   * Extract FormData from data
   * @param {Object} data
   * @returns {Object} convertedData
   * @returns {FormData} convertedData.formData
   * @returns {Array} convertedData.attributes
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
   * Get NFT collection
   * @param {string} nftCollectionId
   * @return {Promise<Object>}
   */
  async getNftCollection(id) {
    return this.nonFungibleTokenHttp.getNftCollection(id);
  }

  /**
   * Get NFT collections
   * @param {Object} filter
   * @param {Array} filter.attributes
   * @param {Array.<string>} filter.attributes
   * @returns {Promise<Object>}
   */
  async getNftCollections(filter = {}) {
    return this.nonFungibleTokenHttp.getNftCollections(filter);
  }

  /**
   * Create new NFT collection
   * @param {import('@casimir.one/platform-core').NonFungibleTokenCreatePayload} payload
   * @param signTxCallback
   * @return {Promise<Object>}
   */
  async createNftCollection(payload) {
    const {
      initiator,
      data
    } = payload;

    const {
      formData,
      attributes
    } = NonFungibleTokenService.#convertFormData(data);
    
    const cmd = new CreateNftCollectionCmd({
      ...data,
      attributes
    });

    const msg = new MultFormDataMsg(formData, {
      'appCmds': [cmd]
    }, {
      'entity-id': cmd.getEntityId()
    });

    const response = await this.nonFungibleTokenHttp.createNFTCollection(msg);
    return response;
  }

  /**
   * Update NFT collection
   * @param {Object} payload.data
   * @param {string} payload.data._id
   * @param {Array.<Object>} payload.data.attributes
   * @returns {Promise<Object>}
   */
  async updateNftCollection(payload) {
    const {
      initiator,
      data
    } = payload;
    
    const {
      formData,
      attributes
    } = NonFungibleTokenService.#convertFormData(data);

    const cmd = new UpdateNftCollectionCmd({
      ...data,
      attributes
    });

    const msg = new MultFormDataMsg(formData, {
      appCmds: [cmd]
    }, {
      'entity-id': data._id
    });

    const response = await this.nonFungibleTokenHttp.updateNftCollection(msg);
    return response;
  }

  /**
   * Get NFT item
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async getNftItem(id) {
    return this.nonFungibleTokenHttp.getNftItem(id);
  }

  /**
   * Get NFT item
   * @param {Object} query
   * @param {Object} query.sort 'asc', 'desc'
   * @param {Number} query.page 0 or above
   * @param {Number} query.pageSize from 1 to 100
   * @param {Object} query.filter
   */
  async getNftItems(query) {
    return this.nonFungibleTokenHttp.getNftItems(query);
  }

  /**
   * Create NFT item
   * @param {Object} payload.data
   * @param {string} payload.data.nftCollectionId
   * @param {Object} payload.data.jsonData
   * @param {number} payload.data.creatorId
   * @param {string} payload.data.ownerId,
   * @param {Array.<Object>} payload.data.attributes
   * @returns {Promise<Object>}
   */
  async createNftItem(payload) {
    const {
      initiator,
      data
    } = payload;

    const {
      formData,
      attributes
    } = NonFungibleTokenService.#convertFormData(data);

    const cmd = new CreateNftItemCmd({ 
      ...data,
      attributes
    });

    const msg = new MultFormDataMsg(formData, {
      'appCmds': [cmd]
    }, {
      'nft-item-id': cmd.getEntityId(),
      'nft-collection-id': data.nftCollectionId
    });

    const response = await this.nonFungibleTokenHttp.createNftItem(msg);
    return response;
  }

  /**
   * Update NFT item
   * @param {Object} payload.data
   * @param {string} payload.data._id,
   * @param {string} payload.data.nftCollectionId,
   * @param {Array.<Object>} payload.data.attributes
   * @returns {Promise<Object>}
   */
  async updateNftItem(payload) {
    const {
      initiator,
      data
    } = payload;

    const {
      formData,
      attributes
    } = NonFungibleTokenService.#convertFormData(payload.data);

    const cmd = new UpdateNftItemCmd({ 
      ...data,
      attributes
    });

    const msg = new MultFormDataMsg(formData, {
      'appCmds': [cmd]
    }, {
      'nft-item-id': data._id,
      'nft-collection-id': data.nftCollectionId,
    });

    const response = await this.nonFungibleTokenHttp.updateNftItem(msg);
    return response;
  }

  /**
   * Delete NFT item
   * @param {string} nftItemId
   * @returns {Promise<Object>}
   */
  async deleteNftItem(payload) {
    const {
      initiator,
      data
    } = payload;

    const cmd = new DeleteNftItemCmd({
      ...data
    });

    const msg = new JsonDataMsg({
      'appCmds': [cmd]
    }, {
      'entity-id': data._id
    });

    return this.nonFungibleTokenHttp.deleteNftItem(msg);
  }

  /**
   * Moderate NFT item
   * @param {Object} payload
   * @param {Object} payload.data
   * @param {string} payload.data._id
   * @param {string} payload.data.status NftItemMetadataDraftStatus
   * @returns
   */
  async moderateNftItem(payload) {
    const {
      initiator,
      data
    } = payload;

    const cmd = new ModerateNftItemCmd({
      ...data
    });

    const msg = new JsonDataMsg({
      'appCmds': [cmd]
    }, {
      'entity-id': data._id
    });
 
    const response = await this.nonFungibleTokenHttp.moderateNftItem(msg);
    return response;
  }

  /**
   * Transfer non-fungible token
   * @param{import('@casimir.one/platform-core').NonFungibleTokenTransferPayload} payload
   * @return {Promise<Object>}
   */
  async transfer(payload) {
    const transferPayload = updateProposalInfo(payload);
    const {
      data: {
        from,
        to,
        token
      }
    } = transferPayload;
    const transferTokenCmd = new TransferNFTCmd({
      from,
      to,
      nftCollectionId: token.nftCollectionId,
      nftItemId: token.nftItemId
    });
    return transferToken(transferPayload, transferTokenCmd, APP_PROPOSAL.NFT_TRANSFER_PROPOSAL, this.nonFungibleTokenHttp.transfer);
  }

  /** @type {() => NonFungibleTokenService} */
  static getInstance = makeSingletonInstance(() => new NonFungibleTokenService());
}
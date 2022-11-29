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
import { APP_PROPOSAL, APP_EVENT } from '@/casimir-framework/vars';
// import { walletSignTx } from '@/casimir-framework/all';
// import { ChainService } from '@casimir.one/chain-service';
// import { WebSocketService } from '@casimir.one/web-socket-service';
import { NonFungibleTokenHttp } from './NonFungibleTokenHttp';
import { transferToken, updateProposalInfo } from '../../util';

/**
 * Non-fungible token service
 */
export class NonFungibleTokenService {
  // proxydi = proxydi;
  // webSocketService = WebSocketService.getInstance();
  nonFungibleTokenHttp = NonFungibleTokenHttp.getInstance();

  /**
   * Extract FormData from data
   * @param {Object} data
   * @returns {Object} convertedData
   * @returns {FormData} convertedData.formData
   * @returns {Array} convertedData.attributes
   * @returns {string} convertedData.description
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
      data: {
        ownerId,
      }
    } = payload;

    const {
      formData,
      attributes
    } = NonFungibleTokenService.#convertFormData(payload.data);

    const entityId = uuidv4();
    
    const cmd = new CreateNftCollectionCmd({
      entityId,
      ownerId,
      issuer: ownerId, // temp
      attributes
    });

    const metadataMsg = new MultFormDataMsg(formData, {
      appCmds: [cmd]
    }, {
      'entity-id': entityId
    });

    const response = await this.nonFungibleTokenHttp.createNFTCollection(metadataMsg);
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
    const { data } = payload;
    const { _id } = data;

    const {
      formData,
      attributes
    } = NonFungibleTokenService.#convertFormData(data);

    const cmd = new UpdateNftCollectionCmd({
      _id,
      attributes
    });

    const msg = new MultFormDataMsg(formData, {
      appCmds: [cmd]
    }, {
      'entity-id': _id
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
  async getNftItemsListPaginated(query) {
    return this.nonFungibleTokenHttp.getNftItemsListPaginated(query);
  }

  /**
   * Create NFT item
   * @param {Object} payload.data
   * @param {string} payload.data.nftCollectionId
   * @param {string} payload.data.nftItemId
   * @param {number} payload.data.formatType
   * @param {Object} payload.data.jsonData
   * @param {number} payload.data.status
   * @param {string} payload.data.owner,
   * @param {boolean} payload.data.ownedByTeam,
   * @param {Array.<Object>} payload.data.attributes
   * @returns {Promise<Object>}
   */
  async createNftItem(payload) {
    const {
      data
    } = payload;
    const {
      formData,
      attributes
    } = NonFungibleTokenService.#convertFormData(payload.data);
    const commandData = { ...data,
      attributes
    };
    const cmd = new CreateNftItemCmd(commandData);
    const msg = new MultFormDataMsg(formData, {
      appCmds: [cmd]
    }, {
      'nft-collection-id': data.nftCollectionId,
      'nft-item-id': data.nftItemId
    });

    const response = await this.nonFungibleTokenHttp.createNftItem(msg);
    return response;
  }

  /**
   * Update NFT item
   * @param {Object} payload.data
   * @param {string} payload.data._id,
   * @param {number} payload.data.formatType
   * @param {Object} payload.data.jsonData
   * @param {string} payload.data.nftCollectionId,
   * @param {Array.<Object>} payload.data.attributes
   * @returns {Promise<Object>}
   */
  async updateNftItem(payload) {
    const {
      data
    } = payload;
    const {
      formData,
      attributes
    } = NonFungibleTokenService.#convertFormData(payload.data);
    const commandData = { ...data,
      attributes
    };
    const cmd = new UpdateNftItemCmd(commandData);
    const msg = new MultFormDataMsg(formData, {
      appCmds: [cmd]
    }, {
      'nft-collection-id': data.nftCollectionId,
      'nft-item-id': data.nftItemId
    });

    const response = await this.nonFungibleTokenHttp.updateNftItem(msg);
    return response;
  }

  /**
   * Delete NFT item
   * @param {string} nftItemId
   * @returns {Promise<Object>}
   */
  async deleteNftItem(nftItemId) {
    const cmd = new DeleteNftItemCmd({
      _id: nftItemId
    });
    const msg = new JsonDataMsg({
      appCmds: [cmd]
    }, {
      'entity-id': nftItemId
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
      data
    } = payload;
    const {
      _id,
      status,
    } = data;

    const cmd = new ModerateNftItemCmd({
      _id,
      status
    });

    const msg = new JsonDataMsg({
      appCmds: [cmd]
    }, {
      'entity-id': _id
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
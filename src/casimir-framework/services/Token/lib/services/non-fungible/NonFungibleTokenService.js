import { makeSingletonInstance, createFormData, replaceFileWithName, uuidv4 } from '@/casimir-framework/all';
import { proxydi } from '@/casimir-framework/proxydi';
import { JsonDataMsg, MultFormDataMsg } from '@/casimir-framework/messages';
import { 
  TransferNFTCmd, 
  CreateNftCollectionCmd, 
  CreateNftCollectionMetadataCmd, 
  UpdateNftItemMetadataDraftCmd, 
  CreateNftItemMetadataDraftCmd, 
  DeleteNftItemMetadataDraftCmd,
  UpdateNftCollectionMetadataCmd, 
  UpdateNftItemMetadataDraftStatusCmd, 
  UpdateNftItemMetadataDraftModerationMsgCmd 
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
   * Get nft collection by id
   * @param {string} nftCollectionId
   * @return {Promise<Object>}
   */
  async getNftCollection(id) {
    return this.nonFungibleTokenHttp.getNftCollection(id);
  }

  /**
   * Get public nft collections list
   * @param {Object} filter
   * @param {Array} filter.attributes
   * @param {Array.<string>} filter.attributes
   * @returns {Promise<Object>}
   */
  async getNftCollections(filter = {}) {
    return this.nonFungibleTokenHttp.getNftCollections(filter);
  }

  /**
   * Create new nft collection and nft collection metadata
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
    
    const createNftCollectionMetadataCmd = new CreateNftCollectionMetadataCmd({
      entityId,
      ownerId,
      issuer: ownerId, // temp
      attributes
    });

    const metadataMsg = new MultFormDataMsg(formData, {
      appCmds: [createNftCollectionMetadataCmd]
    }, {
      'entity-id': entityId
    });

    const response = await this.nonFungibleTokenHttp.createNFTCollection(metadataMsg);
    return response;
  }

  /**
   * Update nft collection metadata
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

    const updateNftCollectionMetadataCmd = new UpdateNftCollectionMetadataCmd({
      _id,
      attributes
    });

    const msg = new MultFormDataMsg(formData, {
      appCmds: [updateNftCollectionMetadataCmd]
    }, {
      'entity-id': _id
    });

    const response = await this.nonFungibleTokenHttp.updateNftCollection(msg);
    return response;
  }


  /**
   * Create nft item metadata draft
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
  async createNftItemMetadataDraft(payload) {
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
    const createNftItemMetadataDraftCmd = new CreateNftItemMetadataDraftCmd(commandData);
    const msg = new MultFormDataMsg(formData, {
      appCmds: [createNftItemMetadataDraftCmd]
    }, {
      'nft-collection-id': data.nftCollectionId,
      'nft-item-id': data.nftItemId
    });

    const response = await this.nonFungibleTokenHttp.createNftItemMetadataDraft(msg);
    return response;
  }

  /**
   * Update nft item metadata draft
   * @param {Object} payload.data
   * @param {string} payload.data._id,
   * @param {number} payload.data.formatType
   * @param {Object} payload.data.jsonData
   * @param {string} payload.data.nftCollectionId,
   * @param {Array.<Object>} payload.data.attributes
   * @returns {Promise<Object>}
   */
  async updateNftItemMetadataDraft(payload) {
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
    const updateNftItemMetadataDraftCmd = new UpdateNftItemMetadataDraftCmd(commandData);
    const msg = new MultFormDataMsg(formData, {
      appCmds: [updateNftItemMetadataDraftCmd]
    }, {
      'nft-collection-id': data.nftCollectionId,
      'nft-item-id': data.nftItemId
    });
    const {
      RETURN_MSG
    } = this.proxydi.get('env');

    if (RETURN_MSG === true) {
      return msg;
    }

    const response = await this.nonFungibleTokenHttp.updateNftItemMetadataDraft(msg);
    return response;
  }

  /**
   * Delete nft item metadata draft
   * @param {string} nftItemMetadataDraftId
   * @returns {Promise<Object>}
   */
  async deleteNftItemMetadataDraft(nftItemMetadataDraftId) {
    const deleteNftItemMetadataDraftCmd = new DeleteNftItemMetadataDraftCmd({
      _id: nftItemMetadataDraftId
    });
    const msg = new JsonDataMsg({
      appCmds: [deleteNftItemMetadataDraftCmd]
    }, {
      'entity-id': nftItemMetadataDraftId
    });
    const {
      RETURN_MSG
    } = this.proxydi.get('env');

    if (RETURN_MSG === true) {
      return msg;
    }

    return this.nonFungibleTokenHttp.deleteNftItemMetadataDraft(msg);
  }

  /**
   * Moderate nft item metadata draft
   * @param {Object} payload
   * @param {Object} payload.data
   * @param {string} payload.data._id
   * @param {string} payload.data.status NftItemMetadataDraftStatus
   * @param {string} payload.data.moderationMessage
   * @returns
   */
  async moderateNftItemMetadataDraft(payload) {
    const {
      data
    } = payload;
    const {
      _id,
      status,
      moderationMessage
    } = data;
    const appCmds = [];
    const updateStatusCmd = new UpdateNftItemMetadataDraftStatusCmd({
      _id,
      status
    });
    appCmds.push(updateStatusCmd);

    if (moderationMessage) {
      const updateMetadataCmd = new UpdateNftItemMetadataDraftModerationMsgCmd({
        _id,
        moderationMessage
      });
      appCmds.push(updateMetadataCmd);
    }

    const msg = new JsonDataMsg({
      appCmds
    }, {
      'entity-id': _id
    });
 
    const response = await this.nonFungibleTokenHttp.moderateNftItemMetadataDraft(msg);
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

  
  /**
   * Get nft item metadata draft by id
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async getNftItemMetadataDraft(id) {
    return this.nonFungibleTokenHttp.getNftItemMetadataDraft(id);
  }


  /**
   * Get nft item metadata drafts list paginated
   * @param {Object} query
   * @param {Object} query.sort 'asc', 'desc'
   * @param {Number} query.page 0 or above
   * @param {Number} query.pageSize from 1 to 100
   * @param {Object} query.filter
   */
  async getNftItemMetadataDraftsListPaginated(query) {
    return this.nonFungibleTokenHttp.getNftItemMetadataDraftsListPaginated(query);
  }

  /**
   * Get nft item metadata drafts list by nft collection
   * @param {string} nftCollectionId
   * @returns {Promise<Object>}
   */
  async getNftItemMetadataDraftsByNftCollection(nftCollectionId) {
    return this.nonFungibleTokenHttp.getNftItemMetadataDraftsByNftCollection(nftCollectionId);
  }

  /** @type {() => NonFungibleTokenService} */
  static getInstance = makeSingletonInstance(() => new NonFungibleTokenService());
}
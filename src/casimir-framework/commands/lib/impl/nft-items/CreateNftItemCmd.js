import { APP_CMD, NftItemMetadataDraftStatus } from '@/casimir-framework/vars';
import { assert } from '@/casimir-framework/all';
import AppEntityCmd from '../../base/AppEntityCmd';

/**
 * Create NFT item command
 * @extends AppEntityCmd
 */
class CreateNftItemCmd extends AppEntityCmd {
  /**
   * Command for NFT item creation
   * @param {Object} cmdPayload
   * @param {string} cmdPayload.entityId
   * @param {string} cmdPayload.nftCollectionId
   * @param {string} cmdPayload.ownerId
   * @param {string} cmdPayload.creatorId
   * @param {Array.<Object>} cmdPayload.attributes
   * @param {Object} cmdPayload.status
   */
  constructor(cmdPayload) {
    const {
      nftCollectionId,
      status,
      ownerId,
      creatorId,
      attributes
    } = cmdPayload;

    assert(!!ownerId, "'ownerId' is required");
    assert(!!nftCollectionId, "'nftCollectionId' is required");
    assert(!!creatorId, "'creatorId' is required");
    assert(!!status && Object.values(NftItemMetadataDraftStatus).includes(status), "'status' is required");
    assert(Array.isArray(attributes), "'attributes' must be array");

    super(APP_CMD.CREATE_NFT_ITEM, cmdPayload);
  }
}

export default CreateNftItemCmd;
import { APP_CMD, NftItemMetadataDraftStatus } from '@/casimir-framework/vars';
import { assert } from '@/casimir-framework/all';
import AppEntityCmd from '../../base/AppEntityCmd';

/**
 * Create NFT item command
 * @extends AppCmd
 */
class CreateNftItemCmd extends AppEntityCmd {
  /**
   * Command for NFT item creation
   * @param {Object} cmdPayload
   * @param {string} cmdPayload.nftCollectionId
   * @param {string} cmdPayload.entityId
   * @param {string} cmdPayload.ownerId
   * @param {string} cmdPayload.creatorId
   * @param {Array.<Object>} cmdPayload.attributes
   * @param {Object} cmdPayload.status
   */
  constructor(cmdPayload) {
    const {
      nftCollectionId,
      nftItemId,
      status,
      ownerId,
      creatorId,
      // eslint-disable-next-line no-unused-vars
      attributes
    } = cmdPayload;

    // assert(!!nftCollectionId, "'nftCollectionId' is required");
    assert(!!nftItemId, "'nftItemId' is required");
    assert(!!ownerId, "'ownerId' is required");
    assert(!!creatorId, "'creatorId' is required");

    if (status) {
      assert(Object.values(NftItemMetadataDraftStatus).includes(status), "'status' is invalid");
    }

    super(APP_CMD.CREATE_NFT_ITEM, cmdPayload);
  }
}

export default CreateNftItemCmd;
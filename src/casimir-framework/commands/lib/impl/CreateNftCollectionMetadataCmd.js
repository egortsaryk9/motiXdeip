import { APP_CMD } from '@/casimir-framework/vars';
import { assert, isNumber, isString } from '@/casimir-framework/all';
import AppCmd from '../base/AppCmd';

/**
 * Create nft collection metadata command
 * @extends AppCmd
 */
class CreateNftCollectionMetadataCmd extends AppCmd {
  /**
   * Create command for nft collection metadata creation
   * @param {Object} cmdPayload
   * @param {string} cmdPayload.ownerId
   * @param {string} cmdPayload.entityId
   * @param {Array.<Object>} cmdPayload.attributes
   */
  constructor(cmdPayload) {
    const {
      // onchain
      ownerId,
      entityId
    } = cmdPayload;

    assert(!!entityId, "'entityId' is required");
    assert(!!ownerId, "'ownerId' is required");

    super(APP_CMD.CREATE_NFT_COLLECTION_METADATA, cmdPayload);
  }
}

export default CreateNftCollectionMetadataCmd;

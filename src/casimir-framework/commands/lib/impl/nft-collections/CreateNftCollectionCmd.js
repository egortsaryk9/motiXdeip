import { APP_CMD } from '@/casimir-framework/vars';
import { assert } from '@/casimir-framework/all';
import AppCmd from '../../base/AppCmd';

/**
 * Create NFT collection command
 * @extends AppCmd
 */
class CreateNftCollectionCmd extends AppCmd {
  /**
   * Command for NFT collection creation
   * @param {Object} cmdPayload
   * @param {string} cmdPayload.ownerId
   * @param {string} cmdPayload._id
   * @param {Array.<Object>} cmdPayload.attributes
   */
  constructor(cmdPayload) {
    const {
      // onchain
      ownerId,
      _id
    } = cmdPayload;

    assert(!!_id, "'_id' is required");
    assert(!!ownerId, "'ownerId' is required");

    super(APP_CMD.CREATE_NFT_COLLECTION, cmdPayload);
  }
}

export default CreateNftCollectionCmd;

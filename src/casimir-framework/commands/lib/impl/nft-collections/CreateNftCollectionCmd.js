import { APP_CMD } from '@/casimir-framework/vars';
import { assert } from '@/casimir-framework/all';
import AppEntityCmd from '../../base/AppEntityCmd';

/**
 * Create NFT collection command
 * @extends AppEntityCmd
 */
class CreateNftCollectionCmd extends AppEntityCmd {
  /**
   * Command for NFT collection creation
   * @param {Object} cmdPayload
   * @param {string} cmdPayload.ownerId
   * @param {Array.<Object>} cmdPayload.attributes
   */
  constructor(cmdPayload) {
    const {
      ownerId,
    } = cmdPayload;

    assert(!!ownerId, "'ownerId' is required");

    super(APP_CMD.CREATE_NFT_COLLECTION, cmdPayload);
  }
}

export default CreateNftCollectionCmd;

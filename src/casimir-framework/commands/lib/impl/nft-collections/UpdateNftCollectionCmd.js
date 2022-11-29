import { APP_CMD } from '@/casimir-framework/vars';
import { assert } from '@/casimir-framework/all';

import AppCmd from '../../base/AppCmd';

/**
 * Update NFT collection command
 */
class UpdateNftCollectionCmd extends AppCmd {
  /**
   * Command for NFT collection update
   * @param {Object} cmdPayload
   * @param {string} cmdPayload._id
   * @param {Array.<Object>} cmdPayload.attributes
   */
  constructor(cmdPayload) {
    const {
      // onchain
      _id,

      // offchain
      // eslint-disable-next-line no-unused-vars
      attributes
    } = cmdPayload;

    assert(!!_id, "'_id' is required");

    super(APP_CMD.UPDATE_NFT_COLLECTION, cmdPayload);
  }
}

export default UpdateNftCollectionCmd;

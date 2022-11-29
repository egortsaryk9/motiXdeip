import { APP_CMD } from '@/casimir-framework/vars';
import { assert } from '@/casimir-framework/all';
import AppCmd from '../../base/AppCmd';

/**
 * Update NFT item command
 * @extends AppCmd
 */
class UpdateNftItemCmd extends AppCmd {
  /**
   * Command for NFT item update
   * @param {Object} cmdPayload
   * @param {string} cmdPayload._id
   * @param {Array.<Object>} cmdPayload.attributes
   */
  constructor(cmdPayload) {
    const {
      _id
    } = cmdPayload;

    assert(!!_id, "'_id' is required");

    super(APP_CMD.UPDATE_NFT_ITEM, cmdPayload);
  }
}

export default UpdateNftItemCmd;

import { APP_CMD } from '@/casimir-framework/vars';
import { assert } from '@/casimir-framework/all';
import AppCmd from '../../base/AppCmd';

/**
 * Delete NFT item command
 * @extends AppCmd
 */
class DeleteNftItemCmd extends AppCmd {
  /**
   * Command for NFT item removal
   * @param {Object} cmdPayload
   * @param {string} cmdPayload._id
   */
  constructor(cmdPayload) {
    const {
      _id
    } = cmdPayload;

    assert(!!_id, "'_id' is required");

    super(APP_CMD.DELETE_NFT_ITEM, cmdPayload);
  }
}

export default DeleteNftItemCmd;
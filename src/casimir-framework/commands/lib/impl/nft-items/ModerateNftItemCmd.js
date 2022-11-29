import { APP_CMD, NftItemMetadataDraftStatus } from '@/casimir-framework/vars';
import { assert } from '@/casimir-framework/all';
import AppCmd from '../../base/AppCmd';

/**
 * Moderate NFT item command
 * @extends AppCmd
 */
class ModerateNftItemCmd extends AppCmd {
  /**
   * Command for NFT item moderation
   * @param {Object} cmdPayload
   * @param {string} cmdPayload._id
   * @param {number} cmdPayload.status
   */
  constructor(cmdPayload) {
    const {
      _id,
      status
    } = cmdPayload;

    assert(!!_id, "'_id' is required");
    assert(!!status, "'status' is required");
    assert(Object.values(NftItemMetadataDraftStatus).includes(status), "'status' is invalid");

    super(APP_CMD.MODERATE_NFT_ITEM, cmdPayload);
  }
}

export default ModerateNftItemCmd;

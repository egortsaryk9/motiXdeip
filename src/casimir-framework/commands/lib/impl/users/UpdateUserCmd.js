import { APP_CMD } from '@/casimir-framework/vars';
import { assert, isArray } from '@/casimir-framework/all';
import AppCmd from '../../base/AppCmd';

/**
 * Update User command
 * @extends AppCmd
 */
class UpdateUserCmd extends AppCmd {
  /**
   * Command for User update
   * @param {Object} cmdPayload
   * @param {string} cmdPayload._id
   * @param {string} cmdPayload.email
   * @param {string} cmdPayload.pubKey
   * @param {Array} cmdPayload.attributes
   */
  constructor(cmdPayload) {
    const {
      _id,
      email,
      pubKey,
      attributes
    } = cmdPayload;

    assert(!!_id, "'_id' is required");
    assert(isArray(attributes), "'attributes' must be array");

    super(APP_CMD.UPDATE_USER, cmdPayload);
  }
}


export default UpdateUserCmd;
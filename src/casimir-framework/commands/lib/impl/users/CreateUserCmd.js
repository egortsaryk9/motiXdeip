import { APP_CMD } from '@/casimir-framework/vars';
import { assert, isArray } from '@/casimir-framework/all';
import AppEntityCmd from '../../base/AppEntityCmd';

/**
 * Create User command
 * @extends AppEntityCmd
 */
class CreateUserCmd extends AppEntityCmd {
  /**
   * Command for User creation
   * @param {Object} cmdPayload
   * @param {string} cmdPayload.email
   * @param {string} cmdPayload.pubKey
   * @param {Array} cmdPayload.attributes
   */
  constructor(cmdPayload) {
    const {
      email,
      pubKey,
      attributes,
    } = cmdPayload;

    assert(!!email, "'email' is required");
    assert(!!pubKey, "'pubKey' is required");
    assert(isArray(attributes), "'attributes' must be an array");

    super(APP_CMD.CREATE_USER, cmdPayload);
  }
}

export default CreateUserCmd;

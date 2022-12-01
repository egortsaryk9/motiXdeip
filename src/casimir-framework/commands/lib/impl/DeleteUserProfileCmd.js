import { APP_CMD } from '@/casimir-framework/vars';
import { assert, isNumber, isString } from '@/casimir-framework/all';
import AppCmd from '../base/AppCmd';

/**
 * Delete user profile command
 */
class DeleteUserProfileCmd extends AppCmd {
  /**
   * Create command for user profile deletion
   * @param {Object} cmdPayload
   * @param {string} cmdPayload._id
   */
  constructor(cmdPayload) {
    const {
      _id
    } = cmdPayload;

    assert(!!_id, "'_id' is required");

    super(APP_CMD.DELETE_USER_PROFILE, cmdPayload);
  }
}

export default DeleteUserProfileCmd;

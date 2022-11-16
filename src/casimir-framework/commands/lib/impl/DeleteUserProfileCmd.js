import { APP_CMD } from '@/constants';
import { assert, isNumber, isString } from '@/casimir';
import AppCmd from '../base/AppCmd';

/**
 * Delete user profile command
 */
class DeleteUserProfileCmd extends AppCmd {
  /**
   * Create command for user profile deletion
   * @param {Object} cmdPayload
   * @param {string} cmdPayload.username
   */
  constructor(cmdPayload) {
    const {
      username
    } = cmdPayload;

    assert(!!username, "'username' is required");

    super(APP_CMD.DELETE_USER_PROFILE, cmdPayload);
  }
}

export default DeleteUserProfileCmd;

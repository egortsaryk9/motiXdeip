import { APP_CMD } from '@/casimir-framework/vars';
import { assert } from '@/casimir-framework/all';
import AppCmd from '../base/AppCmd';

/**
 * Update portal settings command
 * @extends AppCmd
 */
class UpdatePortalSettingsCmd extends AppCmd {
  /**
   * Create command for portal settings update
   * @param {Object} cmdPayload
   * @param {string} cmdPayload.customFields
   */
  constructor(cmdPayload) {
    const {
      customFields
    } = cmdPayload;

    assert(!!customFields, "'customFields' is required");

    super(APP_CMD.UPDATE_PORTAL_SETTINGS, cmdPayload);
  }
}

export default UpdatePortalSettingsCmd;

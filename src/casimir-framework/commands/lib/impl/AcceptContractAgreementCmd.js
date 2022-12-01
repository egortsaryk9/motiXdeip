import { APP_CMD } from '@/casimir-framework/vars';
import { assert } from '@/casimir-framework/all';
import ProtocolCmd from '../base/ProtocolCmd';

/**
 * Accept contract agreement command
 * @extends ProtocolCmd
 */
class AcceptContractAgreementCmd extends ProtocolCmd {
  /**
   * Create command for acceprting contract agreement
   * @param {Object} cmdPayload
   * @param {string} cmdPayload._id
   * @param {party} cmdPayload.party
   */
  constructor(cmdPayload) {
    const {
      _id,
      party
    } = cmdPayload;

    assert(!!_id, "'_id' is required");
    assert(!!party, "'party' is required");

    super(APP_CMD.ACCEPT_CONTRACT_AGREEMENT, cmdPayload);
  }
}

export default AcceptContractAgreementCmd;

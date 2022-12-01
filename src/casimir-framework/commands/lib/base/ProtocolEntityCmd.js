import { genRipemd160Hash } from '@/casimir-framework/all';
import ProtocolCmd from './ProtocolCmd';

/**
 * Class for protocol entity command
 */
class ProtocolEntityCmd extends ProtocolCmd {
  /**
   * Create base command
   * @param {number} cmdNum
   * @param {Object} cmdPayload
   */
  constructor(cmdNum, cmdPayload) {
    super(cmdNum, cmdPayload);
    this._cmdPayload._id = cmdPayload._id
      ? cmdPayload._id // Set
      : ProtocolEntityCmd.GenerateProtocolEntityId(cmdPayload); // Auto-Generated
  }

  /**
   * Get protocol entity id
   * @returns {string} entity id
   */
  getProtocolEntityId() { return this._cmdPayload._id; }

  /**
   * Generate protocol entity id
   * @param {Object} payload
   * @returns {string} entity id
   */
  static GenerateProtocolEntityId(payload) {
    const _id = genRipemd160Hash({ ...payload, __timestamp: new Date().getTime() });
    return _id;
  }
}

export default ProtocolEntityCmd;

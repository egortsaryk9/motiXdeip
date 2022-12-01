import { genRipemd160Hash } from '@/casimir-framework/all';
import AppCmd from './AppCmd';

/**
 * Class for application command with generated id
 * @extends BaseCmd
 */
class AppEntityCmd extends AppCmd {
  /**
   * Create base command
   * @param {number} cmdNum
   * @param {Object} cmdPayload
   */
  constructor(cmdNum, cmdPayload) {
    super(cmdNum, cmdPayload);
    this._cmdPayload._id = cmdPayload._id
      ? cmdPayload._id // Set
      : AppEntityCmd.GenerateEntityId(cmdPayload); // Auto-Generated
  }

  /**
   * Get entity id
   * @returns {string} entity id
   */
  getEntityId() { return this._cmdPayload._id; }

  /**
   * Generate entity id
   * @param {Object} payload
   * @returns {string} entity id
   */
  static GenerateEntityId(payload) {
    const _id = genRipemd160Hash({
      ...payload,
      __timestamp: new Date().getTime()
    }).slice(0, 24);
    return _id;
  }
}

export default AppEntityCmd;

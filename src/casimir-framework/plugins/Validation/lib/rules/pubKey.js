// import { proxydi } from '@casimir.one/proxydi';
import i18n from '@/plugins/i18n';
import secp256k1 from 'secp256k1';

export const pubKey = {
  /**
 * Returns true if given pubKey is correct
 * @param {string} value
 * @returns {boolean} Given pubKey is correct
 */
  validate(value) {
    const hexToBytes = (hexString) =>
      Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
    try {
      const bytes = hexToBytes(value);
      return secp256k1.publicKeyVerify(bytes);
    } catch(err) {
      return i18n.t('plugin.validation.pubKey');
    }
  },

  message(_, values) {
    return i18n.t('plugin.validation.pubKey', values);
  }
};

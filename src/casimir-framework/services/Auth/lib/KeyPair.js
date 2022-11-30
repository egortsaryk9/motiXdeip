import { sha256 } from '@noble/hashes/sha256';
import secp256k1 from 'secp256k1';
import { assert } from '@/casimir-framework/all'


const hexToBytes = (hexString) =>
  Uint8Array.from(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

const bytesToHex = (bytes) =>
  bytes.reduce((str, byte) => str + byte.toString(16).padStart(2, '0'), '');


class KeyPair {

  _pubKey;
  _privKey;

  constructor(seed) { // TODO: generate seed phrase randomly
    assert(!!seed, `'seed' is required`);
    this._privKey = sha256(seed);
    this._pubKey = secp256k1.publicKeyCreate(this._privKey);
  }

  getPubKey() {
    return bytesToHex(this._pubKey);
  }

  getPrivKey() {
    return bytesToHex(this._privKey);
  }

  signMsg(msg) {
    const sigObj = secp256k1.ecdsaSign(
      sha256(msg), 
      this._privKey
    );
    const sig = bytesToHex(sigObj.signature);
    return sig;
  }

  static verifySig(sig, msg, pubKey) {
    return secp256k1.ecdsaVerify(
      hexToBytes(sig), 
      sha256(msg), 
      hexToBytes(pubKey)
    );
  }

}

export default KeyPair;

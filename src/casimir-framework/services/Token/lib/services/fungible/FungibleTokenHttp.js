import { HttpService } from '@/casimir-framework/services/Http';
import { makeSingletonInstance } from '@/casimir-framework/all';

/**
 * Fungible token http transport
 */
export class FungibleTokenHttp {
  http = HttpService.getInstance();

  /**
   * Create new fungible token
   * @param {Object} req
   * @return {Promise<Object>}
   */
  async create(req) {
    return this.http.post('/api/v2/tokens/ft/create', req.getHttpBody());
  }

  /**
   * Issue created fungible token
   * @param {Object} req
   * @return {Promise<Object>}
   */
  async issue(req) {
    return this.http.post('/api/v2/tokens/ft/issue', req.getHttpBody());
  }

  /**
   * Transfer fungible token to other ownerId
   * @param {Object} req
   * @return {Promise<Object>}
   */
  async transfer(req) {
    return this.http.post('/api/v2/tokens/ft/transfer', req.getHttpBody());
  }

  /**
   * Get certain fungible token information
   * @param {string} tokenId
   * @return {Promise<Object>}
   */
  async getOne(tokenId) {
    return this.http.get(`/api/v2/tokens/ft/id/${tokenId}`);
  }

  /**
   * Get fungible token information by fungible token symbol
   * @param {string} symbol
   * @return {Promise<Object>}
   */
  async getOneBySymbol(symbol) {
    return this.http.get(`/api/v2/tokens/ft/symbol/${symbol}`);
  }

  /**
   * Get fungible tokens by tokens issuer
   * @param {string} issuer
   * @return {Promise<Object>}
   */
  async getListByIssuer(issuer) {
    return this.http.get(`/api/v2/tokens/ft/issuer/${issuer}`);
  }

  /**
   * Get list of fungible tokens
   * @param {number} limit
   * @param {string} lowerBoundSymbol
   * @return {Promise<Object>}
   */
  async getList(limit, lowerBoundSymbol = '') {
    return this.http.get(`/api/v2/tokens/ft/limit/${limit}/${lowerBoundSymbol}`);
  }

  /**
   * Get fungible token balances by symbol for certain account
   * @param {string} ownerId
   * @param {string} symbol
   * @return {Promise<Object>}
   */
  async getAccountBalance(ownerId, symbol) {
    return this.http.get(`/api/v2/tokens/ft/owner/${ownerId}/symbol/${symbol}`);
  }

  /**
   * Get fungible token balances by ownerId
   * @param {string} ownerId
   * @return {Promise<Object>}
   */
  async getAccountBalancesByOwner(ownerId) {
    return this.http.get(`/api/v2/tokens/ft/owner/${ownerId}`);
  }

  /**
   * Get certain fungible tokens balances for all accounts
   * @param {string} symbol
   * @return {Promise<Object>}
   */
  async getAccountsBalancesBySymbol(symbol) {
    return this.http.get(`/api/v2/tokens/ft/accounts/symbol/${symbol}`);
  }

  /** @type {() => FungibleTokenHttp} */
  static getInstance = makeSingletonInstance(() => new FungibleTokenHttp());
}
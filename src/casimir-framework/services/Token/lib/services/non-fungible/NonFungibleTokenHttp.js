import { HttpService, serializeParams } from '@/casimir-framework/services/Http';
import { makeSingletonInstance } from '@/casimir-framework/all';

/**
 * Non-fungible token http transport
 */
export class NonFungibleTokenHttp {
  http = HttpService.getInstance();

  /**
   * Get nft collection by id
   * @param {string} nftCollectionId
   * @returns {Promise<Object>}
   */
  async getNftCollection(id) {
    return this.http.get(`/api/v3/collections/${id}`);
  }

  /**
   * Get public nft collections list
   * @param {Object} filter
   * @param {Array} filter.attributes
   * @param {Array.<string>} filter.attributes
   * @returns {Promise<Object>}
   */
  async getNftCollections(filter) {
    const query = serializeParams({ filter });
    return this.http.get(`/api/v3/collections?${query}`);
  }

  /**
   * Create new non-fungible token class
   * @param {Object} req
   * @return {Promise<Object>}
   */
  async createNFTCollection(req) {
    return this.http.post('/api/v3/collections', req.getHttpBody(), {
      headers: req.getHttpHeaders()
    });
  }

  /**
   * Create new non-fungible token class
   * @param {Object} req
   * @return {Promise<Object>}
   */
  async updateNftCollection(req) {
    return this.http.put('/api/v3/collections', req.getHttpBody(), {
      headers: req.getHttpHeaders()
    });
  }

  /**
   * Get NFT items list paginated
   * @param {Object} query
   * @param {Object} query.sort 'asc', 'desc' by fields
   * @param {Number} query.page 0 or above
   * @param {Number} query.pageSize from 1 to 100
   * @param {Object} query.filter filter
   * @returns {Promise<Object>}
   */
  async getNftItemsListPaginated(query) {
    const querySerialized = serializeParams(query);
    return this.http.get(`/api/v3/items?${querySerialized}`);
  }

  /**
   * Get NFT item
   * @param {string} id
   * @returns {Promise<Object>}
   */
  async getNftItem(id) {
    return this.http.get(`/api/v3/items/${id}`);
  }

  /**
   * Create NFT item
   * @param {Object} req
   * @returns {Promise<Object>}
   */
  async createNftItem(req) {
    return this.http.post('/api/v3/items', req.getHttpBody(), {
      headers: req.getHttpHeaders()
    });
  }

  /**
   * Update NFT item
   * @param {Object} req
   * @returns {Promise<Object>}
   */
  async updateNftItem(req) {
    return this.http.put('/api/v3/items', req.getHttpBody(), {
      headers: req.getHttpHeaders()
    });
  }

  /**
   * Delete NFT item
   * @param {Object} req
   * @returns {Promise<Object>}
   */
  async deleteNftItem(req) {
    return this.http.delete('/api/v3/items', req.getHttpBody(), {
      headers: req.getHttpHeaders()
    });
  }

  /**
   * Moderate NFT item
   * @param {Object} req
   * @returns {Promise<Object>}
   */
  async moderateNftItem(req) {
    return this.http.put('/api/v3/items/moderate', req.getHttpBody(), {
      headers: req.getHttpHeaders()
    });
  }

  /**
   * Transfer non-fungible token to other owner
   * @param {Object} req
   * @return {Promise<Object>}
   */
  async transfer(req) {
    return this.http.post('/api/v2/tokens/nft/transfer', req.getHttpBody());
  }

  /** @type {() => NonFungibleTokenHttp} */
  static getInstance = makeSingletonInstance(() => new NonFungibleTokenHttp());
}
class User {
  /**
   * A new user api object.
   * @param {object} client - `this` from index.js
   * @constructor
   */
  constructor (client) {
    this.client = client
  }

  /**
   * Get all teams of a user
   * @param {string} userId - ID of the user
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getTeams (userId, callback) {
    return await this.client._sendRequest('users/{userId}/teams', callback, { userId })
  }

  /**
   * Get a user by their ID
   * @param {string} userId - ID of the user
   * @param {function} callback - Callback to execute when done (optional)
   */
  async get (userId, callback) {
    return await this.client._sendRequest('users/{userId}', callback, { userId })
  }

  /**
   * Get the user that owns the application running this client
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getCurrentUser (callback) {
    return await this.client._sendRequest('current-user', callback)
  }

  /**
   * Get all campaigns, including team campaigns, of a user
   * @param {string} userId - ID of the user
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getIntegrationEvents (userId, callback) {
    return await this.client._sendRequest('users/{userId}/integration_events', callback, { userId })
  }

  /**
   * Get a user by their slug
   * @param {string} slug - Slug of the user
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getBySlug (slug, callback) {
    return await this.client._sendRequest('users/by/slug/{slug}', callback, { slug })
  }

  /**
   * Get all user campaigns of a user
   * @param {string} userId - ID of the user
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getCampaigns (userId, callback) {
    return await this.client._sendRequest('users/{userId}/campaigns', callback, { userId })
  }

  /**
   * @deprecated Use {@link User#getCurrentUser}
   * Get the user that owns the application running this client
   * @param {function} callback - Callback to execute when done (optional)
   */
  async self (callback) {
    return await this.getCurrentUser(callback)
  }

  /**
   * Get a user campaign with a user slug and a campaign slug
   * @deprecated Use {@Campaign#getBySlug}
   * @param {string} userSlug - Slug of the user
   * @param {string} campaignSlug - Slug of the campaign
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getCampaign (userSlug, campaignSlug, callback) {
    return this.client.Campaigns.getBySlug(userSlug, campaignSlug, callback)
  }

  /**
   * @deprecated Unsupported in Tiltify API v5
   */
  async getOwnedTeams () {
    return this.client.unsupported()
  }

  /**
   * @deprecated Unsupported in Tiltify API v5
   */
  async list () {
    this.client.unsupported()
  }
}

module.exports = User

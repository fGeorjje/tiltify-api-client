class Cause {
  /**
   * A new cause api object.
   * @param {object} client - `this` from index.js
   * @constructor
   */
  constructor (client) {
    this.client = client
  }

  /**
   * Get the top fundraisers of a cause
   * @param {string} causeId - ID of the cause
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getUserLeaderboards (causeId, callback) {
    return await this.client._sendRequest('causes/{causeId}/user_leaderboards', callback, { causeId })
  }

  /**
   * Get the top donors of a cause
   * @param {string} causeId - ID of the cause
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getDonorLeaderboards (causeId, callback) {
    return await this.client._sendRequest('causes/{causeId}/donor_leaderboards', callback, { causeId })
  }

  /**
   * Get all fundraising events of a cause
   * @param {string} causeId - ID of the cause
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getFundraisingEvents (causeId, callback) {
    return await this.client._sendRequest('causes/{causeId}/fundraising-events', callback, { causeId })
  }

  /**
   * Get a cause by its ID
   * @param {string} causeId - ID of the cause
   * @param {function} callback - Callback to execute when done (optional)
   */
  async get (causeId, callback) {
    return await this.client._sendRequest('causes/{causeId}', callback, { causeId })
  }

  /**
   * Get all campaigns of a cause
   * @param {string} causeId - ID of the cause
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getCampaigns (causeId, callback) {
    return await this.client._sendRequest('causes/{causeId}/campaigns', callback, { causeId })
  }

  /**
   * Get the top teams of a cause
   * @param {string} causeId - ID of the cause
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getTeamLeaderboards (causeId, callback) {
    return await this.client._sendRequest('causes/{causeId}/team_leaderboards', callback, { causeId })
  }

  /**
   * Get the leaderboards of a cause
   * @deprecated Use {@link Cause#getUserLeaderboards},
   *                 {@link Cause#getTeamLeaderboards} or
   *                 {@link Cause#getDonorLeaderboards}
   * @param {string} causeId - ID of the cause
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getLeaderboards (causeId, callback) {
    const [indivcauseIdual, team] = await Promise.all([
      this.getUserLeaderboards(causeId),
      this.getTeamLeaderboards(causeId)
    ])
    const obj = {
      meta: { status: 200 },
      data: { indivcauseIdual, team }
    }
    callback(obj)
    return obj
  }

  /**
   * @deprecated Unsupported in Tiltify API v5
   */
  async getDonations () {
    this.client.unsupported()  }

  /**
   * @deprecated Unsupported in Tiltify API v5
   */
  async getVisibilityOptions () {
    this.client.unsupported()
  }

  /**
   * @deprecated Unsupported in Tiltify API v5
   */
  async getPermissions () {
    this.client.unsupported()
  }
}

module.exports = Cause

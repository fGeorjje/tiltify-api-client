class FundraisingEvents {
  /**
   * A new fundraising events api object.
   * @param {object} client - `this` from index.js
   * @constructor
   */
  constructor (client) {
    this.client = client
  }

  /**
   * Get a fundraising event by its ID
   * @param {string} fundraisingEventId - ID of the fundraising event
   * @param {function} callback - Callback to execute when done (optional)
   */
  async get (fundraisingEventId, callback) {
    return await this.client._sendRequest('fundraising_events/{fundraisingEventId}', callback, { fundraisingEventId })
  }

  /**
   * Get the top teams' fitness distances of a fundraising event
   * @param {string} fundraisingEventId - ID of the fundraising event
   * @param {function} callback - Callback to execute when done (optional)
   */
  async teamFitnessDistanceLeaderboard (fundraisingEventId, callback) {
    return await this.client._sendRequest('fundraising_events/{fundraisingEventId}/team_fitness_distance_leaderboard', callback, { fundraisingEventId })
  }

  /**
   * Get all supporting campaigns of a fundraising event
   * @param {string} fundraisingEventId - ID of the fundraising event
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getSupportingEvents (fundraisingEventId, callback) {
    return await this.client._sendRequest('fundraising_events/{fundraisingEventId}/supporting_events', callback, { fundraisingEventId })
  }

  /**
   * Get the top teams' fitness times of a fundraising event
   * @param {string} fundraisingEventId - ID of the fundraising event
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getTeamFitnessTimeLeaderboard (fundraisingEventId, callback) {
    return await this.client._sendRequest('fundraising_events/{fundraisingEventId}/team_fitness_time_leaderboard', callback, { fundraisingEventId })
  }

  /**
   * Get the top users' fitness times of a fundraising event
   * @param {string} fundraisingEventId - ID of the fundraising event
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getUserFitnessTimeLeaderboard (fundraisingEventId, callback) {
    return await this.client._sendRequest('fundraising_events/{fundraisingEventId}/user_fitness_time_leaderboard', callback, { fundraisingEventId })
  }

  /**
   * Get the top donors of a fundraising event
   * @param {string} fundraisingEventId - ID of the fundraising event
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getDonorLeaderboards (fundraisingEventId, callback) {
    return await this.client._sendRequest('fundraising_events/{fundraisingEventId}/donor_leaderboards', callback, { fundraisingEventId })
  }

  /**
   * Get the top user fundraisers of a fundraising event
   * @param {string} fundraisingEventId - ID of the fundraising event
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getUserLeaderboards (fundraisingEventId, callback) {
    return await this.client._sendRequest('fundraising_events/{fundraisingEventId}/user_leaderboards', callback, { fundraisingEventId })
  }

  /**
   * Get the top team fundraisers of a fundraising event
   * @param {string} fundraisingEventId - ID of the fundraising event
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getTeamLeaderboards (fundraisingEventId, callback) {
    return await this.client._sendRequest('fundraising_events/{fundraisingEventId}/team_leaderboards', callback, { fundraisingEventId })
  }

  /**
   * Get the leaderboards of a fundraising event
   * @deprecated Use {@link FundraisingEvents#getUserLeaderboards},
   *                 {@link FundraisingEvents#getTeamLeaderboards} or
   *                 {@link FundraisingEvents#getDonorLeaderboards}
   * @param {string} fundraisingEventId - ID of the fundraising event
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getLeaderboards (fundraisingEventId, callback) {
    const [individual, team] = await Promise.all([
      this.getUserLeaderboards(fundraisingEventId),
      this.getTeamLeaderboards(fundraisingEventId)
    ])
    const obj = {
      meta: { status: 200 },
      data: { individual, team }
    }
    callback(obj)
    return obj
  }

  /**
   * Get all supporting campaigns of a fundraising event
   * @deprecated Use {@link FundraisingEvents#getSupportingEvents}
   * @param {string} id - ID of the fundraising event
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getCampaigns (fundraisingEventId, callback) {
    return await this.getSupportingEvents(fundraisingEventId, callback)
  }

  /**
   * @deprecated Unsupported in Tiltify API v5
   */
  async list () {
    this.client.unsupported()
  }

  /**
   * @deprecated Unsupported in Tiltify API v5
   */
  async getDonations () {
    this.client.unsupported()
  }

  /**
   * @deprecated Unsupported in Tiltify API v5
   */
  async getIncentives () {
    this.client.unsupported()
  }

  /**
   * @deprecated Unsupported in Tiltify API v5
   */
  async getRegistrations () {
    this.client.unsupported()
  }

  /**
   * @deprecated Unsupported in Tiltify API v5
   */
  async getRegistrationFields () {
    this.client.unsupported()
  }

  /**
   * @deprecated Unsupported in Tiltify API v5
   */
  async getSchedule () {
    this.client.unsupported()
  }

  /**
   * @deprecated Unsupported in Tiltify API v5
   */
  async getVisibilityOptions () {
    this.client.unsupported()
  }
}

module.exports = FundraisingEvents

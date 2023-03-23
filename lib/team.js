class Team {
  /**
   * A new team api object.
   * @param {object} client - `this` from index.js
   * @constructor
   */
  constructor (client) {
    this.client = client
  }

  /**
   * Get all campaigns of a team
   * @param {string} teamId - ID of the team
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getTeamCampaigns (teamId, callback) {
    return await this.client._sendRequest('teams/{teamId}/team_campaigns', callback, { teamId })
  }

  /**
   * Get a team by its slug
   * @param {string} slug - Slug of the team
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getBySlug (slug, callback) {
    return await this.client._sendRequest('teams/by/slug/{slug}', callback, { slug })
  }

  /**
   * Get all members of a team
   * @param {string} teamId - ID of the team
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getMembers (teamId, callback) {
    return await this.client._sendRequest('teams/{teamId}/members', callback, { teamId })
  }

  /**
   * Get a team by its ID
   * @param {string} teamId - ID of the team
   * @param {function} callback - Callback to execute when done (optional)
   */
  async get (teamId, callback) {
    return await this.client._sendRequest('teams/{teamId}', callback, { teamId })
  }

  /**
   * Get a team campaign with a team slug and a campaign slug
   * @deprecated Use {@Campaign#getBySlug}
   * @param {string} teamSlug - Slug of the team
   * @param {string} campaignSlug - Slug of the campaign
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getCampaign (teamSlug, campaignSlug, callback) {
    return this.client.Campaigns.getBySlug(teamSlug, campaignSlug, callback)
  }

  /**
   * Get all campaigns of a team
   * @deprecated Use {@link Team#getCampaigns}
   * @param {string} teamId - ID of the team
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getCampaigns (teamId, callback) {
    return await this.getTeamCampaigns(teamId, callback)
  }

  /**
   * @deprecated Unsupported in Tiltify API v5
   */
  async list () {
    this.client.unsupported()
  }
}

module.exports = Team

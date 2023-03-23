class Campaign {
  /**
   * A new campaign api object.
   * @param {object} client - `this` from index.js
   * @constructor
   */
  constructor (client) {
    this.client = client
    this.campaignTypeCache = {}
  }

  async _sendRequest (campaignId, userRoute, teamRoute, callback, parameters) {
    let mainRoute, otherRoute
    const type = this.campaignTypeCache[campaignId]
    if (type === undefined) {
      mainRoute = teamRoute // try the team route first
      otherRoute = userRoute
    } else if (type === 'user') {
      mainRoute = userRoute
    } else {
      mainRoute = teamRoute
    }

    if (!mainRoute) {
      if (type !== undefined) {
        throw new Error(`Operation invalid for campaign of type ${type}`)
      }
      mainRoute = otherRoute
    }

    let result, executedRoute
    try {
      result = await this.client._sendRequest(mainRoute, callback, parameters)
      executedRoute = mainRoute
    } catch (error) {
      if (error.status !== 404 || !otherRoute) throw error
      result = await this.client._sendRequest(otherRoute, callback, parameters)
      executedRoute = otherRoute
    }

    if (campaignId !== undefined) {
      this.campaignTypeCache[campaignId] = executedRoute === userRoute ? 'user' : 'team'
    }

    return result
  }

  _cacheCampaignType (campaign) {
    if (campaign.user) this.campaignTypeCache[campaign.id] = 'user'
    if (campaign.team) this.campaignTypeCache[campaign.id] = 'team'
  }

  /**
   * Get the top donors of a campaign
   * @param {string} campaignId - ID of the Campaign
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getDonorLeaderboards (campaignId, callback) {
    return await this._sendRequest(campaignId,
      'campaigns/{campaignId}/donor_leaderboards',
      'team_campaigns/{campaignId}/donor_leaderboard',
      callback, { campaignId }
    )
  }

  /**
   * Get all supporting campaigns of a campaign - Only supported for team campaigns!
   * @param {string} campaignId - ID of the Campaign
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getSupportingCampaigns (campaignId, callback) {
    return await this._sendRequest(campaignId,
      null,
      'team_campaigns/{campaignId}/supporting_campaigns',
      callback, { campaignId }
    )
  }

  /**
   * Get all targets of a campaign
   * @param {string} campaignId - ID of the Campaign or legacy ID
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getTargets (campaignId, callback) {
    return await this._sendRequest(campaignId,
      'campaigns/{campaignId}/targets',
      'team_campaigns/{campaignId}/targets',
      callback, { campaignId }
    )
  }

  /**
   * Get a campaign by its ID
   * @param {string} campaignId - ID of the Campaign
   * @param {function} callback - Callback to execute when done (optional)
   */
  async get (campaignId, callback) {
    const campaign = await this._sendRequest(campaignId,
      'campaigns/{campaignId}',
      'team_campaigns/{campaignId}',
      callback, { campaignId }
    )
    this._cacheCampaignType(campaign)
    return campaign
  }

  /**
   * Get all rewards of a campaign
   * @param {string} campaignId - ID of the Campaign
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getRewards (campaignId, callback) {
    return await this._sendRequest(campaignId,
      'campaigns/{campaignId}/rewards',
      'team_campaigns/{campaignId}/rewards',
      callback, { campaignId }
    )
  }

  /**
   * Get all milestones of a campaign
   * @param {string} campaignId - ID of the Campaign
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getMilestones (campaignId, callback) {
    return await this._sendRequest(campaignId,
      'campaigns/{campaignId}/milestones',
      'team_campaigns/{campaignId}/milestones',
      callback, { campaignId }
    )
  }

  /**
   * Get a campaign by its slugs
   * @param {string} ownerSlug - The owner of the slug (either user or team slug)
   * @param {string} campaignSlug - The owner of the slug (either user or team slug)
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getBySlug (ownerSlug, campaignSlug, callback) {
    const campaign = await this._sendRequest(undefined,
      'campaigns/by/slugs/{ownerSlug}/{campaignSlug}',
      'team_campaigns/by/slugs/{ownerSlug}/{campaignSlug}',
      callback, { ownerSlug, campaignSlug }
    )
    this._cacheCampaignType(campaign)
    return campaign
  }

  /**
   * Get all schedule items of a campaign
   * @param {string} campaignId - ID of the Campaign
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getSchedule (campaignId, callback) {
    return await this._sendRequest(campaignId,
      'campaigns/{campaignId}/schedules',
      'team_campaigns/{campaignId}/schedules',
      callback, { campaignId }
    )
  }

  /**
   * Get the top fundraisers of a campaign - Only supported for team campaigns!
   * @param {string} campaignId - ID of the Campaign
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getUserLeaderboards (campaignId, callback) {
    return await this._sendRequest(campaignId,
      null,
      'team_campaigns/{campaignId}/user_leaderboards',
      callback, { campaignId }
    )
  }

  /**
   * Get all polls of a campaign
   * @param {string} campaignId - ID of the Campaign
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getPolls (campaignId, callback) {
    return await this._sendRequest(campaignId,
      'campaigns/{campaignId}/polls',
      'team_campaigns/{campaignId}/polls',
      callback, { campaignId }
    )
  }

  /**
   * Get all donations of a campaign
   * @param {string} campaignId - ID of the Campaign
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getDonations (campaignId, callback, enumerate = true) {
    return await this._sendRequest(campaignId,
      'campaigns/{campaignId}/donations',
      'team_campaigns/{campaignId}/donations',
      callback, { campaignId }, enumerate
    )
  }

  /**
   * Get the most recent 10 donations of a campaign
   * @param {string} campaignId - ID of the Campaign
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getRecentDonations (campaignId, callback) {
    return await this.getDonations(campaignId, callback, false)
  }

  /**
   * Get all targets of a campaign
   * @deprecated Use {@link Campaign#getTargets}
   * @param {string} campaignId - ID of the Campaign
   * @param {function} callback - Callback to execute when done (optional)
   */
  async getChallenges (campaignId, callback) {
    return await this.getTargets(campaignId, callback)
  }
}

module.exports = Campaign

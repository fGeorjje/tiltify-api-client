/**
 * This callback type is called `requestCallback` and is displayed as a global symbol.
 *
 * @callback requestCallback
 * @param {object} data the data returned from the endpoint
 */

const fetch = require('node-fetch')
const Campaign = require('./lib/campaign')
const Cause = require('./lib/cause')
const FundraisingEvents = require('./lib/fundraisingEvents')
const Team = require('./lib/team')
const User = require('./lib/user')

class TiltifyClient {
  /**
   * A TiltifyClient contains all of the sub-types that exist on the Tiltify API
   * @param {string} clientId - from https://app.tiltify.com/account/connected-accounts/oauth-applications
   * @param {string} clientSecret - from https://app.tiltify.com/account/connected-accounts/oauth-applications
   * @constructor
   */
  constructor (clientId, clientSecret) {
    this.clientId = clientId
    this.clientSecret = clientSecret

    /**
     * this.Campaigns is used to get info about campaigns
     * @type Campaign
     */
    this.Campaigns = new Campaign(this)
    /**
     * this.Causes is used to get info about causes
     * @type Cause
     */
    this.Causes = new Cause(this)
    /**
     * this.FundraisingEvents is used to get info about fundraising events
     * @type FundraisingEvents
     */
    this.FundraisingEvents = new FundraisingEvents(this)
    /**
     * this.Team is used to get info about a team
     * @type Team
     */
    this.Team = new Team(this)
    /**
     * this.User is used to get info about a user
     * @type User
     */
    this.User = new User(this)
  }

  unsupported () {
    throw new TiltifyError({
      message: 'This API is no longer available in Tiltify API v5',
      status: 410
    })
  }

  notFound () {
    throw new TiltifyError({
      message: 'Not Found',
      status: 404
    })
  }

  async _fetch (url, options) {
    try {
      const response = await fetch(url, options)
      return await response.json()
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async _getToken () {
    const url = 'https://v5api.tiltify.com/oauth/token?' +
      `client_id=${this.clientId}&` +
      `client_secret=${this.clientSecret}&` +
      'grant_type=client_credentials&scope=public'
    const json = await this._fetch(url, { method: 'POST' })
    if (json.error) throw new TiltifyError(json)
    return {
      accessToken: json.access_token,
      expiresAt: Date.parse(json.created_at) + (json.expires_in * 1000)
    }
  }

  async _rawRequest (route, parameters, reattempt = true) {
    if (!this.token || Date.now() > this.token.expiresAt) {
      this.token = await this._getToken()
    }

    let path = `https://v5api.tiltify.com/api/public/${route}`
    const pathParameters = {}
    const pathParameterRegex = /{([^}]+)}/g // match {parameter}
    for (const [trigger, key] of route.matchAll(pathParameterRegex)) {
      if (parameters[key] === undefined) {
        throw new Error(`missing path parameter ${key} for ${route}`)
      }

      path = path.replace(trigger, encodeURIComponent(parameters[key]))
      pathParameters[key] = true
    }

    const queryString = Object.entries(parameters)
      .filter(arr => !pathParameters[arr[0]])
      .map(arr => `${encodeURIComponent(arr[0])}=${encodeURIComponent(arr[1])}`)
      .join('&')
    if (queryString) {
      path += `?${queryString}`
    }

    const json = await this._fetch(path, {
      headers: {
        Authorization: `Bearer ${this.token.accessToken}`
      }
    })

    if (json.error) {
      if (json.error.status === 401 && reattempt) {
        this.token = null
        return this._rawRequest(path, parameters, false)
      }
      throw new TiltifyError(json)
    }

    return json
  }

  async _sendRequest (route, callback, parameters, enumerate=true) {
    function end (result) {
      if (callback) callback(result)
      return result
    }

    let data; let metadata; const results = []
    while (true) {
      if (metadata?.after) {
        parameters.after = metadata.after
        parameters.limit = 100
      }

      ({ data, metadata } = await this._rawRequest(route, parameters))
      if (!Array.isArray(data) || !enumerate) return end(data)
      results.push(...data)
      if (data.length === 0 || !metadata?.after) return end(results)
    }
  }
}

class TiltifyError extends Error {
  constructor (json) {
    super(json.error.message)
    this.name = 'TiltifyError'
    for (const key in json.error) {
      this[key] = json.error[key]
    }
  }
}

module.exports = TiltifyClient

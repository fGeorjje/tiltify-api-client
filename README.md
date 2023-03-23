# tiltify-api-client-v5

## Docs
[tiltify-api-client-v5 docs](https://fgeorjje.github.io/tiltify-api-client-v5)

## To install
* `npm i --save tiltify-api-client-v5`

## To use

You can use this library like this:

```javascript
const TiltifyClient = require("tiltify-api-client-v5")

const client = new TiltifyClient(process.env.TILTIFY_CLIENT_ID, process.env.TILTIFY_CLIENT_SECRET)

// async/await
const campaign = await client.Campaigns.getBySlug('no-glitches-allowed', 'save-our-shelter')
const donations = await client.Campaigns.getDonations(campaign.id);
console.log(donations)

// callbacks
await client.Campaigns.getBySlug('no-glitches-allowed', 'save-our-shelter', (campaign) => {
  await client.Campaigns.getDonations(campaign.id, (donations) => {
    console.log(donations)
  })
})
```

All functions are async/await, but also optionally accept a callback as a second argument to be called.

This is partially backwards compatible to 
[daniellockard/tiltify-api-client](https://github.com/daniellockard/tiltify-api-client).
Some methods are unsupported as they are not available in the v5 API.

The above example will print the data about the Save Our Shelter campaign from No Glitches Allowed
(https://tiltify.com/+no-glitches-allowed/save-our-shelter)

Only use client.Campaigns.getDonations(id) to do analysis on the donations.
Pulling all the donations from a large campaign can take a while.
Tiltify requests that you get 100 at a time, max.

Use client.Campaigns.getRecentDonations(id) to get the most recent 10.
This saves on bandwidth and processing time.
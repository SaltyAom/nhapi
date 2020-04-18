# NhAPI
A type-enforced, beautify and performance concern middleware written in Nestjs for NHentai API.
  
<img src="https://i1.sndcdn.com/artworks-000409329321-k0o0os-t500x500.jpg" alt="Akari" width="200" height="200" />
  
## Wait, what, why?
Think of this repo as a community project, some might rather wanted to change NHentai API to have a better structure? I don't know, but the idea is you can self-host and cache it, even add a compression is easy when it's on your server.
* Caching
* Customizable Structure
* Compression
* Self-host (If you use cache with self-host, chance are your request would be very fast)
* Type-enforcement (Written in TypeScript)
* Fastify has better performance
* Reactive Approach (RxJS)

## How to
Written with 2 important endpoint
* /:id - Get story based on provided ID
  * /:related - Get 5 related story based on ID (The one at the bottom of nh)
* /search/:search - Search anything from nh.
  * /:page - Turn to the specific padding of data.
  
### Example Usage
```javascript
fetch("https://nhapi.now.sh/177013")
    .then(res => res.json())
    .then(data => console.log(data))
```
By default NhAPI cached response with 24 hours ranged based on first-request or exceed cache limit.
So in practice it would be very fast to response.

## Type-enforcement
A lot of thing work under the cover. Combining piece of each part which should be parsed.
I'd recommended checking out in each .dto.ts file.

## Installation
```bash
$ yarn
```

## Running the app
```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Test
```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

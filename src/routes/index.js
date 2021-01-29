const url = require('url')

const home = require('./home')
const one = require('./one')
const find = require('./find')
const random = require('./random')
const notFound = require('./not_found')

const router = (request, response) => {
  // basic route logger
  console.log(`${request.method} ${request.url}`)

  // grab pathname 
  const { pathname } = url.parse(request.url)

  // router
  if (pathname === '/') {
    return home(request, response);

  } else if (pathname === '/one') {
    return one(request, response);

  } else if (pathname === '/find') {
    return find(request, response);

  } else if (pathname === '/random') {
    return random(request, response);

  } else {
    return notFound(request, response);
  }
}

module.exports = router;
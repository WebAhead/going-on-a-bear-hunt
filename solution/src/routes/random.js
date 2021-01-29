// import request module
const requester = require('request')
const qs = require('querystring')

const requestModule = (request, response) => {
  // use querystring module to convert object into a query
  const queryString = qs.stringify({ api_key: YOUR_API_KEY_HERE, tag: 'bear' })

  //construct url
  const randomGifAPIUrl = `http://api.giphy.com/v1/gifs/random?${queryString}`

  //use the request module to make API call
  requester.get(randomGifAPIUrl, (err, res, body) => {

    // check for error AND correct status code AND content type
    const { statusCode, headers } = res
    const contentType = headers['content-type']

    if (err || statusCode !== 200 || contentType !== 'application/json') {
      // log the errors on the server
      console.log(`Error ${err}`)
      console.log(`Status Code: ${statusCode}`)
      console.log(`Content Type: ${contentType}`)
      // send a response back to the client
      response.writeHead(500, { 'content-type': 'text/plain' })
      response.end('Sorry, there was a server error')
      return
    }

    // if above is ok, then parse the response body and put into img element
    const { data } = JSON.parse(body)
    const imgHtml = `<img src=${data.image_original_url} />`
    response.writeHead(200, { 'content-type': 'text/html' })
    response.end(imgHtml)
  })

}

module.exports = requestModule

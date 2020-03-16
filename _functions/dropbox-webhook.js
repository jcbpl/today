const fetch = require("node-fetch")

exports.handler = async (event, context) => {
  const { headers, httpMethod, queryStringParameters } = event;

  if (event.httpMethod === "POST" && event.headers["x-dropbox-signature"]) {
    console.log("Received webhook request")

    try {
      await fetch(process.env.BUILD_HOOK_URL, { method: "POST" })

      console.log("Dispatched build hook")
    } catch (error) {
      console.log(`Couldn't dispatch build hook: ${error.message}`)
    }

    return {
      statusCode: 200,
      body: "OK"
    }
  } else if (queryStringParameters.challenge) {
    console.log("Received verification request")

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/plain",
        "X-Content-Type-Options": "nosniff"
      },
      body: queryStringParameters.challenge
    }
  } else {
    console.log("Received unknown request")

    return {
      statusCode: 404,
      body: "Not found"
    }
  }
}

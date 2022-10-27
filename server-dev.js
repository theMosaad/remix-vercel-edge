import { createRequestHandler } from "@remix-run/server-runtime";
import * as build from "@remix-run/dev/server-build";

// addEventListener('fetch', event => {
//     const handleRequest = createRequestHandler(build, process.env.NODE_ENV)
//     return event.respondWith(handleRequest(event.request))
//   })
// export default createRequestHandler(build, process.env.NODE_ENV);

function buildUrl(requestDetails) {
  let proto = requestDetails.headers["x-forwarded-proto"];
  let host = requestDetails.headers["x-forwarded-host"];
  let path = requestDetails.url;
  return `${proto}://${host}${path}`;
}

// https://stackoverflow.com/a/33369954
function isJson(item) {
  item = typeof item !== "string" ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === "object" && item !== null) {
    return true;
  }

  return false;
}

addEventListener("fetch", async (event) => {
  try {
    let serializedRequest = await event.request.clone().text();
    if (serializedRequest && isJson(serializedRequest)) {
      let requestDetails = JSON.parse(serializedRequest);

      let body;

      if (requestDetails.method !== "GET" && requestDetails.method !== "HEAD") {
        body = Uint8Array.from(atob(requestDetails.body), (c) =>
          c.charCodeAt(0)
        );
      }

      let request = new Request(buildUrl(requestDetails), {
        headers: requestDetails.headers,
        method: requestDetails.method,
        body: body,
      });

      event.request = request;
    }

    let edgeHandler = createRequestHandler(build, process.env.NODE_ENV);
    // console.log("edge handler heere")
    if (!edgeHandler) {
      throw new Error(
        "No default export was found. Add a default export to handle requests. Learn more: https://vercel.link/creating-edge-middleware"
      );
    }

    let response = await edgeHandler(event.request, event);

    if (!response) {
      throw new Error(`Edge Function did not return a response.`);
    }

    return event.respondWith(response);
  } catch (error) {
    // we can't easily show a meaningful stack trace
    // so, stick to just the error message for now
    const msg = error.cause
      ? error.message + ": " + (error.cause.message || error.cause)
      : error.message;
    event.respondWith(
      new Response(msg, {
        status: 500,
        headers: {
          "x-vercel-failed": "edge-wrapper",
        },
      })
    );
  }
});

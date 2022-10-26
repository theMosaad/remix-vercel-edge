import { createRequestHandler } from "@remix-run/server-runtime";
import * as build from "@remix-run/dev/server-build";

addEventListener('fetch', event => {
    const handleRequest = createRequestHandler(build, process.env.NODE_ENV)
    return event.respondWith(handleRequest(event.request))
  })

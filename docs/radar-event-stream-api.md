# Radar Event Stream API

The `DahuaEventStreamController` exposes an endpoint at `/camera/events` that
forwards the Dahua camera event stream to the frontend.

- Uses `DahuaCameraAPI.startSnapStream()` to subscribe to camera events.
- Parses each `text/plain` block into JSON using the internal `parseKeyValue`
  helper and re-encodes the result as `multipart/x-mixed-replace` with
  `Content-Type: application/json`.
- Clients can connect to this endpoint and receive JSON parts with the same
  boundary format as the camera. Heartbeat parts are now forwarded as
  `{ "heartbeat": <unix timestamp> }` objects so the browser can display the
  last received time.
- The controller automatically attempts to re-subscribe if the connection to the
  camera drops.
- In Node.js 20 the fetch response body is a web `ReadableStream`; the
  implementation converts it using `Readable.fromWeb` so that it can be piped
  through `dicer`.
- Part headers are read via Dicer's `header` event before evaluating the
  `Content-Type` of each part.

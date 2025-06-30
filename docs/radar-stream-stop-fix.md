# Radar Stream Stop Fix

Stopping the Dahua event stream via `DahuaCameraAPI.stopSnapStream()` could emit
an unhandled `AbortError` in Node.js 20. The error occurred because the fetch
request was aborted while all listeners were already removed from the body
stream.

A temporary `error` handler is now attached before aborting the request, so the
AbortError is swallowed and the stream shuts down cleanly.

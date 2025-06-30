# Dahua Stream Restart Test

To ensure the fix for the `AbortError` regression remains intact, a unit test was added.
The test starts the snap stream, stops it, and then starts it again using a mocked
HTTP client. It asserts that aborting the request does not raise an unhandled
error when the browser reconnects to `/camera/events` multiple times.

The test lives at `app-base/lib/DahuaCameraAPI.test.ts` and runs
with the standard `npm test` command via Vitest.

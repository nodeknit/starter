# Smoke Test

This document describes the smoke test for the AppBase application startup.

## Purpose

The smoke test verifies that the application can start without runtime errors.

## Test Implementation

- The test script is located at `./smoke.test.ts`.
- It uses Vitest and Node's `child_process.spawn` to run `npx tsx index.ts`.
- The application runs for a short period (5 seconds) and is then terminated.
- The test asserts that no data was written to `stderr` during this time.

## Running the Smoke Test

Execute all tests including the smoke test with:

```bash
npm test
```

__Note__: Ensure that the environment allows spawning processes and that required dependencies are installed.

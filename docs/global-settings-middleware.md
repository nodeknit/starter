# Global Settings Middleware

Middleware for the Adminizer `/settings/global` route.

## Behavior

- Route: `GET /settings/global` under Adminizer prefix.
- Renders Inertia module page with:
  - `component`: `module`
  - `props`:
    - `moduleComponent`: path to `GlobalSettings` module.
      - In development: `/modules/GlobalSettings.tsx`
      - In production: `{routePrefix}/modules/GlobalSettings.js`
    - `moduleComponentCSS`: path to shared CSS asset.
      - `{routePrefix}/modules/button.css`
    
  - This middleware is automatically secured by Adminizer policies (from `adminizer.config.policies`) via `policyManager.bindPolicies`.

## Unit Test

A unit test verifies that `globalSettingsMiddleware.handler` calls `Inertia.render` with the correct `moduleComponent` for both development and production environments.

The test dynamically resolves `adminizer/lib/v4/inertia/inertiaAdapter.js` since
the package does not export this path. Using `createRequire` and `import()`
ensures the adapter loads correctly under Vitest's ESM environment.

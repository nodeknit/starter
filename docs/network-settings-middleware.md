# Network Settings Middleware

Middleware for the Adminizer `/settings/network` route.

## Behavior

- Route: `GET /settings/network` under Adminizer prefix.
- Renders Inertia module page with:
  - `component`: `module`
  - `props`:
    - `moduleComponent`: path to `NetworkSettings` module.
      - In development: `/modules/NetworkSettings.tsx`
      - In production: `{routePrefix}/modules/NetworkSettings.js`
    - `moduleComponentCSS`: path to shared CSS asset.
      - `{routePrefix}/modules/button.css`
    
- This middleware is automatically secured by Adminizer policies (`adminizer.config.policies`) via `policyManager.bindPolicies`.

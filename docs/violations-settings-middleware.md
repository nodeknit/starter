# Violations Settings Middleware

Middleware for the Adminizer `/settings/violations` route.

## Behavior

- Route: `GET /settings/violations` under Adminizer prefix.
- Renders Inertia module page with:
  - `component`: `module`
  - `props`:
    - `moduleComponent`: path to `ViolationsSettings` module.
      - In development: `/modules/ViolationsSettings.tsx`
      - In production: `{routePrefix}/modules/ViolationsSettings.js`
    - `moduleComponentCSS`: path to shared CSS asset.
      - `{routePrefix}/modules/button.css`
    
- This middleware is automatically secured by Adminizer policies (`adminizer.config.policies`) via `policyManager.bindPolicies`.

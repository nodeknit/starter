# Metrology Settings Middleware

Middleware for the Adminizer `/settings/metrology` route.

## Behavior

- Route: `GET /settings/metrology` under Adminizer prefix.
- Renders Inertia module page with:
  - `component`: `module`
  - `props`:
    - `moduleComponent`: path to `MetrologySettings` module.
      - In development: `/modules/MetrologySettings.tsx`
      - In production: `{routePrefix}/modules/MetrologySettings.js`
    - `moduleComponentCSS`: path to shared CSS asset.
      - `{routePrefix}/modules/button.css`
    
- This middleware is automatically secured by Adminizer policies (`adminizer.config.policies`) via `policyManager.bindPolicies`.

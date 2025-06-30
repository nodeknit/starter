# DateTime Settings Middleware

Middleware for the Adminizer `/settings/datetime` route.

## Behavior

- Route: `GET /settings/datetime` under Adminizer prefix.
- Renders Inertia module page with:
  - `component`: `module`
  - `props`:
    - `moduleComponent`: path to `DateTimeSettings` module.
      - In development: `/modules/DateTimeSettings.tsx`
      - In production: `{routePrefix}/modules/DateTimeSettings.js`
    - `moduleComponentCSS`: path to shared CSS asset.
      - `{routePrefix}/modules/button.css`
    
- This middleware is automatically secured by Adminizer policies (`adminizer.config.policies`) via `policyManager.bindPolicies`.

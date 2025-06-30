# AMTS Settings Middleware

Middleware for the Adminizer `/settings/amts` route.

## Behavior

- Route: `GET /settings/amts` under Adminizer prefix.
- Renders Inertia module page with:
  - `component`: `module`
  - `props`:
    - `moduleComponent`: path to `AmtsSettings` module.
      - In development: `/modules/AmtsSettings.tsx`
      - In production: `{routePrefix}/modules/AmtsSettings.js`
    - `moduleComponentCSS`: path to shared CSS asset.
      - `{routePrefix}/modules/button.css`
    
- This middleware is automatically secured by Adminizer policies (`adminizer.config.policies`) via `policyManager.bindPolicies`.

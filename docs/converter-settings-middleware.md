# Converter Settings Middleware

Middleware for the Adminizer `/settings/converter` route.

## Behavior

- Route: `GET /settings/converter` under Adminizer prefix.
- Renders Inertia module page with:
  - `component`: `module`
  - `props`:
    - `moduleComponent`: path to `ConverterSettings` module.
      - In development: `/modules/ConverterSettings.tsx`
      - In production: `{routePrefix}/modules/ConverterSettings.js`
    - `moduleComponentCSS`: path to shared CSS asset.
      - `{routePrefix}/modules/button.css`
    
- This middleware is automatically secured by Adminizer policies (`adminizer.config.policies`) via `policyManager.bindPolicies`.

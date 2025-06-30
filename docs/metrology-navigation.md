# Metrology Navigation

The `MetrologySettings` module uses buttons to open verification pages for radar, GPS and time. Originally it relied on `window.location.href` which caused requests but the page stayed the same when Inertia was enabled.

Navigation now uses `router.visit` from `@inertiajs/react` to trigger proper Inertia page transitions.

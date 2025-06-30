# HISTORY

## 2025-06-12

- Add unit tests for globalSettingsMiddleware to verify Inertia.render call behavior in development and production environments.
- Add documentation for globalSettingsMiddleware (docs/global-settings-middleware.md).
- Add documentation for globalSettingsMiddleware (docs/global-settings-middleware.md).

## 2025-06-13

- Enforce Adminizer policies on custom middleware: AdminizerMiddlewareHandler now wraps all registered middleware handlers with `policyManager.bindPolicies` using `adminizer.config.policies` to ensure access control.
- Configure Vite to externalize React and ReactDOM for module builds using `vite-plugin-externals` to fix runtime import resolution errors (TODO.md).
- Add Tailwind CSS build: integrate `tailwindcss` and `postcss` to generate a standalone CSS file (`GlobalSettings.css`) during module build.
- Add React modules and Inertia middlewares for additional admin settings pages: datetime, network, converter, video-sources, metrology, monitoring, violations, and AMTS. Modules created under `app-base/adminizer/modules`, middleware under `app-base/adminizer/settings`, updated `vite.config.ts`, and registered in `AppBookeBase`; added corresponding documentation in `docs` folder.

## 2025-06-14

- Add basic smoke test for app-adminizer (local_modules/app-adminizer/tests/basic.test.ts) to verify that Vitest runs tests.
- Add multi-stage Dockerfile for containerizing the application and building frontend modules.
- Add GitLab CI pipeline configuration (`.gitlab-ci.yml`) to build and push the Docker image to the Container Registry.
- Update README.md with Docker usage and CI/CD instructions.
- Add smoke test to verify application startup without runtime errors (smoke.test.ts).
- Update Vitest configuration (vite.config.ts) to include the smoke test.

## 2025-06-15

- Add shadcn-ui dependency v0.9.5 and configure Tailwind CSS plugin.
- Implement React UI for Date & Time settings using shadcn-ui components.
- Add documentation for shadcn-ui integration (docs/shadcn-ui-setup.md).
- Add documentation for smoke test (docs/smoke-test.md) and update docs/index.md.
- Remove legacy @shadcn/ui dependency v0.0.4 and fully migrate to shadcn-ui package.
- Add documentation describing the Monitoring section (docs/monitoring-section.md) and update docs index.
- Implement React module for the Monitoring page and expose it via `monitoringMiddleware`.
- Document the new module (docs/monitoring-module.md) and update docs index.
- Remove obsolete Monitoring Settings section and middleware.
- Update Monitoring module to render nine uniform cards using images from placehold.co.
- Change Monitoring layout to stack cards vertically using flex column and update documentation.

## 2025-06-16

- Arrange Monitoring cards in a responsive grid so rows fill the browser width, updating documentation accordingly.

## 2025-06-17

- Add paginated violations table with links to a detail page.
- Implement `ViolationDetails` React module and corresponding `violationViewMiddleware`.
- Include the new module in the Vite build and register middleware in `AppBookeBase`.
- Document the module (docs/violations-module.md) and update docs index.

## 2025-06-18

- Unified the UI of all Adminizer React modules to match `GlobalSettings` style.
- Bumped package version to `1.0.0-alpha.2`.
- Documented style update (docs/module-style-guidelines.md) and updated docs index.

## 2025-06-19

- Added Metrology verification pages for radar, GPS and time checks.
- Registered new middlewares and modules in the Vite build.
- Updated `MetrologySettings` page to show certificate info and navigation buttons.
- Documented the pages (docs/metrology-verification.md) and updated docs index.

- Fixed navigation from `MetrologySettings` to verification pages using
  `router.visit` for proper Inertia page transitions.
- Documented the change (docs/metrology-navigation.md) and updated docs index.

## 2025-06-20

- Added a back button to all Metrology verification pages to return to
  `MetrologySettings`.
- Installed `lucide-react` and updated `package.json`.
- Documented the update (docs/metrology-verification.md).

## 2025-06-20

- Implemented snapshot functionality for Metrology Time verification.
- Added `SnapshotController` and registered it in `AppBookeBase`.
- `TimeVerification` module now fetches `/camera/snapshot` to show real photos.
- Documented the API in `docs/snapshot-api.md` and updated docs index.

## 2025-06-21

- Added download capability to the Metrology Time verification snapshot.
- Snapshot button now shows a loader and becomes disabled during fetching.
- Updated documentation (`docs/metrology-verification.md`, `docs/snapshot-api.md`).

## 2025-06-22

- Implemented sequential GPS data capture in `GpsVerification`.
- Created `GpsPositionController` and registered it in `AppBookeBase`.
- Documented the new API (`docs/gps-position-api.md`) and updated docs.

## 2025-06-23

- `GpsVerification` now displays only the latitude and longitude for each
  reading and shows **"Ожидание..."** while waiting 20&nbsp;seconds between
  requests. Updated documentation accordingly.

## 2025-06-24

- Updated `GpsVerification` to perform 100 GPS requests with a 1&nbsp;second
  interval and calculate location error after all readings. Added input fields
  for true latitude and longitude and display the deviation result. Updated
  documentation (`docs/gps-position-api.md`, `docs/metrology-verification.md`).

## 2025-06-25

- Added a cancel workflow to `GpsVerification`. Coordinate inputs become
  read-only while capture is running and an **"Отмена"** button clears the log
  to allow entering new coordinates. Updated docs accordingly.

## 2025-06-26

- Fixed unit tests for `globalSettingsMiddleware` by dynamically resolving the
  `inertiaAdapter` module from the `adminizer` package. This avoids package
  export errors and ensures `vitest run` completes successfully.

## 2025-06-27

- Added `DahuaEventStreamController` and new `/camera/events` endpoint that
  proxies camera event data as JSON using `multipart/x-mixed-replace`.
- Updated `DahuaCameraAPI` to parse event streams with `dicer` and emit
  `jsonEvent` objects. Registered the controller in `AppBookeBase` and added
  documentation (`docs/radar-event-stream-api.md`).

## 2025-06-28

- `RadarVerification` now subscribes to `/camera/events` when the user clicks
  **"Запустить поверку"** and logs incoming JSON objects to the browser console.
  A **"Стоп"** button aborts the fetch request. Updated docs accordingly.

## 2025-06-29

- Fixed `stream.pipe is not a function` in `DahuaCameraAPI.startSnapStream` when
  running on Node.js 20. The response body is now converted from a web
  `ReadableStream` using `Readable.fromWeb` so that event data can be piped
  through `dicer` correctly.

## 2025-06-30

- Fixed `TypeError: Cannot read properties of undefined (reading 'content-type')`
  when handling Dahua camera event streams. `DahuaCameraAPI` now captures part
  headers using Dicer's `header` event before parsing `text/plain` blocks.

## 2025-07-01

- Added automatic reconnection logic in `DahuaEventStreamController` so the
  backend resubscribes to the camera if the stream ends or errors. Heartbeat
  parts are forwarded as `{ "heartbeat": <timestamp> }` objects and exposed via
  a new `heartbeat` event from `DahuaCameraAPI`.

## 2025-07-02

- Fixed unhandled `AbortError` when stopping the Dahua event stream. A temporary
  `error` handler is attached before aborting the fetch request so the stream
  closes without throwing.

## 2025-07-03

- Added regression test `DahuaCameraAPI stream cycle` verifying that starting,
  stopping, and restarting the camera event stream does not raise an unhandled
  `AbortError` when the request is aborted.

## 2025-07-04

- `RadarVerification` now updates the displayed speed from incoming events.
  The page shows `---` by default and when no `Events[0].Speed` value is present.
  Documentation updated accordingly.

## 2025-07-05

- Expanded `RadarVerification` speed detection. The frontend now falls back to
  `TrafficCar.Speed`, `Speed`, `Object.Speed` and `Vehicle.Speed` when
  `Events[0].Speed` is missing so that manual snapshot events display their
  speed correctly. Documentation updated.

## 2025-07-06

- `RadarVerification` now preserves the last displayed speed when an incoming
  event lacks any speed value instead of resetting to `---`. Documentation
  updated accordingly.

## [Дата] Обновление adminizerConfig и документации
- Конфиг adminizer теперь отражает реальные модели (User, Book, Booking).
- Удалён несуществующий UserResource.
- Добавлен пример для подключения кастомного контроллера (GlobalSettingsController).
- В AGENTS.md добавлена инструкция по обновлению adminizerConfig при добавлении моделей и контроллеров.

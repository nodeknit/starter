# Metrology Verification Pages

This document describes three additional React modules under the Metrology section.

- **RadarVerification** at `/adminizer/settings/metrology/radar` shows the current
  speed (displaying `---` until the first value arrives). When the user presses
  **"Запустить поверку"** the page subscribes to `/camera/events` and updates the
  speed from `obj.Events[0].Speed` or the fallback fields (`TrafficCar.Speed`,
  `Speed`, `Object.Speed`, `Vehicle.Speed`) when they are present. If a received
  event lacks a speed value the previous one remains shown instead of resetting
  to `---`. A **"Стоп"** button appears to cancel the subscription.
- **GpsVerification** at `/adminizer/settings/metrology/gps` lets the user
  press **"Снять показания"** which sequentially performs 100 requests to
  `/camera/position` with a 1&nbsp;second delay between them. Once the capture
  begins the latitude and longitude inputs become read‑only and a separate
  **"Отмена"** button appears. It clears the log and re‑enables the inputs so
  new coordinates can be entered. While waiting for the next request, the
  upcoming table row shows **"Ожидание..."**. Latitude, longitude and the
  timestamp are displayed as soon as the data arrives. After all values are
  collected the page shows the calculated location error in meters.
- **TimeVerification** at `/adminizer/settings/metrology/time` shows a camera snapshot, provides a button to take a new snapshot and another button to download it. The snapshot button displays a loader and is disabled while the image is being fetched.

Each module follows the common Adminizer module layout described in `module-style-guidelines.md`.

All verification pages also include a back button at the top which links
back to the main Metrology settings. The button uses an Inertia `Link`
wrapped with the shared `Button` component and shows a left arrow icon.

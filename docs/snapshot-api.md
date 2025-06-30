# Snapshot API

The snapshot controller exposes an endpoint at `/camera/snapshot` that returns a JPEG image from the Dahua camera.

- Configuration for the camera (host, credentials) is loaded from `config/camera.ts`.
- Internally it uses `DahuaCameraAPI.getSnapshot()` to retrieve the image.
- The endpoint is registered inside `AppBase` via `SnapshotController`.

The `TimeVerification` module fetches this endpoint when the user clicks the **"Сделать снимок"** button to display the latest picture. Once loaded, the image can be saved locally via the **"Скачать снимок"** button.

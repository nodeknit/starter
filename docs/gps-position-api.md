# GPS Position API

The `GpsPositionController` exposes an endpoint at `/camera/position` that
returns the current GPS position status from the Dahua camera.

- Camera connection parameters are configured in `config/camera.ts`.
- Internally the controller uses `DahuaCameraAPI.getPositionStatus()` to
  retrieve data.
- The controller is registered in `AppBase` so the endpoint becomes
  available when the application starts.

The **GpsVerification** module now calls this endpoint 100 times with a
one&nbsp;second pause between requests to gather a detailed series of readings.

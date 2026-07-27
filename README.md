# joergensen70.github.io

Public application identity for private Android applications.

## Odin Dashboard

- Client ID: `https://joergensen70.github.io/odin-dashboard/`
- Redirect URI: `https://joergensen70.github.io/odin-dashboard/oauth/callback`
- Android package: `de.joergensen.odindashboard`
- Digital Asset Links: `/.well-known/assetlinks.json`

The isolated release-candidate identity is:

- Client ID: `https://joergensen70.github.io/odin-dashboard/rc/`
- Redirect URI: `https://joergensen70.github.io/odin-dashboard/oauth/rc/callback`
- Android package: `de.joergensen.odindashboard.rc`

The site is static and contains no Home Assistant instance URL, credential,
authorization code, analytics, cookies or external asset dependency.
The OAuth callback page forwards its current URL directly to the Android
package selected by the callback path and provides a manual app-open button for
browsers that suppress automatic Android App Link handoff.

The Digital Asset Links file currently contains the local debug certificate
and the direct release/upload certificate. Add the Google Play App Signing
SHA-256 certificate before testing OAuth with a Play-installed build.

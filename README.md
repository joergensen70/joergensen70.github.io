# joergensen70.github.io

Public application identity for private Android applications.

## Odin Dashboard

- Client ID: `https://joergensen70.github.io/odin-dashboard/`
- Redirect URI: `https://joergensen70.github.io/odin-dashboard/oauth/callback`
- Spotify redirect URI: `https://joergensen70.github.io/odin-dashboard/spotify/callback`
- Android package: `de.joergensen.odindashboard`
- Digital Asset Links: `/.well-known/assetlinks.json`

Alarm App Links retain the exact journal identity. The rear live destination is
`/odin-dashboard/open/security/alarm/<alarm_id>/live/rear`; existing
`/odin-dashboard/open/<surface>/alarm/<alarm_id>` destinations remain supported.
The static `404.html` entry validates the closed grammar and offers an explicit
button for the canonical app when a browser receives the link. It does not
automatically launch another app, contact Home Assistant, or acquire media.
Invalid paths retain the unavailable page. No credentials or instance URLs are
included. Local checks: `node --test tests/alarm-link.test.mjs`.

The isolated release-candidate identity is:

- Client ID: `https://joergensen70.github.io/odin-dashboard/rc/`
- Redirect URI: `https://joergensen70.github.io/odin-dashboard/oauth/rc/callback`
- Android package: `de.joergensen.odindashboard.rc`

The site is static and contains no Home Assistant instance URL, credential,
authorization code, analytics, cookies or external asset dependency.
The Home Assistant and Spotify callback pages forward their current URL
directly to the Android package selected by the callback path and provide a
manual app-open button for browsers that suppress automatic Android App Link
handoff.

The Digital Asset Links file currently contains the local debug certificate
and the direct release/upload certificate. Add the Google Play App Signing
SHA-256 certificate before testing OAuth with a Play-installed build.

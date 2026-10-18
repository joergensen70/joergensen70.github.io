# Alarm web entry source review ? 2026-10-18

- Class: review
- Consumer: website source integration and release review
- Owner: Odin Dashboard web entry
- Retain until: durable source review evidence is no longer required
- Supersedes: none
- Disposition: archive

## Scope

Independent settled review of `404.html`, `odin-dashboard/alarm-link.js`,
`tests/alarm-link.test.mjs`, and the alarm-entry addition in `README.md`.
The acceptance question is exact alarm identity, closed URL grammar,
canonical-package manual handoff, safe unavailable behavior and static-page
privacy. Existing OAuth, Spotify and application identity implementations
are outside this change.

Reviewed SHA-256 identities:

- `404.html`:
  `f140b722e66d726f0639bd6fd04663e87dbfac0f0156bd686637bd8d1309af08`
- `odin-dashboard/alarm-link.js`:
  `327e189829f0ced8250dd6d1d48191212d6b33fd2d90eb8df95b029fd368d453`
- `tests/alarm-link.test.mjs`:
  `92b63485c90781472544564ba4e855afc3f74236cdc6f567b0d749cf236ebea6`
- `README.md`:
  `7e2f8d3352ff54c6e636c504f1860234892917ce6d240c10c2975b96091c96c7`

## Outcome

Accepted for source integration within this scope. No actionable findings.
This acceptance does not approve publication or establish delivered behavior.

The parser preserves the selected `[A-Za-z0-9_-]{1,96}` identity for the rear
live path and six existing detail surfaces. Anchored allowlists reject foreign
origins, explicit ports, userinfo, queries, fragments, encoded paths, unknown
surfaces, other camera roles and extra segments. A malformed input leaves the
unavailable page intact. Alarm IDs enter the DOM through `textContent`.

The only app action is an explicit link with fixed HTTPS scheme, host and
`de.joergensen.odindashboard` package. There is no automatic intent activation,
unknown-URL forwarding, store redirect, retry, media acquisition, credential,
instance URL, storage, analytics or logging in the entry. The root-relative
module URL remains valid at nested missing paths. The default unavailable
content remains visible if JavaScript cannot run. CSP permits only same-origin
scripts and inline styles; default resource, connection and form access are
closed. The page also declares no-referrer and noindex/nofollow policies.

The supplied primary-contract extracts were reused for the unchanged static
GitHub Pages custom-404 and Android HTTPS App Links approach:
[GitHub custom 404 documentation][github-404] and
[Android App Links documentation][android-links]. No provider access was made
by this review. Actual delivery and intent resolution require target evidence.

## Findings

None at high, medium or low severity in the reviewed change.

## Required follow-up

Before claiming end-to-end delivery, separately authorize publication and
verify the deployed missing-path response, module delivery, canonical Android
cold/warm routing, authentication and exact alarm context. These claims remain
**Not demonstrated**. Real camera, Home Assistant and device behavior were not
exercised. Overall radar acceptance is outside this website review.

## Validation

- Independently ran `node --test tests/alarm-link.test.mjs`: 4 passed, 0 failed.
  Tests import the actual browser module and cover valid identities, all
  existing surfaces, hostile grammar and DOM presentation through a double.
- Compared all four actual files with supplied embedded bytes and SHA-256
  identities: exact matches. Strict UTF-8 decoding and absence of BOM passed.
- Read the actual HTML, JavaScript and tests and inspected
  `git diff -- README.md`. Its supplied baseline equals normalized HEAD text;
  exact raw pre-edit README bytes were not captured and are not claimed.
  The normalized diff only adds the alarm-entry paragraph. Pre-existing
  release-candidate documentation is unchanged and outside this review.
- Reused the supplied intercepted Chromium results at 390 and 1280 CSS pixels:
  exact selected identity, 52-pixel action, no horizontal overflow and invalid
  URL unavailable state. Independently checked both screenshot hashes and PNG
  dimensions (390?844 and 1280?844), and visually inspected both images:
  readable text, clear primary action and no visible clipping.
- Browser measurements are supplied evidence, not an independent browser rerun.
  No intent click, network, device, Home Assistant or media action occurred.
- Markdown lint and final UTF-8 checks apply to this saved review record.

Any change to the four identities invalidates the affected source acceptance;
new delivered artifacts require their own deployed and target evidence.

[github-404]: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site
[android-links]: https://developer.android.com/training/app-links

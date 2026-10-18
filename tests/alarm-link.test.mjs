import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// Import the exact browser source without relying on package.json module defaults.
const source = await readFile(new URL("../odin-dashboard/alarm-link.js", import.meta.url), "utf8");
const { alarmAppLink, showAlarmLink } = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
const base = "https://joergensen70.github.io/odin-dashboard/open/";

test("rear live retains exact alarm and canonical package without fallback", () => {
  const target = alarmAppLink(`${base}security/alarm/rear_radar_old-123/live/rear`);
  assert.equal(target.alarmId, "rear_radar_old-123");
  assert.equal(target.surfaceId, "security");
  assert.equal(target.action, "rear_live");
  assert.equal(target.url, `${base}security/alarm/rear_radar_old-123/live/rear`);
  assert.match(target.intent, /package=de\.joergensen\.odindashboard;/);
  assert.ok(target.intent.endsWith("category=android.intent.category.BROWSABLE;end"));
  assert.ok(!target.intent.includes("browser_fallback_url"));
});

test("existing exact alarm surfaces retain their target", () => {
  for (const surface of ["security", "truma", "energy", "supply", "elevel", "service"]) {
    const target = alarmAppLink(`${base}${surface}/alarm/old_alarm`);
    assert.equal(target.surfaceId, surface);
    assert.equal(target.alarmId, "old_alarm");
    assert.equal(target.action, "open");
  }
});

test("reject foreign origin, ambiguous grammar, parameters and encoded paths", () => {
  const valid = `${base}security/alarm/A/live/rear`;
  const invalid = [
    null, {}, "", valid.replace("https:", "http:"),
    valid.replace("github.io", "github.io.evil.test"),
    valid.replace("github.io", "github.io:443"),
    valid.replace("https://", "https://user@"),
    valid + "?camera=rear", valid + "#fragment", valid + "/",
    valid.replace("/rear", "/interior"), valid.replace("/live/", "/Live/"),
    valid.replace("/security/", "/service/"), valid.replace("/A/", "/%41/"),
    valid.replace("/A/", "/A%2FB/"), valid.replace("/A/", "/A%252FB/"),
    valid.replace("/A/", "/../"), valid.replace("/A/", "/A;package=evil/"),
    valid.replace("/A/", `/${"a".repeat(97)}/`), valid.replace("/A/", "//"),
    valid.replace("/alarm/", "/%61larm/"), valid + "\n", valid + " ",
    `${base}unknown/alarm/id`, `${base}security/alarm/id/extra`,
  ];
  for (const value of invalid) assert.equal(alarmAppLink(value), null, String(value));
  assert.ok(alarmAppLink(valid.replace("/A/", `/${"a".repeat(96)}/`)));
});

function pageDouble() {
  const sections = Object.fromEntries(["rear-live", "alarm-detail", "unavailable"].map(id => {
    const idNode = { textContent: "" };
    const link = { href: "" };
    return [id, { hidden: id !== "unavailable", idNode, link,
      querySelector: selector => selector === "[data-alarm-id]" ? idNode : link }];
  }));
  return { sections, getElementById: id => sections[id] };
}

test("page renders exact selected alarm as text and offers only manual app link", () => {
  const page = pageDouble();
  assert.equal(showAlarmLink(page, `${base}security/alarm/earlier_alarm/live/rear`), true);
  assert.equal(page.sections["rear-live"].hidden, false);
  assert.equal(page.sections["rear-live"].idNode.textContent, "earlier_alarm");
  assert.equal(page.sections["unavailable"].hidden, true);
  assert.equal(page.sections["alarm-detail"].hidden, true);
  const rejected = pageDouble();
  assert.equal(showAlarmLink(rejected, `${base}security/alarm/x/live/rear?entity=evil`), false);
  assert.equal(rejected.sections["unavailable"].hidden, false);
  assert.equal(rejected.sections["rear-live"].link.href, "");
});

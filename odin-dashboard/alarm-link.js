const surfaces = new Set(["security", "truma", "energy", "supply", "elevel", "service"]);
const origin = /^https:\/\/joergensen70\.github\.io(?=\/)/i;

export function alarmAppLink(value) {
  if (typeof value !== "string") return null;
  const prefix = origin.exec(value);
  if (!prefix) return null;
  const path = value.slice(prefix[0].length);
  const live = /^\/odin-dashboard\/open\/security\/alarm\/([A-Za-z0-9_-]{1,96})\/live\/rear$/.exec(path);
  const detail = /^\/odin-dashboard\/open\/([a-z]+)\/alarm\/([A-Za-z0-9_-]{1,96})$/.exec(path);
  if (!live && (!detail || !surfaces.has(detail[1]))) return null;
  const alarmId = live ? live[1] : detail[2];
  const surfaceId = live ? "security" : detail[1];
  const action = live ? "rear_live" : "open";
  const url = `https://joergensen70.github.io${path}`;
  return {
    alarmId,
    surfaceId,
    action,
    url,
    intent: `intent://joergensen70.github.io${path}#Intent;scheme=https;package=de.joergensen.odindashboard;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;end`,
  };
}

export function showAlarmLink(document, href) {
  const target = alarmAppLink(href);
  if (!target) return false;
  const section = document.getElementById(target.action === "rear_live" ? "rear-live" : "alarm-detail");
  section.querySelector("[data-alarm-id]").textContent = target.alarmId;
  section.querySelector("[data-open-app]").href = target.intent;
  document.getElementById("unavailable").hidden = true;
  section.hidden = false;
  return true;
}

// A verified Android App Link normally opens the app before this page is used.
// Browsers that reach the static page offer only an explicit canonical-app action.
if (typeof window !== "undefined" && typeof document !== "undefined") {
  showAlarmLink(document, window.location.href);
}

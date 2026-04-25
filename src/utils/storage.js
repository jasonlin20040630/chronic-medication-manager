export const STORAGE_KEYS = {
  plans: 'cmm_plans_v1',
  dailyStatus: 'cmm_daily_status_v1',
};

export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// lib/wizardPersistence.ts
export function getWizardStorageKey(userId: string | number) {
  return `checkout_wizard_state_${userId}`;
}

export function saveWizardState(key: string, state: any) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(state));
  }
}

export function loadWizardState(key: string) {
  if (typeof window !== "undefined") {
    const state = window.localStorage.getItem(key);
    if (state) return JSON.parse(state);
  }
  return null;
}

export function clearWizardState(key: string | null) {
  if (typeof window !== "undefined" && key) {
    window.localStorage.removeItem(key);
  }
}

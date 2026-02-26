import { CheckIn } from "@/types/checkIn";

const STORAGE_KEY = "checkin-history";

export function getHistory(): CheckIn[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveCheckIn(checkIn: CheckIn): void {
  const history = getHistory();
  history.unshift(checkIn);
  // Keep only last 50 entries
  if (history.length > 50) history.length = 50;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function getCheckInCount(): number {
  return getHistory().length;
}

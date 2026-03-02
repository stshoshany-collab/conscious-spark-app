import { getHistory } from "./history";
import { getJournal } from "./journal";
import { SituationType } from "@/types/checkIn";

export interface AvatarLevel {
  level: number;
  title: string;
  emoji: string;
  description: string;
  minPoints: number;
}

export const avatarLevels: AvatarLevel[] = [
  { level: 1, title: "מתבונן מתחיל", emoji: "🌱", description: "רק התחלת את המסע", minPoints: 0 },
  { level: 2, title: "חוקר חברתי", emoji: "🔍", description: "מתחיל לזהות רמזים", minPoints: 5 },
  { level: 3, title: "קורא אנשים", emoji: "📖", description: "מבין מה קורה סביבך", minPoints: 15 },
  { level: 4, title: "נווט חברתי", emoji: "🧭", description: "יודע לנווט בין סיטואציות", minPoints: 30 },
  { level: 5, title: "מאסטר חברתי", emoji: "⭐", description: "מומחה בהבנה חברתית", minPoints: 50 },
  { level: 6, title: "אלוף האמפתיה", emoji: "👑", description: "מובילים אחרים בכוח ההבנה", minPoints: 80 },
];

export function getAvatarStats() {
  const history = getHistory();
  const journal = getJournal();
  const successEntries = journal.filter((e) => e.type === "success").length;

  const points = history.length + successEntries * 2;

  const currentLevel = [...avatarLevels].reverse().find((l) => points >= l.minPoints) || avatarLevels[0];
  const nextLevel = avatarLevels.find((l) => l.minPoints > points);
  const progress = nextLevel
    ? ((points - currentLevel.minPoints) / (nextLevel.minPoints - currentLevel.minPoints)) * 100
    : 100;

  // Situation diversity
  const situationCounts: Record<string, number> = {};
  history.forEach((h) => {
    situationCounts[h.situation] = (situationCounts[h.situation] || 0) + 1;
  });

  const uniqueSituations = Object.keys(situationCounts).length;
  const totalCheckIns = history.length;
  const streak = calculateStreak(history.map((h) => h.timestamp));

  return {
    points,
    currentLevel,
    nextLevel,
    progress,
    situationCounts,
    uniqueSituations,
    totalCheckIns,
    successEntries,
    challengeEntries: journal.filter((e) => e.type === "challenge").length,
    streak,
  };
}

function calculateStreak(timestamps: number[]): number {
  if (timestamps.length === 0) return 0;
  const days = [...new Set(timestamps.map((t) => new Date(t).toDateString()))].sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );
  let streak = 1;
  for (let i = 0; i < days.length - 1; i++) {
    const diff = new Date(days[i]).getTime() - new Date(days[i + 1]).getTime();
    if (diff <= 86400000 * 1.5) streak++;
    else break;
  }
  return streak;
}

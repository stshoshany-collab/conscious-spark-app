import { motion } from "framer-motion";
import { getHistory } from "@/lib/history";
import { situations, cuesBySituation, expectationsBySituation, actionsBySituation } from "@/data/checkInData";
import { enrichmentBySituation } from "@/data/enrichmentData";
import { SituationType, CheckIn } from "@/types/checkIn";
import { useState } from "react";

interface Props {
  onBack: () => void;
}

function getSituationStats(history: CheckIn[], situationId: SituationType) {
  const entries = history.filter((h) => h.situation === situationId);
  const cueCounts: Record<string, number> = {};
  const expectationCounts: Record<string, number> = {};
  const actionCounts: Record<string, number> = {};

  entries.forEach((e) => {
    e.cues.forEach((c) => { cueCounts[c] = (cueCounts[c] || 0) + 1; });
    expectationCounts[e.expectation] = (expectationCounts[e.expectation] || 0) + 1;
    actionCounts[e.action] = (actionCounts[e.action] || 0) + 1;
  });

  return { count: entries.length, cueCounts, expectationCounts, actionCounts };
}

export const LearningSummary = ({ onBack }: Props) => {
  const history = getHistory();
  const [expandedSituation, setExpandedSituation] = useState<SituationType | null>(null);

  const situationCounts: Record<string, number> = {};
  history.forEach((h) => {
    situationCounts[h.situation] = (situationCounts[h.situation] || 0) + 1;
  });

  const sortedSituations = situations
    .map((s) => ({ ...s, count: situationCounts[s.id] || 0 }))
    .sort((a, b) => b.count - a.count);

  const totalCheckIns = history.length;
  const maxCount = Math.max(...sortedSituations.map((s) => s.count), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">📚 סיכום למידה</h2>
        <p className="text-muted-foreground text-sm">
          {totalCheckIns > 0
            ? `ביצעת ${totalCheckIns} צ'ק-אינים – הנה מה שלמדת`
            : "עדיין לא התחלת – בוא נתחיל!"}
        </p>
      </div>

      {totalCheckIns > 0 && (
        <div className="glass-strong rounded-xl p-4 space-y-3">
          <h3 className="text-sm font-semibold text-foreground">📊 חלוקת סיטואציות</h3>
          {sortedSituations.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="space-y-1"
            >
              <div className="flex justify-between items-center text-sm">
                <span>
                  {s.emoji} {s.label}
                </span>
                <span className="text-muted-foreground text-xs">{s.count}</span>
              </div>
              <div className="h-2 rounded-full bg-secondary overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(s.count / maxCount) * 100}%` }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                  className="h-full rounded-full bg-primary"
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground">🧠 העשרה ותובנות</h3>
        {situations.map((s) => {
          const enrichment = enrichmentBySituation[s.id];
          const isExpanded = expandedSituation === s.id;
          const count = situationCounts[s.id] || 0;

          return (
            <motion.div
              key={s.id}
              layout
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedSituation(isExpanded ? null : s.id)}
                className="w-full p-4 flex items-center gap-3 text-right"
              >
                <span className="text-2xl">{enrichment.emoji}</span>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{enrichment.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {count > 0 ? `${count} התנסויות` : "עדיין לא נוסה"}
                  </p>
                </div>
                <motion.span
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  className="text-muted-foreground"
                >
                  ▼
                </motion.span>
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 pb-4 space-y-4"
                >
                  {/* Per-category stats */}
                  {(() => {
                    const stats = getSituationStats(history, s.id);
                    const allCues = cuesBySituation[s.id];
                    const allExpectations = expectationsBySituation[s.id];
                    const allActions = actionsBySituation[s.id];

                    return stats.count > 0 ? (
                      <div className="space-y-3">
                        <div className="glass rounded-lg p-3 space-y-2">
                          <p className="text-xs font-semibold text-foreground">📊 {stats.count} התנסויות</p>
                          
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">רמזים שזוהו:</p>
                            <div className="flex flex-wrap gap-1">
                              {allCues.map((c) => {
                                const n = stats.cueCounts[c.id] || 0;
                                return (
                                  <span key={c.id} className={`text-xs px-2 py-0.5 rounded-full ${n > 0 ? "bg-primary/15 text-primary font-medium" : "bg-secondary text-muted-foreground opacity-50"}`}>
                                    {c.emoji} {c.label} {n > 0 && `(${n})`}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">ציפיות שנבחרו:</p>
                            <div className="flex flex-wrap gap-1">
                              {allExpectations.map((e) => {
                                const n = stats.expectationCounts[e.id] || 0;
                                return (
                                  <span key={e.id} className={`text-xs px-2 py-0.5 rounded-full ${n > 0 ? "bg-accent/15 text-accent-foreground font-medium" : "bg-secondary text-muted-foreground opacity-50"}`}>
                                    {e.emoji} {e.label} {n > 0 && `(${n})`}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs font-medium text-muted-foreground">פעולות שנבחרו:</p>
                            <div className="flex flex-wrap gap-1">
                              {allActions.map((a) => {
                                const n = stats.actionCounts[a.id] || 0;
                                return (
                                  <span key={a.id} className={`text-xs px-2 py-0.5 rounded-full ${n > 0 ? "bg-primary/15 text-primary font-medium" : "bg-secondary text-muted-foreground opacity-50"}`}>
                                    {a.emoji} {a.label} {n > 0 && `(${n})`}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground text-center py-2">עדיין אין התנסויות בקטגוריה זו</p>
                    );
                  })()}

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-destructive/80">⚡ אתגרים נפוצים:</p>
                    {enrichment.challenges.map((c, i) => (
                      <p key={i} className="text-xs text-muted-foreground mr-4">• {c}</p>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-primary">💡 דרכי התמודדות:</p>
                    {enrichment.strategies.map((s, i) => (
                      <p key={i} className="text-xs text-foreground mr-4">{s}</p>
                    ))}
                  </div>

                  <div className="bg-accent/10 rounded-lg p-3">
                    <p className="text-xs text-foreground leading-relaxed">
                      💭 {enrichment.insight}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      <button
        onClick={onBack}
        className="w-full glass rounded-xl p-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        חזרה
      </button>
    </motion.div>
  );
};

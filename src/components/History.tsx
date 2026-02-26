import { motion } from "framer-motion";
import { CheckIn } from "@/types/checkIn";
import { situations, actionsBySituation } from "@/data/checkInData";
import { getHistory } from "@/lib/history";

interface Props {
  onBack: () => void;
}

export const History = ({ onBack }: Props) => {
  const history = getHistory();

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString("he-IL", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">📊 ההיסטוריה שלי</h2>
        <p className="text-muted-foreground text-sm">
          {history.length > 0
            ? `${history.length} צ'ק-אינים עד כה`
            : "עדיין אין צ'ק-אינים – מתחילים?"}
        </p>
      </div>

      {history.length > 0 ? (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {history.slice(0, 20).map((item, index) => {
            const situation = situations.find((s) => s.id === item.situation);
            const action = actionsBySituation[item.situation]?.find(
              (a) => a.id === item.action
            );
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-xl p-3 flex items-center gap-3"
              >
                <span className="text-2xl">{situation?.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {situation?.label} – {action?.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{formatDate(item.timestamp)}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="glass rounded-xl p-8 text-center">
          <span className="text-5xl block mb-3">🌱</span>
          <p className="text-sm text-muted-foreground">כל מסע מתחיל בצעד ראשון</p>
        </div>
      )}

      <button
        onClick={onBack}
        className="w-full glass rounded-xl p-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        חזרה
      </button>
    </motion.div>
  );
};

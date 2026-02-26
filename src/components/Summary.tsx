import { motion } from "framer-motion";
import { CheckIn, SituationType } from "@/types/checkIn";
import { situations, cuesBySituation, expectationsBySituation, actionsBySituation } from "@/data/checkInData";

interface Props {
  checkIn: CheckIn;
  checkInCount: number;
  onNewCheckIn: () => void;
}

export const Summary = ({ checkIn, checkInCount, onNewCheckIn }: Props) => {
  const situation = situations.find((s) => s.id === checkIn.situation)!;
  const cues = cuesBySituation[checkIn.situation].filter((c) => checkIn.cues.includes(c.id));
  const expectation = expectationsBySituation[checkIn.situation].find((e) => e.id === checkIn.expectation);
  const action = actionsBySituation[checkIn.situation].find((a) => a.id === checkIn.action);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="text-center space-y-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-6xl"
        >
          🌟
        </motion.div>
        <h2 className="text-2xl font-bold text-foreground">כל הכבוד!</h2>
        <p className="text-muted-foreground text-sm">עצרת, חשבת, ובחרת.</p>
      </div>

      <div className="glass-strong rounded-xl p-5 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xl">{situation.emoji}</span>
            <div>
              <p className="text-xs text-muted-foreground">סיטואציה</p>
              <p className="text-sm font-medium text-foreground">{situation.label}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-xl">🔍</span>
            <div>
              <p className="text-xs text-muted-foreground">רמזים שזיהית</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {cues.map((cue) => (
                  <span key={cue.id} className="text-xs bg-secondary rounded-lg px-2 py-1">
                    {cue.emoji} {cue.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {expectation && (
            <div className="flex items-center gap-3">
              <span className="text-xl">{expectation.emoji}</span>
              <div>
                <p className="text-xs text-muted-foreground">מה מצופה</p>
                <p className="text-sm font-medium text-foreground">{expectation.label}</p>
              </div>
            </div>
          )}

          {action && (
            <div className="flex items-center gap-3">
              <span className="text-xl">{action.emoji}</span>
              <div>
                <p className="text-xs text-muted-foreground">הצעד שבחרת</p>
                <p className="text-sm font-medium text-primary">{action.label}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <p className="text-xs text-muted-foreground mb-1">
          🏆 זה הצ'ק-אין מספר <span className="text-primary font-bold">{checkInCount}</span> שלך!
        </p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onNewCheckIn}
        className="w-full rounded-xl p-4 text-sm font-semibold bg-primary text-primary-foreground"
      >
        צ'ק-אין חדש 🔄
      </motion.button>
    </motion.div>
  );
};

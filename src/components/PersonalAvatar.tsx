import { motion } from "framer-motion";
import { getAvatarStats, avatarLevels } from "@/lib/avatar";

interface Props {
  onBack: () => void;
}

export const PersonalAvatar = ({ onBack }: Props) => {
  const stats = getAvatarStats();
  const { currentLevel, nextLevel, progress, points, totalCheckIns, successEntries, challengeEntries, streak, uniqueSituations } = stats;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">🧑‍🚀 האוואטר שלי</h2>
        <p className="text-muted-foreground text-sm">ההתפתחות והצמיחה שלך</p>
      </div>

      {/* Avatar display */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="text-center"
      >
        <div className="inline-flex flex-col items-center glass-strong rounded-2xl p-6 glow-primary">
          <motion.span
            className="text-7xl block"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            {currentLevel.emoji}
          </motion.span>
          <h3 className="text-lg font-bold text-foreground mt-3">{currentLevel.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">{currentLevel.description}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-semibold text-primary">רמה {currentLevel.level}</span>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{points} נקודות</span>
          </div>
        </div>
      </motion.div>

      {/* Progress bar */}
      {nextLevel && (
        <div className="glass rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">עד הרמה הבאה: {nextLevel.emoji} {nextLevel.title}</span>
            <span className="font-semibold text-primary">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="h-full rounded-full bg-gradient-to-l from-primary to-accent"
            />
          </div>
          <p className="text-xs text-muted-foreground text-center">
            {nextLevel.minPoints - points} נקודות נוספות לרמה הבאה
          </p>
        </div>
      )}

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { emoji: "📊", label: "צ'ק-אינים", value: totalCheckIns },
          { emoji: "🔥", label: "רצף ימים", value: streak },
          { emoji: "🌈", label: "סיטואציות", value: `${uniqueSituations}/4` },
          { emoji: "⭐", label: "הצלחות", value: successEntries },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="glass rounded-xl p-3 text-center"
          >
            <span className="text-2xl block">{stat.emoji}</span>
            <p className="text-lg font-bold text-foreground mt-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* All levels */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">🏆 רמות</h3>
        <div className="space-y-1">
          {avatarLevels.map((level) => {
            const isUnlocked = points >= level.minPoints;
            const isCurrent = level.level === currentLevel.level;
            return (
              <div
                key={level.level}
                className={`flex items-center gap-3 rounded-lg p-2 text-sm ${
                  isCurrent ? "glass-strong glow-primary" : isUnlocked ? "glass" : "opacity-40"
                }`}
              >
                <span className="text-xl">{level.emoji}</span>
                <div className="flex-1">
                  <p className={`text-xs font-medium ${isUnlocked ? "text-foreground" : "text-muted-foreground"}`}>
                    {level.title}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">{level.minPoints} נק׳</span>
              </div>
            );
          })}
        </div>
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

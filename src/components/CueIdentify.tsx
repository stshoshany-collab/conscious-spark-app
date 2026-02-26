import { useState } from "react";
import { motion } from "framer-motion";
import { CueOption, SituationType } from "@/types/checkIn";
import { cuesBySituation, familyHints } from "@/data/checkInData";

interface Props {
  situation: SituationType;
  onSelect: (cues: string[]) => void;
  onBack: () => void;
}

export const CueIdentify = ({ situation, onSelect, onBack }: Props) => {
  const [selected, setSelected] = useState<string[]>([]);
  const cues = cuesBySituation[situation];
  const hint = familyHints[situation];

  const toggleCue = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
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
        <h2 className="text-2xl font-bold text-foreground">מה אתה שם לב אליו?</h2>
        <p className="text-muted-foreground text-sm">בחר את הרמזים שאתה מזהה (אפשר יותר מאחד)</p>
      </div>

      <div className="space-y-3">
        {cues.map((cue, index) => (
          <motion.button
            key={cue.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.08, duration: 0.3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => toggleCue(cue.id)}
            className={`w-full glass rounded-xl p-4 flex items-center gap-4 transition-all duration-300 cursor-pointer ${
              selected.includes(cue.id)
                ? "glow-primary border-primary/50"
                : "hover:border-muted-foreground/30"
            }`}
          >
            <span className="text-2xl">{cue.emoji}</span>
            <span className="text-sm font-medium text-foreground">{cue.label}</span>
            {selected.includes(cue.id) && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mr-auto text-primary text-lg"
              >
                ✓
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="glass-strong rounded-xl p-4 text-sm text-muted-foreground leading-relaxed"
      >
        {hint}
      </motion.div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 glass rounded-xl p-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          חזרה
        </button>
        <button
          onClick={() => selected.length > 0 && onSelect(selected)}
          disabled={selected.length === 0}
          className="flex-1 rounded-xl p-3 text-sm font-semibold bg-primary text-primary-foreground disabled:opacity-40 transition-opacity"
        >
          המשך →
        </button>
      </div>
    </motion.div>
  );
};

import { motion } from "framer-motion";
import { SituationOption } from "@/types/checkIn";
import { situations } from "@/data/checkInData";

interface Props {
  onSelect: (situation: SituationOption) => void;
}

export const SituationSelect = ({ onSelect }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">מה קורה עכשיו?</h2>
        <p className="text-muted-foreground text-sm">בחר את הסיטואציה הכי קרובה</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {situations.map((situation, index) => (
          <motion.button
            key={situation.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(situation)}
            className="glass rounded-xl p-5 text-center space-y-3 hover:glow-primary transition-shadow duration-300 cursor-pointer"
          >
            <span className="text-4xl block">{situation.emoji}</span>
            <span className="text-base font-semibold text-foreground block">{situation.label}</span>
            <span className="text-xs text-muted-foreground block leading-relaxed">{situation.description}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

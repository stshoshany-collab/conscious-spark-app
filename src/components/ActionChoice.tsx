import { motion } from "framer-motion";
import { SituationType } from "@/types/checkIn";
import { actionsBySituation } from "@/data/checkInData";

interface Props {
  situation: SituationType;
  onSelect: (action: string) => void;
  onBack: () => void;
}

export const ActionChoice = ({ situation, onSelect, onBack }: Props) => {
  const actions = actionsBySituation[situation];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">צעד קטן אחד 🎯</h2>
        <p className="text-muted-foreground text-sm">בחר פעולה אחת קטנה שאתה יכול לעשות עכשיו</p>
      </div>

      <div className="space-y-3">
        {actions.map((action, index) => (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(action.id)}
            className="w-full glass rounded-xl p-4 text-right space-y-1 hover:glow-primary transition-shadow duration-300 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{action.emoji}</span>
              <span className="text-sm font-semibold text-foreground">{action.label}</span>
            </div>
            <p className="text-xs text-muted-foreground pr-10">{action.hint}</p>
          </motion.button>
        ))}
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

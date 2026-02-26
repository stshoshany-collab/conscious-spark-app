import { motion } from "framer-motion";
import { SituationType } from "@/types/checkIn";
import { expectationsBySituation } from "@/data/checkInData";

interface Props {
  situation: SituationType;
  onSelect: (expectation: string) => void;
  onBack: () => void;
}

export const ExpectationSet = ({ situation, onSelect, onBack }: Props) => {
  const expectations = expectationsBySituation[situation];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">מה מצפים ממני?</h2>
        <p className="text-muted-foreground text-sm">בחר את ההתנהגות המתאימה</p>
      </div>

      <div className="space-y-3">
        {expectations.map((exp, index) => (
          <motion.button
            key={exp.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(exp.id)}
            className="w-full glass rounded-xl p-4 flex items-center gap-4 hover:glow-accent transition-shadow duration-300 cursor-pointer"
          >
            <span className="text-2xl">{exp.emoji}</span>
            <span className="text-sm font-medium text-foreground">{exp.label}</span>
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

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckInFlow } from "@/components/CheckInFlow";
import { History } from "@/components/History";
import { getCheckInCount } from "@/lib/history";

type View = "home" | "checkin" | "history";

const Index = () => {
  const [view, setView] = useState<View>("home");
  const count = getCheckInCount();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Ambient background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 flex-1 flex flex-col max-w-md mx-auto w-full px-4 py-6">
        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col justify-center space-y-8"
            >
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="text-7xl"
                >
                  👁️
                </motion.div>
                <h1 className="text-3xl font-bold text-gradient">מה קורה עכשיו?</h1>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                  עצור. הבט סביבך. שאל את עצמך / אחרים – מה קורה? בחר בהתנהגות המתאימה.
                </p>
              </div>

              {count > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <span className="inline-block glass rounded-full px-4 py-2 text-xs text-muted-foreground">
                    🏆 עשית {count} צ'ק-אינים עד כה!
                  </span>
                </motion.div>
              )}

              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setView("checkin")}
                  className="w-full rounded-xl p-4 text-base font-semibold bg-primary text-primary-foreground glow-primary"
                >
                  🚀 בוא נתחיל צ'ק-אין
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setView("history")}
                  className="w-full glass rounded-xl p-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  📊 ההיסטוריה שלי
                </motion.button>
              </div>
            </motion.div>
          )}

          {view === "checkin" && (
            <motion.div
              key="checkin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <button
                onClick={() => setView("home")}
                className="self-start text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
              >
                ← חזרה לדף הבית
              </button>
              <CheckInFlow />
            </motion.div>
          )}

          {view === "history" && (
            <motion.div
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1"
            >
              <History onBack={() => setView("home")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;

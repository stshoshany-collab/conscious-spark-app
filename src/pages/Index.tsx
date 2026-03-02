import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckInFlow } from "@/components/CheckInFlow";
import { History } from "@/components/History";
import { LearningSummary } from "@/components/LearningSummary";
import { PersonalAvatar } from "@/components/PersonalAvatar";
import { Journal } from "@/components/Journal";
import { getCheckInCount } from "@/lib/history";
import { getAvatarStats } from "@/lib/avatar";

type View = "home" | "checkin" | "history" | "learning" | "avatar" | "journal";

const Index = () => {
  const [view, setView] = useState<View>("home");
  const count = getCheckInCount();
  const avatarStats = view === "home" ? getAvatarStats() : null;

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
              className="flex-1 flex flex-col justify-center space-y-6"
            >
              {/* Avatar mini display */}
              {avatarStats && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  onClick={() => setView("avatar")}
                  className="self-center glass rounded-full px-4 py-2 flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <span className="text-xl">{avatarStats.currentLevel.emoji}</span>
                  <span className="text-xs font-semibold text-foreground">{avatarStats.currentLevel.title}</span>
                  <span className="text-xs text-muted-foreground">רמה {avatarStats.currentLevel.level}</span>
                </motion.button>
              )}

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
                  עצרת, חשבת, בחרת!
                </p>
              </div>

              {count > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <span className="inline-block glass rounded-full px-4 py-2 text-sm font-semibold text-foreground">
                    🏆{" "}
                    <motion.span
                      key={count}
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="inline-block"
                    >
                      {count}
                    </motion.span>
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

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setView("journal")}
                    className="glass rounded-xl p-3 text-center space-y-1"
                  >
                    <span className="text-xl block">📓</span>
                    <p className="text-xs font-medium text-foreground">היומן שלי</p>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setView("learning")}
                    className="glass rounded-xl p-3 text-center space-y-1"
                  >
                    <span className="text-xl block">📚</span>
                    <p className="text-xs font-medium text-foreground">סיכום למידה</p>
                  </motion.button>
                </div>

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
            <motion.div key="history" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
              <History onBack={() => setView("home")} />
            </motion.div>
          )}

          {view === "learning" && (
            <motion.div key="learning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
              <LearningSummary onBack={() => setView("home")} />
            </motion.div>
          )}

          {view === "avatar" && (
            <motion.div key="avatar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
              <PersonalAvatar onBack={() => setView("home")} />
            </motion.div>
          )}

          {view === "journal" && (
            <motion.div key="journal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1">
              <Journal onBack={() => setView("home")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;

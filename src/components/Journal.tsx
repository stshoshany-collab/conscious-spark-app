import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { JournalEntry } from "@/types/journal";
import { getJournal, saveJournalEntry, deleteJournalEntry } from "@/lib/journal";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface Props {
  onBack: () => void;
}

const emotionOptions = [
  { emoji: "😕", label: "מבולבל" },
  { emoji: "😰", label: "לחוץ" },
  { emoji: "😊", label: "שמח" },
  { emoji: "💪", label: "גאה" },
  { emoji: "😌", label: "רגוע" },
  { emoji: "🤔", label: "חושב" },
];

export const Journal = ({ onBack }: Props) => {
  const [entries, setEntries] = useState<JournalEntry[]>(getJournal());
  const [isAdding, setIsAdding] = useState(false);
  const [entryType, setEntryType] = useState<"challenge" | "success" | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState<string>("");
  const [filter, setFilter] = useState<"all" | "challenge" | "success">("all");

  const handleSave = () => {
    if (!title.trim() || !entryType) return;
    const entry: JournalEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      type: entryType,
      title: title.trim(),
      description: description.trim(),
      emotion: selectedEmotion || undefined,
    };
    saveJournalEntry(entry);
    setEntries(getJournal());
    resetForm();
  };

  const handleDelete = (id: string) => {
    deleteJournalEntry(id);
    setEntries(getJournal());
  };

  const resetForm = () => {
    setIsAdding(false);
    setEntryType(null);
    setTitle("");
    setDescription("");
    setSelectedEmotion("");
  };

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString("he-IL", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredEntries = filter === "all" ? entries : entries.filter((e) => e.type === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">📓 היומן שלי</h2>
        <p className="text-muted-foreground text-sm">מקום לרשום מה קרה ומה הרגשתי</p>
      </div>

      {!isAdding ? (
        <>
          {/* Add buttons */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setIsAdding(true); setEntryType("challenge"); }}
              className="glass rounded-xl p-4 text-center space-y-2"
            >
              <span className="text-3xl block">🤷</span>
              <p className="text-xs font-semibold text-foreground">לא ידעתי מה לעשות</p>
              <p className="text-xs text-muted-foreground">מצב מאתגר</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setIsAdding(true); setEntryType("success"); }}
              className="glass rounded-xl p-4 text-center space-y-2"
            >
              <span className="text-3xl block">🎉</span>
              <p className="text-xs font-semibold text-foreground">הצלחתי!</p>
              <p className="text-xs text-muted-foreground">רגע של גאווה</p>
            </motion.button>
          </div>

          {/* Filter tabs */}
          {entries.length > 0 && (
            <div className="flex gap-2 justify-center">
              {(["all", "challenge", "success"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "glass text-muted-foreground"
                  }`}
                >
                  {f === "all" ? "הכל" : f === "challenge" ? "🤷 אתגרים" : "🎉 הצלחות"}
                </button>
              ))}
            </div>
          )}

          {/* Entries list */}
          <div className="space-y-2 max-h-80 overflow-y-auto">
            <AnimatePresence>
              {filteredEntries.length > 0 ? (
                filteredEntries.slice(0, 30).map((entry, i) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ delay: i * 0.03 }}
                    className={`glass rounded-xl p-3 space-y-1 ${
                      entry.type === "success" ? "border-r-4 border-primary" : "border-r-4 border-accent"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{entry.type === "success" ? "🎉" : "🤷"}</span>
                        <div>
                          <p className="text-sm font-medium text-foreground">{entry.title}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(entry.timestamp)}</p>
                        </div>
                      </div>
                      {entry.emotion && <span className="text-lg">{entry.emotion}</span>}
                    </div>
                    {entry.description && (
                      <p className="text-xs text-muted-foreground mr-7 leading-relaxed">{entry.description}</p>
                    )}
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-xs text-destructive/60 hover:text-destructive mr-7 transition-colors"
                    >
                      מחיקה
                    </button>
                  </motion.div>
                ))
              ) : (
                <div className="glass rounded-xl p-8 text-center">
                  <span className="text-4xl block mb-2">✍️</span>
                  <p className="text-sm text-muted-foreground">
                    {filter === "all"
                      ? "היומן ריק – התחל לרשום!"
                      : filter === "challenge"
                      ? "אין אתגרים שנרשמו"
                      : "אין הצלחות שנרשמו – בוא נתחיל!"}
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </>
      ) : (
        /* Add entry form */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-strong rounded-xl p-5 space-y-4"
        >
          <div className="text-center">
            <span className="text-3xl">{entryType === "success" ? "🎉" : "🤷"}</span>
            <h3 className="text-sm font-bold text-foreground mt-1">
              {entryType === "success" ? "רגע של הצלחה!" : "מצב שלא ידעתי מה לעשות"}
            </h3>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">מה קרה? (בקצרה)</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="למשל: בהפסקה לא ידעתי למי לגשת"
              className="text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">ספר עוד (אופציונלי)</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="מה חשבת? מה עשית? מה היה קורה אם..."
              className="text-sm min-h-[60px]"
              rows={3}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-foreground">איך הרגשת?</label>
            <div className="flex flex-wrap gap-2">
              {emotionOptions.map((em) => (
                <button
                  key={em.emoji}
                  onClick={() => setSelectedEmotion(selectedEmotion === em.emoji ? "" : em.emoji)}
                  className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition-all ${
                    selectedEmotion === em.emoji
                      ? "bg-primary text-primary-foreground scale-105"
                      : "glass text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {em.emoji} {em.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              disabled={!title.trim()}
              className="flex-1 rounded-xl p-3 text-sm font-semibold bg-primary text-primary-foreground disabled:opacity-50"
            >
              שמירה ✓
            </motion.button>
            <button
              onClick={resetForm}
              className="glass rounded-xl p-3 text-sm text-muted-foreground"
            >
              ביטול
            </button>
          </div>
        </motion.div>
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

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SituationOption, SituationType, CheckIn } from "@/types/checkIn";
import { SituationSelect } from "./SituationSelect";
import { CueIdentify } from "./CueIdentify";
import { ExpectationSet } from "./ExpectationSet";
import { ActionChoice } from "./ActionChoice";
import { Summary } from "./Summary";
import { saveCheckIn, getCheckInCount } from "@/lib/history";

type Step = "situation" | "cues" | "expectation" | "action" | "summary";

export const CheckInFlow = () => {
  const [step, setStep] = useState<Step>("situation");
  const [situation, setSituation] = useState<SituationType | null>(null);
  const [cues, setCues] = useState<string[]>([]);
  const [expectation, setExpectation] = useState<string>("");
  const [action, setAction] = useState<string>("");
  const [lastCheckIn, setLastCheckIn] = useState<CheckIn | null>(null);

  const handleSituation = (s: SituationOption) => {
    setSituation(s.id);
    setStep("cues");
  };

  const handleCues = (c: string[]) => {
    setCues(c);
    setStep("expectation");
  };

  const handleExpectation = (e: string) => {
    setExpectation(e);
    setStep("action");
  };

  const handleAction = (a: string) => {
    setAction(a);
    const checkIn: CheckIn = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      situation: situation!,
      cues,
      expectation,
      action: a,
    };
    saveCheckIn(checkIn);
    setLastCheckIn(checkIn);
    setStep("summary");
  };

  const reset = () => {
    setSituation(null);
    setCues([]);
    setExpectation("");
    setAction("");
    setLastCheckIn(null);
    setStep("situation");
  };

  return (
    <AnimatePresence mode="wait">
      {step === "situation" && (
        <SituationSelect key="situation" onSelect={handleSituation} />
      )}
      {step === "cues" && situation && (
        <CueIdentify
          key="cues"
          situation={situation}
          onSelect={handleCues}
          onBack={() => setStep("situation")}
        />
      )}
      {step === "expectation" && situation && (
        <ExpectationSet
          key="expectation"
          situation={situation}
          onSelect={handleExpectation}
          onBack={() => setStep("cues")}
        />
      )}
      {step === "action" && situation && (
        <ActionChoice
          key="action"
          situation={situation}
          onSelect={handleAction}
          onBack={() => setStep("expectation")}
        />
      )}
      {step === "summary" && lastCheckIn && (
        <Summary
          key="summary"
          checkIn={lastCheckIn}
          checkInCount={getCheckInCount()}
          onNewCheckIn={reset}
        />
      )}
    </AnimatePresence>
  );
};

export type SituationType = "listening" | "dialogue" | "transition" | "emotional";

export interface SituationOption {
  id: SituationType;
  label: string;
  emoji: string;
  description: string;
}

export interface CueOption {
  id: string;
  label: string;
  emoji: string;
}

export interface ExpectationOption {
  id: string;
  label: string;
  emoji: string;
}

export interface ActionOption {
  id: string;
  label: string;
  emoji: string;
  hint: string;
}

export interface CheckIn {
  id: string;
  timestamp: number;
  situation: SituationType;
  cues: string[];
  expectation: string;
  action: string;
}

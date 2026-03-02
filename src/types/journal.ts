export interface JournalEntry {
  id: string;
  timestamp: number;
  type: "challenge" | "success";
  title: string;
  description: string;
  situation?: string;
  emotion?: string;
}

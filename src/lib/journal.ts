import { JournalEntry } from "@/types/journal";

const JOURNAL_KEY = "journal-entries";

export function getJournal(): JournalEntry[] {
  try {
    const data = localStorage.getItem(JOURNAL_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveJournalEntry(entry: JournalEntry): void {
  const journal = getJournal();
  journal.unshift(entry);
  if (journal.length > 100) journal.length = 100;
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(journal));
}

export function deleteJournalEntry(id: string): void {
  const journal = getJournal().filter((e) => e.id !== id);
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(journal));
}

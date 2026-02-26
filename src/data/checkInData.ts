import {
  SituationOption,
  CueOption,
  ExpectationOption,
  ActionOption,
  SituationType,
} from "@/types/checkIn";

export const situations: SituationOption[] = [
  {
    id: "listening",
    label: "הקשבה",
    emoji: "👂",
    description: "מישהו מדבר ואני צריך להקשיב",
  },
  {
    id: "dialogue",
    label: "דו-שיח",
    emoji: "💬",
    description: "אני חלק משיחה – צריך גם לדבר וגם להקשיב",
  },
  {
    id: "transition",
    label: "מעבר",
    emoji: "🚶",
    description: "עוברים ממצב אחד למצב אחר (כמו מהפסקה לשיעור)",
  },
  {
    id: "emotional",
    label: "רגשי",
    emoji: "❤️",
    description: "מישהו מרגיש משהו חזק – עצב, כעס, שמחה",
  },
];

export const cuesBySituation: Record<SituationType, CueOption[]> = {
  listening: [
    { id: "tone", label: "טון הדיבור", emoji: "🔊" },
    { id: "face", label: "הבעת פנים", emoji: "😐" },
    { id: "body", label: "שפת גוף", emoji: "🧍" },
    { id: "silence", label: "שתיקה", emoji: "🤫" },
    { id: "eye-contact", label: "קשר עין", emoji: "👀" },
  ],
  dialogue: [
    { id: "turns", label: "תורות דיבור", emoji: "🔄" },
    { id: "tone", label: "טון הדיבור", emoji: "🔊" },
    { id: "topic", label: "נושא השיחה", emoji: "📌" },
    { id: "face", label: "הבעת פנים", emoji: "😐" },
    { id: "questions", label: "שאלות", emoji: "❓" },
  ],
  transition: [
    { id: "movement", label: "תנועה סביבי", emoji: "🏃" },
    { id: "noise", label: "רמת רעש", emoji: "📢" },
    { id: "instructions", label: "הוראות", emoji: "📋" },
    { id: "time", label: "זמן", emoji: "⏰" },
    { id: "others", label: "מה אחרים עושים", emoji: "👥" },
  ],
  emotional: [
    { id: "tears", label: "דמעות / בכי", emoji: "😢" },
    { id: "anger", label: "כעס / צעקות", emoji: "😡" },
    { id: "joy", label: "שמחה / צחוק", emoji: "😊" },
    { id: "withdrawal", label: "הסתגרות", emoji: "🫥" },
    { id: "tension", label: "מתח בגוף", emoji: "😰" },
  ],
};

export const expectationsBySituation: Record<SituationType, ExpectationOption[]> = {
  listening: [
    { id: "stay-quiet", label: "לשמור על שקט", emoji: "🤐" },
    { id: "look-at", label: "להסתכל על הדובר", emoji: "👀" },
    { id: "nod", label: "להנהן", emoji: "😊" },
    { id: "wait", label: "לחכות בסבלנות", emoji: "⏳" },
  ],
  dialogue: [
    { id: "wait-turn", label: "לחכות לתור שלי", emoji: "✋" },
    { id: "ask-question", label: "לשאול שאלה", emoji: "❓" },
    { id: "respond", label: "להגיב למה שנאמר", emoji: "💭" },
    { id: "stay-topic", label: "להישאר בנושא", emoji: "📌" },
  ],
  transition: [
    { id: "follow-group", label: "ללכת עם הקבוצה", emoji: "👥" },
    { id: "listen-instructions", label: "להקשיב להוראות", emoji: "📋" },
    { id: "prepare", label: "להתכונן למה שבא", emoji: "🎒" },
    { id: "calm-down", label: "להירגע ולהתאפס", emoji: "🧘" },
  ],
  emotional: [
    { id: "be-present", label: "פשוט להיות שם", emoji: "🫂" },
    { id: "ask-ok", label: "לשאול \'את/ה בסדר?\'", emoji: "❤️" },
    { id: "give-space", label: "לתת מרחב", emoji: "🚪" },
    { id: "get-help", label: "לקרוא למבוגר", emoji: "🆘" },
  ],
};

export const actionsBySituation: Record<SituationType, ActionOption[]> = {
  listening: [
    { id: "close-phone", label: "להוריד את הטלפון", emoji: "📱", hint: "זה מראה שאתה ממוקד" },
    { id: "face-speaker", label: "לפנות את הגוף לדובר", emoji: "🧍", hint: "כך הדובר מרגיש שמקשיבים לו" },
    { id: "nod-once", label: "להנהן פעם אחת", emoji: "😊", hint: "הנהון קטן אומר 'אני שומע'" },
    { id: "think-about", label: "לחשוב על מה שנאמר", emoji: "🧠", hint: "גם אם לא מדברים – לעבד את המידע" },
  ],
  dialogue: [
    { id: "count-3", label: "לספור עד 3 לפני שאני מדבר", emoji: "🔢", hint: "נותן זמן לוודא שהשני סיים" },
    { id: "repeat-idea", label: "לחזור על הרעיון של השני", emoji: "🔁", hint: "מראה שהקשבת באמת" },
    { id: "ask-about", label: "לשאול שאלה על מה שנאמר", emoji: "❓", hint: "שאלה מראה עניין אמיתי" },
    { id: "share-short", label: "לשתף במשפט אחד קצר", emoji: "💬", hint: "לא חייבים הרבה – גם משפט אחד מספיק" },
  ],
  transition: [
    { id: "look-around", label: "להסתכל מה אחרים עושים", emoji: "👀", hint: "זה עוזר להבין מה הצעד הבא" },
    { id: "pack-stuff", label: "לארגן את הדברים", emoji: "🎒", hint: "מכין אותך למה שבא" },
    { id: "deep-breath", label: "נשימה עמוקה אחת", emoji: "🌬️", hint: "עוזר למוח לעשות 'ריסט'" },
    { id: "ask-where", label: "לשאול 'לאן הולכים?'", emoji: "🗺️", hint: "אין בעיה לשאול – זה חכם" },
  ],
  emotional: [
    { id: "sit-near", label: "לשבת ליד בשקט", emoji: "🪑", hint: "לפעמים נוכחות שקטה היא הדבר הכי חזק" },
    { id: "say-here", label: "להגיד 'אני פה'", emoji: "🫂", hint: "שתי מילים פשוטות שאומרות המון" },
    { id: "bring-water", label: "להביא כוס מים", emoji: "💧", hint: "פעולה קטנה שמראה אכפתיות" },
    { id: "tell-adult", label: "לספר למבוגר", emoji: "🧑‍🏫", hint: "אם אתה לא בטוח מה לעשות – זה תמיד בסדר" },
  ],
};

export const familyHints: Record<SituationType, string> = {
  listening: "💡 טיפ: כשאתה מקשיב – הגוף שלך \'מדבר\' גם אם הפה שותק. שים לב לידיים, לעיניים ולכיוון הגוף.",
  dialogue: "💡 טיפ: שיחה טובה היא כמו משחק פינג-פונג – פעם אתה, פעם הצד השני. אם תמיד רק צד אחד מדבר, זה כבר לא שיחה.",
  transition: "💡 טיפ: מעברים יכולים לבלבל. הדבר הכי פשוט? להסתכל מה רוב האנשים עושים, ולעשות כמוהם.",
  emotional: "💡 טיפ: כשמישהו מרגיש משהו חזק, הוא לא תמיד צריך פתרון. לפעמים הוא פשוט צריך שמישהו יהיה שם.",
};

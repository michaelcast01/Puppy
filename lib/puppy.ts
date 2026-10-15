export type Pet = {
  name: string;
  breed: string;
  birthday: string;
  favorite: string;
};
export type Reminder = {
  id: string;
  title: string;
  date: string;
  time: string;
  notes: string;
  done: boolean;
};
export type PuppyData = {
  version: 1;
  routineDay: string;
  completed: string[];
  pet: Pet;
  reminders: Reminder[];
};

export function today() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
export function dateAfter(days: number) {
  const d = new Date(`${today()}T12:00:00`);
  d.setDate(d.getDate() + days);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export function formatDate(
  date: string,
  options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    weekday: "long",
  },
) {
  return new Intl.DateTimeFormat("es-CO", options).format(
    new Date(`${date}T12:00:00`),
  );
}
export function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "p. m." : "a. m."}`;
}
export const routines = [
  {
    id: "walk",
    title: "Un paseo para explorar",
    detail: "08:00 · 30 minutos",
    icon: "walk",
  },
  {
    id: "food",
    title: "Su plato favorito",
    detail: "13:00 · Alimentación",
    icon: "food",
  },
  {
    id: "play",
    title: "Tiempo de jugar",
    detail: "17:00 · 20 minutos",
    icon: "play",
  },
] as const;

export function initialData(): PuppyData {
  return {
    version: 1,
    routineDay: today(),
    completed: ["walk"],
    pet: {
      name: "Milo",
      breed: "Mestizo",
      birthday: "2024-05-12",
      favorite: "Su pelota y los paseos largos",
    },
    reminders: [
      {
        id: "example-visit",
        title: "Visita al veterinario",
        date: dateAfter(2),
        time: "10:00",
        notes: "Revisión de rutina de Milo",
        done: false,
      },
    ],
  };
}

export function isDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return false;
  const d = new Date(`${value}T12:00:00`);
  return (
    !Number.isNaN(d.getTime()) &&
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}` ===
      value
  );
}
const text = (v: unknown, max: number): v is string =>
  typeof v === "string" && v.length <= max;
export function isPuppyData(value: unknown): value is PuppyData {
  if (!value || typeof value !== "object") return false;
  const v = value as PuppyData;
  return (
    v.version === 1 &&
    isDate(v.routineDay) &&
    Array.isArray(v.completed) &&
    v.completed.every((id) => routines.some((r) => r.id === id)) &&
    !!v.pet &&
    text(v.pet.name, 30) &&
    !!v.pet.name.trim() &&
    text(v.pet.breed, 60) &&
    isDate(v.pet.birthday) &&
    text(v.pet.favorite, 120) &&
    Array.isArray(v.reminders) &&
    v.reminders.length <= 500 &&
    v.reminders.every(
      (r) =>
        r &&
        text(r.id, 100) &&
        text(r.title, 80) &&
        !!r.title.trim() &&
        isDate(r.date) &&
        typeof r.time === "string" &&
        /^([01]\d|2[0-3]):[0-5]\d$/.test(r.time) &&
        text(r.notes, 200) &&
        typeof r.done === "boolean",
    )
  );
}

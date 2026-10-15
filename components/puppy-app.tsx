"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowDownToLine,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCheck,
  ChevronRight,
  Copy,
  Footprints,
  Heart,
  House,
  Menu,
  Palette,
  PawPrint,
  Plus,
  Trash2,
  Utensils,
  Volleyball,
  X,
} from "lucide-react";
import { usePuppy } from "./puppy-provider";
import {
  dateAfter,
  formatDate,
  formatTime,
  routines,
  today,
  type Pet,
  type Reminder,
} from "@/lib/puppy";

/* THESIS: everyday care made visible. OWN-WORLD: supplied turquoise Puppy identity, Roboto and Material tonal surfaces.
STORY: review, complete, remember. FIRST VIEWPORT: sidebar, greeting, turquoise hero, routines beside agenda.
FORM: user-approved Pen option A; pinned brand overrides seed f471894a.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md */

const navigation = [
  { href: "/", label: "Mi día", short: "Mi día", icon: House },
  { href: "/mascota", label: "Mi mascota", short: "Mascota", icon: PawPrint },
  { href: "/agenda", label: "Agenda", short: "Agenda", icon: CalendarDays },
  {
    href: "/identidad",
    label: "Identidad de marca",
    short: "Identidad",
    icon: Palette,
  },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { message, ready } = usePuppy();
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [pathname]);
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <aside className="sidebar">
        <Link href="/" className="brand" aria-label="Puppy, ir a Mi día">
          <PawPrint size={30} strokeWidth={1.9} />
          <span>puppy</span>
        </Link>
        <nav aria-label="Navegación principal" className="desktop-nav">
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`nav-item ${pathname === href ? "selected" : ""}`}
              aria-current={pathname === href ? "page" : undefined}
            >
              <Icon size={21} strokeWidth={1.8} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-note">
          <Heart size={25} />
          <p>
            Pequeños cuidados.
            <br />
            Grandes vínculos.
          </p>
        </div>
        <p className="text-xs text-muted">Proyecto de demostración</p>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <Link
            href="/"
            className="brand mobile-brand"
            aria-label="Puppy, inicio"
          >
            <PawPrint size={24} />
            <span>puppy</span>
          </Link>
          <span className="desktop-label text-sm text-muted">
            Tu espacio de cuidado
          </span>
          <div className="flex items-center gap-3">
            <span className="demo-tag">Hecho con cariño</span>
            <span className="avatar" aria-label="Perfil de ejemplo: Dani">
              D
            </span>
            <button
              className="icon-button mobile-menu"
              aria-label={menu ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </header>
        {menu && (
          <nav className="mobile-dropdown" aria-label="Menú móvil">
            {navigation.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="nav-item">
                <Icon size={20} />
                {label}
              </Link>
            ))}
          </nav>
        )}
        <main id="main" tabIndex={-1} aria-busy={!ready}>
          {ready ? (
            children
          ) : (
            <div className="loading-screen" role="status">
              <span className="sr-only">Preparando sus cuidados…</span>
              <div className="loading-heading" />
              <div className="loading-welcome" />
              <div className="loading-routines" />
            </div>
          )}
        </main>
        <footer className="page-footer">
          <span>Hecho para cuidar, con cariño.</span>
          <span>
            Perfil y actividades de ejemplo ·{" "}
            <Link href="/identidad">Créditos de marca</Link>
          </span>
        </footer>
      </div>
      <nav className="bottom-nav" aria-label="Navegación móvil">
        {navigation.map(({ href, short, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={pathname === href ? "selected" : ""}
            aria-current={pathname === href ? "page" : undefined}
          >
            <span>
              <Icon size={22} strokeWidth={1.8} />
            </span>
            {short}
          </Link>
        ))}
      </nav>
      <div
        className={`snackbar ${message ? "visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </div>
    </div>
  );
}

function PageHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [date, setDate] = useState("");
  useEffect(() => setDate(formatDate(today())), []);
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {date && (
        <span className="today-date">
          <CalendarDays size={17} />
          <time dateTime={today()}>{date}</time>
        </span>
      )}
    </div>
  );
}

function DogArtwork({ className = "" }: { className?: string }) {
  return (
    <div
      className={`dog-artwork ${className}`}
      role="img"
      aria-label="Perro del logotipo de Puppy"
    >
      <img src="/assets/puppy-original.png" alt="" width="507" height="507" />
    </div>
  );
}

export function DayView() {
  const { data } = usePuppy();
  return (
    <>
      <PageHeading
        title="Hola, Dani"
        description="Un buen día para cuidar de quien más te quiere."
      />
      <section className="welcome-banner" aria-labelledby="welcome-title">
        <div className="welcome-copy">
          <h2 id="welcome-title">
            Más momentos juntos.
            <br />
            Menos pendientes.
          </h2>
          <p>
            Sus rutinas, sus citas y todo tu cariño.
            <br />
            Dale a {data.pet.name} un día tan especial como él.
          </p>
          <Link className="button button-dark" href="/mascota">
            Conoce a {data.pet.name}
            <ArrowUpRight size={18} />
          </Link>
        </div>
        <DogArtwork />
      </section>
      <div className="dashboard-grid">
        <RoutineList />
        <AgendaPreview />
      </div>
    </>
  );
}

function RoutineList() {
  const { data, setData, ready, announce } = usePuppy();
  const icons = { walk: Footprints, food: Utensils, play: Volleyball };
  const completed = data.completed.length;
  function toggle(id: string, title: string) {
    const done = data.completed.includes(id);
    setData((prev) => ({
      ...prev,
      completed: done
        ? prev.completed.filter((x) => x !== id)
        : [...prev.completed, id],
    }));
    announce(
      done
        ? `${title}: pendiente otra vez.`
        : `${title}: ¡un cuidado más para ${data.pet.name}!`,
    );
  }
  return (
    <section aria-labelledby="routines-title">
      <div className="section-heading">
        <h2 id="routines-title">Sus pequeños rituales</h2>
        <span className="completion-label" aria-live="polite">
          {completed} de 3 completados
        </span>
      </div>
      <div className="routine-list">
        {routines.map((r) => {
          const Icon = icons[r.icon];
          const done = data.completed.includes(r.id);
          return (
            <button
              key={r.id}
              type="button"
              disabled={!ready}
              className={`routine-row ${done ? "is-done" : ""}`}
              aria-pressed={done}
              onClick={() => toggle(r.id, r.title)}
            >
              <span className="routine-icon">
                <Icon size={23} strokeWidth={1.7} />
              </span>
              <span className="routine-text">
                <span className="font-medium">{r.title}</span>
                <span className="text-[13px] text-muted">{r.detail}</span>
              </span>
              <span className="check-circle" aria-hidden="true">
                {done && <Check size={17} />}
              </span>
            </button>
          );
        })}
      </div>
      <p className="encouragement">
        <Heart size={18} />
        {completed === 3
          ? `Todo listo. ¡A disfrutar juntos, ${data.pet.name}!`
          : "Cada cuidado cuenta. Vas muy bien."}
      </p>
    </section>
  );
}

function ReminderCard({
  reminder,
  actions = false,
}: {
  reminder: Reminder;
  actions?: boolean;
}) {
  const { setData, announce } = usePuppy();
  const past = reminder.date < today();
  return (
    <article
      className={`reminder-card ${reminder.done ? "reminder-done" : ""}`}
    >
      <div className="flex items-center gap-3">
        <div className="date-tile">
          <strong>{reminder.date.split("-")[2]}</strong>
          <span>
            {formatDate(reminder.date, { month: "short" }).replace(".", "")}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium capitalize">
            {reminder.done
              ? "Completado"
              : reminder.date === today()
                ? "Hoy"
                : formatDate(reminder.date, {
                    weekday: "long",
                    day: "numeric",
                  })}
          </p>
          <p className="mt-1 text-[13px] text-muted">
            {formatTime(reminder.time)}
          </p>
          {past && !reminder.done && (
            <span className="overdue">Fecha pasada</span>
          )}
        </div>
      </div>
      <h3>{reminder.title}</h3>
      {reminder.notes && <p className="reminder-notes">{reminder.notes}</p>}
      {actions && (
        <div className="reminder-actions">
          <button
            className="button button-text"
            onClick={() => {
              setData((prev) => ({
                ...prev,
                reminders: prev.reminders.map((r) =>
                  r.id === reminder.id ? { ...r, done: !r.done } : r,
                ),
              }));
              announce(
                reminder.done
                  ? "Recordatorio pendiente."
                  : "Recordatorio completado.",
              );
            }}
          >
            {reminder.done ? <Plus size={17} /> : <CheckCheck size={17} />}
            {reminder.done ? "Reabrir" : "Completar"}
          </button>
          <button
            className="icon-button text-accent-strong"
            aria-label={`Eliminar ${reminder.title}`}
            onClick={() => {
              setData((prev) => ({
                ...prev,
                reminders: prev.reminders.filter((r) => r.id !== reminder.id),
              }));
              announce("Recordatorio eliminado.");
            }}
          >
            <Trash2 size={18} />
          </button>
        </div>
      )}
    </article>
  );
}

function ReminderForm({ onClose }: { onClose: () => void }) {
  const { data, setData, announce } = usePuppy();
  const titleRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  useEffect(() => titleRef.current?.focus(), []);
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const title = String(f.get("title") ?? "").trim();
    if (!title) {
      setError("Escribe un nombre para el recordatorio.");
      titleRef.current?.focus();
      return;
    }
    if (data.reminders.length >= 500) {
      setError(
        "Has llegado a 500 recordatorios. Elimina uno para añadir otro.",
      );
      return;
    }
    const reminder: Reminder = {
      id: crypto.randomUUID(),
      title,
      date: String(f.get("date")),
      time: String(f.get("time")),
      notes: String(f.get("notes") ?? "").trim(),
      done: false,
    };
    setData((prev) => ({ ...prev, reminders: [...prev.reminders, reminder] }));
    announce("Recordatorio guardado. Un pendiente menos en tu cabeza.");
    onClose();
  }
  return (
    <form
      className="reminder-form"
      onSubmit={submit}
      aria-label="Nuevo recordatorio"
    >
      <div className="flex items-center justify-between">
        <h3>Un cuidado por recordar</h3>
        <button
          type="button"
          className="icon-button"
          onClick={onClose}
          aria-label="Cerrar formulario"
        >
          <X size={20} />
        </button>
      </div>
      <label>
        ¿Qué quieres recordar?
        <input
          ref={titleRef}
          name="title"
          required
          maxLength={80}
          placeholder="Por ejemplo: comprar su alimento"
          aria-describedby={error ? "reminder-error" : undefined}
        />
      </label>
      <div className="form-grid">
        <label>
          Fecha
          <input name="date" type="date" required defaultValue={dateAfter(1)} />
        </label>
        <label>
          Hora
          <input name="time" type="time" required defaultValue="09:00" />
        </label>
      </div>
      <label>
        Una nota <span className="font-normal text-muted">(opcional)</span>
        <textarea
          name="notes"
          maxLength={200}
          rows={2}
          placeholder="Los detalles que no quieres olvidar"
        />
      </label>
      {error && (
        <p className="form-error" id="reminder-error" role="alert">
          {error}
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <button className="button button-accent" type="submit">
          Guardar recordatorio
          <Check size={18} />
        </button>
        <button className="button button-text" type="button" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

function AddReminder({ wide = false }: { wide?: boolean }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { ready } = usePuppy();
  function close() {
    setOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  }
  return (
    <div className={wide ? "add-reminder-wide" : ""}>
      {open ? (
        <ReminderForm onClose={close} />
      ) : (
        <button
          ref={buttonRef}
          disabled={!ready}
          className={`button button-accent ${wide ? "" : "w-full"}`}
          onClick={() => setOpen(true)}
        >
          <Plus size={20} />
          Nuevo recordatorio
        </button>
      )}
    </div>
  );
}

function AgendaPreview() {
  const { data } = usePuppy();
  const next = [...data.reminders]
    .filter((r) => !r.done)
    .sort((a, b) =>
      `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`),
    )[0];
  return (
    <section aria-labelledby="agenda-preview-title">
      <div className="section-heading">
        <h2 id="agenda-preview-title">En su agenda</h2>
        <Link
          className="section-link"
          href="/agenda"
          aria-label="Ver toda la agenda"
        >
          <ArrowUpRight size={20} />
        </Link>
      </div>
      <div className="space-y-[18px]">
        {next ? (
          <ReminderCard reminder={next} />
        ) : (
          <div className="empty-state compact">
            <CalendarDays size={30} />
            <h3>Todo al día</h3>
            <p>Añade su próximo cuidado para tenerlo presente.</p>
          </div>
        )}
        <AddReminder />
      </div>
    </section>
  );
}

export function AgendaView() {
  const { data } = usePuppy();
  const [filter, setFilter] = useState("pending");
  const shown = data.reminders
    .filter((r) => filter === "all" || (filter === "done" ? r.done : !r.done))
    .sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
  return (
    <>
      <PageHeading
        title="Su agenda, sin olvidos"
        description="Un recordatorio a tiempo también es una forma de cariño."
      />
      <div className="agenda-toolbar">
        <div className="filter-tabs" aria-label="Filtrar recordatorios">
          {[
            ["pending", "Pendientes"],
            ["done", "Completados"],
            ["all", "Todos"],
          ].map(([id, label]) => (
            <button
              key={id}
              className={filter === id ? "active" : ""}
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="agenda-layout">
        <section aria-label="Recordatorios" className="agenda-list">
          {shown.length ? (
            shown.map((r) => <ReminderCard key={r.id} reminder={r} actions />)
          ) : (
            <div className="empty-state">
              <CalendarDays size={36} />
              <h2>
                {filter === "done"
                  ? "Cada cuidado tendrá su lugar"
                  : "Una agenda con espacio para más"}
              </h2>
              <p>
                {filter === "done"
                  ? "Los recordatorios que completes aparecerán aquí."
                  : "No hay recordatorios en esta vista. Añade el siguiente cuidado."}
              </p>
            </div>
          )}
        </section>
        <aside className="agenda-add">
          <h2>Que no se te escape</h2>
          <p className="text-muted text-sm leading-relaxed">
            Una cita, una compra o ese plan para pasar más tiempo juntos.
          </p>
          <AddReminder />
          <div className="local-note">
            <Heart size={19} />
            <p>
              Tu agenda vive en este navegador. No envía avisos ni se sincroniza
              entre dispositivos.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

export function PetView() {
  const { data, setData, ready, announce } = usePuppy();
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  function save(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const pet: Pet = {
      name: String(f.get("name")).trim(),
      breed: String(f.get("breed")).trim(),
      birthday: String(f.get("birthday")),
      favorite: String(f.get("favorite")).trim(),
    };
    if (!pet.name) {
      setError("Tu compañero necesita un nombre.");
      return;
    }
    if (pet.birthday > today()) {
      setError("La fecha de nacimiento no puede estar en el futuro.");
      return;
    }
    setData((prev) => ({ ...prev, pet }));
    setEditing(false);
    setError("");
    announce("Perfil actualizado. Cada detalle habla de su historia.");
  }
  return (
    <>
      <PageHeading
        title={`El mundo de ${data.pet.name}`}
        description="Su historia, sus favoritos y todo eso que lo hace único."
      />
      <section className="pet-layout">
        <div className="pet-portrait">
          <DogArtwork />
          <h2>{data.pet.name}</h2>
          <span>Tu compañero de aventuras</span>
        </div>
        <div className="pet-details">
          <div className="section-heading">
            <h2>Un poquito sobre él</h2>
            {!editing && (
              <button
                className="button button-text"
                disabled={!ready}
                onClick={() => setEditing(true)}
              >
                Editar perfil
                <ChevronRight size={18} />
              </button>
            )}
          </div>
          {editing ? (
            <form onSubmit={save} className="profile-form">
              <label>
                Nombre
                <input
                  name="name"
                  maxLength={30}
                  required
                  defaultValue={data.pet.name}
                  autoFocus
                />
              </label>
              <label>
                Raza o mezcla
                <input
                  name="breed"
                  maxLength={60}
                  defaultValue={data.pet.breed}
                />
              </label>
              <label>
                Fecha de nacimiento
                <input
                  name="birthday"
                  type="date"
                  required
                  max={today()}
                  defaultValue={data.pet.birthday}
                />
              </label>
              <label>
                Lo que más le gusta
                <input
                  name="favorite"
                  maxLength={120}
                  defaultValue={data.pet.favorite}
                />
              </label>
              {error && (
                <p role="alert" className="form-error">
                  {error}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="button button-dark">
                  Guardar perfil
                  <Check size={18} />
                </button>
                <button
                  className="button button-text"
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setError("");
                  }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <dl className="pet-facts">
              <div>
                <dt>Nombre</dt>
                <dd>{data.pet.name}</dd>
              </div>
              <div>
                <dt>Raza o mezcla</dt>
                <dd>{data.pet.breed || "Por descubrir"}</dd>
              </div>
              <div>
                <dt>Su cumpleaños</dt>
                <dd>
                  {formatDate(data.pet.birthday, {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </dd>
              </div>
              <div>
                <dt>Lo que más le gusta</dt>
                <dd>
                  {data.pet.favorite || "Todavía estás escribiendo su historia"}
                </dd>
              </div>
            </dl>
          )}
          <p className="example-note">
            Este perfil empieza con datos de ejemplo. Puedes personalizarlo.
          </p>
        </div>
      </section>
      <div className="pet-routines">
        <RoutineList />
      </div>
    </>
  );
}

const brandColors = [
  {
    name: "Primary Color",
    hex: "#66DDE3",
    css: "bg-primary",
    description:
      "El turquesa del fondo original. Da vida a la bienvenida y a las superficies de marca.",
    color: "var(--color-primary)",
    ink: "var(--color-ink)",
  },
  {
    name: "Dark Primary Color",
    hex: "#087F8C",
    css: "bg-primary-dark",
    description:
      "Variante oscura derivada del turquesa. Se usa en navegación, iconos y estados activos.",
    color: "var(--color-primary-dark)",
    ink: "#FFFFFF",
  },
  {
    name: "Accent Color",
    hex: "#E83B35",
    css: "bg-accent",
    description:
      "El coral del collar y los accesorios. Aporta énfasis a pequeños detalles y acciones.",
    color: "var(--color-accent)",
    ink: "var(--color-ink)",
  },
];

export function BrandView() {
  const { announce } = usePuppy();
  async function copyColor(hex: string) {
    try {
      await navigator.clipboard.writeText(hex);
      announce(`${hex} copiado al portapapeles.`);
    } catch {
      announce(`No se pudo copiar. Selecciona y copia el código ${hex}.`);
    }
  }
  return (
    <>
      <PageHeading
        title="Una identidad que cuida"
        description="Los colores de Puppy, llevados a una experiencia Material Design."
      />
      <section className="brand-intro">
        <div>
          <h2>
            Cercana por naturaleza.
            <br />
            Clara en cada detalle.
          </h2>
          <p>
            El turquesa aporta energía, el marrón del trazo nos da carácter y un
            toque de coral pone el cariño. Una misma identidad, de la marca a
            cada interacción.
          </p>
          <a
            href="/assets/puppy-original.png"
            download
            className="button button-dark"
          >
            <ArrowDownToLine size={18} />
            Descargar referencia
          </a>
        </div>
        <figure>
          <img
            src="/assets/puppy-original.png"
            width="507"
            height="507"
            alt="Logotipo original Puppy, perro sobre fondo turquesa, con collar rojo y atribución a Freepik"
          />
          <figcaption>
            Logotipo proporcionado · diseñado por{" "}
            <a href="https://www.freepik.com/" target="_blank" rel="noreferrer">
              Freepik
            </a>
          </figcaption>
        </figure>
      </section>
      <section aria-label="Paleta corporativa" className="palette-grid">
        {brandColors.map((c) => (
          <article className="color-card" key={c.hex}>
            <div
              className="color-swatch"
              style={{ backgroundColor: c.color, color: c.ink }}
            >
              <strong>{c.hex}</strong>
              <button
                className="icon-button"
                onClick={() => copyColor(c.hex)}
                aria-label={`Copiar ${c.hex}`}
              >
                <Copy size={20} />
              </button>
            </div>
            <h2>{c.name}</h2>
            <code>{c.css}</code>
            <p>{c.description}</p>
          </article>
        ))}
      </section>
      <section className="brand-accessibility">
        <div className="flex items-center gap-3">
          <CheckCheck size={23} />
          <h2>Una marca que también se puede leer</h2>
        </div>
        <p>
          El marrón <code>#3C2F33</code> acompaña al turquesa en los textos.
          Para botones con texto blanco, el coral usa una variante más oscura{" "}
          <code>#BA2B27</code> que mejora el contraste. Dark Primary es un tono
          propuesto: no aparece literalmente en la imagen original.
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            className="button button-outlined"
            href="/design/puppy-desktop.png"
            download
          >
            <ArrowDownToLine size={18} />
            Diseño de Pen
          </a>
          <a
            className="button button-text"
            href="/design/puppy-palette.png"
            download
          >
            Ver la paleta
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
    </>
  );
}

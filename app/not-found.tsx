import Link from "next/link";

export default function NotFound() {
  return (
    <section className="empty-state">
      <h1>Por aquí no hay huellitas.</h1>
      <p>Esta página no existe. Volvamos a los cuidados de hoy.</p>
      <Link className="button button-dark" href="/">
        Volver a Mi día
      </Link>
    </section>
  );
}

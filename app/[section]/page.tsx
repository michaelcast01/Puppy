import { notFound } from "next/navigation";
import { AgendaView, BrandView, PetView } from "@/components/puppy-app";

export function generateStaticParams() {
  return [
    { section: "mascota" },
    { section: "agenda" },
    { section: "identidad" },
  ];
}

export default async function Section({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (section === "mascota") return <PetView />;
  if (section === "agenda") return <AgendaView />;
  if (section === "identidad") return <BrandView />;
  notFound();
}

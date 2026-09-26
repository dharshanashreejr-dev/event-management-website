import { createFileRoute } from "@tanstack/react-router";
import { Experience } from "@/components/bala/Experience";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <Experience />;
}

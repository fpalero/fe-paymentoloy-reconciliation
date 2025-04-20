import type { Route } from "./+types/home";
import { Reconciliation } from "../reconciliation/reconciliation";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Reconciliation" },
    { name: "description", content: "Calculate the reconciliation between 2 files" },
  ];
}

export default function Home() {
   return <Reconciliation />;
}

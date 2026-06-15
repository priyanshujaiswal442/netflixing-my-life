import { Header } from "@/components/layout/header";
import { CreatePage } from "./create-client";

export const metadata = {
  title: "Create Your Series",
  description:
    "Answer a few questions and we'll transform your life into a Netflix Original.",
};

export default function Create() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <CreatePage />
    </main>
  );
}

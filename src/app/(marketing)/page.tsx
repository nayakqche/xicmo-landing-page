import { Hero } from "@/frontend/components/marketing/hero";
import { AgentGrid } from "@/frontend/components/marketing/agent-grid";
import { CostTable } from "@/frontend/components/marketing/cost-table";
import { Faq } from "@/frontend/components/marketing/faq";
import { Cta } from "@/frontend/components/marketing/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AgentGrid />
      <CostTable />
      <Faq />
      <Cta />
    </>
  );
}

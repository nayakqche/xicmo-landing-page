import { AGENTS } from "@/frontend/data/marketing-data";
import { SITE_NAME } from "@/shared/site";
import { cn } from "@/shared/utils";

/**
 * Grid of the agents that are LIVE in the product today. Each card uses the
 * same brand mark the app sidebar uses, so the marketing page mirrors what a
 * user actually sees after signing up — no vapourware.
 */
export function AgentGrid() {
  return (
    <section id="agents" className="parallax-section py-24 md:py-32">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-primary">
            Your AI marketing team
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Every channel that matters,
            <br />
            <span className="text-muted-foreground">already wired in.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Twelve live agents and integrations. You stay in control —{" "}
            {SITE_NAME} does the heavy lifting.
          </p>
        </div>

        <div className="agent-card-grid grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.id}
                className="agent-card group relative block h-full w-full p-2 transition-opacity duration-300"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 block h-full w-full rounded-3xl bg-primary/10 opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:bg-primary/20"
                />
                <article className="relative z-20 h-full overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-background group-hover:shadow-xl group-hover:shadow-primary/10">
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-40 transition-opacity duration-300 group-hover:opacity-100",
                    agent.accent
                  )}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.16),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[280%] dark:via-white/10"
                />
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background/90 shadow-sm ring-1 ring-border transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-[1.375rem] w-[1.375rem]" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[0.625rem] font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    Live
                  </span>
                </div>
                <h3 className="text-base font-semibold">{agent.name}</h3>
                <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                  {agent.tagline}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {agent.description}
                </p>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

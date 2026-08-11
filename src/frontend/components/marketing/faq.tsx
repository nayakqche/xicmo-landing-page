import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/frontend/components/ui/accordion";
import { FAQS } from "@/frontend/data/marketing-data";

export function Faq() {
  return (
    <section className="parallax-section bg-muted/20 py-24 md:py-32">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-primary">
            Got questions?
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-2 shadow-sm">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((item, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="px-4 last:border-b-0"
              >
                <AccordionTrigger className="text-left text-base no-underline hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 pr-6 text-sm leading-relaxed transition-all duration-300 ease-out">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

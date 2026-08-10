"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Copy, Sparkles } from "lucide-react";
import { Button } from "@/frontend/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/frontend/components/ui/dropdown-menu";
import { SITE_DOMAIN, SITE_NAME } from "@/shared/site";

/**
 * "Ask AI about this page" — opens the current page in the user's favourite
 * LLM with a pre-filled summarize prompt. ChatGPT, Claude, Perplexity and
 * Grok support a `q`/query URL param; Gemini and DeepSeek don't, so for
 * those we copy the prompt to the clipboard and open the site — the user
 * just pastes.
 */
type Target = {
  id: string;
  label: string;
  /** Builds a prefilled URL, or null when the provider has no query param. */
  url: (prompt: string) => string | null;
  /** Where to send the user when url() is null (copy-paste flow). */
  home?: string;
};

const TARGETS: Target[] = [
  {
    id: "chatgpt",
    label: "ChatGPT",
    url: (p) => `https://chatgpt.com/?q=${encodeURIComponent(p)}`,
  },
  {
    id: "claude",
    label: "Claude",
    url: (p) => `https://claude.ai/new?q=${encodeURIComponent(p)}`,
  },
  {
    id: "perplexity",
    label: "Perplexity",
    url: (p) => `https://www.perplexity.ai/search?q=${encodeURIComponent(p)}`,
  },
  {
    id: "grok",
    label: "Grok",
    url: (p) => `https://grok.com/?q=${encodeURIComponent(p)}`,
  },
  {
    id: "gemini",
    label: "Gemini",
    url: () => null,
    home: "https://gemini.google.com/app",
  },
  {
    id: "deepseek",
    label: "DeepSeek",
    url: () => null,
    home: "https://chat.deepseek.com/",
  },
];

export function OpenInLlm() {
  const pathname = usePathname() ?? "/";
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const prompt =
    `Summarize this page for me: https://${SITE_DOMAIN}${pathname} — ` +
    `what is ${SITE_NAME}, which AI marketing agents does it include, and what does it cost?`;

  async function open(t: Target) {
    const url = t.url(prompt);
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    // No query-param support: copy the prompt, then open the chat home.
    try {
      await navigator.clipboard.writeText(prompt);
      setCopiedId(t.id);
      setTimeout(() => setCopiedId(null), 2500);
    } catch {
      /* clipboard blocked — the site still opens, user can retype */
    }
    if (t.home) window.open(t.home, "_blank", "noopener,noreferrer");
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hidden gap-1.5 border-primary/30 bg-primary/5 text-xs text-primary hover:bg-primary/10 hover:text-primary sm:inline-flex"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Ask AI
          <ChevronDown className="h-3 w-3 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Get a summary of this page in…
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {TARGETS.map((t) => {
          const needsPaste = t.url(prompt) === null;
          const copied = copiedId === t.id;
          return (
            <DropdownMenuItem
              key={t.id}
              onClick={() => void open(t)}
              className="flex items-center justify-between gap-2 text-sm"
            >
              <span>{t.label}</span>
              {copied ? (
                <span className="inline-flex items-center gap-1 text-[0.625rem] text-emerald-500">
                  <Check className="h-3 w-3" />
                  Prompt copied
                </span>
              ) : needsPaste ? (
                <span
                  className="inline-flex items-center gap-1 text-[0.625rem] text-muted-foreground"
                  title="This provider has no prefill URL — we copy the prompt, you paste it"
                >
                  <Copy className="h-3 w-3" />
                  copies prompt
                </span>
              ) : null}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

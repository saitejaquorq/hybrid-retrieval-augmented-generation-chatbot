// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Textarea, Label, Badge, Empty } = UI;

// ─── Notebook Margin · Chat ────────────────────────────────────────────────
// Grounded answers read as a runnable record: every turn carries a gutter
// prompt, every answer carries its source block.

const INDEX_STATUS = {
  files_total: 1284,
  files_failed: 3,
  last_run_id: "run_0f31",
  completed_at: "24 Oct, 09:12",
};

const CORPUS = [
  {
    keywords: ["churn", "customer_id", "tenure", "label", "column", "dataset", "monthly_charges"],
    answer:
      "churn_2025.csv carries 14 columns at one row per customer_id. churn_flag is the label; tenure_months, monthly_charges and contract_type are the drivers named in the dictionary. region_code is documented as 2024-only.",
    citations: [
      { chunk_id: "ch_8821", filename: "churn_2025.csv", location: "s3://ds-docs/datasets/", range: "chunks 3–5" },
      { chunk_id: "ch_1043", filename: "feature_dictionary.md", location: "s3://ds-docs/docs/", range: "chunk 12" },
    ],
  },
  {
    keywords: ["drift", "psi", "retrain", "alert", "escalat", "on-call", "oncall", "monitor", "runbook"],
    answer:
      "Runbook 4.2: when PSI crosses 0.25 on two consecutive daily windows, page the ds-primary rota, freeze the scoring job and open a drift ticket inside 30 minutes. Retraining is signed off by the model owner, never by the on-call.",
    citations: [
      { chunk_id: "ch_2207", filename: "model_drift_runbook.md", location: "s3://ds-docs/runbooks/", range: "chunks 8–10" },
      { chunk_id: "ch_0094", filename: "oncall_rota.json", location: "s3://ds-docs/ops/", range: "chunk 2" },
    ],
  },
  {
    keywords: ["feature store", "q3", "deprecat", "backfill", "notebook", "parity", "offline store"],
    answer:
      "The Q3 notes deprecate six feature-store entries — all of the v1 session-window aggregates — and record a nine-day backfill for their replacements. Offline/online parity was re-run on 18 Sep and passed on every key.",
    citations: [
      { chunk_id: "ch_5510", filename: "feature_store_q3.ipynb", location: "s3://ds-docs/notebooks/", range: "chunks 14–16" },
      { chunk_id: "ch_5610", filename: "q3_feature_changelog.md", location: "s3://ds-docs/docs/", range: "chunk 4" },
    ],
  },
  {
    keywords: ["retention", "cohort", "active", "mau", "month-6", "renewal"],
    answer:
      "retention_cohorts_2025.json reports month-6 retention of 61.4% across the Jan–Jun cohorts, 2.1 points below 2024. The file keeps cohort_month, cohort_size and retained_m1 through retained_m12 as plain fields.",
    citations: [
      { chunk_id: "ch_7730", filename: "retention_cohorts_2025.json", location: "s3://ds-docs/metrics/", range: "chunks 1–2" },
    ],
  },
  {
    keywords: ["bedrock", "titan", "embedding", "chunking", "region", "pipeline", "vector"],
    answer:
      "The infra note pins generation to Bedrock in us-east-1 and embeddings to amazon.titan-embed-text-v2 at 1,024 dimensions. Chunking is 800 tokens with 120 tokens of overlap, and lexical hits are merged with vector hits before re-ranking.",
    citations: [
      { chunk_id: "ch_0012", filename: "bedrock_config.json", location: "s3://ds-docs/infra/", range: "chunk 1" },
      { chunk_id: "ch_0338", filename: "indexing_pipeline.md", location: "s3://ds-docs/docs/", range: "chunks 6–7" },
    ],
  },
  {
    keywords: ["pricing", "experiment", "uplift", "a/b", "readout", "trial", "price"],
    answer:
      "The September readout finds a 3.2% uplift in trial-to-paid on the mid tier, significant at p = 0.03, with no measurable effect on enterprise. The team recommends holding the enterprise price flat into Q4.",
    citations: [
      { chunk_id: "ch_9142", filename: "pricing_experiment_readout.pdf", location: "s3://ds-docs/experiments/", range: "chunks 11–13" },
    ],
  },
];

const SEED_CONVERSATIONS = [
  {
    id: "conv_1",
    title: "Churn dataset columns",
    when: "2:14 PM",
    started: "27 Oct 2026, 2:14 PM",
    turns: [
      {
        id: "m_101",
        askedAt: "2:14 PM",
        question: "Which columns are in the churn dataset?",
        carries: null,
        wf: { q: "i-1-0-0", a: "i-1-0-1", s: "i-1-0-2" },
        answer: {
          status: "answered",
          at: "2:14 PM",
          content:
            "The churn dataset holds 14 columns: customer_id, tenure_months, monthly_charges, churn_flag. The remaining ten are listed in the feature dictionary under the retention namespace.",
          retrieval: { keyword: 7, vector: 12, used: 4 },
          citations: [
            { chunk_id: "ch_8821", filename: "churn_2025.csv", location: "s3://ds-docs/datasets/", range: "chunks 3–5" },
            { chunk_id: "ch_1043", filename: "feature_dictionary.md", location: "s3://ds-docs/docs/", range: "chunk 12" },
          ],
        },
      },
      {
        id: "m_103",
        askedAt: "2:16 PM",
        question: "What about the 2024 version?",
        carries: 1,
        wf: { q: "i-1-0-3", a: "i-1-0-4", s: "i-1-0-5" },
        answer: {
          status: "answered",
          at: "2:16 PM",
          content:
            "The 2024 extract uses the same columns and adds region_code. Nothing else differs — the grain and the churn_flag definition are unchanged.",
          retrieval: { keyword: 5, vector: 9, used: 3 },
          citations: [
            { chunk_id: "ch_8640", filename: "churn_2024.csv", location: "s3://ds-docs/datasets/", range: "chunks 2–4" },
          ],
        },
      },
      {
        id: "m_105",
        askedAt: "2:19 PM",
        question: "Do we track refund volume?",
        carries: 2,
        wf: { q: "i-1-0-6", a: "i-1-0-7", s: null },
        answer: {
          status: "nomatch",
          at: "2:19 PM",
          content: "I could not find relevant information in the indexed documents.",
          retrieval: { keyword: 6, vector: 11, used: 0 },
          citations: [],
        },
      },
    ],
  },
  {
    id: "conv_2",
    title: "Model drift runbook",
    when: "Yesterday",
    started: "26 Oct 2026, 9:02 AM",
    turns: [
      {
        id: "m_201",
        askedAt: "9:02 AM",
        question: "What is the escalation path when PSI crosses 0.25?",
        carries: null,
        wf: { q: null, a: null, s: null },
        answer: {
          status: "answered",
          at: "9:02 AM",
          content:
            "Runbook 4.2: page the ds-primary rota, freeze the scoring job and open a drift ticket inside 30 minutes. Retraining is signed off by the model owner, never by the on-call engineer.",
          retrieval: { keyword: 8, vector: 10, used: 4 },
          citations: [
            { chunk_id: "ch_2207", filename: "model_drift_runbook.md", location: "s3://ds-docs/runbooks/", range: "chunks 8–10" },
            { chunk_id: "ch_0094", filename: "oncall_rota.json", location: "s3://ds-docs/ops/", range: "chunk 2" },
          ],
        },
      },
      {
        id: "m_203",
        askedAt: "9:05 AM",
        question: "And if it is the propensity model specifically?",
        carries: 1,
        wf: { q: null, a: null, s: null },
        answer: {
          status: "error",
          at: "9:05 AM",
          content:
            "The answer could not be generated. Bedrock returned AccessDeniedException for anthropic.claude-3-5-sonnet in us-east-1 — model access is not enabled for this account. Four chunks were retrieved and held rather than answered from, so nothing ungrounded was shown.",
          retrieval: { keyword: 9, vector: 13, used: 0 },
          citations: [],
        },
      },
    ],
  },
  {
    id: "conv_3",
    title: "Q3 feature store notes",
    when: "24 Oct",
    started: "24 Oct 2026, 11:48 AM",
    turns: [
      {
        id: "m_301",
        askedAt: "11:48 AM",
        question: "Which features did we deprecate in Q3?",
        carries: null,
        wf: { q: null, a: null, s: null },
        answer: {
          status: "answered",
          at: "11:48 AM",
          content:
            "Six entries were deprecated, all of them v1 session-window aggregates. The changelog pairs each one with its replacement and the nine-day backfill that filled the gap.",
          retrieval: { keyword: 6, vector: 14, used: 5 },
          citations: [
            { chunk_id: "ch_5510", filename: "feature_store_q3.ipynb", location: "s3://ds-docs/notebooks/", range: "chunks 14–16" },
            { chunk_id: "ch_5610", filename: "q3_feature_changelog.md", location: "s3://ds-docs/docs/", range: "chunk 4" },
          ],
        },
      },
      {
        id: "m_303",
        askedAt: "11:52 AM",
        question: "Did the backfill finish before the October freeze?",
        carries: 1,
        wf: { q: null, a: null, s: null },
        answer: {
          status: "answered",
          at: "11:52 AM",
          content:
            "Yes. The backfill completed on 9 Oct, five days before the change freeze. The notebook's final cell logs 412M rows written to the offline store with zero rejected keys.",
          retrieval: { keyword: 4, vector: 11, used: 3 },
          citations: [
            { chunk_id: "ch_5533", filename: "feature_store_q3.ipynb", location: "s3://ds-docs/notebooks/", range: "chunk 31" },
            { chunk_id: "ch_4401", filename: "release_calendar.md", location: "s3://ds-docs/docs/", range: "chunk 2" },
          ],
        },
      },
    ],
  },
];

const MAX_QUESTION = 500;

function clockTime(d) {
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return h + ":" + m + " " + ap;
}

function buildAnswer(question, at) {
  const text = question.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const doc of CORPUS) {
    let score = 0;
    for (const k of doc.keywords) if (text.includes(k)) score += 1;
    if (score > bestScore) {
      bestScore = score;
      best = doc;
    }
  }
  if (!best) {
    return {
      status: "nomatch",
      at,
      content: "Nothing in the index supports this. Try naming the dataset, the runbook or the team that owns it.",
      retrieval: { keyword: 5 + (question.length % 4), vector: 9, used: 0 },
      citations: [],
    };
  }
  return {
    status: "answered",
    at,
    content: best.answer,
    retrieval: { keyword: 3 + bestScore * 2, vector: 8 + bestScore, used: best.citations.length * 2 },
    citations: best.citations,
  };
}

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const neutral = brand.neutralColor;
  const accent = brand.accentColor;
  const paper = brand.backgroundColor;
  const radius = brand.radius;
  const mono = brand.fontHeading + ", ui-monospace, SFMono-Regular, Menlo, monospace";
  const serif = brand.fontBody + ", Iowan Old Style, Georgia, serif";
  const hairline = "rgba(26,26,26,0.13)";
  const tint = "rgba(26,26,26,0.028)";
  const warm = "rgba(26,26,26,0.015)";
  const accentSoft = "rgba(0,163,108,0.10)";
  const rust = "#8a3b12";
  const rustSoft = "rgba(138,59,18,0.09)";

  const [conversations, setConversations] = React.useState(SEED_CONVERSATIONS);
  const [activeId, setActiveId] = React.useState("conv_1");
  const [draft, setDraft] = React.useState("");
  const [pending, setPending] = React.useState(null);
  const [formError, setFormError] = React.useState(null);
  const inputRef = React.useRef(null);
  const newConvCount = React.useRef(0);

  const active = conversations.find((c) => c.id === activeId) || conversations[0];

  React.useEffect(() => {
    if (!pending) return undefined;
    const timer = setTimeout(() => {
      setConversations((prev) =>
        prev.map((c) =>
          c.id !== pending.convId
            ? c
            : {
                ...c,
                turns: c.turns.map((t) =>
                  t.id !== pending.turnId ? t : { ...t, answer: buildAnswer(t.question, pending.at) }
                ),
              }
        )
      );
      setPending(null);
    }, 1400);
    return () => clearTimeout(timer);
  }, [pending]);

  function startConversation() {
    newConvCount.current += 1;
    const id = "conv_new_" + newConvCount.current;
    const now = new Date();
    setConversations((prev) => [
      { id, title: "Untitled conversation", when: "Just now", started: "27 Oct 2026, " + clockTime(now), turns: [] },
      ...prev,
    ]);
    setActiveId(id);
    setDraft("");
    setFormError(null);
    if (inputRef.current) inputRef.current.focus();
  }

  function submit(event) {
    if (event) event.preventDefault();
    const question = draft.trim();
    if (!question || pending) return;
    if (question.length > MAX_QUESTION) {
      setFormError(
        "That question is " + question.length + " characters — the limit is " + MAX_QUESTION +
        ". Trim it and ask again; your text is still here."
      );
      return;
    }
    setFormError(null);
    const now = new Date();
    const at = clockTime(now);
    const turnId = "m_" + Date.now();
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== active.id) return c;
        const turnNo = c.turns.length + 1;
        return {
          ...c,
          when: "Just now",
          title: c.turns.length === 0 ? (question.length > 44 ? question.slice(0, 44).trim() + "…" : question) : c.title,
          turns: [
            ...c.turns,
            {
              id: turnId,
              askedAt: at,
              question,
              carries: turnNo > 1 ? turnNo - 1 : null,
              wf: { q: null, a: null, s: null },
              answer: null,
            },
          ],
        };
      })
    );
    setDraft("");
    setPending({ convId: active.id, turnId, at });
  }

  const nextPrompt = active.turns.length + 1;
  const canSend = draft.trim().length > 0 && !pending;

  const label = { fontFamily: mono, fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase" };

  function Gutter({ kind, n, tone }) {
    return (
      <div className="sm:text-right select-none pt-[3px]">
        <span
          style={{ fontFamily: mono, fontSize: "12px", color: tone, fontVariantNumeric: "tabular-nums" }}
        >
          {kind} [{n}]
        </span>
      </div>
    );
  }

  function Sources({ citations, wf }) {
    return (
      <div
        data-wf={wf || undefined}
        className="mt-4 px-4 py-3 border"
        style={{ borderColor: hairline, background: tint, borderRadius: radius }}
      >
        <p style={{ ...label, color: neutral }}>
          Sources · {citations.length} {citations.length === 1 ? "file" : "files"}
        </p>
        <ul className="mt-2 space-y-1.5">
          {citations.map((c) => (
            <li
              key={c.chunk_id}
              className="grid gap-x-4 sm:grid-cols-[13rem_minmax(0,1fr)_auto]"
              style={{ fontFamily: mono, fontSize: "12.5px", fontVariantNumeric: "tabular-nums" }}
            >
              <span style={{ color: ink }} className="truncate">{c.filename}</span>
              <span style={{ color: neutral }} className="truncate">{c.location}</span>
              <span style={{ color: neutral }}>{c.range}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      className="nm-root w-full"
      style={{ background: paper, color: ink, fontFamily: serif, "--nm-accent": accent, "--nm-radius": radius }}
    >
      <style>{`
        .nm-root :focus-visible { outline: 2px solid var(--nm-accent); outline-offset: 2px; border-radius: var(--nm-radius); }
        @keyframes nm-rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        @keyframes nm-pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }
        .nm-rise { animation: nm-rise 260ms ease-out both; }
        .nm-pulse { animation: nm-pulse 1.1s ease-in-out infinite; }
        .nm-row { transition: background-color 140ms ease, border-color 140ms ease; }
        @media (prefers-reduced-motion: reduce) {
          .nm-rise, .nm-pulse { animation: none !important; }
          .nm-row { transition: none; }
        }
      `}</style>

      <div className="px-6 sm:px-10 lg:px-12 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-10">
          {/* ── Conversations rail ─────────────────────────────────────── */}
          <nav
            data-wf="b-0-0"
            aria-labelledby="nm-rail-label"
            className="md:col-span-3 md:col-start-1 md:row-start-1 order-2 md:order-none md:border-r md:pr-8"
            style={{ borderColor: hairline }}
          >
            <p id="nm-rail-label" style={{ ...label, color: neutral }}>Conversations</p>

            <button
              type="button"
              data-wf="i-0-0-0"
              onClick={startConversation}
              className="nm-row mt-4 w-full min-h-[44px] flex items-center gap-2 px-3 py-2.5 border text-left"
              style={{ borderColor: hairline, borderRadius: radius, background: paper, color: ink, fontFamily: mono, fontSize: "13px" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = accentSoft; e.currentTarget.style.borderColor = accent; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = paper; e.currentTarget.style.borderColor = hairline; }}
            >
              <Icons.Plus className="w-4 h-4" aria-hidden="true" />
              New conversation
            </button>

            <ul className="mt-4">
              {conversations.map((c, i) => {
                const isActive = c.id === active.id;
                return (
                  <li key={c.id} className={i === 0 ? "" : "border-t"} style={i === 0 ? undefined : { borderColor: hairline }}>
                    <button
                      type="button"
                      data-wf={i < 3 && c.id === SEED_CONVERSATIONS[i] ?.id ? "i-0-0-" + (i + 1) : (["conv_1", "conv_2", "conv_3"].indexOf(c.id) >= 0 ? "i-0-0-" + (["conv_1", "conv_2", "conv_3"].indexOf(c.id) + 1) : undefined)}
                      onClick={() => { setActiveId(c.id); setFormError(null); }}
                      aria-current={isActive ? "true" : undefined}
                      className="nm-row w-full text-left py-3 pl-3 pr-2 min-h-[44px] border-l-2"
                      style={{
                        borderLeftColor: isActive ? accent : "transparent",
                        background: isActive ? accentSoft : "transparent",
                      }}
                      onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = warm; }}
                      onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                    >
                      <span
                        className="block truncate"
                        style={{ fontFamily: serif, fontSize: "15px", color: ink, fontWeight: isActive ? 600 : 400 }}
                      >
                        {c.title}
                      </span>
                      <span
                        className="mt-1 flex items-center gap-2"
                        style={{ fontFamily: mono, fontSize: "11px", color: neutral, fontVariantNumeric: "tabular-nums" }}
                      >
                        <span>{c.when}</span>
                        <span aria-hidden="true">·</span>
                        <span>{c.turns.length === 0 ? "no turns yet" : c.turns.length + (c.turns.length === 1 ? " turn" : " turns")}</span>
                        {isActive ? <span className="sr-only">(open)</span> : null}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* ── Reading column ─────────────────────────────────────────── */}
          <div className="md:col-span-9 md:col-start-4 md:row-start-1 order-1 md:order-none">
            {/* Title */}
            <header data-wf="b-0-1">
              <h1
                className="break-words"
                style={{ fontFamily: mono, fontSize: "28px", lineHeight: 1.25, fontWeight: 600, letterSpacing: "-0.02em", color: ink }}
              >
                {active.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <p style={{ fontFamily: mono, fontSize: "12px", color: neutral, fontVariantNumeric: "tabular-nums" }}>
                  {active.id} · started {active.started} · {active.turns.length}{" "}
                  {active.turns.length === 1 ? "turn" : "turns"}
                </p>
                <span aria-hidden="true" style={{ color: hairline }}>|</span>
                <button
                  type="button"
                  onClick={() => navigate("admin-index")}
                  className="nm-row inline-flex items-center gap-2 min-h-[32px] px-2 -mx-2"
                  style={{ fontFamily: mono, fontSize: "12px", color: neutral, borderRadius: radius, fontVariantNumeric: "tabular-nums" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = accent; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = neutral; }}
                >
                  <Icons.FileText className="w-3.5 h-3.5" aria-hidden="true" />
                  Index: {INDEX_STATUS.files_total.toLocaleString()} files, {INDEX_STATUS.files_failed} skipped · built {INDEX_STATUS.completed_at}
                  <Icons.ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              </div>
            </header>

            <div className="mt-6" style={{ background: hairline, height: "1px" }} />

            {/* Conversation */}
            <section data-wf="b-1-0" aria-live="polite" className="mt-8">
              <h2 style={{ ...label, color: neutral }}>Conversation</h2>

              {active.turns.length === 0 && !pending ? (
                <div className="mt-6 border px-6 py-10" style={{ borderColor: hairline, borderRadius: radius, background: warm }}>
                  <Empty
                    title="Nothing written in this notebook yet"
                    description="Ask about any file in the S3 index — datasets, runbooks, notebooks, readouts. Each answer is written from the chunks it retrieved and lists the files underneath."
                    action={
                      <Button
                        type="button"
                        onClick={() => {
                          setDraft("Which columns are in the churn dataset?");
                          if (inputRef.current) inputRef.current.focus();
                        }}
                        style={{ background: paper, color: ink, border: "1px solid " + hairline, borderRadius: radius, fontFamily: mono, fontSize: "13px" }}
                      >
                        Try: which columns are in the churn dataset?
                      </Button>
                    }
                  />
                </div>
              ) : (
                <ol className="mt-6 space-y-10">
                  {active.turns.map((turn, idx) => {
                    const n = idx + 1;
                    const a = turn.answer;
                    const isPending = !a;
                    const tone =
                      !a ? neutral : a.status === "error" ? rust : a.status === "nomatch" ? rust : accent;
                    return (
                      <li key={turn.id} className="nm-rise">
                        {/* Question */}
                        <div data-wf={turn.wf.q || undefined} className="grid gap-x-4 sm:grid-cols-[4rem_minmax(0,1fr)]">
                          <Gutter kind="In" n={n} tone={neutral} />
                          <div className="max-w-[68ch]">
                            <p className="flex items-center gap-2" style={{ fontFamily: mono, fontSize: "11px", color: neutral, fontVariantNumeric: "tabular-nums" }}>
                              <Icons.User className="w-3.5 h-3.5" aria-hidden="true" />
                              <span>You · {turn.askedAt}</span>
                            </p>
                            <p className="mt-2" style={{ fontSize: "17px", lineHeight: 1.6, color: ink }}>
                              {turn.question}
                            </p>
                            {turn.carries ? (
                              <p className="mt-2" style={{ fontFamily: mono, fontSize: "11px", color: neutral, fontVariantNumeric: "tabular-nums" }}>
                                carries context from In [{turn.carries}]
                              </p>
                            ) : null}
                          </div>
                        </div>

                        {/* Answer */}
                        <div
                          data-wf={turn.wf.a || undefined}
                          className="mt-5 grid gap-x-4 sm:grid-cols-[4rem_minmax(0,1fr)]"
                        >
                          <Gutter kind="Out" n={n} tone={tone} />
                          <div className="max-w-[68ch]">
                            {isPending ? (
                              <div>
                                <p style={{ fontFamily: mono, fontSize: "11px", color: neutral }}>
                                  Assistant · working
                                </p>
                                <p
                                  className="nm-pulse mt-2"
                                  style={{ fontFamily: mono, fontSize: "13.5px", color: neutral, fontVariantNumeric: "tabular-nums" }}
                                >
                                  hybrid retrieval over {INDEX_STATUS.files_total.toLocaleString()} indexed files — keyword + Titan vectors, then Bedrock…
                                </p>
                                <div className="mt-4 h-px w-40" style={{ background: hairline }} />
                              </div>
                            ) : (
                              <div>
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                  <p style={{ fontFamily: mono, fontSize: "11px", color: neutral, fontVariantNumeric: "tabular-nums" }}>
                                    Assistant · {a.at}
                                  </p>
                                  {a.status === "nomatch" ? (
                                    <Badge
                                      style={{ background: rustSoft, color: rust, borderRadius: radius, fontFamily: mono, fontSize: "10.5px", letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid " + rustSoft }}
                                    >
                                      No match
                                    </Badge>
                                  ) : null}
                                  {a.status === "error" ? (
                                    <Badge
                                      style={{ background: rustSoft, color: rust, borderRadius: radius, fontFamily: mono, fontSize: "10.5px", letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid " + rustSoft }}
                                    >
                                      Not generated
                                    </Badge>
                                  ) : null}
                                </div>

                                <p
                                  className="mt-2"
                                  style={{
                                    fontSize: "17px",
                                    lineHeight: 1.65,
                                    color: a.status === "answered" ? ink : rust,
                                  }}
                                >
                                  {a.status === "error" ? (
                                    <Icons.AlertCircle className="w-4 h-4 inline-block mr-2 -mt-1" aria-hidden="true" />
                                  ) : null}
                                  {a.content}
                                </p>

                                <p className="mt-3" style={{ fontFamily: mono, fontSize: "11px", color: neutral, fontVariantNumeric: "tabular-nums" }}>
                                  hybrid · {a.retrieval.keyword} keyword + {a.retrieval.vector} vector → {a.retrieval.used} chunks used
                                </p>

                                {a.citations.length > 0 ? (
                                  <Sources citations={a.citations} wf={turn.wf.s} />
                                ) : (
                                  <div
                                    data-wf={turn.wf.s || undefined}
                                    className="mt-4 px-4 py-3 border"
                                    style={{ borderColor: hairline, background: warm, borderRadius: radius }}
                                  >
                                    <p style={{ fontFamily: mono, fontSize: "12.5px", color: neutral }}>
                                      {a.status === "error"
                                        ? "sources withheld — retrieval succeeded, generation did not"
                                        : "no sources — nothing was cited because nothing matched"}
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ol>
              )}
            </section>

            {/* Composer */}
            <form onSubmit={submit} className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div data-wf="b-2-0" className="md:col-span-10">
                <div className="flex items-baseline justify-between gap-4">
                  <Label htmlFor="nm-question" style={{ fontFamily: mono, fontSize: "12px", color: ink, letterSpacing: "0.01em" }}>
                    <span style={{ color: accent }}>In [{nextPrompt}]</span>{" "}
                    Ask a follow-up question about your documents
                  </Label>
                  <span style={{ fontFamily: mono, fontSize: "11px", color: draft.length > MAX_QUESTION ? rust : neutral, fontVariantNumeric: "tabular-nums" }}>
                    {draft.length}/{MAX_QUESTION}
                  </span>
                </div>
                <Textarea
                  id="nm-question"
                  ref={inputRef}
                  rows={3}
                  value={draft}
                  disabled={!!pending}
                  onChange={(e) => { setDraft(e.target.value); if (formError) setFormError(null); }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); }
                  }}
                  placeholder={active.turns.length ? "e.g. and what changed for the propensity model?" : "e.g. where is the drift runbook escalation path?"}
                  aria-describedby={formError ? "nm-question-error nm-question-help" : "nm-question-help"}
                  aria-invalid={formError ? "true" : undefined}
                  className="mt-2 w-full px-4 py-3"
                  style={{
                    fontFamily: serif,
                    fontSize: "16px",
                    lineHeight: 1.6,
                    color: ink,
                    background: pending ? tint : paper,
                    border: "1px solid " + (formError ? rust : hairline),
                    borderRadius: radius,
                    resize: "vertical",
                  }}
                />
                {formError ? (
                  <p id="nm-question-error" className="nm-rise mt-2 flex items-start gap-2" style={{ fontFamily: mono, fontSize: "12px", color: rust }}>
                    <Icons.AlertCircle className="w-4 h-4 shrink-0 mt-px" aria-hidden="true" />
                    {formError}
                  </p>
                ) : (
                  <p id="nm-question-help" className="mt-2" style={{ fontFamily: mono, fontSize: "11px", color: neutral }}>
                    {pending
                      ? "Bedrock is writing Out [" + nextPrompt + "] — the box unlocks when it lands."
                      : active.turns.length
                      ? "Enter to ask · Shift + Enter for a new line · this turn carries context from In [" + active.turns.length + "]"
                      : "Enter to ask · Shift + Enter for a new line"}
                  </p>
                )}
                {formError ? (
                  <p id="nm-question-help" className="sr-only">Enter to ask, Shift and Enter for a new line.</p>
                ) : null}
              </div>

              <Button
                type="submit"
                data-wf="b-2-1"
                disabled={!canSend}
                aria-label={pending ? "Asking, please wait" : "Ask question"}
                className="nm-row md:col-span-2 w-full min-h-[48px] inline-flex items-center justify-center gap-2"
                style={{
                  background: canSend ? ink : tint,
                  color: canSend ? paper : neutral,
                  border: "1px solid " + (canSend ? ink : hairline),
                  borderRadius: radius,
                  fontFamily: mono,
                  fontSize: "13px",
                  letterSpacing: "0.02em",
                  cursor: canSend ? "pointer" : "not-allowed",
                  opacity: canSend ? 1 : 0.85,
                }}
              >
                {pending ? "Asking…" : "Ask"}
                {!pending ? <Icons.ArrowRight className="w-4 h-4" aria-hidden="true" /> : null}
              </Button>
            </form>

            {/* Footnote */}
            <p
              data-wf="b-3-0"
              className="mt-6 max-w-[68ch]"
              style={{ fontFamily: mono, fontSize: "11.5px", lineHeight: 1.7, color: neutral }}
            >
              Answers are generated from your indexed S3 documents only and always list the files they came from.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Table, THead, TBody, TR, TH, TD, Empty } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, Home, Filter, ArrowLeft, ArrowRight } = Icons;

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const hexToRgba = (hex, alpha) => {
  const h = String(hex || '#000000').replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
};

const mixHex = (a, b, t) => {
  const parse = (hex) => {
    const h = String(hex || '#000000').replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const n = parseInt(full, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  };
  const [r1, g1, b1] = parse(a);
  const [r2, g2, b2] = parse(b);
  const ch = (x, y) => Math.round(x * (1 - t) + y * t);
  return `rgb(${ch(r1, r2)}, ${ch(g1, g2)}, ${ch(b1, b2)})`;
};

const pad2 = (n) => String(n).padStart(2, '0');

const fmtNow = () => {
  const d = new Date();
  return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}, ${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
};

/* Semantic status roles. The brand palette carries one accent (green); rust and
   oxblood exist only to mark "skipped" and "failed" in the run log. */
const ROLE_SKIP = '#8a5423';
const ROLE_FAIL = '#962d2d';

const BUCKET = 's3://ds-docs';

const INITIAL_RUN = {
  id: 214,
  status: 'running',
  total: 1248,
  indexed: 842,
  skipped: 29,
  failed: 7,
  startedAt: '27 Oct 2026, 09:02',
  completedAt: null,
  lastCompleted: '26 Oct 2026, 18:41',
};

const TARGET = { indexed: 1199, skipped: 42, failed: 7 };

const TABS = [
  { key: 'all', label: 'All files', count: 1248, wf: 'i-3-0-0' },
  { key: 'indexed', label: 'Indexed', count: 1199, wf: 'i-3-0-1' },
  { key: 'skipped', label: 'Skipped', count: 42, wf: 'i-3-0-2' },
  { key: 'failed', label: 'Failed', count: 7, wf: 'i-3-0-3' },
];

/* Ordered oldest -> newest as the run walks the bucket listing. */
const SAMPLE_FILES = [
  { id: 'd-1186', seq: 1186, filename: 'churn_propensity_v7.pdf', s3_key: 'model-cards/2026/churn_propensity_v7.pdf', file_type: 'pdf', status: 'indexed', error: null, indexed_at: '09:11:04', meta: '14 pages · 62 chunks' },
  { id: 'd-1187', seq: 1187, filename: 'backfill_runbook.docx', s3_key: 'runbooks/feature-store/backfill_runbook.docx', file_type: 'docx', status: 'indexed', error: null, indexed_at: '09:11:09', meta: '9 pages · 31 chunks' },
  { id: 'd-1188', seq: 1188, filename: 'q3_forecast.xlsb', s3_key: 'exports/finance/q3_forecast.xlsb', file_type: 'xlsb', status: 'skipped', error: 'unsupported encoding, skipped', indexed_at: null, meta: null },
  { id: 'd-1189', seq: 1189, filename: 'churn_features_v4.csv', s3_key: 'datasets/churn/churn_features_v4.csv', file_type: 'csv', status: 'indexed', error: null, indexed_at: '09:11:22', meta: '38 columns · header + schema text, metadata only' },
  { id: 'd-1190', seq: 1190, filename: 'eda_retention_cohorts.ipynb', s3_key: 'notebooks/retention/eda_retention_cohorts.ipynb', file_type: 'ipynb', status: 'indexed', error: null, indexed_at: '09:11:35', meta: '47 cells · 18 markdown · 29 code' },
  { id: 'd-1191', seq: 1191, filename: 'invoice_0912.pdf', s3_key: 'scans/vendor/invoice_0912.pdf', file_type: 'pdf', status: 'failed', error: 'no text layer — image-only PDF, OCR not enabled', indexed_at: null, meta: null },
  { id: 'd-1192', seq: 1192, filename: 'README.md', s3_key: 'repos/forecasting/README.md', file_type: 'md', status: 'indexed', error: null, indexed_at: '09:11:48', meta: '1,840 words · 7 chunks' },
  { id: 'd-1193', seq: 1193, filename: 'dag_defaults.json', s3_key: 'config/airflow/dag_defaults.json', file_type: 'json', status: 'indexed', error: null, indexed_at: '09:11:53', meta: '212 keys · field names + values as text' },
  { id: 'd-1194', seq: 1194, filename: 'bedrock_rag_topology.png', s3_key: 'design/architecture/bedrock_rag_topology.png', file_type: 'png', status: 'skipped', error: 'binary file — no text to extract', indexed_at: null, meta: null },
  { id: 'd-1195', seq: 1195, filename: '2026-09-14_titan_latency.md', s3_key: 'postmortems/2026-09-14_titan_latency.md', file_type: 'md', status: 'indexed', error: null, indexed_at: '09:12:06', meta: '2,110 words · 9 chunks' },
  { id: 'd-1196', seq: 1196, filename: 'annotations_export.csv', s3_key: 'datasets/labels/annotations_export.csv', file_type: 'csv', status: 'failed', error: 'malformed CSV — unterminated quote at row 11,402', indexed_at: null, meta: null },
  { id: 'd-1197', seq: 1197, filename: 'handbook_2026.pdf', s3_key: 'policies/people/handbook_2026.pdf', file_type: 'pdf', status: 'indexed', error: null, indexed_at: '09:12:31', meta: '58 pages · 204 chunks' },
  { id: 'd-1198', seq: 1198, filename: 'snowflake_msa_2026.docx', s3_key: 'contracts/vendors/snowflake_msa_2026.docx', file_type: 'docx', status: 'indexed', error: null, indexed_at: '09:12:44', meta: '22 pages · 76 chunks' },
  { id: 'd-1199', seq: 1199, filename: 'titan_v2_embedding_eval.ipynb', s3_key: 'notebooks/evals/titan_v2_embedding_eval.ipynb', file_type: 'ipynb', status: 'indexed', error: null, indexed_at: '09:12:58', meta: '33 cells · 11 markdown · 22 code' },
  { id: 'd-1200', seq: 1200, filename: 'forecast_lgbm.safetensors', s3_key: 'models/registry/forecast_lgbm.safetensors', file_type: 'bin', status: 'skipped', error: 'binary file — no text to extract', indexed_at: null, meta: null },
  { id: 'd-1201', seq: 1201, filename: 'run_metrics_2026-10.json', s3_key: 'metrics/pipeline/run_metrics_2026-10.json', file_type: 'json', status: 'failed', error: 'invalid JSON — unexpected token at byte 4,218', indexed_at: null, meta: null },
  { id: 'd-1202', seq: 1202, filename: 'q2_review.pptx', s3_key: 'decks/board/q2_review.pptx', file_type: 'pptx', status: 'skipped', error: 'unsupported file type — .pptx is not in the extractor set', indexed_at: null, meta: null },
  { id: 'd-1203', seq: 1203, filename: 'elasticity_grid.csv', s3_key: 'datasets/pricing/elasticity_grid.csv', file_type: 'csv', status: 'indexed', error: null, indexed_at: '09:13:17', meta: '21 columns · 1.2M rows, text + metadata only' },
];

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const muted = brand.neutralColor;
  const accent = brand.accentColor;
  const paper = brand.backgroundColor;
  const radius = brand.radius;

  const accentInk = mixHex(accent, ink, 0.42);
  const hairline = hexToRgba(ink, 0.14);
  const hairlineSoft = hexToRgba(ink, 0.08);
  const paperTint = hexToRgba(ROLE_SKIP, 0.035);
  const surface = hexToRgba(ROLE_SKIP, 0.055);

  const mono = `${brand.fontHeading}, ui-monospace, SFMono-Regular, Menlo, monospace`;
  const serif = `${brand.fontBody}, Iowan Old Style, Georgia, serif`;

  const [run, setRun] = React.useState(INITIAL_RUN);
  const [tab, setTab] = React.useState('all');
  const tabRefs = React.useRef({});

  React.useEffect(() => {
    if (run.status !== 'running') return undefined;
    const handle = window.setInterval(() => {
      setRun((prev) => {
        if (prev.status !== 'running') return prev;
        const indexed = Math.min(TARGET.indexed, prev.indexed + 103);
        const skipped = Math.min(TARGET.skipped, prev.skipped + 4);
        const failed = Math.min(TARGET.failed, prev.failed + 1);
        const done = indexed === TARGET.indexed && skipped === TARGET.skipped && failed === TARGET.failed;
        if (done) {
          const stamp = fmtNow();
          return { ...prev, indexed, skipped, failed, status: 'completed', completedAt: stamp, lastCompleted: stamp };
        }
        return { ...prev, indexed, skipped, failed };
      });
    }, 430);
    return () => window.clearInterval(handle);
  }, [run.status]);

  const running = run.status === 'running';
  const processed = run.indexed + run.skipped + run.failed;
  const pct = Math.min(100, Math.round((processed / run.total) * 100));
  const revealed = Math.min(SAMPLE_FILES.length, Math.round((processed / run.total) * SAMPLE_FILES.length));

  const visited = SAMPLE_FILES.slice(0, revealed);
  const rows = visited
    .filter((f) => (tab === 'all' ? true : f.status === tab))
    .slice()
    .reverse();

  const startRun = () => {
    if (running) return;
    setRun((prev) => ({
      id: prev.id + 1,
      status: 'running',
      total: 1248,
      indexed: 0,
      skipped: 0,
      failed: 0,
      startedAt: fmtNow(),
      completedAt: null,
      lastCompleted: prev.completedAt || prev.lastCompleted,
    }));
    setTab('all');
  };

  const onTabKey = (event, index) => {
    let next = null;
    if (event.key === 'ArrowRight') next = (index + 1) % TABS.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + TABS.length) % TABS.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = TABS.length - 1;
    if (next === null) return;
    event.preventDefault();
    const key = TABS[next].key;
    setTab(key);
    const node = tabRefs.current[key];
    if (node) node.focus();
  };

  const STATUS_META = {
    indexed: { word: 'INDEXED', Icon: Icons.CheckCircle, color: accentInk },
    skipped: { word: 'SKIPPED', Icon: Icons.AlertCircle, color: ROLE_SKIP },
    failed: { word: 'FAILED', Icon: Icons.X, color: ROLE_FAIL },
  };

  const labelStyle = {
    fontFamily: mono,
    fontSize: '10.5px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: muted,
  };

  const statCells = [
    {
      wf: 'i-2-0-0',
      label: 'Status',
      render: (
        <span className="inline-flex items-center gap-2">
          <span
            aria-hidden="true"
            className={running ? 'nm-pulse' : ''}
            style={{
              width: 8,
              height: 8,
              borderRadius: 9999,
              display: 'inline-block',
              backgroundColor: running ? accent : accentInk,
            }}
          />
          <span style={{ fontFamily: mono, fontSize: '19px', color: ink }}>
            {running ? 'Running' : 'Completed'}
          </span>
        </span>
      ),
      hint: running ? `run #${run.id} · reading bucket listing` : `run #${run.id} · no files left to process`,
    },
    { wf: 'i-2-0-1', label: 'Files total', value: run.total.toLocaleString('en-GB'), hint: 'objects in the bucket listing' },
    { wf: 'i-2-0-2', label: 'Files indexed', value: run.indexed.toLocaleString('en-GB'), hint: 'chunked and embedded', emphasis: true },
    { wf: 'i-2-0-3', label: 'Files failed', value: run.failed.toLocaleString('en-GB'), hint: 'extraction errors, run continued', warn: run.failed > 0 },
    { wf: 'i-2-0-4', label: 'Started at', value: run.startedAt, small: true, hint: 'triggered manually' },
    { wf: 'i-2-0-5', label: 'Last completed', value: run.lastCompleted, small: true, hint: run.completedAt ? 'this run' : 'previous run #213' },
  ];

  return (
    <div
      className="min-h-full w-full"
      style={{
        backgroundColor: paperTint,
        fontFamily: serif,
        color: ink,
        ['--nm-accent']: accent,
      }}
    >
      <style>{`
        .nm-focus:focus-visible { outline: 2px solid var(--nm-accent); outline-offset: 2px; }
        @keyframes nm-row-in { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: none; } }
        .nm-row-in { animation: nm-row-in .3s ease-out both; }
        @keyframes nm-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .3; } }
        .nm-pulse { animation: nm-pulse 1.5s ease-in-out infinite; }
        .nm-bar { transition: width .42s linear; }
        @media (prefers-reduced-motion: reduce) {
          .nm-row-in, .nm-pulse { animation: none !important; }
          .nm-bar { transition: none !important; }
        }
      `}</style>

      <div className="mx-auto w-full max-w-[1180px] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">

        {/* Row 1 — title + primary action */}
        <div className="grid grid-cols-12 items-end gap-6">
          <div className="col-span-12 lg:col-span-9" data-wf="b-0-0">
            <p style={{ ...labelStyle }}>Admin · indexing</p>
            <h1
              className="mt-3 text-[34px] leading-[1.1] sm:text-[40px]"
              style={{ fontFamily: mono, fontWeight: 600, letterSpacing: '-0.01em', color: ink }}
            >
              Document index
            </h1>
          </div>
          <div className="col-span-12 flex flex-col items-stretch gap-2 lg:col-span-3 lg:items-end">
            <Button
              data-wf="b-0-1"
              type="button"
              onClick={startRun}
              aria-disabled={running}
              className="nm-focus inline-flex h-11 w-full items-center justify-center gap-2 px-5 text-[14px] transition-opacity lg:w-auto"
              style={{
                backgroundColor: running ? hexToRgba(ink, 0.35) : ink,
                color: paper,
                border: '1px solid transparent',
                borderRadius: radius,
                fontFamily: mono,
                letterSpacing: '0.02em',
                cursor: running ? 'not-allowed' : 'pointer',
              }}
            >
              <Icons.Plus aria-hidden="true" className="h-4 w-4" />
              Start indexing run
            </Button>
            <p className="text-[12.5px] leading-snug lg:text-right" style={{ color: muted }}>
              {running
                ? `Run #${run.id} is in progress — you can start another when it finishes.`
                : 'Administrators only. Staff can query the index from Chat.'}
            </p>
          </div>
        </div>

        {/* Row 2 — source note */}
        <p
          data-wf="b-1-0"
          className="mt-6 max-w-[68ch] text-[16px] leading-[1.6]"
          style={{ color: mixHex(muted, ink, 0.25) }}
        >
          Source: <span style={{ fontFamily: mono, fontSize: '14.5px' }}>{BUCKET}</span> (single bucket).
          Indexing runs on demand — every file is re-processed each run.
        </p>

        {/* Row 3 — current run */}
        <Card
          data-wf="b-2-0"
          className="mt-8"
          style={{ backgroundColor: paper, border: `1px solid ${hairline}`, borderRadius: radius, boxShadow: 'none' }}
        >
          <CardHeader className="flex flex-col gap-1 px-6 pt-6 pb-4 sm:flex-row sm:items-baseline sm:justify-between">
            <CardTitle className="text-[18px]" style={{ fontFamily: mono, fontWeight: 600, color: ink }}>
              Current run
            </CardTitle>
            <CardDescription className="text-[13px]" style={{ color: muted, fontFamily: mono }}>
              run #{run.id} · bedrock titan-embed-text-v2
            </CardDescription>
          </CardHeader>

          <CardContent className="px-0 pb-0">
            <div style={{ borderTop: `1px solid ${hairlineSoft}` }}>
              <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {statCells.map((cell, i) => (
                  <div
                    key={cell.wf}
                    data-wf={cell.wf}
                    className="px-6 py-5"
                    style={{
                      borderRight: `1px solid ${hairlineSoft}`,
                      borderBottom: `1px solid ${hairlineSoft}`,
                      backgroundColor: cell.emphasis ? hexToRgba(accent, 0.05) : 'transparent',
                    }}
                  >
                    <dt style={labelStyle}>{cell.label}</dt>
                    <dd
                      className="mt-2"
                      style={{
                        fontFamily: mono,
                        fontVariantNumeric: 'tabular-nums',
                        fontSize: cell.small ? '15px' : '24px',
                        lineHeight: 1.2,
                        color: cell.warn ? ROLE_FAIL : cell.emphasis ? accentInk : ink,
                      }}
                    >
                      {cell.render || cell.value}
                    </dd>
                    <p className="mt-1.5 text-[12.5px] leading-snug" style={{ color: muted }}>
                      {cell.hint}
                    </p>
                  </div>
                ))}
              </dl>
            </div>

            {/* progress + live notice */}
            <div className="px-6 py-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p style={labelStyle}>Progress</p>
                <p
                  className="text-[13px]"
                  style={{ fontFamily: mono, fontVariantNumeric: 'tabular-nums', color: ink }}
                >
                  {processed.toLocaleString('en-GB')} / {run.total.toLocaleString('en-GB')} · {pct}%
                </p>
              </div>
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={run.total}
                aria-valuenow={processed}
                aria-valuetext={`${processed} of ${run.total} files processed`}
                aria-label={`Files processed in run ${run.id}`}
                className="mt-3 h-[6px] w-full overflow-hidden"
                style={{ backgroundColor: hexToRgba(ink, 0.09), borderRadius: radius }}
              >
                <div className="nm-bar h-full" style={{ width: `${pct}%`, backgroundColor: accent }} />
              </div>

              <div role="status" aria-live="polite" className="mt-4 max-w-[68ch]">
                {run.status === 'running' && (
                  <p className="text-[14.5px] leading-[1.6]" style={{ color: mixHex(muted, ink, 0.2) }}>
                    Walking {BUCKET} and re-processing every object. PDF, Word, Markdown and text go in as
                    extracted text; CSV, JSON and notebooks go in as text plus metadata. Failures are logged
                    and the run keeps going.
                  </p>
                )}
                {run.status === 'completed' && (
                  <p className="text-[14.5px] leading-[1.6]" style={{ color: mixHex(muted, ink, 0.2) }}>
                    <span style={{ fontFamily: mono, color: accentInk }}>Run #{run.id} completed {run.completedAt}.</span>{' '}
                    {TARGET.indexed.toLocaleString('en-GB')} files indexed, {TARGET.skipped} skipped,{' '}
                    {TARGET.failed} failed. Staff questions in{' '}
                    <button
                      type="button"
                      onClick={() => navigate('chat')}
                      className="nm-focus underline underline-offset-2"
                      style={{ color: accentInk, fontFamily: mono, fontSize: '14px' }}
                    >
                      Chat
                    </button>{' '}
                    now hit the refreshed index.
                  </p>
                )}
                {run.status === 'error' && (
                  <p
                    className="text-[14.5px] leading-[1.6]"
                    style={{ color: ROLE_FAIL, borderLeft: `2px solid ${ROLE_FAIL}`, paddingLeft: 12 }}
                  >
                    Run #{run.id} stopped at {processed.toLocaleString('en-GB')} files: Bedrock refused the
                    embedding call (AccessDeniedException on titan-embed-text-v2). The index still holds the
                    last completed run. Check model access for this account, then start the run again.
                  </p>
                )}
              </div>
            </div>

            <CardFooter
              className="flex flex-wrap items-center gap-x-3 gap-y-1 px-6 py-4"
              style={{ borderTop: `1px solid ${hairlineSoft}`, backgroundColor: surface }}
            >
              <Icons.Clock aria-hidden="true" className="h-3.5 w-3.5" style={{ color: muted }} />
              <p className="text-[13px] leading-snug" style={{ color: muted }}>
                Objects added to {BUCKET} after {run.startedAt} are not searchable yet — automatic re-indexing
                on bucket changes is deferred, so start another run to pick them up.
              </p>
            </CardFooter>
          </CardContent>
        </Card>

        {/* Row 4 — tabs */}
        <div
          data-wf="b-3-0"
          role="tablist"
          aria-label="Filter documents by extraction status"
          className="mt-12 flex flex-wrap items-end gap-x-6 gap-y-2"
          style={{ borderBottom: `1px solid ${hairline}` }}
        >
          {TABS.map((t, i) => {
            const active = tab === t.key;
            return (
              <button
                key={t.key}
                data-wf={t.wf}
                ref={(node) => { tabRefs.current[t.key] = node; }}
                role="tab"
                id={`run-tab-${t.key}`}
                aria-selected={active}
                aria-controls="run-files-panel"
                tabIndex={active ? 0 : -1}
                type="button"
                onClick={() => setTab(t.key)}
                onKeyDown={(e) => onTabKey(e, i)}
                className="nm-focus -mb-px flex min-h-[44px] items-center gap-2 px-1 pb-3 text-[14px]"
                style={{
                  fontFamily: mono,
                  color: active ? ink : muted,
                  borderBottom: `2px solid ${active ? accent : 'transparent'}`,
                  letterSpacing: '0.01em',
                }}
              >
                <span>{t.label}</span>
                <span style={{ fontVariantNumeric: 'tabular-nums', color: active ? accentInk : muted }}>
                  ({t.count.toLocaleString('en-GB')})
                </span>
              </button>
            );
          })}
        </div>

        {/* Row 5 — documents table */}
        <section
          data-wf="b-4-0"
          id="run-files-panel"
          role="tabpanel"
          aria-labelledby={`run-tab-${tab}`}
          tabIndex={0}
          className="nm-focus mt-8"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-[20px]" style={{ fontFamily: mono, fontWeight: 600, color: ink }}>
              Documents in this run
            </h2>
            <p className="text-[13px]" style={{ fontFamily: mono, color: muted, fontVariantNumeric: 'tabular-nums' }}>
              {rows.length === 0
                ? 'no lines yet'
                : `last ${rows.length} of ${processed.toLocaleString('en-GB')} processed · newest first`}
            </p>
          </div>

          <div
            className="mt-4 overflow-x-auto"
            style={{ border: `1px solid ${hairline}`, borderRadius: radius, backgroundColor: paper }}
          >
            {rows.length === 0 ? (
              <div className="px-6 py-14">
                <Empty
                  title={tab === 'all' ? 'The run log is still empty' : `Nothing ${tab} yet in run #${run.id}`}
                  description={
                    tab === 'all'
                      ? `Run #${run.id} has just started listing ${BUCKET}. Each file appears here the moment the extractor finishes with it.`
                      : `Run #${run.id} has processed ${processed.toLocaleString('en-GB')} of ${run.total.toLocaleString('en-GB')} files. Files marked ${tab} will be stamped here as they come through.`
                  }
                  action={
                    tab === 'all' ? undefined : (
                      <Button
                        type="button"
                        onClick={() => setTab('all')}
                        className="nm-focus h-10 px-4 text-[13px]"
                        style={{
                          fontFamily: mono,
                          backgroundColor: 'transparent',
                          color: ink,
                          border: `1px solid ${hairline}`,
                          borderRadius: radius,
                        }}
                      >
                        Show all files
                      </Button>
                    )
                  }
                />
              </div>
            ) : (
              <Table className="w-full" style={{ borderCollapse: 'collapse', fontVariantNumeric: 'tabular-nums' }}>
                <THead>
                  <TR style={{ borderBottom: `1px solid ${hairline}`, backgroundColor: surface }}>
                    <TH data-wf="i-4-0-0" scope="col" className="px-5 py-3 text-left" style={labelStyle}>Filename</TH>
                    <TH data-wf="i-4-0-1" scope="col" className="px-5 py-3 text-left" style={labelStyle}>S3 key</TH>
                    <TH data-wf="i-4-0-2" scope="col" className="px-5 py-3 text-left" style={labelStyle}>File type</TH>
                    <TH data-wf="i-4-0-3" scope="col" className="px-5 py-3 text-left" style={labelStyle}>Status</TH>
                    <TH data-wf="i-4-0-4" scope="col" className="px-5 py-3 text-left" style={labelStyle}>Error</TH>
                    <TH data-wf="i-4-0-5" scope="col" className="px-5 py-3 text-left" style={labelStyle}>Indexed at</TH>
                  </TR>
                </THead>
                <TBody>
                  {rows.map((f) => {
                    const meta = STATUS_META[f.status];
                    const StampIcon = meta.Icon;
                    const tinted = f.status !== 'indexed';
                    return (
                      <TR
                        key={f.id}
                        className="nm-row-in align-top"
                        style={{
                          borderBottom: `1px solid ${hairlineSoft}`,
                          backgroundColor: tinted ? hexToRgba(ROLE_SKIP, 0.03) : 'transparent',
                        }}
                      >
                        <TD className="px-5 py-4">
                          <div className="flex items-baseline gap-3">
                            <span
                              aria-hidden="true"
                              style={{ fontFamily: mono, fontSize: '11px', color: hexToRgba(ink, 0.4), minWidth: 34 }}
                            >
                              {String(f.seq).padStart(4, '0')}
                            </span>
                            <span className="min-w-0">
                              <span className="block text-[15px] leading-tight" style={{ color: ink }}>
                                {f.filename}
                              </span>
                              {f.meta && (
                                <span className="mt-1 block text-[12.5px] leading-snug" style={{ color: muted }}>
                                  {f.meta}
                                </span>
                              )}
                            </span>
                          </div>
                        </TD>
                        <TD className="px-5 py-4">
                          <span style={{ fontFamily: mono, fontSize: '12.5px', color: muted }}>
                            <span style={{ color: hexToRgba(ink, 0.38) }}>{BUCKET}/</span>
                            <span style={{ color: mixHex(muted, ink, 0.3) }}>{f.s3_key}</span>
                          </span>
                        </TD>
                        <TD className="px-5 py-4">
                          <span
                            className="inline-block px-2 py-[3px]"
                            style={{
                              fontFamily: mono,
                              fontSize: '11px',
                              letterSpacing: '0.1em',
                              textTransform: 'uppercase',
                              color: mixHex(muted, ink, 0.35),
                              border: `1px solid ${hairline}`,
                              borderRadius: radius,
                            }}
                          >
                            {f.file_type}
                          </span>
                        </TD>
                        <TD className="px-5 py-4">
                          <span className="inline-flex items-center gap-1.5" style={{ color: meta.color }}>
                            <StampIcon aria-hidden="true" className="h-3.5 w-3.5" />
                            <span style={{ fontFamily: mono, fontSize: '11.5px', letterSpacing: '0.12em' }}>
                              {meta.word}
                            </span>
                          </span>
                        </TD>
                        <TD className="px-5 py-4">
                          {f.error ? (
                            <span
                              className="block max-w-[34ch] text-[13px] leading-snug"
                              style={{ fontFamily: mono, color: f.status === 'failed' ? ROLE_FAIL : ROLE_SKIP }}
                            >
                              {f.error}
                            </span>
                          ) : (
                            <span style={{ color: hexToRgba(ink, 0.3), fontFamily: mono }}>
                              <span aria-hidden="true">—</span>
                              <span className="sr-only">No error</span>
                            </span>
                          )}
                        </TD>
                        <TD className="px-5 py-4">
                          {f.indexed_at ? (
                            <span style={{ fontFamily: mono, fontSize: '13px', color: mixHex(muted, ink, 0.25) }}>
                              27 Oct {f.indexed_at}
                            </span>
                          ) : (
                            <span style={{ color: hexToRgba(ink, 0.3), fontFamily: mono }}>
                              <span aria-hidden="true">—</span>
                              <span className="sr-only">Not indexed</span>
                            </span>
                          )}
                        </TD>
                      </TR>
                    );
                  })}
                </TBody>
              </Table>
            )}
          </div>

          <p className="mt-4 max-w-[68ch] text-[13px] leading-[1.6]" style={{ color: muted }}>
            Skipped and failed files stay out of the index until the next run — nothing in the log aborts the
            run. Structured files (CSV, JSON, notebooks) are stored as extracted text and metadata only; the
            chatbot reads them, it does not query them.
          </p>
        </section>
      </div>
    </div>
  );
}

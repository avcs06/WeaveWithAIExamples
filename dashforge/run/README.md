# DashForge: run data

The run that generated this app, `20261104-0609-dashboard-editor` on Nov 4, 2026, and its log. The app itself is the folder above this one. The run also kept OpenCode's own home folder (`opencode/`) for its runtime state; it is left out here, and the session logs are in `sessions/`. File paths in the logs are relative to the app folder.

To see how the agents worked, start with the threads in `reports/` and the benchmark.

| Path | What it holds |
| --- | --- |
| `20261104-0609-dashboard-editor/input/idea.md` | The brief the run started from |
| `20261104-0609-dashboard-editor/01-flows/` | Scope, flow catalog and expanded flows, as JSON with markdown beside each |
| `20261104-0609-dashboard-editor/02-design/` | The theme, and every frame, screen and dialog in prose |
| `20261104-0609-dashboard-editor/03-contract.md`, `20261104-0609-dashboard-editor/03-contract.json` | The records and the operations behind every screen |
| `20261104-0609-dashboard-editor/04-code/02-contract.json` | The seed rows of each entity |
| `20261104-0609-dashboard-editor/reports/<stage>.json` | Each round of a stage, with the issues the checks and reviewers found |
| `20261104-0609-dashboard-editor/reports/<stage>.threads.json` | Each issue as a thread: who raised it, every reply, and how it closed |
| `20261104-0609-dashboard-editor/sessions/<session>.jsonl` | Each OpenCode session's log |
| `20261104-0609-dashboard-editor/sessions/<session>.tools.jsonl` | Each OpenCode session's tool calls |
| `20261104-0609-dashboard-editor/patches/` | The git diff of each code stage |
| `20261104-0609-dashboard-editor/shots/` | A screenshot of every screen after each coding round, as the UX reviewer saw it |
| `20261104-0609-dashboard-editor/llm/` | Every model call outside the coding sessions: the request and the answer |
| `20261104-0609-dashboard-editor/05-benchmark.md`, `20261104-0609-dashboard-editor/benchmark.json` | The benchmark of the finished app, with the duplicate-code report in `20261104-0609-dashboard-editor/benchmark/` |
| `20261104-0609-dashboard-editor/events.jsonl`, `20261104-0609-dashboard-editor/state.json` | The event log of the run, and the final state of each stage |
| `batch-dashboard-editor-opencode.log` | The console output of the run |

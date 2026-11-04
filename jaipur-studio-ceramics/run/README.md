# Jaipur Studio Ceramics: run data

The run that generated this app, `20261104-0040-ecommerce-store` on Nov 4, 2026, and its log. The app itself is the folder above this one. The run also kept Muse Code's own home folder (`muse/`) for its runtime state; it is left out here, and the session logs are in `sessions/`. File paths in the logs are relative to the app folder.

To see how the agents worked, start with the threads in `reports/` and the benchmark.

| Path | What it holds |
| --- | --- |
| `20261104-0040-ecommerce-store/input/idea.md` | The brief the run started from |
| `20261104-0040-ecommerce-store/01-flows/` | Scope, flow catalog and expanded flows, as JSON with markdown beside each |
| `20261104-0040-ecommerce-store/02-design/` | The theme, and every frame, screen and dialog in prose |
| `20261104-0040-ecommerce-store/03-contract.md`, `20261104-0040-ecommerce-store/03-contract.json` | The records and the operations behind every screen |
| `20261104-0040-ecommerce-store/04-code/02-contract.json` | The seed rows of each entity |
| `20261104-0040-ecommerce-store/reports/<stage>.json` | Each round of a stage, with the issues the checks and reviewers found |
| `20261104-0040-ecommerce-store/reports/<stage>.threads.json` | Each issue as a thread: who raised it, every reply, and how it closed |
| `20261104-0040-ecommerce-store/sessions/<session>.jsonl` | Each Muse Code session's log |
| `20261104-0040-ecommerce-store/sessions/<session>.tools.jsonl` | Each Muse Code session's tool calls |
| `20261104-0040-ecommerce-store/patches/` | The git diff of each code stage |
| `20261104-0040-ecommerce-store/llm/` | Every model call outside the coding sessions: the request and the answer |
| `20261104-0040-ecommerce-store/05-benchmark.md`, `20261104-0040-ecommerce-store/benchmark.json` | The benchmark of the finished app, with the duplicate-code report in `20261104-0040-ecommerce-store/benchmark/` |
| `20261104-0040-ecommerce-store/events.jsonl`, `20261104-0040-ecommerce-store/state.json` | The event log of the run, and the final state of each stage |
| `batch-ecommerce-store-20261104.log` | The console output of the run |

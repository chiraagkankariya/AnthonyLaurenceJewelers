# THINKING_AGENT.md — Pre-Execution Planning Agent
## Anthony Laurence Jewelers
> This agent runs automatically after the Project Manager Agent approves a phase and before Claude Code writes any code. It does all complex reasoning upfront so Claude Code can execute mechanically with zero thinking overhead.

---

## Purpose
Separate the **thinking** from the **doing**. This agent plans every operation in precise detail so Claude Code never needs to reason mid-execution. This minimizes token usage by eliminating redundant thinking during the build phase.

---

## Position in Workflow
```
Project Manager Agent (reads progress, shows summary, gets APPROVE)
        ↓
Thinking Agent (plans execution, no code written)
        ↓
Claude Code (executes plan mechanically, no thinking)
        ↓
Visibility Agent (checks text/contrast, auto-fixes)
        ↓
QA Agent (full 8-category check)
        ↓
Commit approval → push to dev
```

---

## Trigger
Runs automatically after owner types APPROVE in response to Project Manager Agent summary.
Completes full execution plan before Claude Code writes a single line of code.

---

## Planning Sequence

### Step 1 — Classify Task Complexity
For every task in the phase, classify as:

| Type | Examples | Thinking Needed |
|---|---|---|
| **Mechanical** | class swap, text change, file move, rename | None — skip to execution plan directly |
| **Simple** | single new component, single page, single API route | Minimal — 1-2 sentences per file |
| **Complex** | multi-file feature, data flow, pricing logic, schema change | Full planning required |

If ALL tasks in the phase are Mechanical → skip thinking entirely, produce execution plan immediately.
If ANY task is Complex → full planning required for that task.

---

### Step 2 — Pre-Read Analysis
For Complex tasks only:
- Identify every file that will be created or modified
- Read ONLY those files — nothing else
- Identify exact strings that need to be replaced (for str_replace operations)
- Identify dependencies between files (e.g. component A imports from component B)
- Identify potential conflicts with existing code

For Mechanical and Simple tasks:
- Do NOT read any files unless the exact target string is unknown
- If the target string was provided in the prompt → no file read needed

---

### Step 3 — Produce Execution Plan
Output a precise execution plan in this format:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧠 EXECUTION PLAN — PHASE [X]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

COMPLEXITY: [Mechanical / Simple / Complex]
ESTIMATED TOKENS: [X tokens]
FILES TO CREATE: [number]
FILES TO MODIFY: [number]

OPERATIONS (in execution order):

[1] OPERATION TYPE: [Create / str_replace / bash / Delete]
    FILE: [exact file path]
    ACTION: [one sentence description]
    TOKEN BUDGET: [X tokens]
    
    [For str_replace operations:]
    TARGET STRING: "[exact string to find]"
    REPLACEMENT: "[exact replacement string]"
    
    [For bash operations:]
    COMMAND: [exact bash command]
    
    [For new file creation:]
    DEPENDENCIES: [list any imports needed]
    APPROXIMATE LINES: [number]

[2] OPERATION TYPE: ...
    ...

POTENTIAL CONFLICTS:
• [any conflicts identified — if none, say "None"]

TOTAL ESTIMATED TOKEN BUDGET: [X tokens]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Handing off to Claude Code for execution.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

### Step 4 — Hand Off to Claude Code
Pass the execution plan to Claude Code with this instruction:

```
Execute the following plan mechanically. Do not think, do not re-read files unless specified in the plan, do not deviate from the plan. If you encounter something unexpected, stop and report — do not improvise.
```

---

## Token Budget Reference
Use these budgets when estimating. Flag to owner if a task will exceed its budget:

| Operation | Token Budget |
|---|---|
| str_replace — class/style change | 200-400 tokens |
| str_replace — text content change | 200-400 tokens |
| str_replace — structural change | 400-800 tokens |
| bash file operation | 100-200 tokens |
| New component (<50 lines) | 500-1k tokens |
| New component (50-150 lines) | 1k-2k tokens |
| New page (simple) | 1k-3k tokens |
| New page (complex) | 3k-6k tokens |
| Multi-file phase (3-5 files) | 3k-6k tokens |
| Complex logic (pricing, schema) | 2k-5k tokens |
| QA check (targeted) | 1k-3k tokens |
| Full phase (5-10 files) | 5k-10k tokens |

**If estimated tokens exceed budget:**
- Report to owner before proceeding
- Suggest a more efficient approach
- Never exceed budget without owner awareness

---

## Thinking Rules
- **Never think during execution** — all reasoning happens in this agent, not in Claude Code
- **Never read a file** if the target string was provided in the prompt
- **Never read a file** for Mechanical tasks
- **Maximum one file read** per Complex task unless dependencies require more
- **No exploration** — if the plan requires reading more than 5 files, stop and ask the owner to narrow the scope
- **No redundant reasoning** — if a decision was already made in CLAUDE.md, PRD.md, or SCHEMA.md, reference it directly without re-analyzing

---

## Mechanical Task Fast Path
For pure Mechanical tasks (class swaps, text changes, file moves):

Skip Steps 1-2 entirely. Produce only this:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚡ MECHANICAL TASK — FAST PATH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OPERATION: str_replace
FILE: [exact path]
TARGET: "[exact string]"
REPLACEMENT: "[exact replacement]"
TOKEN BUDGET: 200-400 tokens
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Executing immediately.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

No thinking, no file reads, no planning overhead — just execute.

---

## Conflict Resolution
If the plan identifies a conflict (e.g. two files depend on each other in a way that could break):
- Stop and report the conflict to the owner
- Propose two resolution options
- Wait for owner input before proceeding
- Never resolve conflicts independently

---

## Reuse for Future Projects
This agent is project-agnostic. Drop `THINKING_AGENT.md` into any new project root alongside `PROJECT_AGENT.md` and `QA_AGENT.md`. Update the token budget table if the stack changes.

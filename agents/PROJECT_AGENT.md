# PROJECT_AGENT.md — Project Manager Agent
## Anthony Laurence Jewelers
> This agent runs automatically at the start of every Claude Code session. Follow these instructions exactly before writing any code.

---

## Startup Sequence
Execute these steps in order at the start of every session:

### Step 1 — Read Project State
Read the following files in this order:
1. `PROGRESS.md` — identify all incomplete checklist items
2. `CLAUDE.md` — load guardrails, stack, and business rules
3. `PRD.md` — load only the section relevant to the next incomplete phase
4. `SCHEMA.md` — load only if the next phase involves data, products, or pricing

### Step 2 — Identify Next Phase
Find the first phase in `PROGRESS.md` that has any unchecked items. That is the active phase.

If all phases are complete:
- Report: "All phases in PROGRESS.md are complete. Please add new phases or tasks to continue."
- Stop and wait for owner input.

### Step 3 — Check for Blockers
Before generating the summary, check for any blockers:
- Missing environment variables in `.env.local` (compare against CLAUDE.md)
- Missing assets (logo, images, icons referenced but not in `/public`)
- Missing API keys or third-party account setup required
- Any incomplete owner actions flagged in the previous phase summary

### Step 4 — Generate Pre-Build Summary
Present the following summary to the owner and wait for explicit approval before writing any code:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 PHASE [X] — [Phase Name]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT'S BEING BUILT:
• [concise bullet list of components/files]

FILES TO BE CREATED/MODIFIED: [number]
• [list each file with one sentence]

OWNER ACTIONS REQUIRED:
• [list any blockers — if none, say "None"]

CARRYOVER FROM LAST PHASE:
• [any decisions or issues from previous phase that affect this one — if none, say "None"]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ready to build. Type APPROVE to start or ask questions first.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 5 — Handle Blockers
If there are owner actions required:
- List each blocker clearly
- Ask: "Would you like to resolve these first, proceed without them, or skip affected tasks?"
- Wait for owner response before proceeding
- Do NOT make assumptions about how to handle blockers

### Step 6 — Build
Only begin building after owner types APPROVE or equivalent confirmation.
Follow all rules in `CLAUDE.md` — Guardrails and Efficiency Rules apply to every task.

### Step 7 — Phase Complete: QA Handoff
When all tasks in the phase are complete:
- Hand off automatically to QA Agent (see QA_AGENT.md)
- Do NOT commit or push until QA Agent gives full clearance
- Wait for QA results before proceeding to Step 8

### Step 8 — Commit Approval
After QA passes, present the following for owner approval:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ PHASE [X] COMPLETE — QA PASSED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FILES CREATED/MODIFIED:
• [file name] — [one sentence description]

COMMIT MESSAGE:
"[Phase X] [Phase Name] — [brief description]"

Branch: dev

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type COMMIT to push to dev or request changes first.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 9 — Commit & Push
After owner approves:
1. `git add .`
2. `git commit -m "[Phase X] [description]"`
3. `git push origin dev`
4. Update all completed items in `PROGRESS.md` with ✅
5. Report: "Pushed to dev. Ready for next session."

---

## Mid-Session Rules
- If you encounter anything not covered in the `.md` files → stop and ask the owner
- If a bug fix fails twice → stop and ask the owner
- If a new dependency is needed → ask before installing (lean towards asking)
- If making any design decision not in `CLAUDE.md` → stop and ask
- Never push to `main` under any circumstances

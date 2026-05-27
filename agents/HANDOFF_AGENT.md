# HANDOFF_AGENT.md — Project Setup Agent
## Reusable Template for New Projects
> Use this agent to set up any new project from scratch. It interviews the owner, generates all .md files, and hands off to Claude Code ready to build.

---

## Purpose
This agent replaces the manual process of setting up a new project. Drop this file into any new project folder and run it to get fully configured `.md` files generated automatically through a guided interview.

---

## Default Stack (Locked)
Unless explicitly told otherwise, always use:
| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| CMS | Sanity.io (free tier) |
| Payments | Stripe (hosted checkout) + Stripe Tax |
| Booking | Calendly embed |
| Hosting | Vercel |
| Styling | Tailwind CSS |
| Language | TypeScript |

Only suggest an alternative stack if the owner explicitly asks, or if a significantly more efficient tool has emerged since this template was created.

---

## Default Guardrails (Fixed Across All Projects)
These are non-negotiable and carry into every project automatically:

**Efficiency Rules:**
1. Do not re-read files unnecessarily — read each file once per session
2. Write multiple files in parallel — never sequentially
3. No repetition — summarize only at end of phase
4. No exploration loops — max 2 attempts on any fix before asking owner
5. Batch related changes in one pass
6. No unnecessary confirmations mid-task
7. Phase summaries only when full phase is complete
8. If blocked, report immediately in one sentence and stop
9. **str_replace for partial changes** — never rewrite an entire file to make partial changes. Use str_replace for targeted edits. Only rewrite a file completely if more than 70% of it is changing.
10. **Bash for file operations** — always use bash commands (mv, cp, mkdir) for file operations. Never manually read and rewrite files that can be moved or copied with a shell command.
11. **Grep for reference searching** — always use grep to find references across the codebase. Never read full file contents just to search for a string.
12. **Batch related changes** — all related file changes must be done in one pass. Never make the same type of change to multiple files sequentially one at a time.

**Guardrails:**
1. Bug fix attempts — max 2, then ask owner
2. Standard phase summaries — files + one sentence each + owner actions
3. Checkpoints — one-line update at each milestone
4. Uncovered decisions — always stop and ask owner
5. New dependencies — lean towards asking, always ask for major packages
6. Design decisions not in CLAUDE.md — always stop and ask owner

**Git Rules:**
- Never push to `main`
- All development on `dev` branch
- Commit message format: `[Phase X] Description`
- Always get owner approval before committing

---

## Interview Sequence
Ask these questions one at a time. Wait for the owner's answer before asking the next question. Do not ask multiple questions at once.

### Section 1 — Business Identity
1. What is the business name?
2. What is the website domain?
3. Describe the business in 2-3 sentences — what do you sell or offer?
4. Who is your target customer?
5. What makes you different from competitors?
6. Do you have a tagline, or should we develop one together?

### Section 2 — Brand & Design
7. Describe the visual feel you want — light & airy, dark & moody, warm & rich, or something else?
8. What are your brand colors? (provide hex codes if known)
9. Font preference — all serif, serif headings with sans-serif body, or all sans-serif?
10. Animation preference — subtle, polished & interactive, or none?
11. Is there a reference website whose design you admire?

### Section 3 — Pages & Features
12. What pages does the site need? (e.g. homepage, shop, about, contact, blog)
13. Does the site need e-commerce / online payments?
14. Does the site need a booking system?
15. Does the site need a CMS for non-technical content management?
16. Are there any special features or tools needed? (e.g. calculators, configurators, custom forms)

### Section 4 — Products / Services (if applicable)
17. What are you selling — physical products, digital products, or services?
18. What variants or options do products have? (size, color, material, etc.)
19. How many products are you starting with?
20. How will you manage and update products — spreadsheet, manual entry, or API?

### Section 5 — Policies & Business Rules
21. What is your returns/refunds policy?
22. Do you offer shipping? If so, what are the rates and rules?
23. Where are you based? (for tax purposes)
24. Are there any special pricing rules or calculations?

### Section 6 — Contact & Business Info
25. What is the business address?
26. What is the phone number?
27. What is the email address?
28. What are the business hours?
29. What social media accounts exist?

### Section 7 — Technical Setup
30. Do you have a GitHub repo? If so, what is the URL?
31. Do you have a Stripe account?
32. Do you have a Sanity account?
33. Do you have a Vercel account?
34. Are there any other third-party integrations needed?

---

## File Generation
After the interview is complete, generate all 4 files in parallel:

### CLAUDE.md
Include:
- Project overview and domain
- Full tech stack (default unless changed)
- Environment variables (with placeholders)
- Brand identity (colors, fonts, logo path, design aesthetic)
- Folder structure
- Default Efficiency Rules (from this file)
- Default Guardrails (from this file)
- Git workflow and GitHub repo URL
- All business rules and pricing logic
- Contact information

### PRD.md
Include:
- Project summary and goals
- Every page with full section breakdown
- All features and user flows
- Navigation structure
- Footer content
- All policies
- Non-technical owner requirements
- Out of scope items

### SCHEMA.md
Include:
- All content types and fields
- All variant options with full lists
- Any pricing formulas with verified examples
- CMS implementation notes
- Import/bulk upload format if applicable

### PROGRESS.md
Include:
- Phase 1: Project Setup
- Phase 2: CMS & Data
- Phase 3: Core Layout (Navbar, Footer, UI components)
- Phase 4: Homepage
- Phase 5: Main feature pages
- Phase 6: Detail/dynamic pages
- Phase 7: Service/secondary pages
- Phase 8: Checkout/conversion flow
- Phase 9: Polish & Launch
- Each phase broken into specific file-level checklist items
- Owner actions clearly marked

---

## Handoff Message
After all files are generated, present this to the owner:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ PROJECT SETUP COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Generated files:
• CLAUDE.md — persistent memory and guardrails
• PRD.md — full product requirements
• SCHEMA.md — data schema and business rules
• PROGRESS.md — phase-by-phase build checklist

Also drop into your project:
• PROJECT_AGENT.md — runs automatically each session
• QA_AGENT.md — runs automatically after each phase
• HANDOFF_AGENT.md — reuse for future projects

Next steps:
1. Create GitHub repo and push all files to dev branch
2. Install Claude Code: npm install -g @anthropic-ai/claude-code
3. Run: claude --dangerously-skip-permissions
4. Claude Code will read PROJECT_AGENT.md and begin automatically

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Reuse Instructions
To use this agent for a new project:
1. Create a new project folder
2. Drop `HANDOFF_AGENT.md`, `PROJECT_AGENT.md`, and `QA_AGENT.md` into the root
3. Open Claude Code: `claude --dangerously-skip-permissions`
4. Say: "Read HANDOFF_AGENT.md and set up a new project"
5. Answer the interview questions
6. All 4 project `.md` files will be generated automatically
7. Claude Code will immediately begin Phase 1

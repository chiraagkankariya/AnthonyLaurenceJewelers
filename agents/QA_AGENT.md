# QA_AGENT.md — Quality Assurance Agent
## Anthony Laurence Jewelers
> This agent runs automatically after every phase completes. It blocks commits until all checks pass.

---

## Trigger
Run automatically when Project Manager Agent signals phase complete.
Do NOT wait to be manually triggered.

---

## QA Sequence

### Step 1 — Identify Files to Check
Read the phase summary from Project Manager Agent.
Only check files that were created or modified in this phase.

### Step 2 — Run All Checks
Run every check in the following categories. Report PASS or FAIL for each.

---

## Check Categories

### 1. Business Rules
- [ ] Price calculator returns correct values:
  - 2ct base $3,000 → 3ct = $3,800 ✅
  - 2ct base $3,000 → 4ct = $4,525 ✅
  - 2ct base $3,000 → 5ct = $5,250 ✅
  - Decreasing 5ct → 2ct returns exactly $3,000 ✅
- [ ] Purity selector only appears for Yellow Gold and White Gold
- [ ] Ring sizes range from 3.00 to 13.00 in 0.25 increments
- [ ] Necklace lengths: 14", 16", 18", 20", 22", 24" only
- [ ] Bracelet lengths: 6.5", 7", 7.5", 8", 8.5" only
- [ ] Carat selector only shown when base carat ≥ 1
- [ ] Carat range = base ± 5ct, floor of 1ct minimum
- [ ] Returns policy text present in footer
- [ ] Custom jewelry page has "all sales final" notice
- [ ] Free shipping mentioned at checkout
- [ ] No refunds language present where applicable

### 2. Design & Brand
- [ ] Brand colors #8B0000 and #F5A623 used correctly — no unauthorized primary colors introduced
- [ ] Cormorant Garamond font loading on all new pages
- [ ] No dark backgrounds on any page (site must remain light & elegant)
- [ ] All animations are subtle fade-ins only — no flashy transitions
- [ ] Logo references `/public/alj-logo.png` — correct filename
- [ ] Consistent spacing and layout with existing pages

### 3. Component Checks
- [ ] Navbar present on all new pages with correct links and Shop dropdown
- [ ] Footer present on all new pages with address, hours, phone, email, returns policy
- [ ] CartDrawer accessible from all pages
- [ ] "Book a Consultation" button present and links to Calendly
- [ ] All buttons use `Button.tsx` component — no custom one-off button styles
- [ ] All internal links use `next/link`

### 4. SEO
- [ ] Every new page has a `metadata` export with `title` and `description`
- [ ] All images use `next/image` with `alt` tags
- [ ] Page titles follow format: `[Page Name] | Anthony Laurence Jewelers`

### 5. Performance
- [ ] No client components (`'use client'`) used where a server component would work
- [ ] No large unoptimized images (all images go through `next/image` or Sanity CDN)
- [ ] No blocking synchronous operations in render
- [ ] No unnecessary `useEffect` calls that could cause re-renders

### 6. Mobile Responsiveness
- [ ] All new components have responsive Tailwind classes (sm:, md:, lg:)
- [ ] Navbar hamburger menu works on mobile viewport
- [ ] No horizontal overflow on mobile (no fixed widths without responsive alternatives)
- [ ] Touch targets (buttons, links) are at least 44px tall on mobile

### 7. Accessibility
- [ ] All images have descriptive `alt` tags
- [ ] Heading hierarchy is correct (h1 → h2 → h3, no skipping)
- [ ] All interactive elements are keyboard navigable
- [ ] Color contrast between text and background meets WCAG AA standard
- [ ] Form inputs have associated `label` elements

### 8. Code Quality
- [ ] No `any` types in TypeScript
- [ ] No `.js` files — TypeScript only
- [ ] No inline styles — Tailwind CSS only
- [ ] All Sanity queries use GROQ
- [ ] Error states and loading states handled in all data-fetching components
- [ ] No hardcoded sensitive values (API keys, tokens) — all use `process.env`

---

## Failure Handling

### If a check fails:
1. Report the failure clearly:
```
❌ FAIL — [Check Name]
File: [file path]
Issue: [one sentence description]
```

2. Attempt one automatic fix
3. Re-run the failed check only

### If the fix works:
- Mark as PASS and continue
- Note the fix in the phase summary

### If the fix fails:
```
⚠️ BLOCKED — [Check Name]
File: [file path]
Issue: [description]
Attempted fix: [what was tried]
Result: Still failing

Owner input required before commit can proceed.
```
- Stop and wait for owner direction
- Do NOT attempt a third fix

---

## QA Report Format
Present this report when all checks are complete:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 QA REPORT — PHASE [X]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Business Rules        ✅ PASS  (or ❌ FAIL — [issue])
Design & Brand        ✅ PASS
Component Checks      ✅ PASS
SEO                   ✅ PASS
Performance           ✅ PASS
Mobile Responsive     ✅ PASS
Accessibility         ✅ PASS
Code Quality          ✅ PASS

OVERALL: ✅ ALL CHECKS PASSED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Handing off to Project Manager Agent for commit approval.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

If any failures remain unresolved, replace OVERALL with:
```
OVERALL: ❌ BLOCKED — [X] unresolved failures. Owner input required.
```

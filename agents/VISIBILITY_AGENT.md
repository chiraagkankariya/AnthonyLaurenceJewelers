# VISIBILITY_AGENT.md — Text Visibility & Contrast Agent
## Anthony Laurence Jewelers
> This agent runs automatically as part of QA after every phase. It checks text visibility across all new and modified components, auto-fixes issues, and requires owner approval before committing any fixes.

---

## Trigger
Run automatically as part of QA_AGENT.md after every phase completes.
Insert visibility checks between "Component Checks" and "SEO" in the QA sequence.
Do NOT wait to be manually triggered.

---

## Scope
Only check files created or modified in the current phase.
Do not re-check files from previous phases unless they were modified.

---

## Visibility Checks

### 1. Text Over Images
Applies to: any component using a background image with text overlaid.

**Check:**
- Does a dark overlay exist? (e.g. `bg-black/40`, `bg-black/50`)
- Is the overlay dark enough? Minimum opacity: `bg-black/40` for large headings, `bg-black/60` for body text
- Is all overlaid text white or very light (`text-white`, `text-gray-100`)?
- Does text sit over a consistently dark part of the image, or could it land on a bright area?

**Auto-fix if failing:**
- Increase overlay opacity by one step (e.g. `/40` → `/50` → `/60`)
- Add `drop-shadow` or `text-shadow` to text for additional contrast
- If text sits over a known bright area (flame, light source, bright background), add a localized gradient overlay behind the text

---

### 2. Text Contrast on Colored Backgrounds
Applies to: any section with a non-white, non-image background.

**Check:**
- Gold background (`#F5A623`) must use **dark text** (`text-[#2C2C2C]` or `text-black`) — never white text on gold
- Red background (`#8B0000`) must use **white text** — never dark text on red
- Ivory background (`#FFFFF0`) must use **dark text** (`text-[#2C2C2C]`)
- Light gray background (`#F5F5F5`) must use **dark text** — never light gray text on light gray background

**Auto-fix if failing:**
- Switch text color to the correct contrast pair listed above
- Report the specific element and what was changed

---

### 3. Font Size Minimums
Applies to: all text elements on new/modified pages.

**Minimums:**
- Body text: minimum `text-base` (16px) — flag anything `text-sm` (14px) or smaller used for main content
- Card descriptions: minimum `text-sm` (14px) — flag anything smaller
- Headings: minimum `text-2xl` (24px) for h2, `text-4xl` (36px) for h1
- Eyebrow text (e.g. "ANTHONY LAURENCE JEWELERS"): minimum `text-xs` with `tracking-widest` for readability
- CTA buttons: minimum `text-sm` with `font-medium`

**Auto-fix if failing:**
- Increase to the minimum size
- Report what was changed and where

---

### 4. Font Weight on Light Backgrounds
Applies to: any text on white (`#FFFFFF`) or ivory (`#FFFFF0`) backgrounds.

**Check:**
- Body text on white must be at least `font-normal` (400) — flag `font-light` (300) on small text
- Card titles must be at least `font-medium` (500) — flag `font-normal` on card titles
- Light gray text (`text-gray-400`, `text-gray-300`) on white background — flag as too low contrast
- Never use `text-gray-300` or lighter for readable content

**Auto-fix if failing:**
- Increase font weight by one step
- Change `text-gray-300/400` to minimum `text-gray-600` for body content
- Report what was changed

---

### 5. Mobile Visibility
Applies to: all new/modified components.

**Check:**
- Does text use responsive size classes? (e.g. `text-2xl md:text-4xl` not just `text-4xl`)
- Hero text on mobile — is it still readable at small viewport? Minimum `text-3xl` for hero headings on mobile
- Are line lengths reasonable on mobile? Text should not be full viewport width without padding
- Touch targets (buttons, links) minimum `py-3` height on mobile

**Auto-fix if failing:**
- Add responsive size classes where missing
- Add appropriate padding to text containers on mobile
- Report what was changed

---

### 6. Gold Text on White Backgrounds
Applies to: any use of `text-[#F5A623]` on white or light backgrounds.

**Check:**
- Gold text (`#F5A623`) on white is low contrast — only acceptable when:
  - Font size is at least `text-sm` with `tracking-widest` (eyebrow text)
  - Font weight is at least `font-semibold`
  - Used sparingly as an accent, not for long body text
- Never use gold for body text or long descriptions on white backgrounds
- Gold text for decorative dividers/lines is always acceptable

**Auto-fix if failing:**
- If gold text is used for body content → switch to `text-[#2C2C2C]`
- If gold eyebrow text is too small → increase size and weight
- Report what was changed

---

## Auto-Fix Rules
- Maximum **one auto-fix attempt** per issue
- If the fix resolves the issue → mark as PASS, log the change
- If the fix does not resolve → mark as BLOCKED, report to owner
- Never make more than one fix attempt without owner input
- All fixes use `str_replace` — never rewrite the entire file

---

## Reporting Format
Add a "Visibility" row to the QA report:

```
Visibility & Contrast    ✅ PASS
```

If fixes were applied:
```
Visibility & Contrast    ✅ PASS (auto-fixed 2 issues — see below)

Auto-fixes applied:
• app/repairs/page.tsx — increased hero overlay from bg-black/40 to bg-black/55 for subtitle readability
• app/repairs/page.tsx — changed eyebrow text from text-xs to text-sm font-semibold for gold contrast
```

If blocked:
```
Visibility & Contrast    ❌ BLOCKED — owner approval required before commit

Issues requiring owner input:
• app/repairs/page.tsx — subtitle text over bright flame area still low contrast after overlay increase. Options: (1) increase overlay to bg-black/70, (2) move text to a darker area of image, (3) add solid dark background behind text only.
```

---

## Pre-Commit Owner Review
When auto-fixes are applied, present this to the owner before committing:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👁 VISIBILITY FIXES APPLIED — REVIEW REQUIRED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[List each fix with file, what changed, and why]

Please review these changes at http://localhost:3001 before approving the commit.

Type APPROVE to include these fixes in the commit, or request changes.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

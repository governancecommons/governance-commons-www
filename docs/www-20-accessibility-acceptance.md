# GC-WWW-20 — Accessibility and mobile acceptance record

Status: **PARTIAL — automated baseline verified; human/device acceptance outstanding**.
This record distinguishes measured facts, planned testing, and any decisions about residual findings. It is not a declaration of WCAG conformance.

## 1. Verified automated evidence

| Field | Evidence |
| --- | --- |
| Workflow | [Audit website accessibility and mobile layout](https://github.com/governancecommons/governance-commons-www/actions/runs/39805523903) |
| Run ID | `39805523903` |
| Source SHA | `0154c5a02e2fe9d6da0e9c9b1351e5be0499466b` |
| Outcome | **PASS**, 18/18 cases; 0 flagged cases |
| Browser | Headless Chromium through Playwright; `@axe-core/playwright`, WCAG 2 A/AA and WCAG 2.1 A/AA tags |
| Routes | `/`, `/about`, `/ecosystem`, `/observatory`, `/conformance`, `/standards/agent-dossier` |
| Viewport widths | 375, 768, 1280px |
| Automated checks | axe violations; language/main/skip-link presence; horizontal overflow; homepage skip-link keyboard first-tab |
| Evidence retention | Workflow artifact `www-18-browser-audit`: screenshots and `report.json` |

The test script uses `prefers-reduced-motion: reduce`, but does not independently prove all animations are suppressed. Passing axe is not proof that the site meets all WCAG success criteria. Tool limitations, untested interactions, additional routes and manual screen-reader behavior remain outside automated scope.

## 2. Human acceptance matrix (UNTESTED)

Use a new dated record for each test session. Never mark PASS solely from stylesheet inspection or a prior automated run.

| ID | Test | Minimum coverage | Status | Evidence or defect |
| --- | --- | --- | --- | --- |
| A11Y-01 | Tab / Shift+Tab / Enter / Escape, skip-link destination and visible focus | Home, standards, Observatory, conformance | NOT RUN | — |
| A11Y-02 | Keyboard operation of menus, filters and other interactive controls | Observatory and all routes with controls | NOT RUN | — |
| A11Y-03 | Screen reader reading order, headings, link purposes, control names and state announcements | NVDA + Firefox/Chrome or VoiceOver + Safari; representative routes | NOT RUN | — |
| A11Y-04 | Responsive layout, touch targets and navigation discoverability | 320, 375, 390, 768px; mobile device where possible | NOT RUN | — |
| A11Y-05 | Reflow and text zoom; no clipping, obscured content or unexpected scroll | 200% and 400% browser zoom | NOT RUN | — |
| A11Y-06 | Text and non-text contrast, focus indicators on light/dark surfaces | Contrast tooling on sampled controls/text | NOT RUN | — |
| A11Y-07 | Reduced motion preference, transitions, scroll behavior | OS reduced-motion setting enabled | NOT RUN | — |
| A11Y-08 | High-contrast/forced-colors support (where available) | Windows forced-colors mode | NOT RUN | — |

## 3. Session evidence template

- Date/time (UTC):
- Tester:
- Operating system and version:
- Browser and version:
- Assistive technology and version (if used):
- Device, viewport, zoom and motion/contrast preferences:
- Route(s) and test IDs:
- Result per test: PASS / FAIL / BLOCKED / NOT RUN
- Actual observation (keyboard sequence, reading order, screenshot or video reference):
- Issue link and severity if failed:
- Remediation and independent retest evidence:
- Accepted exception, decision-maker and rationale (if any):

## 4. Completion decision

- **Automated baseline:** VERIFIED for the named commit and 18 cases.
- **Manual/device acceptance:** NOT VERIFIED; required tests above need recorded evidence.
- **WCAG conformance:** NOT CLAIMED.
- **GC-WWW-20 closed:** NO. Close only when the required manual cases are tested, defects addressed or explicitly accepted, and an acceptance reviewer records a dated decision.

Related initial testing checklist: [WWW-18 browser accessibility checklist](www-18-browser-accessibility-checklist.md).

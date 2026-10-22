# WWW-18: Browser accessibility and mobile acceptance

This is an **unverified manual test protocol**, not a claim of WCAG conformance. Record device, browser, viewport, tester, date, actual observations, screenshots, failures, and follow-up issues.

## Keyboard and focus
- On each primary route, use keyboard only: Tab, Shift+Tab, Enter, Escape where applicable.
- Confirm the first focusable skip link becomes visible, takes focus to main content, and does not trap focus.
- Confirm every interactive link and button has a visible focus indicator on light and dark surfaces.
- Confirm anchored headings are visible beneath the fixed header after navigation.

## Mobile and zoom
- Exercise 320px, 375px, 390px, 768px, and desktop viewports.
- Confirm no text clipping, overlapping hero actions, blocked dialogs, unexpected horizontal document scrolling, or unusable horizontal navigation.
- Review at 200% and 400% browser zoom, with keyboard and touch.
- Check the navigation strip is discoverable and all links are operable without precision taps.

## Semantics and contrast
- Run a recognized browser accessibility audit (such as axe-core/Lighthouse) and record tool version and results.
- Verify heading hierarchy, landmark structure, accessible names, image alt text, form labels (when present), table headings, link purpose, and non-color status explanations.
- Test text, focus ring, and control contrast with a contrast checker; do not infer WCAG AA from the stylesheet alone.
- Confirm `prefers-reduced-motion: reduce` stops optional smooth scrolling and transition animation.

## Publishing verification
- Run the separate **Verify live Governance Commons publication** GitHub Action after deployment.
- Check the homepage, robots, sitemap, and five canonical Agent Dossier schema URLs.
- Inspect HTTPS certificate, GitHub Pages custom-domain settings, and DNS separately.
- RFC-0001 G-1 must remain open until its entire authoritative evidence checklist has been satisfied.

## Completion record
The work is complete only once browser/device runs are recorded, failures are fixed or accepted with written rationale, and any release-gating requirements are independently verified.

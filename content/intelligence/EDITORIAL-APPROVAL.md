# Intelligence editorial approval and publication boundary

Status: **design and operating procedure; automated authorization NOT implemented**.

## Roles and separation

1. Research automation discovers candidates and prepares unverified packets. It must have no write permission to production.
2. A researcher records source snapshots or excerpts, access timestamps, source reliability, and claim-to-evidence mappings. A resolving URL is not verification.
3. An editor checks factual claims, distinguishes reporting from GC interpretation, verifies rights/attribution, and records corrections or rejections.
4. A human with authorized repository permissions reviews the publication PR. A JSON `approval` field is **self-asserted metadata**, not proof of authenticated approval.
5. Publication must be gated by an authenticated GitHub PR review from a designated human, protected branch rules, and deployment from the reviewed merge commit. Until these controls are configured and tested, publishing remains manual and blocked for automation.

## Daily acceptance checklist

- [ ] Confirm report window in America/Los_Angeles and source publication times.
- [ ] Read primary documents and independently corroborate high-impact claims where possible.
- [ ] Capture source URLs, access timestamps, relevant evidence excerpts, and source limitations.
- [ ] Check every claim against its cited evidence, including numerical statistics and dates.
- [ ] Clearly label interpretation, opinion, vendor claims, and unverified reports.
- [ ] Check headlines for overstatement and identify conflicts of interest.
- [ ] Obtain an authenticated human PR approval; confirm reviewer is not an automation identity.
- [ ] Confirm checks passed on the exact merge candidate and verify deployed artifact.
- [ ] Record publication URL, time, commit SHA, and subsequent corrections.

## Current limitation

The `validate.mjs --publish` schema validator checks metadata completeness only. It cannot authenticate `approval.human_reviewer`, independently verify factual truth, or establish that a human approved a specific commit. **Do not enable automated publishing based on this validator alone.** The scheduled workflow generates artifacts only; it does not create articles, approve them, merge branches, or deploy.

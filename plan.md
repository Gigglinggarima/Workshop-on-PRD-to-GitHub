# Sunday Workshop — Project Plan

This plan turns the supplied PRD into a phased, testable project. It does not assume a technology stack, a specific jurisdiction, or access to government identity systems.

## Current project status

- **Portfolio prototype:** Implemented as a responsive, static HTML/CSS/JavaScript demo with overview, document vault, differences, next steps, and profile/preferences views. It uses fictional sample data and in-memory-only interactions.
- **Not implemented:** Real document upload, OCR, cross-document extraction, identity verification, government or third-party connections, persistent storage, authentication, or production security controls.
- **Next step:** Validate the user, jurisdiction, privacy/security requirements, document scope, and measurable acceptance thresholds before planning a real-data MVP.

## Phase 1 — Validate scope and risks

- Confirm the initial user group, launch geography, and document types.
- Review the linked mockup and map the end-to-end journey from document intake through mismatch review.
- Decide the initial intake method and verify whether any proposed integrations are authorized and feasible.
- Define consent, data minimization, retention, deletion, access control, and incident-response requirements for sensitive documents.
- Convert the north-star outcomes and counter-metric into measurable definitions.

**Exit criteria:** An agreed MVP scope, user journey, risk/requirements checklist, and measurement plan.

## Phase 2 — Specify and design the MVP

- Define the minimum fields to extract and compare, starting with the PRD's examples: name, date of birth, and address.
- Specify normalization rules and how to distinguish meaningful mismatches from harmless differences.
- Design the document dashboard, comparison results, alert detail, correction guidance, and user review controls.
- Define clear states for unreadable documents, uncertain extraction, missing fields, and failed processing.
- Validate the experience with representative users before committing to implementation.

**Exit criteria:** Reviewed design and acceptance criteria for document intake, extraction review, comparison, mismatch explanation, and history.

## Phase 3 — Build and evaluate the P0 consistency-check flow

- Select the technology stack and document-processing approach only after requirements and constraints are understood.
- Implement the agreed intake flow with explicit user consent and appropriate security controls.
- Extract the agreed fields and let users verify uncertain or incorrect extracted values.
- Compare fields across the supported document set and present the source documents and fields behind each result.
- Keep results explainable and avoid presenting low-confidence differences as confirmed errors.
- Evaluate extraction and mismatch quality using representative, consented or otherwise appropriately authorized test data.

**Exit criteria:** The P0 flow meets agreed quality, security, performance, and usability acceptance thresholds. Thresholds must be defined in Phase 1; the PRD does not specify numeric values.

## Phase 4 — Add guidance and dashboard capabilities

- **P1:** Prioritize alerts and provide clear, non-authoritative guidance on where a user may need to seek a correction.
- **P2:** Expand the unified dashboard, document review, and mismatch history.
- Re-check the false/harmless alert counter-metric after each capability is introduced.
- Consider B2B verification only after the individual-user experience, permissions, and organizational data boundaries are defined.

**Exit criteria:** Each release meets its own acceptance criteria and does not regress the accuracy, privacy, or user-control principles.

## Phase 5 — Release and learn

- Publish the supported scope, limitations, and data-handling information.
- Monitor processing reliability, response time, confirmed useful mismatches, user resolution, and false/harmless alerts.
- Collect user feedback and prioritize follow-up work based on evidence.
- Document any limitations clearly; do not claim government affiliation or unverified integrations.

**Exit criteria:** A measured release with an owner for support, issue response, and ongoing quality review.

## MVP acceptance checklist

- [ ] A user can provide documents through the approved intake method and understands what data will be processed.
- [ ] The system extracts only the agreed fields and communicates uncertainty.
- [ ] Users can review extracted values before relying on comparisons.
- [ ] A mismatch result identifies the compared documents and fields and explains the difference.
- [ ] Harmless variations are not presented as confirmed, actionable errors.
- [ ] Users remain in control of whether to pursue a correction.
- [ ] Documents, extracted data, and history are protected according to the approved security and retention requirements.
- [ ] Defined quality, performance, reliability, and usability thresholds are met.

## Dependencies and risks

- Sensitive identity documents require privacy and security decisions before real-user data is processed.
- Document formats, image quality, and language variation may affect extraction quality.
- Government or third-party data connections may be unavailable, unauthorized, or out of scope.
- Name and address differences can be legitimate; comparison rules need validation to avoid harmful false positives.
- Numeric success thresholds and product measurement definitions are not supplied in the PRD.

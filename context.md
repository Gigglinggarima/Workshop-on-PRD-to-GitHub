# Sunday Workshop — Product Context

## Product summary

Sunday Workshop is a proposed platform that helps people find meaningful inconsistencies across their government-issued identity documents before those differences cause delays, extra effort, or paperwork. It brings document information into a central dashboard, explains notable mismatches, and helps users understand possible next steps.

This is a product concept and project starting point, not a government service or a government-issued identity document.

The repository now includes an interactive, static portfolio prototype branded IDSync. The prototype illustrates the review experience and a fictional profile/preferences view with sample data only; it does not process or store identity documents.

## Problem

Information across official identity documents can differ because of manual errors or other changes. People may not notice these differences until they need to complete a form or correct a document, when resolving them can take additional time and effort.

The product should help users identify relevant differences early, understand why they may matter, and decide whether to take action.

## Goals

- Identify meaningful mismatches among government-authorized identity documents.
- Provide a centralized place to review documents and compare relevant information.
- Help users cross-check information when filling out forms.
- Provide timely, useful alerts about document-related actions.

## Non-goals

- Issuing, replacing, or acting as a government identity document.
- Raising false, irrelevant, or unactionable mismatch alerts.
- Making correction decisions on a user's behalf.

## Intended product capabilities

1. **Cross-document consistency checks (P0)** — Extract relevant information and compare fields such as name, date of birth, and address across documents.
2. **Mismatch alerts and correction guidance (P1)** — Prioritize meaningful discrepancies, explain their potential impact, and suggest appropriate next steps.
3. **Unified document dashboard (P2)** — Let users review their documents, extracted information, and mismatch history in one place.

The PRD's RICE-inspired prioritization rates consistency checks highest, followed by alerts and guidance, then the dashboard. The priority labels above reflect that ordering; the PRD does not provide numeric RICE scores.

## Users and control

The PRD does not define a detailed persona or user journey. The initial audience is people who need to keep information consistent across multiple official identity documents. Users should be able to review detected differences and decide for themselves whether to pursue corrections.

Potential B2B adoption for document-data verification is a success measure, but the PRD does not define an organizational user journey or enterprise feature scope.

## Product principles and requirements

- **Accuracy:** Extracted data and comparisons should be relevant and minimize false alerts.
- **Transparency:** Show which documents and fields were compared, what differed, and why it may matter.
- **User agency:** Keep review and corrective decisions in the user's hands.
- **Privacy and security:** Protect sensitive documents and personal information throughout storage and processing.
- **Reliability:** Preserve documents, mismatch history, and the ability to re-check information.
- **Usability and performance:** Make upload, review, and comparison understandable and responsive without requiring technical knowledge.

## Success measures

**North-star outcomes**

- Meaningful mismatches identified and resolved by users.
- Reduced average time and cost to correct document mismatches.
- B2B organizations adopting the platform for document-data verification.

**Counter-metric**

- Percentage of flagged mismatches later confirmed to be valid or harmless differences.

Metrics need operational definitions and measurement methods before they can be used to judge a release.

## Source and open questions

This context is derived from `PRD- Sunday Workshop Identity platform (1).docx`.

The PRD links to a design reference: [Sunday Workshop mockup in Google Stitch](https://stitch.google.com/projects/13315518883121921507?pli=1).

The supplied web and mobile screen concepts are included under `Prototype Screens/`. They inform the prototype's visual language and example journeys, but they are not evidence of implemented capabilities. Claims in those source mockups about encryption, compliance, ephemeral processing, matching accuracy, integrations, or correction timelines are not verified by this project.

The following are not decided in the PRD and should be resolved before implementation commitments:

- Initial launch geography, supported document types, and languages.
- Whether the first version accepts uploads, connects to authorized data sources, or both.
- Applicable legal, consent, retention, deletion, and data-residency requirements.
- The identity of any B2B customer and the boundaries between individual and organizational data.
- The implementation stack, hosting environment, OCR/extraction approach, and evaluation dataset.
- Quantitative definitions for accuracy, response time, adoption, and successful resolution.
- Detailed personas, accessibility needs, and end-to-end user journeys.

Do not represent integrations, compliance certifications, or extraction accuracy as available until they have been implemented and verified.

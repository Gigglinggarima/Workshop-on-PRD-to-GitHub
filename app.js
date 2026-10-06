const documents = [
  { id: "national-id", name: "National identity card", code: "ID •••• 2048", date: "Added 12 May 2026", state: "In demo vault", icon: "▣", kind: "Identity" },
  { id: "tax-card", name: "Tax identity card", code: "TX •••• 7316", date: "Added 12 May 2026", state: "In demo vault", icon: "▤", kind: "Tax" },
  { id: "passport", name: "Passport", code: "PP •••• 1182", date: "Added 18 May 2026", state: "In demo vault", icon: "✈", kind: "Travel" },
];

const mismatches = [
  {
    id: "middle-initial",
    status: "attention",
    label: "Needs your review",
    title: "Middle initial appears on one document",
    description: "The identity card includes a middle initial; the tax card does not. This can be a formatting difference or a record discrepancy. Check the original records before deciding whether it needs action.",
    left: "ID card · A. Morgan",
    right: "Tax card · Alex Morgan",
    updated: "Today",
  },
  {
    id: "address-format",
    status: "review",
    label: "Formatting difference",
    title: "Street type is written differently",
    description: "One sample address uses “Street” and another uses “St.” Other address components match in this demo. Review the complete address to confirm whether this is only an abbreviation.",
    left: "ID card · 18 North Street",
    right: "Passport · 18 North St.",
    updated: "Yesterday",
  },
  {
    id: "birth-date",
    status: "resolved",
    label: "Reviewed",
    title: "Date of birth matches across documents",
    description: "The sample date is consistent across the three fictional documents. No correction is suggested by this example.",
    left: "ID card · 12 Aug 1992",
    right: "Tax card · 12 Aug 1992",
    updated: "18 May",
  },
];

const statusLabel = { attention: "Needs your review", review: "Formatting difference", resolved: "Reviewed", dismissed: "Dismissed" };
const statusClass = { attention: "status-attention", review: "status-review", resolved: "status-resolved", dismissed: "status-dismissed" };
const app = document.querySelector("#app");
const dialog = document.querySelector("#demo-dialog");
const toast = document.querySelector("#toast");
let currentFilter = "all";
let toastTimer;
let sampleAlertsEnabled = true;

function pageHeading(eyebrow, title, description, action = "") {
  return `<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p class="page-description">${description}</p></div>${action}</div>`;
}

function mismatchCard(item, detailed = false) {
  const actions = item.status !== "attention" && item.status !== "review"
    ? `<button class="button button-secondary button-small" type="button" data-action="details" data-id="${item.id}">View details</button>`
    : `<button class="button button-primary button-small" type="button" data-action="review" data-id="${item.id}">Mark reviewed</button><button class="button button-secondary button-small" type="button" data-action="details" data-id="${item.id}">Why was this flagged?</button>`;
  return `<article class="mismatch-card">
    <div class="mismatch-topline"><span class="status-badge ${statusClass[item.status]}">${statusLabel[item.status]}</span><span class="mismatch-date">${item.updated}</span></div>
    <h3>${item.title}</h3><p>${item.description}</p>
    <div class="comparison-strip"><span class="comparison-value">${item.left}</span><span class="comparison-arrow" aria-hidden="true">→</span><span class="comparison-value">${item.right}</span></div>
    ${detailed ? `<div class="card-actions">${actions}${item.status === "attention" || item.status === "review" ? `<button class="button button-danger-quiet button-small" type="button" data-action="dismiss" data-id="${item.id}">Dismiss</button>` : ""}</div>` : ""}
  </article>`;
}

function documentRows() {
  return documents.map((doc) => `<div class="document-row">
    <span class="document-type-icon" aria-hidden="true">${doc.icon}</span>
    <span class="document-copy"><strong>${doc.name}</strong><small>${doc.code} · ${doc.date}</small></span>
    <span class="document-state">${doc.state}</span>
  </div>`).join("");
}

function renderOverview() {
  const openCount = mismatches.filter((item) => item.status === "attention" || item.status === "review").length;
  const handledCount = mismatches.filter((item) => item.status === "resolved" || item.status === "dismissed").length;
  app.innerHTML = `${pageHeading("A CLEARER VIEW OF YOUR RECORDS", "Good afternoon, Alex", "A calm place to review what matches, what may need a closer look, and what you want to do next.", `<a class="button button-primary" href="#mismatches">Review differences <span aria-hidden="true">→</span></a>`)}
    <section class="overview-grid" aria-label="Identity overview">
      <article class="panel hero-panel"><div class="hero-content"><p class="eyebrow">YOUR DOCUMENT CHECK-IN</p><h2>Know what differs before it becomes a paperwork surprise.</h2><p class="page-description">Review a sample comparison across your documents. You stay in charge of what matters and whether to take action.</p><div class="hero-actions"><a class="button button-primary" href="#mismatches">Review ${openCount} sample ${openCount === 1 ? "difference" : "differences"} <span aria-hidden="true">→</span></a><a class="button button-secondary" href="#documents">View sample documents</a></div></div></article>
      <article class="panel summary-panel"><div class="summary-panel-header"><strong>Sample profile snapshot</strong><span>Illustrative only</span></div><div class="score-row"><div class="score-ring" aria-label="${openCount} sample items to review"><span>${openCount}</span></div><div class="score-copy"><strong>Examples to review</strong><p>Review the sample cards to decide what, if anything, needs attention.</p></div></div><p class="summary-note"><strong>Not a verification score.</strong> This snapshot describes only the fictional examples in this prototype.</p></article>
    </section>
    <section class="stats-grid" aria-label="Sample overview counts">
      <article class="stat-card"><div class="stat-top"><span>Sample documents</span><span class="stat-icon" aria-hidden="true">▤</span></div><div class="stat-value">${documents.length}</div><div class="stat-sub">Fictional records in this demo</div></article>
      <article class="stat-card"><div class="stat-top"><span>To review</span><span class="stat-icon" aria-hidden="true">≋</span></div><div class="stat-value">${mismatches.filter((item) => item.status === "attention" || item.status === "review").length}</div><div class="stat-sub">Examples, not detected issues</div></article>
      <article class="stat-card"><div class="stat-top"><span>Handled</span><span class="stat-icon" aria-hidden="true">✓</span></div><div class="stat-value">${handledCount}</div><div class="stat-sub">Demo session state only</div></article>
    </section>
    <section class="content-grid">
      <article class="panel section-panel"><div class="section-heading"><h2>Differences to look at</h2><a class="text-button" href="#mismatches">See all</a></div><div class="mismatch-list">${mismatches.filter((item) => item.status === "attention" || item.status === "review").map((item) => mismatchCard(item)).join("") || `<div class="empty-state">No examples need your review.</div>`}</div></article>
      <article class="panel section-panel"><div class="section-heading"><h2>Documents in this demo</h2><a class="text-button" href="#documents">View vault</a></div><div class="document-list">${documentRows()}</div><p class="document-disclaimer">These are made-up document labels and masked identifiers. No identity documents are present.</p></article>
    </section>
    <section class="principle-strip" aria-label="Design principles">
      <article class="principle-item"><span class="principle-icon" aria-hidden="true">◎</span><div><strong>Explain the difference</strong><p>Show what was compared and why it may matter.</p></div></article>
      <article class="principle-item"><span class="principle-icon" aria-hidden="true">↗</span><div><strong>Keep decisions with you</strong><p>A prompt to review is not a verdict or correction.</p></div></article>
      <article class="principle-item"><span class="principle-icon" aria-hidden="true">◇</span><div><strong>Design for data care</strong><p>Privacy and security need to be proven before launch.</p></div></article>
    </section>`;
}

function renderMismatches() {
  const shown = mismatches.filter((item) => currentFilter === "all" || item.status === currentFilter);
  app.innerHTML = `${pageHeading("REVIEW, DON'T ASSUME", "Differences &amp; history", "Each card explains what differs in the sample and leaves the interpretation and next step to you. A difference is not automatically an error.", `<button class="button button-secondary" type="button" data-action="privacy">About sample results</button>`)}
    <div class="toolbar"><div class="filter-tabs" aria-label="Filter examples">
      ${[["all", "All examples"], ["attention", "Needs review"], ["review", "Formatting"], ["resolved", "Reviewed"], ["dismissed", "Dismissed"]].map(([filter, label]) => `<button class="filter-tab" type="button" data-filter="${filter}" aria-pressed="${currentFilter === filter}">${label}${filter === "all" ? ` · ${mismatches.length}` : ""}</button>`).join("")}
    </div><span class="section-kicker">${shown.length} sample ${shown.length === 1 ? "item" : "items"}</span></div>
    <div class="inline-note"><strong>How to read this:</strong> results shown here are hand-authored examples, not produced by document analysis. Always check the original records and use an authorized official source for corrections.</div>
    <section class="mismatch-page-list" aria-label="Sample differences" style="margin-top:12px">${shown.length ? shown.map((item) => mismatchCard(item, true)).join("") : `<div class="empty-state">There are no examples in this filter yet.</div>`}</section>`;
}

function renderDocuments() {
  const cards = documents.map((doc) => `<article class="panel document-card">
    <div class="document-card-top"><span class="document-type-icon" aria-hidden="true">${doc.icon}</span><div class="document-card-copy"><h3>${doc.name}</h3><p>${doc.code}</p></div><span class="status-badge status-consistent">Sample</span></div>
    <div class="document-details"><div><div class="detail-label">Sample category</div><div class="detail-value">${doc.kind}</div></div><div><div class="detail-label">Demo entry</div><div class="detail-value">Fictional</div></div></div>
    <div class="document-card-foot"><span>${doc.date}</span><span>Not a real document</span></div>
  </article>`).join("");
  app.innerHTML = `${pageHeading("A SMALL, FICTIONAL VAULT", "Documents", "The screen designs envision a unified document dashboard. This portfolio demo contains labels only; it has no upload, camera, connection, or storage capability.", `<button class="button button-primary" type="button" data-action="add-sample">＋ Add sample record</button>`)}
    <div class="inline-note"><strong>No sensitive files accepted.</strong> The “add sample record” action adds a made-up entry to this browser session only. It does not select, read, upload, or save a file.</div>
    <section class="documents-grid" aria-label="Fictional sample document list" style="margin-top:13px">${cards}</section>
    <section class="panel section-panel" style="margin-top:14px"><div class="section-heading"><h2>Designed around user control</h2><span class="section-kicker">Product intent from the PRD</span></div><div class="principle-strip" style="margin-top:0"><article class="principle-item"><span class="principle-icon" aria-hidden="true">1</span><div><strong>Review extracted details</strong><p>Any future extraction would need a clear confirmation step.</p></div></article><article class="principle-item"><span class="principle-icon" aria-hidden="true">2</span><div><strong>Understand comparisons</strong><p>Show the exact fields and source records behind a result.</p></div></article><article class="principle-item"><span class="principle-icon" aria-hidden="true">3</span><div><strong>Choose whether to act</strong><p>Users, not this concept, control correction decisions.</p></div></article></div></section>`;
}

function renderGuidance() {
  app.innerHTML = `${pageHeading("INFORMATION, NOT ADVICE", "Possible next steps", "A real product could help people prepare for an official correction process. This concept does not validate eligibility, provide legal advice, or submit requests.", `<a class="button button-secondary" href="#mismatches">Back to differences</a>`)}
    <section class="guidance-grid">
      <article class="panel guidance-card"><p class="eyebrow">SAMPLE CHECKLIST · MIDDLE INITIAL</p><h2>Before you decide to change anything</h2><p>Use the fictional name example to explore a careful, user-led path. The right process depends on your document issuer and location.</p>
        <ol class="checklist">
          <li><span class="step-number">1</span><div><strong>Check the original records</strong><p>Compare the names exactly as printed on the documents you already hold. Confirm whether the initial is intentional.</p></div></li>
          <li><span class="step-number">2</span><div><strong>Consider whether the difference matters</strong><p>A middle initial can be a harmless formatting difference. Do not assume a mismatch is an error or needs correction.</p></div></li>
          <li><span class="step-number">3</span><div><strong>Find the issuing authority's official instructions</strong><p>Use an official source for current requirements, evidence, fees, and timelines. Avoid relying on third-party claims.</p></div></li>
          <li><span class="step-number">4</span><div><strong>Choose your next step</strong><p>You decide whether to contact the issuer, gather documents, or leave a harmless difference as it is.</p></div></li>
        </ol>
        <div class="guidance-callout"><strong>Illustrative guidance only</strong>This checklist is not jurisdiction-specific and does not link to an issuer or start a correction request.</div>
      </article>
      <aside class="panel side-info"><p class="eyebrow">WHAT THIS CONCEPT DOES NOT DO</p><h3>You remain the decision-maker.</h3><p>IDSync is not an issuing authority. It does not alter records, recommend a specific correction route, or guarantee acceptance by a bank, employer, or government office.</p><div class="step-list"><div><strong>Check the source</strong><p>Only the relevant issuer can confirm its official requirements.</p></div><div><strong>Protect your information</strong><p>Do not share identity documents with this portfolio demo.</p></div><div><strong>Review every flag</strong><p>Differences can be valid, harmless, or caused by incomplete information.</p></div></div></aside>
    </section>`;
}

function renderProfile() {
  const reviewed = mismatches.filter((item) => item.status === "resolved" || item.status === "dismissed").length;
  const switchState = sampleAlertsEnabled ? "true" : "false";
  app.innerHTML = `${pageHeading("SAMPLE ACCOUNT · NOT A REAL IDENTITY", "Profile &amp; preferences", "A profile-style workspace inspired by the supplied mobile concept. Every detail and document below is fictional demo content.", `<button class="button button-secondary" type="button" data-action="privacy">About this demo</button>`)}
    <section class="profile-overview">
      <article class="panel profile-identity">
        <div class="profile-avatar-large" aria-hidden="true">AM</div>
        <div class="profile-identity-copy"><span class="status-badge status-review">Fictional sample</span><h2>Alex Morgan</h2><p>Demo profile · No account or identity verification</p></div>
        <div class="profile-identity-note"><span aria-hidden="true">i</span> Profile details are illustrative and aren't connected to a real person.</div>
      </article>
      <article class="panel profile-summary">
        <div class="section-heading"><h2>Review snapshot</h2><span class="section-kicker">Sample data</span></div>
        <div class="profile-metrics"><div><strong>${documents.length}</strong><span>example records</span></div><div><strong>${reviewed}</strong><span>items reviewed</span></div><div><strong>${mismatches.filter((item) => item.status === "attention" || item.status === "review").length}</strong><span>to look at</span></div></div>
        <a class="text-button" href="#mismatches">Open differences &amp; history →</a>
      </article>
    </section>

    <section class="profile-layout">
      <div class="profile-main-column">
        <article class="panel section-panel">
          <div class="section-heading"><div><h2>Linked document vault</h2><p class="section-kicker">Example entries only · No files linked</p></div><a class="text-button" href="#documents">Manage samples</a></div>
          <div class="document-list">${documentRows()}</div>
          <p class="document-disclaimer">The labels and masked values are fictional. This prototype cannot connect to an issuer or read uploaded documents.</p>
        </article>

        <article class="panel section-panel profile-audit">
          <div class="section-heading"><div><h2>Consistency &amp; review activity</h2><p class="section-kicker">Hand-authored example history</p></div><a class="text-button" href="#mismatches">View all</a></div>
          ${mismatches.map((item) => `<div class="activity-row"><span class="activity-mark ${statusClass[item.status]}" aria-hidden="true">${item.status === "resolved" ? "✓" : item.status === "dismissed" ? "–" : "!"}</span><div class="activity-copy"><strong>${item.title}</strong><small>${item.updated} · Example only</small></div><span class="status-badge ${statusClass[item.status]}">${statusLabel[item.status]}</span></div>`).join("")}
          <div class="profile-note">No audit certificate, sync, or verification is generated by this demo.</div>
        </article>
      </div>

      <aside class="profile-side-column">
        <article class="panel section-panel">
          <div class="section-heading"><div><h2>Privacy &amp; data</h2><p class="section-kicker">What this prototype actually does</p></div></div>
          <div class="privacy-fact"><span class="principle-icon" aria-hidden="true">◇</span><div><strong>No document upload</strong><p>This demo has no file picker, camera, or document connection.</p></div></div>
          <div class="privacy-fact"><span class="principle-icon" aria-hidden="true">⌁</span><div><strong>No account or backend</strong><p>Example records and review actions exist only in this page session.</p></div></div>
          <div class="privacy-fact"><span class="principle-icon" aria-hidden="true">!</span><div><strong>Not a security certification</strong><p>Real-data privacy and security requirements still need validation.</p></div></div>
        </article>

        <article class="panel section-panel">
          <div class="section-heading"><div><h2>Preferences &amp; support</h2><p class="section-kicker">Demo-only settings</p></div></div>
          <div class="preference-row"><div><strong>Sample alert preview</strong><p>Demo-only preference; no notifications are sent.</p></div><button class="demo-switch" type="button" role="switch" aria-checked="${switchState}" aria-label="Sample alert preview" data-action="toggle-sample-alerts"><span></span></button></div>
          <div class="preference-row"><div><strong>Official correction directory</strong><p>No issuer links are configured for this prototype.</p></div><span class="preference-state">Not connected</span></div>
          <button class="button button-secondary profile-support-button" type="button" data-action="privacy">Read demo limitations</button>
        </article>
      </aside>
    </section>`;
}

function render() {
  const page = location.hash.slice(1) || "overview";
  const validPage = ["overview", "documents", "mismatches", "guidance", "profile"].includes(page) ? page : "overview";
  const titles = { overview: "Overview", documents: "Documents", mismatches: "Differences", guidance: "Next steps", profile: "Profile" };
  document.querySelector("#breadcrumb-current").textContent = titles[validPage];
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const active = link.dataset.nav === validPage;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  if (validPage === "documents") renderDocuments();
  else if (validPage === "mismatches") renderMismatches();
  else if (validPage === "guidance") renderGuidance();
  else if (validPage === "profile") renderProfile();
  else renderOverview();
  window.scrollTo(0, 0);
}

function announce(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2800);
}

function openAboutDialog() {
  showDialog("About this demo", "A PORTFOLIO CONCEPT", "i", [
    "This interactive prototype uses fictional names and document details to demonstrate a possible review experience. It does not accept, store, extract, compare, or transmit identity documents.",
    "Privacy, security, supported documents, correction routes, and accuracy targets would need to be defined and validated before building a real service. This project is not affiliated with or endorsed by a government agency.",
  ], "Got it");
}

function showDialog(title, eyebrow, symbol, paragraphs, confirmLabel) {
  document.querySelector("#dialog-title").textContent = title;
  document.querySelector("#demo-dialog .dialog-symbol").textContent = symbol;
  document.querySelector("#demo-dialog .eyebrow").textContent = eyebrow;
  const content = document.querySelector("#dialog-content");
  content.replaceChildren(...paragraphs.map((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
  }));
  document.querySelector("#dialog-confirm").textContent = confirmLabel;
  dialog.showModal();
}

function updateMismatch(id, status) {
  const item = mismatches.find((entry) => entry.id === id);
  if (!item) return;
  item.status = status;
  item.updated = "Just now";
  render();
  announce(status === "resolved" ? "Marked as reviewed in this demo session." : "Dismissed for this demo session.");
}

document.addEventListener("click", (event) => {
  const filter = event.target.closest("[data-filter]");
  if (filter) {
    currentFilter = filter.dataset.filter;
    renderMismatches();
    return;
  }
  const control = event.target.closest("[data-action]");
  if (!control) return;
  const { action, id } = control.dataset;
  if (action === "review") updateMismatch(id, "resolved");
  else if (action === "dismiss") updateMismatch(id, "dismissed");
  else if (action === "details") {
    const item = mismatches.find((entry) => entry.id === id);
    if (item) {
      showDialog(item.title, "WHY THIS EXAMPLE APPEARS", "?", [
        item.description,
        "In a real product, a result should identify the source documents, compared fields, and any uncertainty. This is a fictional example only.",
      ], "Close");
    }
  } else if (action === "privacy") {
    openAboutDialog();
  } else if (action === "go-mismatches") location.hash = "mismatches";
  else if (action === "toggle-sample-alerts") {
    sampleAlertsEnabled = !sampleAlertsEnabled;
    renderProfile();
    announce(`Sample alert preview ${sampleAlertsEnabled ? "enabled" : "disabled"} for this page session only.`);
  }
  else if (action === "add-sample") {
    if (documents.some((doc) => doc.id === "sample-record")) {
      announce("The sample record is already in this demo vault.");
      return;
    }
    documents.push({ id: "sample-record", name: "Example residence card", code: "EX •••• 0000", date: "Added just now", state: "Demo session only", icon: "▧", kind: "Example" });
    renderDocuments();
    announce("Added a fictional sample record in memory only.");
  }
});

window.addEventListener("hashchange", render);
render();

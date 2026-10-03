# BaMo Company Portfolio

Business portfolio for https://businessportfolio.bahaymo.com/.

**Mission:** Making innovation accessible to Philippine real estate.
BaMo is the company and broader platform. BayMo is its AI assistant.
This repository does not control the consumer website at bamo.bahaymo.com.

## Files

- `index.html`: company narrative, platform screenshots, ecosystem, traction, technology, business model, founder, vision, summit and partnerships.
- `styles.css`: existing responsive brand design plus portfolio additions.
- `script.js`: navigation, lightbox, scroll effects, existing contact form and inquiry dialogs.
- `assets/`: existing brand, product screenshots, founder portrait and concept artwork.
- `scripts/build.mjs`: dependency-free markup, local-link and asset checks; static output generation.
- `vercel.json`: build command and output directory.

## Validation and deployment

Node.js is required. No third-party dependencies or installation are needed.

```sh
npm run lint
npm run build
```

Lint checks JavaScript syntax, balanced HTML elements, duplicate IDs, the H1, anchor targets and local assets. Build repeats the checks and copies the deployable site to `dist/`. Vercel deploys that directory; any static host can also serve the source files directly.

Verify desktop, tablet and mobile layouts, menu behavior, image zoom, inquiry pathways, and form validation/error/success feedback. Use a local fetch mock so testing does not create real leads or send notifications.

## Current versus planned

Screenshots illustrate the existing operating platform. Learning programs, community initiatives, broader marketplace development and additional revenue opportunities are labeled planned or in development. Innovation in Action Summit 2026 is planned for November 11, 2026 in Lipa City, Batangas. Venue details, registration, speakers, agenda and sponsorship packages await confirmation. No speakers, sponsors or new revenue figures are claimed.

## Operating metrics

Published counts and rates are preserved. Commit `503a0a32ed70a7b475178abae0fa2a4d6e6de24d` identifies the snapshot as September 10, 2026 and explains the AI-versus-human comparison as first-responder cohorts. The previous footnote described an older dataset and has been replaced. Automated follow-ups are measured separately (218 replies within 48 hours / 1,307 follow-ups). Results are historical observations, not live counters or performance guarantees. Refresh only from verified data with an explicit date and methodology.

## Contact delivery

Both existing forms submit to the unchanged n8n lead-intake webhook in `script.js`, with `sourcePage: "portfolio"`. New partner buttons reuse existing inquiry categories: Partnership, Product demo, Grant / innovation program and Request Investor Deck. The founder CTA retains Talk to the Founder. No backend behavior was changed.

HTTP acceptance does not verify the private workflow's email delivery. Confirm the intended recipient remains `kathytalabis@bahaymo.com` in n8n. Never commit email credentials.

## Preserved assets and scope

Screenshots remain interactive and privacy blurred. Katherine's portrait and existing contact links are retained. Vision artwork remains labeled a concept, not an existing facility. Unverified technology-vendor claims from the previously hidden section are not presented as a verified stack.

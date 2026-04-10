# ClassPulse

ClassPulse is a shared behavior documentation and response system for school teams. It is designed for internal use by teachers, specials staff, and administrators to review behavior patterns, data quality, and planning follow-up needs.

## Who this is for

- School administrators overseeing behavior documentation quality.
- Specials teams (Art, Music, PE, Library, Technology) tracking patterns and consistency.
- Grade-level and intervention teams reviewing planning needs for students with repeated incidents.

## Current status

- Front-end application built with Vite + React 18.
- Static prototype data is centralized in `src/data/staticData.js`.
- Data integration boundary is now handled by `src/hooks/useDashboardData.js`.
- Two operating modes:
  - **Admin dashboard** (system tabs for trends, coverage, outcomes, planning).
  - **Classroom explorer** (class-level review with no-data handling).
- Netlify-ready configuration included.

## Local development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Build production bundle:
   ```bash
   npm run build
   ```
4. Preview built app locally:
   ```bash
   npm run preview
   ```

## Live data architecture

ClassPulse is set up for this production data flow:

Google Form  
→ linked Google Sheet  
→ Google Apps Script Web App (JSON endpoint)  
→ ClassPulse React app

### Important boundary rules

- The Google Form is for submission only.
- The linked Google Sheet is the response store.
- The React app should consume the Apps Script JSON endpoint.
- The React app should **not** call Google Form URLs or raw Google Sheet URLs directly.

## Configuring static vs live mode

`src/config.js` controls whether the dashboard runs from prototype data or live data.

```js
export const USE_LIVE_DATA = false;
export const LIVE_DATA_URL = '';
```

- `USE_LIVE_DATA = false` uses local prototype data from `src/data/staticData.js`.
- `USE_LIVE_DATA = true` fetches from `LIVE_DATA_URL`, then normalizes and transforms rows in-app.

## Apps Script endpoint contract (planned)

The Apps Script Web App is not implemented in this repository yet. When it is added, ClassPulse expects a JSON payload containing raw incident rows.

Preferred response shape:

```json
{
  "rows": [
    {
      "timestamp": "2026-03-18T14:20:00.000Z",
      "incidentDate": "2026-03-18",
      "incidentTime": "10:15 AM",
      "specials": "PE",
      "grade": "4",
      "classroom": "4A - Chen",
      "student": "Restricted-101",
      "behavior": "Disruption; Peer conflict",
      "trigger": "Transition from hallway",
      "followUp": "Teacher conference",
      "homeContact": "Yes",
      "chartUsed": "No"
    }
  ]
}
```

Notes on contract expectations:

- Return **raw incident rows** from Apps Script rather than pre-aggregated dashboard objects.
- Keep normalization and transformations in the React app (`normalizeRows.js`, `buildDashboardData.js`) to keep logic visible and versioned.
- Allow field-name variation where possible; the normalization layer already handles common naming differences.

## Data pipeline in this repo

- `src/hooks/useDashboardData.js`: app data boundary (load static or live).
- `src/lib/fetchLiveData.js`: fetch helper for endpoint calls.
- `src/lib/normalizeRows.js`: row cleanup and normalization for messy form data.
- `src/lib/buildDashboardData.js`: derives dashboard datasets from normalized rows.
- `src/lib/dateUtils.js`: date parsing, week labels, week sorting, and time confidence helpers.

## Restricted student data note

Student-level sections are marked as restricted planning views. Keep these views limited to authorized staff and avoid sharing identifiable records outside school intervention workflows.

# ClassPulse

ClassPulse is a shared behavior documentation and response system for school teams. It is designed for internal use by teachers, specials staff, and administrators to review behavior patterns, data quality, and planning follow-up needs.

## Who this is for

- School administrators overseeing behavior documentation quality.
- Specials teams (Art, Music, PE, Library, Technology) tracking patterns and consistency.
- Grade-level and intervention teams reviewing planning needs for students with repeated incidents.

## Current status

- Front-end application built with Vite + React 18.
- Static prototype data centralized in `src/data/dashboardData.js`.
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

## Netlify deployment

This repository includes `netlify.toml` with:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback redirect to `/index.html`

Deploy options:

1. Connect this repository to Netlify and use default detected settings.
2. Or deploy manually after build by uploading the `dist` folder.

## Future Google Sheets integration plan

Planned next phase:

- Replace static exports in `src/data/dashboardData.js` with a data adapter layer.
- Add a lightweight transform step to map Sheets columns to dashboard keys.
- Include refresh status and error state for missing/invalid sheet rows.
- Preserve current component and view boundaries so UI code remains stable during data-source swap.

## Restricted student data note

Student-level sections are marked as restricted planning views. Keep these views limited to authorized staff and avoid sharing identifiable records outside school intervention workflows.

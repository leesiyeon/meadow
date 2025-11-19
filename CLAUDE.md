# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Meadow** is a web accessibility automatic diagnostic service that allows developers to check website accessibility issues by simply entering a URL. This is a free service providing immediate accessibility diagnostics without installation.

**Target Users**: Web developers, frontend developers
**Core Value**: Instant accessibility checking with Korean language guidance based on axe-core

## Technology Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- Next.js API Routes
- axe-core (accessibility testing engine)
- Playwright (browser automation)

### Hosting
- Vercel

**Note**: This is a prototype version. No database is required - all analysis is performed on-demand and results are stored only in client memory.

## Project Commands

### Initial Setup
```bash
# Initialize Next.js project (when setting up for the first time)
npx create-next-app@14 . --typescript --tailwind --app --no-src-dir

# Install dependencies
npm install axe-core playwright
npm install -D @playwright/test
npx playwright install chromium

# Install shadcn/ui
npx shadcn-ui@latest init
```

### Development
```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Testing
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- path/to/test.spec.ts
```

## Architecture

### Core Analysis Flow (Prototype - Database-free)
1. User enters URL via input form on home page
2. POST /api/analyze validates URL and initiates browser automation
3. Playwright launches headless browser and loads the target page
4. axe-core is injected and runs accessibility tests (WCAG 2.1 Level A, AA)
5. Results are translated to Korean and returned directly in API response
6. Results are displayed inline on the same page (client state)
7. User can download HTML report from client-side generated content

### Key API Endpoints

**POST /api/analyze**
- Input: `{ url: string }`
- Output: Complete analysis results including:
  - URL analyzed
  - Accessibility score (0-100)
  - Total issue count
  - Violations array with Korean translations, impact levels, affected HTML elements, CSS selectors, and solutions
  - Timestamp (createdAt)
- Validates URL, triggers browser automation, runs axe-core analysis, and returns results immediately

### Scoring Algorithm

```javascript
// Penalty-based scoring system
const weights = {
  critical: 10,
  serious: 5,
  moderate: 3,
  minor: 1
};

// Calculate penalty based on issue severity and count
let penalty = 0;
violations.forEach(v => {
  penalty += weights[v.impact] * v.nodes.length;
});

// Final score (capped at 0 minimum)
const score = Math.max(0, 100 - penalty);
```

### Korean Translation System

A translation map is required for axe-core rule IDs to Korean descriptions and solutions. Top priority rules include:
- `image-alt`: Image alternative text missing
- `color-contrast`: Insufficient color contrast
- `label`: Form label missing
- `button-name`: Button accessible name missing
- `link-name`: Link accessible name missing
- `html-has-lang`: HTML lang attribute missing
- `document-title`: Page title missing

Translation should be stored in `/lib/translations/accessibility-ko.json` or similar.

### Analysis Result Structure

```typescript
{
  url: string          // Analyzed URL
  score: number        // 0-100 score
  totalIssues: number  // Total issue count
  violations: {
    id: string
    impact: 'critical' | 'serious' | 'moderate' | 'minor'
    description: string
    koreanDescription?: string  // Korean translation
    koreanSolution?: string     // Korean solution guide
    wcag?: string              // WCAG reference
    helpUrl: string
    nodes: [{
      html: string
      target: string[]   // CSS Selector array
    }]
  }[]
  createdAt: string    // ISO timestamp
}
```

Results are not persisted - they exist only in client memory for the current session.

## Page Structure (Simplified)

1. **Home (/)**:
   - Initial state: Service introduction + URL input form
   - Analysis state: Loading indicator while analyzing
   - Results state: Score display, issue summary cards by severity, detailed issue list with HTML report download
   - "New Analysis" button returns to initial state

## Limitations (Prototype Version)

- No rate limiting in prototype (add in production)
- No result persistence - refresh loses data
- Analysis timeout: 30 seconds
- Only supports publicly accessible pages
- Cannot analyze pages requiring authentication
- Large pages may take longer to analyze

## Development Constraints

### Prototype Scope
- No user authentication
- No database/persistence layer
- Single page analysis only (no crawling)
- Results exist only in client memory
- No rate limiting (add for production)

### Technical Limitations
- Results lost on page refresh/navigation
- Cannot analyze login-required pages
- Large pages may timeout

## Playwright + axe-core Integration

```javascript
import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(url);

// Inject axe-core
await page.addScriptTag({
  path: 'node_modules/axe-core/axe.min.js'
});

// Run accessibility tests
const results = await page.evaluate(() => {
  return axe.run({
    runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa']
  });
});

await browser.close();
```

## File Organization

Expected directory structure:
```
/app
  /page.tsx                 # Home page (form + results display)
  /api
    /analyze/route.ts       # POST /api/analyze
/components
  /AnalysisForm.tsx         # URL input form (calls API, passes results to parent)
  /ScoreDisplay.tsx         # Score visualization
  /ImpactSummary.tsx        # Issue summary by severity
  /ViolationList.tsx        # Detailed issue list
/lib
  /analyzer.ts              # Core analysis logic (Playwright + axe-core)
  /scoring.ts               # Score calculation
  /translator.ts            # Apply Korean translations to results
  /types.ts                 # TypeScript type definitions
  /translations/
    /accessibility-ko.json  # Korean translations
```

Note: `lib/db.ts` exists but is not used in this prototype version.

## Testing Strategy

Before deployment, test with at least 10 real websites including:
- Government websites (accessibility compliance expected)
- E-commerce sites (complex interactions)
- News/media sites (content-heavy)
- Web applications (SPAs with dynamic content)

Target metrics:
- Average analysis time < 30 seconds
- Error rate < 5%
- All WCAG 2.1 Level A and AA rules covered

## License Compliance

axe-core is licensed under MPL 2.0 (Mozilla Public License). Ensure compliance by:
- Including license notice in distribution
- Making source code of any modifications to axe-core available
- Not removing copyright notices

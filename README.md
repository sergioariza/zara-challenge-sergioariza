# Zara Challenge — Mobile Phone Catalog

A single-page React application for browsing, searching, and purchasing mobile phones. Built as a technical assessment for Napptilus / Inditex.

---

## Features

- Browse a catalog of phones fetched from a REST API (19 unique, after deduplication of a repeated entry returned by the API)
- Real-time search filtered server-side, with a debounced input to avoid excessive requests
- Phone detail page with storage and color selectors, dynamic price updates, and image changes on color selection
- Persistent shopping cart backed by `localStorage`
- Internationalisation (EN / ES / CAT) powered by `react-i18next`, switchable from the navbar with the selected language persisted in `localStorage`
- Responsive layout across all screen sizes

---

## Tech Stack

| Concern | Choice |
|---|---|
| UI | React 19 |
| Language | TypeScript (strict mode) |
| Routing | React Router v7 |
| State management | React Context API + `useReducer` |
| HTTP client | Axios with a request interceptor for `x-api-key` |
| Styling | SASS/SCSS + CSS Modules |
| Build tool | Vite |
| Internationalisation | react-i18next (EN / ES / CAT) |
| Testing | Jest + Testing Library |
| Linting | ESLint + typescript-eslint + eslint-plugin-jsx-a11y |
| Formatting | Prettier |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Installation

```bash
npm install
```

### Environment variables

Create a `.env` file at the project root:

```
VITE_API_KEY=<api_key_provided_by_napptilus>
```

The API key is proprietary to Napptilus and is not included in this repository. It is injected at build time by Vite and attached to every request through an Axios interceptor.

### Running the app

```bash
# Development — unminified assets, HMR
npm run dev

# Production build — concatenated and minified assets
npm run build

# Preview the production build locally
npm run preview
```

---

## CI

A GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push and pull request to `master`. It executes four steps in order: type check, lint, tests, and production build.

---

## Project Structure

```
src/
├── api/
│   ├── client.ts              # Axios instance with x-api-key interceptor
│   └── products.ts            # getProducts / getProductById
├── components/
│   ├── Navbar/                # Sticky navigation bar
│   ├── PhoneCard/             # Card used in the grid and the similar items carousel
│   └── SearchBar/             # Controlled search input with result count
├── context/
│   └── CartContext.tsx        # CartProvider + useCart hook
├── hooks/
│   ├── useDebounce.ts         # Generic debounce hook
│   ├── usePhone.ts            # Fetches a single phone by id
│   └── usePhones.ts           # Fetches the phone list, accepts a search string
├── icons/                     # SVG icon components (BagIcon, HomeIcon, …)
├── pages/
│   ├── Cart/                  # Cart view
│   ├── PhoneDetails/          # Detail view with selectors
│   └── PhoneList/             # Grid view with search bar
├── styles/
│   ├── _colors.scss           # Color custom properties
│   ├── _typography.scss       # Font family, weights, and size scale
│   ├── _spacing.scss          # Spacing scale
│   ├── _misc.scss             # Navbar height and miscellaneous tokens
│   ├── _reset.scss            # CSS reset with form-element font inheritance
│   └── main.scss              # Entry point — imports all partials, sets up #root
├── types/
│   └── index.ts               # Shared TypeScript interfaces
└── __fixtures__/              # Fixture data used in tests
```

Each feature folder (component, page) is self-contained: the `.tsx` source, its `.module.scss`, and its test file live together.

---

## Architecture Decisions

### `useReducer` instead of Redux

The cart state has two actions (`ADD_ITEM`, `REMOVE_ITEM`) and lives in a single `CartProvider` at the root. Redux would introduce significant boilerplate — store setup, slices, selectors, a separate Provider — for a data model this small. `useReducer` with Context provides the same predictable state transitions through a pure function `(state, action) → state`, without any external dependency. If the cart logic were to grow substantially (optimistic updates, server synchronisation, complex cross-component selectors), migrating to Redux or Zustand would be a straightforward extraction.

### Colocation by feature

Files are grouped by what they belong to, not by what they are. A component's source, styles, and tests live in the same folder rather than in separate top-level `components/`, `styles/`, and `__tests__/` directories. The same principle applies to icons: they live in `src/icons/` rather than inside `src/components/`, because they are primitive resources rather than UI components.

### CSS Modules + SCSS partials

Styles are scoped to their component via CSS Modules (`.module.scss`), which eliminates class name collisions without a runtime. Design tokens (colors, spacing, typography) are declared as CSS custom properties in SCSS partials and imported once in `main.scss`, making them available globally through `var(--token-name)` without any SCSS variable imports in individual module files.

### API duplicate handling

The phone list endpoint returns duplicate entries for certain models. The `FETCH_SUCCESS` case in `usePhones` deduplicates the payload using a `Set<string>` keyed on `id` before storing it in state, so duplicates never reach the UI and React key warnings are avoided.

### Debounced search

The search input updates local state on every keystroke, but the value passed to `usePhones` is delayed by 300 ms via `useDebounce`. This prevents an API request on every character typed while keeping the result count in the UI feeling immediate.

### Cart persistence

The cart state is initialised from `localStorage` via the `useReducer` lazy initialiser, and re-serialised on every state change via a `useEffect`. The cart survives page reloads with no additional persistence layer.

---

## Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

The suite covers **54 tests across 10 files**, colocated next to the code they test:

| File | What it covers |
|---|---|
| `useDebounce.test.ts` | Initial value, delay behaviour, cancellation on rapid input |
| `usePhones.test.ts` | Loading state, successful fetch, deduplication, error state, search parameter forwarding |
| `usePhone.test.ts` | Loading state, successful fetch, error state, id forwarding |
| `CartContext.test.tsx` | `addItem`, `removeItem`, `totalPrice`, localStorage persistence and rehydration |
| `SearchBar.test.tsx` | Rendering, controlled value, `onChange`, singular/plural result count |
| `Navbar.test.tsx` | Home link, cart link href, initial item count |
| `PhoneCard.test.tsx` | Phone information rendering, link href, image alt text |
| `PhoneList.test.tsx` | Loading/error states, card rendering, result count |
| `PhoneDetails.test.tsx` | Loading/error states, price display, selector enable/disable logic for "Add to cart", specifications section |
| `Cart.test.tsx` | Empty state, item rendering, total price, remove button, "Continue shopping" link |

### Testing setup notes

Jest runs with `ts-jest` against `jsdom`. A dedicated `tsconfig.test.json` is required because the app's main `tsconfig.app.json` targets Vite's bundler mode (`verbatimModuleSyntax`, `moduleResolution: bundler`), which is incompatible with Jest's CommonJS module system. SCSS modules are stubbed with `identity-obj-proxy`. `TextEncoder`/`TextDecoder` are polyfilled in `setupTests.ts` because React Router v7 depends on them in the jsdom environment.

API calls in hook tests are isolated by mocking the `api/products` module with an explicit factory function, which prevents Jest from loading the Axios client (and its `import.meta.env` reference) during test runs.

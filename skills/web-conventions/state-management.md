# State Management

Classify state into buckets first; reach for a library only if a substantial slice of complex shared client state remains.

## When you don't need a state management library

- **UI state** (modals, inputs, dropdowns) → `useState` / `useReducer`
- **Server data** (fetched, cached, refetched) → TanStack Query, not a store
- **Shareable app snapshots** (filters, tabs, pagination) → URL state (e.g., Nuqs)
- **Session-static config** (theme, language, currency) → React Context — fine since it rarely changes
- **Small leftover shared client state** → a ~50-line custom store with `useSyncExternalStore`, if you're comfortable owning selector caching and equality checks

## When you should use one (e.g., Zustand, MobX, Jotai)

- Complex client state **is the product**: collaborative editors, design tools, canvas apps
- Many components share frequently-changing state and re-render precision matters
- You need battle-tested handling of edge cases (concurrent rendering, tearing, SSR, devtools, middleware) rather than maintaining that yourself
- Your team would end up rebuilding library features anyway — just install the library

## Reference

- [Do we need state management libraries anymore?](https://neciudan.dev/do-we-need-state-management-libraries) — Dan Neciu
